#!/usr/bin/env node
// =============================================================================
// sync-registries.mjs — Écriture + validation de la Knowledge Base Bridge
// =============================================================================
//
// À QUOI ÇA SERT
// Ce script est l'étape « écriture » du /sync (et de l'extraction de
// /new-project). Il NE LIT PAS Figma : c'est le plugin figma-console qui lit
// Figma (via figma_execute) et produit un gros fichier « payload ». Ce script
// prend ce payload et écrit proprement sur le disque les 4 registres de la KB :
//   bridge-ds/knowledge-base/registries/{variables,components,text-styles,effect-styles}.json
// Il ajoute l'enveloppe standard ({ version, generatedAt, source, figmaFileKey })
// puis VALIDE le résultat (chaque entrée a bien une `key`, et la `figmaFileKey`
// est cohérente sur les 4 fichiers). Sortie : un JSON { fileKey, fileName,
// counts, valid } ; le script sort en erreur (exit ≠ 0) si la validation échoue.
//
// LA CHAÎNE COMPLÈTE
//   figma_execute (plugin lit Figma) → payload sauvegardé dans un fichier
//   → CE SCRIPT (écrit + valide les 4 registres) → KB à jour
//
// UTILISATION
//   node bridge-ds/scripts/sync-registries.mjs <fichier-payload>
//   <fichier-payload> = le JSON renvoyé par figma_execute, de forme :
//     { success: true, result: { fileKey, fileName, variables, components,
//       textStyles, effectStyles } }
//
// POURQUOI UN SCRIPT DÉDIÉ (et pas du code « à la volée »)
//   - Il est allowlisté dans .claude/settings.local.json
//     (`Bash(node bridge-ds/scripts/sync-registries.mjs *)`) → s'exécute SANS
//     demander de confirmation, sans ouvrir bash en grand.
//   - Volontairement étroit et relu (pas de code improvisé à chaque run).
//   - Les chemins sont résolus depuis l'emplacement DE CE FICHIER → le dossier
//     courant (cwd) n'a pas d'importance, et le script voyage avec le projet
//     lors d'une duplication.
//   - La `figmaFileKey` est prise DANS le payload (result.fileKey) → toujours
//     cohérente avec le fichier réellement extrait, sans dépendre de docs.config.yaml.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..'); // bridge-ds/scripts -> project root
const REG = path.join(PROJECT_ROOT, 'bridge-ds', 'knowledge-base', 'registries');

const payloadPath = process.argv[2];
if (!payloadPath) {
  console.error('usage: node bridge-ds/scripts/sync-registries.mjs <payload-file>');
  process.exit(1);
}

let env;
try {
  env = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
} catch (e) {
  console.error('cannot read/parse payload:', payloadPath, '-', e.message);
  process.exit(1);
}
if (!env.success || !env.result) {
  console.error('payload is not a successful figma_execute result');
  process.exit(1);
}

const r = env.result;
const KEY = r.fileKey;
if (!KEY) {
  console.error('payload.result.fileKey missing');
  process.exit(1);
}
const now = new Date().toISOString();

const wrap = (arrKey, arr) => ({
  version: 1,
  generatedAt: now,
  source: 'figma-console-mcp',
  figmaFileKey: KEY,
  [arrKey]: arr,
});
const write = (file, arrKey, arr) => {
  if (!Array.isArray(arr)) {
    console.error(`payload.result.${arrKey} is missing or not an array`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(REG, file), JSON.stringify(wrap(arrKey, arr), null, 2) + '\n');
  return arr.length;
};

const counts = {
  variables: write('variables.json', 'variables', r.variables),
  components: write('components.json', 'components', r.components),
  textStyles: write('text-styles.json', 'styles', r.textStyles),
  effectStyles: write('effect-styles.json', 'styles', r.effectStyles),
};

// Validation: every entry keyed + fileKey consistent.
let ok = true;
for (const [file, arrKey] of [
  ['variables.json', 'variables'],
  ['components.json', 'components'],
  ['text-styles.json', 'styles'],
  ['effect-styles.json', 'styles'],
]) {
  const d = JSON.parse(fs.readFileSync(path.join(REG, file), 'utf8'));
  const noKey = d[arrKey].filter((e) => !e.key).length;
  if (noKey || d.figmaFileKey !== KEY) {
    ok = false;
    console.error(`ISSUE ${file} missingKey=${noKey} fileKey=${d.figmaFileKey}`);
  }
}

console.log(
  JSON.stringify({ fileKey: KEY, fileName: r.fileName, counts, valid: ok }, null, 2)
);
process.exit(ok ? 0 : 2);
