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

## 배포

Vercel에 그대로 올라간다. 서버리스 함수는 로컬 LLM에 닿을 수 없으므로 배포 환경에서는 `LLM_BASE_URL`을 비워 두거나,
외부에서 접근 가능한 엔드포인트를 넣는다.
