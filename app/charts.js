// Hand-written SVG charts for NusaData. No chart library, no network — every
// path, bar and label below is computed from the numbers passed in.

const TEAL = '#0b3d3a';
const AMBER = '#e8a33d';
const CORAL = '#c65b39';
const SAGE = '#5d8a7a';
const SKY = '#4a7fa5';
const SAND = '#d9c9a3';
const GRID = '#e3ddd0';
const INK = '#22302e';
const MUTED = '#6d7a77';

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const start = Math.floor(min / size) * size;
  const out = [];
  for (let v = start; v <= max + size * 0.001; v += size) out.push(v);
  return out;
}

function fmtTick(v) {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(2).replace(/0$/, '');
}

// A line chart with points, value labels on the first/last point, and a
// horizontal zero line when the data crosses zero.
export function lineChart({ labels, values, color = TEAL, width = 640, height = 260, yLabel = '' }) {
  const padL = 52, padR = 14, padT = 18, padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min > 0) min = Math.min(0, min - (max - min) * 0.1);
  min -= (max - min) * 0.08;
  max += (max - min) * 0.08;
  const x = (i) => padL + (innerW * i) / (values.length - 1);
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const ticks = niceTicks(min, max, 4);
  let grid = '';
  for (const t of ticks) {
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmtTick(t))}</text>`;
  }
  const zeroY = min < 0 && max > 0 ? y(0) : null;
  if (zeroY !== null) {
    grid += `<line x1="${padL}" y1="${zeroY}" x2="${width - padR}" y2="${zeroY}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="3 3"/>`;
  }
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  let dots = '';
  let xLabels = '';
  values.forEach((v, i) => {
    const show = i % Math.ceil(values.length / 6) === 0 || i === values.length - 1;
    dots += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${color}"/>`;
    if (show) {
      xLabels += `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(labels[i])}</text>`;
    }
  });
  const first = values[0];
  const last = values[values.length - 1];
  const endLabel = `<text x="${x(values.length - 1)}" y="${y(last) - 10}" text-anchor="end" font-size="12" font-weight="700" fill="${color}">${esc(fmtTick(last))}</text>` +
    `<text x="${x(0)}" y="${y(first) - 10}" text-anchor="start" font-size="12" font-weight="700" fill="${color}">${esc(fmtTick(first))}</text>`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(yLabel)}" class="chart-svg">${grid}` +
    `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>` +
    dots + endLabel + xLabels + `</svg>`;
}

// Vertical bars, one per label, value on top of each bar.
export function barChart({ labels, values, color = TEAL, width = 640, height = 260, yLabel = '' }) {
  const padL = 52, padR = 10, padT = 22, padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const max = Math.max(...values) * 1.12;
  const slot = innerW / values.length;
  const barW = Math.min(46, slot * 0.62);
  const y = (v) => padT + innerH - (v / max) * innerH;
  const ticks = niceTicks(0, max, 4);
  let grid = '';
  for (const t of ticks) {
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmtTick(t))}</text>`;
  }
  let bars = '';
  values.forEach((v, i) => {
    const cx = padL + slot * i + slot / 2;
    bars += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${barW.toFixed(1)}" height="${(padT + innerH - y(v)).toFixed(1)}" rx="3" fill="${color}"/>` +
      `<text x="${cx}" y="${(y(v) - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(fmtTick(v))}</text>` +
      `<text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(labels[i])}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(yLabel)}" class="chart-svg">${grid}${bars}</svg>`;
}

// Horizontal bars, best for ranked lists such as provinces.
export function hbarChart({ rows, valueFmt = (v) => String(v), width = 640, barH = 30, colors = null }) {
  const padL = 150, padR = 64, padT = 8, gap = 8;
  const height = padT + rows.length * (barH + gap) + 8;
  const max = Math.max(...rows.map((r) => r.value)) * 1.05;
  const palette = colors || [TEAL, SAGE, AMBER, SKY, CORAL, '#8a6d3b', '#7a9a8d'];
  let out = '';
  rows.forEach((row, i) => {
    const top = padT + i * (barH + gap);
    const w = ((row.value / max) * (width - padL - padR)).toFixed(1);
    const fill = palette[i % palette.length];
    out += `<text x="${padL - 10}" y="${top + barH / 2 + 4}" text-anchor="end" font-size="12" fill="${INK}">${esc(row.label)}</text>` +
      `<rect x="${padL}" y="${top}" width="${w}" height="${barH}" rx="4" fill="${fill}"/>` +
      `<text x="${padL + Number(w) + 8}" y="${top + barH / 2 + 4}" font-size="12" font-weight="600" fill="${INK}">${esc(valueFmt(row.value))}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart-svg">${out}</svg>`;
}

// Donut with a legend column: name, share %, and absolute value.
export function donutChart({ parts, width = 640, height = 260, valueFmt = (v) => `${v}%` }) {
  const cx = 130, cy = height / 2, r = 92, hole = 58;
  const total = parts.reduce((s, p) => s + p.value, 0);
  const palette = [TEAL, AMBER, CORAL, SAGE, SKY, SAND];
  let angle = -Math.PI / 2;
  let slices = '';
  parts.forEach((part, i) => {
    const frac = part.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + hole * Math.cos(a1), yi1 = cy + hole * Math.sin(a1);
    const xi0 = cx + hole * Math.cos(a0), yi0 = cy + hole * Math.sin(a0);
    slices += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${hole} ${hole} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${palette[i % palette.length]}"/>`;
  });
  let legend = '';
  parts.forEach((part, i) => {
    const top = 34 + i * 34;
    legend += `<rect x="268" y="${top}" width="14" height="14" rx="3" fill="${palette[i % palette.length]}"/>` +
      `<text x="292" y="${top + 12}" font-size="13" fill="${INK}">${esc(part.name)}</text>` +
      `<text x="${width - 12}" y="${top + 12}" text-anchor="end" font-size="13" font-weight="700" fill="${INK}">${esc(valueFmt(part.value))}</text>`;
  });
  const centre = `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="20" font-weight="700" fill="${TEAL}">${esc(parts[0].centre || '')}</text>` +
    `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(parts[0].centreLabel || '')}</text>`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart-svg">${slices}${centre}${legend}</svg>`;
}

// Two series side by side per year (exports vs imports).
export function groupedBarChart({ labels, seriesA, seriesB, labelA, labelB, width = 640, height = 280 }) {
  const padL = 52, padR = 10, padT = 26, padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const max = Math.max(...seriesA, ...seriesB) * 1.12;
  const slot = innerW / labels.length;
  const barW = Math.min(30, slot * 0.3);
  const y = (v) => padT + innerH - (v / max) * innerH;
  const ticks = niceTicks(0, max, 4);
  let grid = '';
  for (const t of ticks) {
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmtTick(t))}</text>`;
  }
  let bars = '';
  labels.forEach((label, i) => {
    const cx = padL + slot * i + slot / 2;
    const a = seriesA[i], b = seriesB[i];
    bars += `<rect x="${(cx - barW - 3).toFixed(1)}" y="${y(a).toFixed(1)}" width="${barW}" height="${(padT + innerH - y(a)).toFixed(1)}" rx="3" fill="${TEAL}"/>` +
      `<rect x="${(cx + 3).toFixed(1)}" y="${y(b).toFixed(1)}" width="${barW}" height="${(padT + innerH - y(b)).toFixed(1)}" rx="3" fill="${AMBER}"/>` +
      `<text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(label)}</text>`;
  });
  const legend = `<rect x="${padL}" y="4" width="12" height="12" rx="2" fill="${TEAL}"/><text x="${padL + 18}" y="14" font-size="12" fill="${INK}">${esc(labelA)}</text>` +
    `<rect x="${padL + 130}" y="4" width="12" height="12" rx="2" fill="${AMBER}"/><text x="${padL + 148}" y="14" font-size="12" fill="${INK}">${esc(labelB)}</text>`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart-svg">${legend}${grid}${bars}</svg>`;
}
