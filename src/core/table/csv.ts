/**
 * CSV 파싱.
 *
 * 라이브러리를 쓰지 않는 이유: 필요한 것은 따옴표와 줄바꿈 처리뿐이고,
 * 이 파일 하나면 브라우저로 보내는 코드가 수 KB 늘지 않는다.
 * 숫자 변환은 여기서 하지 않는다. 어떤 열이 숫자인지는 쓰는 쪽이 정한다.
 */

export interface Table {
  columns: string[];
  /** 행 × 열 문자열. 열 수가 머리글과 다른 행은 버리지 않고 빈 칸으로 맞춘다. */
  rows: string[][];
}

/** 구분자 자동 판별: 첫 줄에서 가장 많이 나온 것을 고른다. */
function detectDelimiter(line: string): string {
  const candidates = [',', '\t', ';'];
  let best = ',';
  let bestCount = -1;
  for (const candidate of candidates) {
    const count = line.split(candidate).length - 1;
    if (count > bestCount) {
      bestCount = count;
      best = candidate;
    }
  }
  return best;
}

/**
 * 한 줄을 필드로 자른다.
 * 따옴표 안의 구분자와 줄바꿈은 값의 일부이므로, 상태를 들고 한 글자씩 훑는다.
 */
function splitLine(source: string, delimiter: string, from: number): { fields: string[]; next: number } {
  const fields: string[] = [];
  let field = '';
  let quoted = false;
  let index = from;

  while (index < source.length) {
    const character = source[index];

    if (quoted) {
      if (character === '"') {
        // 따옴표 두 개는 따옴표 한 개를 뜻한다.
        if (source[index + 1] === '"') {
          field += '"';
          index += 2;
          continue;
        }
        quoted = false;
        index += 1;
        continue;
      }
      field += character;
      index += 1;
      continue;
    }

    if (character === '"') {
      quoted = true;
      index += 1;
      continue;
    }
    if (character === delimiter) {
      fields.push(field);
      field = '';
      index += 1;
      continue;
    }
    if (character === '\n') {
      index += 1;
      break;
    }
    if (character === '\r') {
      index += 1;
      continue;
    }
    field += character;
    index += 1;
  }

  fields.push(field);
  return { fields, next: index };
}

export function parseCsv(source: string): Table {
  const text = source.trim();
  if (text.length === 0) return { columns: [], rows: [] };

  const delimiter = detectDelimiter(text.split('\n')[0]);
  const header = splitLine(text, delimiter, 0);
  const columns = header.fields.map((name) => name.trim());

  const rows: string[][] = [];
  let cursor = header.next;
  while (cursor < text.length) {
    const line = splitLine(text, delimiter, cursor);
    cursor = line.next;
    const values = line.fields;
    // 빈 줄은 건너뛴다.
    if (values.length === 1 && values[0].trim().length === 0) continue;
    // 열 수가 모자라면 빈 칸으로 채워 인덱스가 어긋나지 않게 한다.
    while (values.length < columns.length) values.push('');
    rows.push(values.slice(0, columns.length));
  }

  return { columns, rows };
}

/** 한 열이 숫자로만 이뤄져 있는지. 어떤 열을 좌표·특징으로 쓸 수 있는지 고르는 데 쓴다. */
export function isNumericColumn(table: Table, index: number): boolean {
  if (table.rows.length === 0) return false;
  return table.rows.every((row) => {
    const value = row[index]?.trim();
    return value !== undefined && value.length > 0 && Number.isFinite(Number(value));
  });
}

export function numericColumn(table: Table, index: number): number[] {
  return table.rows.map((row) => Number(row[index]));
}
