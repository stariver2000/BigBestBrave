# BigBestBrave

하나의 도메인 아래에서 경로만 갈라지는 페이지 트리. 페이지마다 판매 가능한 기능 하나.

설계와 구조는 [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) 하나에 정리돼 있다.

## 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # 코어 로직 테스트
npm run typecheck
npm run build
```

## 로컬 LLM 연결 (선택)

`.env.example`을 `.env.local`로 복사하고 값을 채운다. 비워 두면 LLM 기능만 꺼지고 나머지는 그대로 동작한다.

```bash
ollama serve
cp .env.example .env.local   # LLM_BASE_URL=http://127.0.0.1:11434/v1
```

가용성은 `GET /api/llm/status`로 확인한다.

## 맥 서비스 (선택)

페이지가 통했는지 재는 셈을 한곳에 모으고 싶을 때만 띄운다. 표준 라이브러리만 쓰므로 설치할 것이 없다.

```bash
npm run pulse            # http://127.0.0.1:8787 (SQLite 한 파일)
npm run pulse:report     # 쌓인 셈을 표로 읽는다. 손이 안 가는 페이지가 위로 온다
npm run test:py          # 서비스 시험
```

Next가 이 서비스를 쓰게 하려면 `.env.local`에 두 줄을 둔다.

```
PULSE_DRIVER=http
PULSE_URL=http://127.0.0.1:8787
```

**서비스가 꺼져 있어도 사이트는 그대로 동작한다.** 맥은 덤이고, 쓰기 실패는 조용히 삼킨다.
읽기는 삼키지 않는다 — 0과 "모른다"는 다른 말이라, 닿지 못하면 503으로 답한다.

## 배포

Vercel에 그대로 올라간다. 서버리스 함수는 로컬 LLM에 닿을 수 없으므로 배포 환경에서는 `LLM_BASE_URL`을 비워 두거나,
외부에서 접근 가능한 엔드포인트를 넣는다.
