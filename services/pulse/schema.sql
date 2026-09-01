-- 페이지의 맥. 이 스키마가 담는 것은 페이지마다의 셈뿐이다.
--
-- 설계에서 지킨 것
--   1. 사건 종류를 컬럼으로 만들지 않는다. view/touch/reach/stay를 각각 컬럼으로 두면
--      종류가 하나 늘 때마다 테이블을 고쳐야 하고, 종류마다 다른 질의를 쓰게 된다.
--      종류는 값이지 구조가 아니다.
--   2. 대리 키를 두지 않는다. 경로가 곧 페이지의 이름이고 트리 좌표라서 자연 키로 충분하다.
--      id를 하나 더 두면 조인이 하나 늘 뿐, 얻는 것이 없다.
--   3. 시각을 담지 않는다. 지금 묻는 것은 "얼마나"이지 "언제"가 아니다.
--      시간축이 필요해지면 그때 다른 테이블을 만든다. 미리 만들어 두면 채워지지 않은 채로 남는다.
--   4. 사람에 대한 자료는 어떤 형태로도 두지 않는다. 담을 자리가 없어야 담기지 않는다.
--
-- 적용: psql "$PULSE_DATABASE_URL" -f services/pulse/schema.sql

CREATE TYPE pulse_kind AS ENUM ('view', 'touch', 'reach', 'stay');

CREATE TABLE pulse (
  path  text       NOT NULL,
  kind  pulse_kind NOT NULL,
  count bigint     NOT NULL DEFAULT 0 CHECK (count >= 0),
  PRIMARY KEY (path, kind)
);

-- 한 페이지의 네 줄을 함께 읽는 것이 거의 전부다. 기본 키의 앞 열이 path라 그 읽기는 이미 빠르다.
-- 그래서 인덱스를 더 만들지 않는다.
