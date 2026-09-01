/**
 * 재사용 키트의 공개 진입점.
 *
 * 여기 있는 것은 "어떤 주제의 페이지에서도 쓸 수 있는 부품"만이다.
 * 특정 주제에 묶인 코드는 src/modules/<페이지>/ 안에 둔다.
 */

export { Badge, Button, Field, Panel, Segmented, TextInput, type SegmentedOption } from './ui/primitives';
export { PaperCard, PLAIN_LABELS, type Localized, type PlainPaper } from './paper';
export { useClipboard } from './state/use-clipboard';
export {
  booleanField,
  encodeField,
  numberField,
  readField,
  stringField,
  writeFields,
  type EncodedEntry,
  type UrlField,
} from './state/url-state';
export {
  DEFAULT_EXPORT_OPTIONS,
  EXPORT_FORMATS,
  exportPalette,
  type ExportFormat,
  type ExportOptions,
} from './palette';
