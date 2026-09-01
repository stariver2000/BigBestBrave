"""쌓인 맥을 읽어 무엇을 손볼지 고른다.

서버가 아니라 손으로 돌리는 스크립트다. 이런 일에 서버를 두면 아무도 보지 않는 화면이 하나 늘고,
그 화면을 살아 있게 하는 일이 또 생긴다. 필요할 때 한 번 돌려 표를 읽는 편이 가볍다.

    python3 services/pulse/report.py                    # SQLite(.data/pulse.sqlite3)
    python3 services/pulse/report.py .data/pulse.json   # 파일 저장소를 쓸 때

읽는 법: 손이 안 가는 페이지가 위로 온다. 그 페이지가 다음 회차의 대상이다.
표본이 모자란 페이지에는 비율을 적지 않는다 — 셋이 와서 둘이 만졌다고 67%라 부르면
그 수는 잡음을 따라 춤춘다.
"""

from __future__ import annotations

import json
import sqlite3
import sys
from pathlib import Path

# src/core/pulse/config.ts의 MIN_VIEWS와 같아야 한다. 시험이 두 값을 견준다.
MIN_VIEWS = 20
KINDS = ("view", "touch", "reach", "stay")


def load(source: str) -> dict[str, dict[str, int]]:
    path = Path(source)
    if not path.exists():
        return {}
    if path.suffix == ".json":
        return json.loads(path.read_text("utf-8"))
    db = sqlite3.connect(path)
    rows = db.execute(f"SELECT path, {', '.join(KINDS)} FROM pulse").fetchall()
    db.close()
    return {row[0]: dict(zip(KINDS, row[1:])) for row in rows}


def ratio(part: int, whole: int) -> float | None:
    return None if whole <= 0 else min(1.0, part / whole)


def rows(tallies: dict[str, dict[str, int]]) -> list[tuple]:
    """페이지마다 한 줄. 손이 덜 간 쪽이 먼저 오도록 정렬한다."""
    made = []
    for page, tally in tallies.items():
        enough = tally.get("view", 0) >= MIN_VIEWS
        touched = ratio(tally.get("touch", 0), tally.get("view", 0)) if enough else None
        reached = ratio(tally.get("reach", 0), tally.get("touch", 0)) if enough else None
        stayed = ratio(tally.get("stay", 0), tally.get("view", 0)) if enough else None
        made.append((page, tally, enough, touched, reached, stayed))
    # 비율을 알 수 없는 페이지는 판단할 수 없으므로 뒤로 보낸다.
    return sorted(made, key=lambda row: (row[3] is None, row[3] if row[3] is not None else 0))


def percent(value: float | None) -> str:
    return "  —  " if value is None else f"{value * 100:5.1f}%"


def main() -> None:
    source = sys.argv[1] if len(sys.argv) > 1 else ".data/pulse.sqlite3"
    tallies = load(source)
    if not tallies:
        print(f"{source}: 아직 아무것도 쌓이지 않았다.")
        return

    print(f"{'페이지':<16}{'열림':>6}{'손댐':>6}{'아하':>6}{'머묾':>6}   {'만진 비율':>9}{'끝까지':>9}{'머문 비율':>9}")
    print("-" * 80)
    for page, tally, enough, touched, reached, stayed in rows(tallies):
        mark = "" if enough else "  (표본 부족)"
        print(
            f"{page:<16}{tally.get('view', 0):>6}{tally.get('touch', 0):>6}"
            f"{tally.get('reach', 0):>6}{tally.get('stay', 0):>6}   "
            f"{percent(touched):>9}{percent(reached):>9}{percent(stayed):>9}{mark}"
        )

    seen = sum(tally.get("view", 0) for tally in tallies.values())
    print("-" * 80)
    print(f"페이지 {len(tallies)}장 · 방문 {seen}회 · 비율은 방문 {MIN_VIEWS}회부터 적는다")


if __name__ == "__main__":
    main()
