/**
 * 자리 검증(체크섬).
 *
 * 정규식만으로는 "숫자 13자리"를 전부 주민등록번호로 잡아 오탐이 쏟아진다.
 * 검증 자리를 계산해 걸러야 실제로 쓸 만한 도구가 된다.
 */

/** 문자열에서 숫자만 남긴다. 하이픈·공백 표기를 모두 같은 방식으로 다루기 위함이다. */
export function digitsOf(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * 룬(Luhn) 알고리즘. 신용카드 번호의 마지막 자리는 앞자리들로부터 계산된다.
 * 오른쪽에서 두 번째 자리부터 한 칸 걸러 2배하고, 10 이상이면 9를 뺀 뒤 전부 더해 10으로 나눠떨어지면 유효하다.
 */
export function isLuhnValid(value: string): boolean {
  const digits = digitsOf(value);
  if (digits.length < 12 || digits.length > 19) return false;

  let sum = 0;
  let double = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = digits.charCodeAt(index) - 48;
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

/** 주민등록번호 검증 자리 계산에 쓰는 가중치. 앞 12자리에 차례로 곱한다. */
const RRN_WEIGHTS = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];

/**
 * 주민등록번호 형식과 검증 자리를 확인한다.
 * 생년월일이 달력에 존재하는지, 성별 자리가 1~8인지까지 본다.
 */
export function isRrnValid(value: string): boolean {
  const digits = digitsOf(value);
  if (digits.length !== 13) return false;

  const month = Number(digits.slice(2, 4));
  const day = Number(digits.slice(4, 6));
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;

  const genderDigit = Number(digits[6]);
  if (genderDigit < 1 || genderDigit > 8) return false;

  const sum = RRN_WEIGHTS.reduce(
    (total, weight, index) => total + weight * (digits.charCodeAt(index) - 48),
    0,
  );
  const expected = (11 - (sum % 11)) % 10;
  return expected === Number(digits[12]);
}

/** 사업자등록번호 검증 자리 가중치. 앞 9자리에 차례로 곱한다. */
const BRN_WEIGHTS = [1, 3, 7, 1, 3, 7, 1, 3, 5];

/** 사업자등록번호(10자리) 검증. 9번째 자리는 곱한 뒤 10으로 나눈 몫을 따로 더한다. */
export function isBrnValid(value: string): boolean {
  const digits = digitsOf(value);
  if (digits.length !== 10) return false;

  let sum = 0;
  for (let index = 0; index < BRN_WEIGHTS.length; index += 1) {
    sum += BRN_WEIGHTS[index] * (digits.charCodeAt(index) - 48);
  }
  // 마지막 가중치(5)를 곱한 값의 십의 자리를 한 번 더 더하는 것이 이 규칙의 특징이다.
  sum += Math.floor((5 * (digits.charCodeAt(8) - 48)) / 10);
  const expected = (10 - (sum % 10)) % 10;
  return expected === Number(digits[9]);
}
