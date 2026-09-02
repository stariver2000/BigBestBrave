/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 트리가 10층까지 깊어져도 URL은 단일 도메인 하위 경로로만 갈라진다.
  // 리라이트/리다이렉트를 쓰지 않는 이유: 경로 자체가 트리의 정규 주소이기 때문.
  trailingSlash: false,
  // 이 저장소는 여러 세션이 서버를 동시에 띄운다. 둘 이상의 next 프로세스가 .next를
  // 공유하면 서로의 청크를 덮어 모든 라우트가 500으로 죽는다(2026-09-02에 실제로 났다:
  // .next/server에서 Cannot find module './331.js'). 세션은 NEXT_DIST_DIR로 제 디렉토리를
  // 지정해 띄운다(.next-* 꼴, .gitignore에 있다). 지정하지 않으면 기본 그대로다.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
