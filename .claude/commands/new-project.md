---
description: Setup d'un nouveau projet Jujotte depuis le template dupliqué
argument-hint: [lien figma]
allowed-tools: Bash, mcp__figma-console__figma_get_status, mcp__figma-console__figma_execute
---

Lien Figma du nouveau projet : **$ARGUMENTS**

Initialise un nouveau projet Jujotte à partir du template dupliqué. Suis le skill `jujotte-design-system` pour les conventions.

1. **Key** — extrais la file key (`figma\.com/(?:design|file)/([a-zA-Z0-9_-]+)`). Si absente de `$ARGUMENTS`, demande-la.
2. **Config** — mets à jour `docs.config.yaml` :
   - `figmaFileKey` = la key extraite,
   - `dsName` = nom du fichier Figma (déduis-le via `figma_get_status` → `currentFileName`, ou demande-le).
3. **Reset des specs héritées du template** — un duplicata traîne le `specs/active/` et le `history.log` du template. Ces artefacts tracent le travail du template (pas ce projet) et leurs snapshots pointent vers des node-ids du fichier d'origine, donc **invalides** après duplication. **Supprime-les définitivement** (n'affecte jamais Figma ni les registries) :
   ```bash
   rm -f specs/active/* specs/active/.DS_Store 2>/dev/null
   mkdir -p specs/active
   : > specs/history.log
   echo "specs/active vidé · history.log réinitialisé"
   ```
   > Frontière nette : ce reset ne concerne QUE le traçage de travail (`specs/`). Il ne touche ni le Design System (`bridge-ds/.../registries/`, étape 4) ni le fichier Figma.
4. **Extraction** — re-extrais les registries comme `/fig-sync` (headless si PAT valide, sinon fallback plugin MCP). L'écriture + validation passe par le script allowlisté `node bridge-ds/scripts/sync-registries.mjs "<payload>"` (pas de prompt bash).
5. **Confirmation** — affiche : `dsName`, `figmaFileKey`, le reset specs effectué (fichiers supprimés), et les pages détectées (`figma_get_status` / `loadAllPagesAsync`).
6. Rappelle la page de travail par défaut : `🧸 · Playground`.

> Note : dans un projet où le PAT est expiré / le plan n'est pas Enterprise, l'extraction passe obligatoirement par le plugin MCP (WebSocket), pas par `--headless`.
>
> Note : `/fig-sync` reste **strictement focalisé sur les registries** — il ne lit ni ne modifie jamais `specs/active/`. La suppression ciblée d'un design se fait explicitement via `drop` / `done`, jamais en effet de bord d'une synchro.
