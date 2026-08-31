import { describe, expect, it } from 'vitest';
import { createTranslator, localeFromAcceptLanguage, resolveLocale, type Dictionary } from '@core/i18n';

const dictionary: Dictionary<'hello'> = {
  ko: { hello: '안녕' },
  en: { hello: 'Hello' },
  ja: { hello: 'こんにちは' },
};

describe('i18n', () => {
  it('지원하지 않는 값은 기본 로케일로 떨어진다', () => {
    expect(resolveLocale('ja')).toBe('ja');
    expect(resolveLocale('fr')).toBe('ko');
    expect(resolveLocale(undefined)).toBe('ko');
  });

  it('Accept-Language에서 지역 태그를 벗겨 매칭한다', () => {
    expect(localeFromAcceptLanguage('ja-JP,ja;q=0.9,en;q=0.8')).toBe('ja');
    expect(localeFromAcceptLanguage('fr-FR,fr;q=0.9')).toBeNull();
    expect(localeFromAcceptLanguage(null)).toBeNull();
  });

  it('번역기는 로케일에 묶인 t 함수를 만든다', () => {
    expect(createTranslator(dictionary, 'ja')('hello')).toBe('こんにちは');
  });
});
