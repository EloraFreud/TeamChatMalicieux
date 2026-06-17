---
description: Assemble une section (footer, header…) à partir des composants déjà construits
argument-hint: [NomDeLaSection | lien Figma de la section]
allowed-tools: Bash, Read, Write, Edit, mcp__figma-console__figma_get_status, mcp__figma-console__figma_execute, mcp__figma-console__figma_capture_screenshot
---

Section demandée : **$ARGUMENTS**

Compose une section (footer, header, hero…) à partir des composants **déjà présents** dans la lib.

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-section`**. En résumé :

0. **Cible** : "$ARGUMENTS" peut être un **nom** ou un **lien Figma** de la section (recommandé pour
   être précis). Pour un lien : extrais le node-id de `node-id=` (`1813-17126` → `1813:17126`),
   `getNodeByIdAsync` pour lire la structure réelle de la section, et vérifie que la file key du lien
   == `figmaFileKey` de `docs.config.yaml` (sinon, avertis).
1. **Dépendances** : liste les composants nécessaires. Si l'un manque de `src/components/`,
   **signale et stoppe** (propose de le faire via `/dev-component` d'abord) — ne ré-implémente jamais
   un atome inline.
2. **Compose** `Section.tsx` + story : composants existants + layout via tokens (aucune valeur en dur).
3. **Build + vérif** contre le node de section Figma s'il existe ; sinon, contrôle visuel de cohérence
   (et dis-le).

Si "$ARGUMENTS" est vide → demande le nom. Artefacts en **anglais**.
