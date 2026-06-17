---
description: Santé du track code + coverage (faits / manquants / orphelins / drift)
allowed-tools: Bash, Read
---

Diagnostic d'un coup d'œil du track **code** (miroir de `/fig-status`, ✅/⚠️ par ligne).

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-status`**. Affiche :

1. **Tokens à jour ?** Compare le `generatedAt` des registries au mtime des fichiers de tokens —
   périmé ⇒ « lance `/dev-tokens` ».
2. **Coverage** : tableau composants Figma (registry) vs composants React de `src/components/` →
   **done / missing / orphan**. C'est le tableau d'avancement et la vue d'onboarding d'un collègue.
3. **Flags de drift** en attente du dernier `/dev-sync`/vérif.
4. **Santé build** : `npm run typecheck` + smoke-check d'un build Storybook passent ?

Présente un résumé en tableau (✅/⚠️ par ligne).
