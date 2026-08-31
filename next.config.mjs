/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 트리가 10층까지 깊어져도 URL은 단일 도메인 하위 경로로만 갈라진다.
  // 리라이트/리다이렉트를 쓰지 않는 이유: 경로 자체가 트리의 정규 주소이기 때문.
  trailingSlash: false,
};

export default nextConfig;
