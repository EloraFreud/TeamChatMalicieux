#!/usr/bin/env node
// =============================================================================
// build-tokens.mjs — Figma registries → CSS variables + Tailwind tokens
// =============================================================================
//
// WHAT IT DOES
//   Reads the extracted Bridge registries and regenerates the design-token files
//   the React library consumes. It does NOT read Figma — `/fig-sync` does that.
//   Re-run it after every `/fig-sync` of the Figma file.
//
//   Inputs  : <project>/bridge-ds/knowledge-base/registries/{variables,text-styles}.json
//   Outputs : <project>/bridge-ui/src/styles/tokens.css        (CSS vars, light + dark)
//             <project>/bridge-ui/src/tokens/tailwind-tokens.cjs
//             <project>/bridge-ui/src/tokens/tokens.ts
//
//   Tailwind then consumes the tokens, e.g. `bg-background-primary`,
//   `text-content-primary`, `rounded-sm`, `text-label-base`.
//
// STARTER NOTE — this script is intentionally readable and meant to be tuned to
//   your file. The one fragile spot is the LIGHT/DARK mode mapping: the registry
//   stores values by mode *id*, not by name, so we assume the two modes are
//   [light, dark] in encounter order. If your dark theme looks like the light one
//   (or vice-versa), flip LIGHT_INDEX / DARK_INDEX below.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// scripts/ lives at bridge-ui/scripts → up one = bridge-ui, up two = project root
const UI_ROOT = path.resolve(__dirname, '..');
const PROJECT_ROOT = path.resolve(UI_ROOT, '..');
const REG = path.join(PROJECT_ROOT, 'bridge-ds', 'knowledge-base', 'registries');

// ---- mode mapping (verify on first run) -------------------------------------
const LIGHT_INDEX = 0;
const DARK_INDEX = 1;

// ---- load registries --------------------------------------------------------
const readReg = (file, key) => {
  const p = path.join(REG, file);
  if (!fs.existsSync(p)) {
    console.error(`missing registry: ${p} — run /fig-sync first`);
    process.exit(1);
  }
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  const arr = d[key];
  if (!Array.isArray(arr) || arr.length === 0) {
    console.error(`registry ${file} has no "${key}" entries — run /fig-sync`);
    process.exit(1);
  }
  return arr;
};

const variables = readReg('variables.json', 'variables');
const textStyles = readReg('text-styles.json', 'styles');
// effect styles are optional — absence shouldn't fail the token build.
const effectStyles = (() => {
  const p = path.join(REG, 'effect-styles.json');
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8')).styles || [];
  } catch {
    return [];
  }
})();
const byId = new Map(variables.map((v) => [v.id, v]));

// ---- helpers ----------------------------------------------------------------
// kebab a token path: "Background/Primary" -> "background-primary",
// "Components/Buttons/Primary/Background/Default" -> "components-buttons-primary-background-default"
const slug = (name) =>
  name
    .replace(/[()&]/g, ' ')
    .replace(/[\/\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

const toCss = (c) => {
  if (!c || typeof c !== 'object') return null;
  const r = Math.round((c.r ?? 0) * 255);
  const g = Math.round((c.g ?? 0) * 255);
  const b = Math.round((c.b ?? 0) * 255);
  const a = c.a ?? 1;
  if (a >= 1) {
    const h = (n) => n.toString(16).padStart(2, '0');
    return `#${h(r)}${h(g)}${h(b)}`;
  }
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})`;
};

// resolve a color value for a given modeId, following VARIABLE_ALIAS chains.
const resolveColor = (value, modeId, depth = 0) => {
  if (depth > 10 || value == null) return null;
  if (value && value.type === 'VARIABLE_ALIAS') {
    const target = byId.get(value.id);
    if (!target) return null;
    const modes = Object.keys(target.valuesByMode || {});
    const useMode = target.valuesByMode?.[modeId] !== undefined ? modeId : modes[0];
    return resolveColor(target.valuesByMode?.[useMode], useMode, depth + 1);
  }
  return toCss(value);
};

// resolve a float (spacing/radius), following aliases.
const resolveFloat = (value, modeId, depth = 0) => {
  if (depth > 10 || value == null) return null;
  if (value && value.type === 'VARIABLE_ALIAS') {
    const target = byId.get(value.id);
    if (!target) return null;
    const modes = Object.keys(target.valuesByMode || {});
    const useMode = target.valuesByMode?.[modeId] !== undefined ? modeId : modes[0];
    return resolveFloat(target.valuesByMode?.[useMode], useMode, depth + 1);
  }
  return typeof value === 'number' ? value : null;
};

const setNested = (obj, pathParts, val) => {
  let o = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const k = pathParts[i];
    o[k] = o[k] || {};
    o = o[k];
  }
  o[pathParts[pathParts.length - 1]] = val;
};

// ---- colors (semantic "Tokens" collection, light + dark) --------------------
const colorVars = variables.filter(
  (v) => v.resolvedType === 'COLOR' && v.collection === 'Tokens'
);

// discover the two mode ids from the first multi-mode color variable
let modeIds = [];
for (const v of colorVars) {
  const m = Object.keys(v.valuesByMode || {});
  if (m.length >= 2) {
    modeIds = m;
    break;
  }
}
if (modeIds.length < 2) {
  // single-mode file: light only
  modeIds = colorVars.length ? Object.keys(colorVars[0].valuesByMode || {}) : [];
}
const lightMode = modeIds[LIGHT_INDEX] ?? modeIds[0];
const darkMode = modeIds[DARK_INDEX] ?? modeIds[0];

const cssLight = [];
const cssDark = [];
const twColors = {};

for (const v of colorVars) {
  const cssName = `--${slug(v.name)}`;
  const lv = resolveColor(v.valuesByMode?.[lightMode], lightMode);
  const dv = resolveColor(v.valuesByMode?.[darkMode], darkMode);
  if (lv) cssLight.push(`  ${cssName}: ${lv};`);
  if (dv && darkMode !== lightMode) cssDark.push(`  ${cssName}: ${dv};`);
  setNested(twColors, slug(v.name).split('-'), `var(${cssName})`);
}

// ---- spacing & radius (Tailwind Dimensions) ---------------------------------
const dimVars = variables.filter(
  (v) => v.resolvedType === 'FLOAT' && v.collection === 'Tailwind Dimensions'
);
const twSpacing = {};
const twRadius = {};
for (const v of dimVars) {
  const firstMode = Object.keys(v.valuesByMode || {})[0];
  const px = resolveFloat(v.valuesByMode?.[firstMode], firstMode);
  if (px == null) continue;
  // normalize U+2024 (one-dot leader) half-steps to a normal dot
  const leaf = v.name.split('/').pop().replace(/․/g, '.');
  if (/^Spacing/i.test(v.name)) twSpacing[leaf] = `${px}px`;
  else if (/Border Radius/i.test(v.name)) {
    // "rounded-sm" -> "sm", "rounded" -> "DEFAULT", "rounded-full" -> "full"
    const key = leaf === 'rounded' ? 'DEFAULT' : leaf.replace(/^rounded-?/, '') || 'DEFAULT';
    twRadius[key] = px === 9999 ? '9999px' : `${px}px`;
  }
}

// ---- type (text styles) -----------------------------------------------------
const twFontSize = {};
for (const s of textStyles) {
  const key = slug(s.name); // "Label/Base" -> "label-base"
  const size = `${s.fontSize}px`;
  let lh;
  if (s.lineHeight && typeof s.lineHeight === 'object' && s.lineHeight.unit === 'PIXELS') {
    lh = `${s.lineHeight.value}px`;
  } else if (s.lineHeight && s.lineHeight.unit === 'PERCENT') {
    lh = `${Math.round((s.lineHeight.value / 100) * s.fontSize)}px`;
  }
  twFontSize[key] = lh ? [size, { lineHeight: lh }] : [size];
}

// ---- effects -> boxShadow ---------------------------------------------------
// DROP_SHADOW / INNER_SHADOW become CSS box-shadow tokens. Blur/Backdrop-blur are
// filters, not box-shadow, so they're skipped here.
const rgba = (c) => {
  const r = Math.round((c.r ?? 0) * 255);
  const g = Math.round((c.g ?? 0) * 255);
  const b = Math.round((c.b ?? 0) * 255);
  const a = c.a ?? 1;
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})`;
};
const shadowCss = (effects) => {
  const parts = [];
  for (const e of effects || []) {
    if (e.visible === false) continue;
    if (e.type !== 'DROP_SHADOW' && e.type !== 'INNER_SHADOW') continue;
    const inset = e.type === 'INNER_SHADOW' ? 'inset ' : '';
    const x = e.offset?.x ?? 0;
    const y = e.offset?.y ?? 0;
    parts.push(`${inset}${x}px ${y}px ${e.radius ?? 0}px ${e.spread ?? 0}px ${rgba(e.color || { r: 0, g: 0, b: 0, a: 0 })}`);
  }
  return parts.length ? parts.join(', ') : null;
};
const twShadow = {};
for (const s of effectStyles) {
  const css = shadowCss(s.effects);
  if (css) twShadow[slug(s.name)] = css;
}

// ---- emit -------------------------------------------------------------------
const stylesDir = path.join(UI_ROOT, 'src', 'styles');
const tokensDir = path.join(UI_ROOT, 'src', 'tokens');
fs.mkdirSync(stylesDir, { recursive: true });
fs.mkdirSync(tokensDir, { recursive: true });

const banner = '/* GENERATED by build-tokens.mjs — do not edit by hand. Re-run after /fig-sync. */';

const css =
  `${banner}\n:root {\n${cssLight.join('\n')}\n}\n\n` +
  (cssDark.length ? `[data-theme="dark"] {\n${cssDark.join('\n')}\n}\n` : '');
fs.writeFileSync(path.join(stylesDir, 'tokens.css'), css);

const theme = {
  colors: twColors,
  spacing: twSpacing,
  borderRadius: twRadius,
  fontSize: twFontSize,
  boxShadow: twShadow,
};
fs.writeFileSync(
  path.join(tokensDir, 'tailwind-tokens.cjs'),
  `${banner}\nmodule.exports = ${JSON.stringify(theme, null, 2)};\n`
);
fs.writeFileSync(
  path.join(tokensDir, 'tokens.ts'),
  `${banner}\nexport const tokens = ${JSON.stringify(theme, null, 2)} as const;\n`
);

console.log(
  JSON.stringify(
    {
      ok: true,
      modes: { lightMode, darkMode, inverted_hint: 'flip LIGHT_INDEX/DARK_INDEX if theme looks wrong' },
      counts: {
        colors: colorVars.length,
        spacing: Object.keys(twSpacing).length,
        radius: Object.keys(twRadius).length,
        fontSize: Object.keys(twFontSize).length,
        boxShadow: Object.keys(twShadow).length,
      },
    },
    null,
    2
  )
);
