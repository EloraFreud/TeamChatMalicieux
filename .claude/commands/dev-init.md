---
description: Scaffolde la librairie React + Storybook (bridge-ui/) depuis les registries
allowed-tools: Bash, Read, Write, Edit, mcp__figma-console__figma_get_status
---

Initialise le track **code** du design system : crée `bridge-ui/` (lib Vite + Storybook 8 +
pipeline de tokens) à côté de `bridge-ds/`.

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-init`** (et `references/workflow.md`
pour le détail git/fonts). En résumé :

1. **Pré-vol** : les registries doivent exister (`bridge-ds/.../registries/`). Sinon → « lance
   `/fig-sync` d'abord ». Si `bridge-ui/` existe déjà, **ne rien écraser** — signale et stoppe.
2. **Scaffold** la structure (package.json, vite.config.ts ESM+CJS+dts, `.storybook/` avec toolbar
   light/dark, tailwind.config.cjs branché tokens, `src/lib/cn.ts`, `src/index.ts`, globals.css).
3. **Fonts** : lis les familles réelles dans `text-styles.json` (ne pas supposer Cal Sans/DM Sans —
   ça change par fichier). Câble `@font-face`/`@fontsource` ; fallback + TODO pour une police licenciée.
4. **Copie** `scripts/build-tokens.mjs` (depuis le skill) dans `bridge-ui/scripts/`.
5. Génère les tokens une fois (`/dev-tokens`) et confirme que Storybook démarre (`npm run dev`).

Artefacts en **anglais**. Sortie : l'arbo créée + l'étape suivante (`/dev-component <Name>`).
