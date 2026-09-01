"""페이지의 맥을 세는 작은 서비스.

무엇을 하는가
    페이지 경로마다 정수 네 개(view/touch/reach/stay)를 올리고 읽어 준다. 그게 전부다.
    글도, 신원도, 접속 주소도 받지 않고 남기지 않는다. 그래서 이 자료로는 한 사람을 되짚을 수 없다.

왜 이렇게 작은가
    페이지가 수백 장으로 늘어도 이 서비스가 하는 일은 늘지 않아야 한다. 한 요청이 하는 일은
    한 줄을 갱신하는 것뿐이고, 자료는 페이지 수만큼의 줄이 전부다. 그래서 SQLite 한 파일이면 충분하고
    설치할 의존성도 없다(표준 라이브러리만 쓴다).

    무겁게 만들 여지는 일부러 두지 않았다 — 검색도, 시간별 보관도, 사용자 구분도 없다.
    그런 것이 필요해지면 그때 다른 저장소로 옮기고, 이 서비스는 버린다.
"""

from __future__ import annotations

import json
import os
import re
import sqlite3
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

# 세는 사건. TypeScript 쪽 core/pulse의 PULSE_KINDS와 같은 목록이어야 한다.
KINDS = ("view", "touch", "reach", "stay")

# 받아 주는 경로의 모양. 트리 좌표라서 소문자와 빗금과 붙임표뿐이다.
PATH_PATTERN = re.compile(r"^/[a-z0-9/-]*$")
MAX_PATH_LENGTH = 120

# 한 요청에서 받아 주는 사건 수. 한 사람이 한 번 왔을 때 넷을 넘길 일이 없다.
MAX_KINDS = 8
# 본문 크기 상한. 경로 하나와 이름 몇 개면 이보다 훨씬 작다.
MAX_BODY_BYTES = 2048


class PulseDb:
    """맥을 담는 SQLite 한 파일.

    쓰기가 겹쳐도 줄이 사라지지 않도록 갱신은 원자적인 UPSERT 한 문장으로 한다.
    연결은 스레드마다 따로 두지 않고 자물쇠 하나로 감싼다 — 이 서비스의 일은 짧아서 그편이 단순하다.
    """

    def __init__(self, path: str) -> None:
        self._lock = threading.Lock()
        directory = os.path.dirname(path)
        if directory:
            os.makedirs(directory, exist_ok=True)
        self._db = sqlite3.connect(path, check_same_thread=False)
        # WAL: 읽는 쪽이 쓰는 쪽을 기다리지 않는다. 셈을 읽는 화면이 사람을 붙잡지 않게 한다.
        self._db.execute("PRAGMA journal_mode=WAL")
        columns = ", ".join(f"{kind} INTEGER NOT NULL DEFAULT 0" for kind in KINDS)
        self._db.execute(f"CREATE TABLE IF NOT EXISTS pulse (path TEXT PRIMARY KEY, {columns})")
        self._db.commit()

    def bump(self, path: str, kinds: list[str]) -> dict[str, int]:
        counted = [kind for kind in kinds if kind in KINDS]
        if not counted:
            return self.read(path)

        # 같은 이름이 두 번 오면 두 번 센다. 무엇을 한 번만 셀지는 화면 쪽이 이미 가려낸다.
        additions = {kind: counted.count(kind) for kind in set(counted)}
        assignments = ", ".join(f"{kind} = pulse.{kind} + {additions[kind]}" for kind in additions)
        values = ", ".join(str(additions.get(kind, 0)) for kind in KINDS)
        with self._lock:
            self._db.execute(
                f"INSERT INTO pulse (path, {', '.join(KINDS)}) VALUES (?, {values}) "
                f"ON CONFLICT(path) DO UPDATE SET {assignments}",
                (path,),
            )
            self._db.commit()
        return self.read(path)

    def read(self, path: str) -> dict[str, int]:
        with self._lock:
            row = self._db.execute(
                f"SELECT {', '.join(KINDS)} FROM pulse WHERE path = ?", (path,)
            ).fetchone()
        if row is None:
            return {kind: 0 for kind in KINDS}
        return dict(zip(KINDS, row))

    def read_all(self) -> dict[str, dict[str, int]]:
        with self._lock:
            rows = self._db.execute(f"SELECT path, {', '.join(KINDS)} FROM pulse").fetchall()
        return {row[0]: dict(zip(KINDS, row[1:])) for row in rows}

    def close(self) -> None:
        with self._lock:
            self._db.close()


def valid_path(value: object) -> bool:
    return (
        isinstance(value, str)
        and len(value) <= MAX_PATH_LENGTH
        and PATH_PATTERN.match(value) is not None
    )


class Handler(BaseHTTPRequestHandler):
    db: PulseDb

    # 접속 기록을 남기지 않는다. 주소를 적어 두는 순간 "아무것도 저장하지 않는다"가 거짓이 된다.
    def log_message(self, *_args: object) -> None:  # noqa: D401
        return

    def _send(self, status: int, payload: object | None = None) -> None:
        body = b"" if payload is None else json.dumps(payload).encode("utf-8")
        self.send_response(status)
        if body:
            self.send_header("content-type", "application/json")
            self.send_header("content-length", str(len(body)))
        self.end_headers()
        if body:
            self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802
        if not self.path.startswith("/pulse"):
            self._send(404, {"error": "unknown-route"})
            return

        _, _, query = self.path.partition("?")
        wanted = None
        for part in query.split("&"):
            key, _, value = part.partition("=")
            if key == "path":
                wanted = value.replace("%2F", "/")

        if wanted is None:
            self._send(200, {"pages": self.db.read_all()})
        elif valid_path(wanted):
            self._send(200, {"path": wanted, "tally": self.db.read(wanted)})
        else:
            self._send(400, {"error": "bad-path"})

    def do_POST(self) -> None:  # noqa: N802
        if not self.path.startswith("/pulse"):
            self._send(404, {"error": "unknown-route"})
            return

        length = int(self.headers.get("content-length") or 0)
        if length <= 0 or length > MAX_BODY_BYTES:
            self._send(400, {"error": "bad-body"})
            return

        try:
            payload = json.loads(self.rfile.read(length))
        except json.JSONDecodeError:
            self._send(400, {"error": "bad-json"})
            return

        path = payload.get("path") if isinstance(payload, dict) else None
        kinds = payload.get("kinds") if isinstance(payload, dict) else None
        if not valid_path(path) or not isinstance(kinds, list):
            self._send(400, {"error": "bad-body"})
            return

        self.db.bump(path, [kind for kind in kinds[:MAX_KINDS] if isinstance(kind, str)])
        self._send(204)


def serve(host: str, port: int, db_path: str) -> ThreadingHTTPServer:
    handler = type("BoundHandler", (Handler,), {"db": PulseDb(db_path)})
    return ThreadingHTTPServer((host, port), handler)


def main() -> None:
    host = os.environ.get("PULSE_HOST", "127.0.0.1")
    port = int(os.environ.get("PULSE_PORT", "8787"))
    db_path = os.environ.get("PULSE_DB", ".data/pulse.sqlite3")
    server = serve(host, port, db_path)
    print(f"pulse service on http://{host}:{port} (db: {db_path})")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()


if __name__ == "__main__":
    main()
