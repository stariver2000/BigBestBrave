# 맥 저장 서비스

페이지마다 정수 네 개를 세는 것이 전부인 서비스다. 표준 라이브러리만 쓰므로 설치할 것이 없다.

```bash
python3 services/pulse/server.py            # http://127.0.0.1:8787
PULSE_DB=.data/pulse.sqlite3 PULSE_PORT=8787 python3 services/pulse/server.py
python3 -m unittest discover -s services/pulse   # 시험
```

Next 쪽에서 이 서비스를 쓰려면 `.env.local`에 두 줄을 둔다.

```
PULSE_DRIVER=http
PULSE_URL=http://127.0.0.1:8787
```

**이 서비스가 꺼져 있어도 사이트는 그대로 동작한다.** 맥은 덤이고, 실패는 조용히 삼킨다.
