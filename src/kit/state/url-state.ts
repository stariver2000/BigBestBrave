/**
 * URL 질의문자열에 페이지 상태를 싣는 훅의 순수 부분.
 *
 * 상태를 URL에 두는 이유: 도메인과 경로는 트리 좌표로 고정돼 있으므로,
 * "지금 보고 있는 설정"을 남에게 그대로 넘기려면 질의문자열이 유일한 자리다.
 * React나 Next에 의존하지 않게 분리해 두어 다른 페이지에서도 같은 규칙을 쓴다.
 */

/** 스키마: 키마다 기본값과 직렬화 규칙을 갖는다. */
export interface UrlField<T> {
  key: string;
  defaultValue: T;
  encode: (value: T) => string;
  decode: (raw: string) => T | null;
}

export function stringField(key: string, defaultValue: string, allowed?: readonly string[]): UrlField<string> {
  return {
    key,
    defaultValue,
    encode: (value) => value,
    decode: (raw) => {
      if (allowed && !allowed.includes(raw)) return null;
      return raw;
    },
  };
}

export function booleanField(key: string, defaultValue: boolean): UrlField<boolean> {
  return {
    key,
    defaultValue,
    encode: (value) => (value ? '1' : '0'),
    decode: (raw) => (raw === '1' ? true : raw === '0' ? false : null),
  };
}

export function numberField(key: string, defaultValue: number, min: number, max: number): UrlField<number> {
  return {
    key,
    defaultValue,
    encode: (value) => String(value),
    decode: (raw) => {
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed < min || parsed > max) return null;
      return parsed;
    },
  };
}

/** 질의문자열에서 한 필드를 읽는다. 값이 없거나 형식이 틀리면 기본값. */
export function readField<T>(params: URLSearchParams, field: UrlField<T>): T {
  const raw = params.get(field.key);
  if (raw === null) return field.defaultValue;
  const decoded = field.decode(raw);
  return decoded === null ? field.defaultValue : decoded;
}

/** 직렬화가 끝난 한 항목. value가 null이면 기본값이라 URL에서 생략된다. */
export interface EncodedEntry {
  key: string;
  value: string | null;
}

/**
 * 필드와 값을 짝지어 즉시 직렬화한다.
 * 여기서 바로 인코딩하는 이유: 서로 다른 타입의 필드를 한 배열에 담으려면
 * 타입을 지우는 지점이 필요한데, 그 지점을 인코딩 직후로 두면 타입 안전성을 잃지 않는다.
 */
export function encodeField<T>(field: UrlField<T>, value: T): EncodedEntry {
  const isDefault = Object.is(value, field.defaultValue);
  return { key: field.key, value: isDefault ? null : field.encode(value) };
}

/** 기본값과 같은 항목은 생략해 URL이 짧게 유지되도록 한다. */
export function writeFields(entries: readonly EncodedEntry[]): string {
  const params = new URLSearchParams();
  for (const entry of entries) {
    if (entry.value === null) continue;
    params.set(entry.key, entry.value);
  }
  const query = params.toString();
  return query.length > 0 ? `?${query}` : '';
}
