---
description: Propage Figma → code (registries → tokens → diff → patch ciblé + re-vérif des impactés)
allowed-tools: Bash, Read, Write, Edit, mcp__figma-console__figma_get_status, mcp__figma-console__figma_execute, mcp__figma-console__figma_capture_screenshot
---

Tire les changements du DS Figma dans le code. Contrepartie **pilotée par diff** de `/fig-sync` pour
le track code.

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-sync`** + « drift model » dans
`references/workflow.md`. En résumé :

1. **Re-extrais** les registries depuis Figma (même chemin plugin que `/fig-sync`).
2. **Diff** vs les registries committés précédents → classe : composants **nouveaux**, variants/props
   **changés**, **orphelins** (présents en code, disparus de Figma).
3. **`/dev-tokens`** — les changements de tokens se propagent tout seuls (aucun travail composant).
4. **Patche uniquement les composants/stories impactés** (passe ciblée, pas un rebuild de toute la lib).
5. **Vérifie** l'ensemble impacté contre Figma. **Signale** les orphelins pour décision humaine — ne
   supprime jamais de code automatiquement.

> **Prérequis** : il faut un « avant » pour differ → committe les registries en git (le projet devrait
> être un repo pour le travail à 2), sinon `/dev-sync` retombe sur une re-vérif complète. Dis-le si
> aucune baseline n'est dispo.

Sortie : le changelog (`new` / `changed` / `orphan`) + fichiers patchés + vérif des impactés.
