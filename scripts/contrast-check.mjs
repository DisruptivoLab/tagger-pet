// Simple checker de contraste WCAG 2.1

function srgbToLinear(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) throw new Error(`Hex inválido: ${hex}`);
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(fg, bg) {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  { label: 'Dark: on-surface-variant (#CAC4D0) on surface-variant (#49454F)', fg: '#CAC4D0', bg: '#49454F' },
  { label: 'Dark: on-background (#E6E1E5) on background (#1C1B1F)', fg: '#E6E1E5', bg: '#1C1B1F' },
  { label: 'Light: on-primary (#FFFFFF) on primary (#6750A4)', fg: '#FFFFFF', bg: '#6750A4' },
  { label: 'Light: on-surface (#1C1B1F) on surface (#FFFBFE)', fg: '#1C1B1F', bg: '#FFFBFE' },
];

for (const p of pairs) {
  const ratio = contrastRatio(p.fg, p.bg);
  console.log(`${p.label}: ${ratio.toFixed(2)}:1`);
}
