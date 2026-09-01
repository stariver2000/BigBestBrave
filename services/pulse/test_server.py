"""맥 서비스 시험.

표준 라이브러리만 쓴다: python3 -m unittest discover -s services/pulse
서비스를 실제로 띄우고 두드린다 — 이 크기의 서비스에서는 그편이 흉내 내기보다 확실하다.
"""

from __future__ import annotations

import json
import tempfile
import threading
import unittest
import urllib.error
import urllib.request
from pathlib import Path

from server import serve, valid_path


class PulseServiceTest(unittest.TestCase):
    def setUp(self) -> None:
        self.directory = tempfile.TemporaryDirectory()
        db_path = str(Path(self.directory.name) / "pulse.sqlite3")
        self.server = serve("127.0.0.1", 0, db_path)
        self.base = f"http://127.0.0.1:{self.server.server_address[1]}"
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    def tearDown(self) -> None:
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=2)
        self.directory.cleanup()

    def post(self, payload: object) -> int:
        request = urllib.request.Request(
            f"{self.base}/pulse",
            data=json.dumps(payload).encode("utf-8"),
            headers={"content-type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=2) as response:
                return response.status
        except urllib.error.HTTPError as error:
            return error.code

    def get(self, query: str = "") -> dict:
        with urllib.request.urlopen(f"{self.base}/pulse{query}", timeout=2) as response:
            return json.loads(response.read())

    def test_counts_only_known_kinds(self) -> None:
        self.assertEqual(self.post({"path": "/beeper", "kinds": ["view", "touch", "ghost"]}), 204)
        self.assertEqual(
            self.get("?path=/beeper")["tally"], {"view": 1, "touch": 1, "reach": 0, "stay": 0}
        )

    def test_adds_up_across_requests(self) -> None:
        self.post({"path": "/beeper", "kinds": ["view"]})
        self.post({"path": "/beeper", "kinds": ["view", "stay"]})
        tally = self.get("?path=/beeper")["tally"]
        self.assertEqual(tally["view"], 2)
        self.assertEqual(tally["stay"], 1)

    def test_pages_are_separate(self) -> None:
        self.post({"path": "/beeper", "kinds": ["view"]})
        self.post({"path": "/subtitle", "kinds": ["view", "touch"]})
        pages = self.get()["pages"]
        self.assertEqual(pages["/beeper"]["view"], 1)
        self.assertEqual(pages["/subtitle"]["touch"], 1)

    def test_unknown_page_reads_as_zero(self) -> None:
        # 아직 아무도 오지 않은 페이지는 없는 것이 아니라 0이다.
        self.assertEqual(self.get("?path=/none")["tally"]["view"], 0)

    def test_rejects_bad_paths(self) -> None:
        self.assertEqual(self.post({"path": "http://elsewhere", "kinds": ["view"]}), 400)
        self.assertEqual(self.post({"path": "/BEEPER", "kinds": ["view"]}), 400)
        self.assertEqual(self.post({"path": "/" + "a" * 200, "kinds": ["view"]}), 400)

    def test_rejects_broken_bodies(self) -> None:
        self.assertEqual(self.post({"path": "/beeper"}), 400)
        self.assertEqual(self.post(["/beeper"]), 400)

    def test_caps_kinds_per_request(self) -> None:
        # 한 번에 스무 개를 보내도 앞의 여덟 개까지만 센다.
        self.post({"path": "/beeper", "kinds": ["view"] * 20})
        self.assertEqual(self.get("?path=/beeper")["tally"]["view"], 8)


class PathRuleTest(unittest.TestCase):
    def test_shape(self) -> None:
        self.assertTrue(valid_path("/"))
        self.assertTrue(valid_path("/design/color"))
        self.assertFalse(valid_path("design"))
        self.assertFalse(valid_path("/../etc"))
        self.assertFalse(valid_path(7))


if __name__ == "__main__":
    unittest.main()


class SharedConstantTest(unittest.TestCase):
    """두 언어에 같은 수가 적혀 있다.

    표본 기준이 한쪽만 바뀌면 화면과 보고서가 다른 말을 하게 된다. 그런 어긋남은
    한참 뒤에야 발견되므로, 값을 옮겨 적은 자리마다 시험으로 묶어 둔다.
    """

    def test_min_views_matches_typescript(self) -> None:
        import re

        from report import MIN_VIEWS

        source = (Path(__file__).resolve().parents[2] / "src/core/pulse/config.ts").read_text("utf-8")
        found = re.search(r"MIN_VIEWS\s*=\s*(\d+)", source)
        self.assertIsNotNone(found)
        self.assertEqual(int(found.group(1)), MIN_VIEWS)

    def test_kinds_match_typescript(self) -> None:
        import re

        from report import KINDS

        source = (Path(__file__).resolve().parents[2] / "src/core/pulse/config.ts").read_text("utf-8")
        found = re.search(r"PULSE_KINDS = \[([^\]]+)\]", source)
        self.assertIsNotNone(found)
        names = tuple(re.findall(r"'([a-z]+)'", found.group(1)))
        self.assertEqual(names, KINDS)
