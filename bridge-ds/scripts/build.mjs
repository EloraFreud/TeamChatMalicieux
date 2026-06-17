#!/usr/bin/env node
// =============================================================================
// build.mjs — Compilation d'un scene graph Bridge (Gate A) en une seule étape
// =============================================================================
//
// À QUOI ÇA SERT
// Quand on génère un design (« make »), on produit d'abord un « scene graph »
// (un JSON décrivant les frames, composants, tokens). Ce script prend ce JSON,
// le COMPILE via le compilateur Bridge (qui applique les 26 règles de l'API
// Figma et résout les tokens), et écrit le code généré de chaque « chunk »
// dans des fichiers prêts à exécuter (`/tmp/bridge-build/<nom>.chunk-<i>.js`).
// Il regroupe en UNE commande ce qui demandait avant deux commandes bash
// séparées (compile, puis extraction du code) → plus rapide, sans prompt.
//
// GATE A PRÉSERVÉ
// Si la compilation échoue (token introuvable, règle violée…), l'erreur du
// compilateur est relayée telle quelle et le script sort en erreur (exit ≠ 0).
// Aucune validation n'est court-circuitée : un design qui ne compile pas ne
// produit aucun chunk exécutable.
//
// ENSUITE (côté agent)
//   1) lire chaque fichier `file` listé dans la sortie (outil Read)
//   2) l'exécuter dans Figma via figma_execute
//   3) screenshot de vérification via figma_capture_screenshot (Gate B)
//
// UTILISATION
//   node bridge-ds/scripts/build.mjs <scene.json> [transport]
//   transport = "console" par défaut (ce projet n'utilise jamais REST/official,
//   faute de PAT). Sortie en cas de succès :
//     { gateA: "pass", transport, kb, chunks: [{ index, id, description,
//       codeLen, file }] }
//
// POURQUOI UN SCRIPT DÉDIÉ
//   - Allowlisté (`Bash(node bridge-ds/scripts/build.mjs *)`) → s'exécute SANS
//     confirmation, sans ouvrir bash en grand.
//   - Résout le plugin bridge-ds DYNAMIQUEMENT (dernière version du cache) →
//     survit aux mises à jour du plugin et aux duplications (aucun chemin figé).
//   - Résout le chemin de la KB depuis l'emplacement DE CE FICHIER → le dossier
//     courant (cwd) n'a pas d'importance.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..'); // bridge-ds/scripts -> project root
const KB = path.join(PROJECT_ROOT, 'bridge-ds');

const sceneArg = process.argv[2];
const transport = process.argv[3] || 'console';
if (!sceneArg) {
  console.error('usage: node bridge-ds/scripts/build.mjs <scene.json> [transport]');
  process.exit(1);
}
const scene = path.resolve(sceneArg);
if (!fs.existsSync(scene)) {
  console.error('scene graph introuvable:', scene);
  process.exit(1);
}

// --- Resolve the plugin's bridge.js (latest version across marketplaces) ---
function resolveBridgeBin() {
  const cacheRoot = path.join(os.homedir(), '.claude', 'plugins', 'cache');
  if (!fs.existsSync(cacheRoot)) return null;
  const found = [];
  for (const marketplace of fs.readdirSync(cacheRoot)) {
    const bdir = path.join(cacheRoot, marketplace, 'bridge-ds');
    if (!fs.existsSync(bdir)) continue;
    for (const ver of fs.readdirSync(bdir)) {
      const bin = path.join(bdir, ver, 'bin', 'bridge.js');
      if (fs.existsSync(bin)) found.push({ ver, bin });
    }
  }
  if (!found.length) return null;
  found.sort((a, b) => a.ver.localeCompare(b.ver, undefined, { numeric: true }));
  return found[found.length - 1].bin;
}

const bridgeBin = resolveBridgeBin();
if (!bridgeBin) {
  console.error('plugin bridge-ds introuvable dans ~/.claude/plugins/cache/*/bridge-ds/*/bin/bridge.js');
  process.exit(1);
}

// --- Gate A: compile (stderr relayed live; stdout captured as chunk JSON) ---
let stdout;
try {
  stdout = execFileSync(
    'node',
    [bridgeBin, 'compile', '--input', scene, '--kb', KB, '--transport', transport],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], maxBuffer: 64 * 1024 * 1024 }
  );
} catch (e) {
  console.error(`\nGate A FAILED — compile a renvoyé exit ${e.status ?? '?'} (voir erreurs ci-dessus)`);
  process.exit(e.status || 1);
}

let chunks;
try {
  chunks = JSON.parse(stdout);
} catch (e) {
  console.error('sortie du compilateur non-JSON:', e.message);
  process.exit(1);
}
if (!Array.isArray(chunks) || chunks.length === 0) {
  console.error('Gate A FAILED — aucun chunk produit');
  process.exit(2);
}

// --- Write each chunk's code to a predictable file ---
const outDir = path.join(os.tmpdir(), 'bridge-build');
fs.mkdirSync(outDir, { recursive: true });
const base = path.basename(scene).replace(/\.json$/i, '');
const manifest = chunks.map((c, i) => {
  const file = path.join(outDir, `${base}.chunk-${i}.js`);
  fs.writeFileSync(file, c.code);
  return { index: i, id: c.id, description: c.description, codeLen: c.code.length, file };
});

console.log(JSON.stringify({ gateA: 'pass', transport, kb: KB, chunks: manifest }, null, 2));
