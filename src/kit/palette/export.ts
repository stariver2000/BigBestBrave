/**
 * 팔레트 -> 각종 코드 포맷 직렬화.
 *
 * 순수 함수만 두어 서버·클라이언트 어디서든 쓰고, 색 코어의 Palette 구조만 입력으로 받는다.
 * (특정 페이지의 상태 구조에 의존하지 않으므로 다른 페이지가 그대로 가져다 쓴다.)
 */

import type { Palette, PaletteTrack } from '../../core/color';
import { DEFAULT_EXPORT_OPTIONS, type ExportFormat, type ExportOptions } from './config';

/** 트랙 인덱스 -> 역할 이름. 준비된 이름을 넘어서면 track-7 처럼 인덱스로 잇는다. */
function trackName(options: ExportOptions, index: number): string {
  return options.trackNames[index] ?? `track-${index + 1}`;
}

function toCss(palette: Palette, options: ExportOptions): string {
  const lines: string[] = [':root {'];
  palette.tracks.forEach((track, index) => {
    const name = trackName(options, index);
    track.ramp.forEach((entry) => {
      lines.push(`  --${options.prefix}-${name}-${entry.step}: ${entry.hex};`);
    });
  });
  lines.push('}');
  return lines.join('\n');
}

function toScss(palette: Palette, options: ExportOptions): string {
  const lines: string[] = [];
  palette.tracks.forEach((track, index) => {
    const name = trackName(options, index);
    track.ramp.forEach((entry) => {
      lines.push(`$${options.prefix}-${name}-${entry.step}: ${entry.hex};`);
    });
    lines.push('');
  });
  return lines.join('\n').trimEnd();
}

function toPlainObject(palette: Palette, options: ExportOptions): Record<string, Record<string, string>> {
  const output: Record<string, Record<string, string>> = {};
  palette.tracks.forEach((track, index) => {
    const steps: Record<string, string> = {};
    track.ramp.forEach((entry) => {
      steps[String(entry.step)] = entry.hex;
    });
    output[trackName(options, index)] = steps;
  });
  return output;
}

function toJson(palette: Palette, options: ExportOptions): string {
  const document = {
    seed: palette.seedHex,
    harmony: palette.harmony,
    colors: toPlainObject(palette, options),
  };
  return JSON.stringify(document, null, 2);
}

function toTailwind(palette: Palette, options: ExportOptions): string {
  const colors = JSON.stringify(toPlainObject(palette, options), null, 6);
  // tailwind.config.js의 theme.extend.colors에 그대로 붙일 수 있는 형태로 감싼다.
  return [
    '/** @type {import("tailwindcss").Config} */',
    'module.exports = {',
    '  theme: {',
    '    extend: {',
    `      colors: ${colors.split('\n').join('\n      ')},`,
    '    },',
    '  },',
    '};',
  ].join('\n');
}

function trackToSvgRow(track: PaletteTrack, rowIndex: number, size: number): string {
  return track.ramp
    .map((entry, columnIndex) => {
      const x = columnIndex * size;
      const y = rowIndex * size;
      return `  <rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${entry.hex}" />`;
    })
    .join('\n');
}

function toSvg(palette: Palette, options: ExportOptions): string {
  const size = options.swatchSize;
  const columns = palette.tracks[0]?.ramp.length ?? 0;
  const width = columns * size;
  const height = palette.tracks.length * size;
  const rows = palette.tracks.map((track, index) => trackToSvgRow(track, index, size)).join('\n');
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    rows,
    '</svg>',
  ].join('\n');
}

const SERIALIZERS: Record<ExportFormat, (palette: Palette, options: ExportOptions) => string> = {
  css: toCss,
  scss: toScss,
  json: toJson,
  tailwind: toTailwind,
  svg: toSvg,
};

export function exportPalette(
  palette: Palette,
  format: ExportFormat,
  options: Partial<ExportOptions> = {},
): string {
  const merged: ExportOptions = { ...DEFAULT_EXPORT_OPTIONS, ...options };
  return SERIALIZERS[format](palette, merged);
}
