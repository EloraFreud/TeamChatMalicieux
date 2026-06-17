---
description: Re-extrait composants/variables/text styles depuis Figma vers la KB
allowed-tools: Bash, mcp__figma-console__figma_get_status, mcp__figma-console__figma_execute
---

Re-synchronise la knowledge base Bridge (`bridge-ds/knowledge-base/registries/`).
**Ne pas toucher à Figma pendant l'exécution.**

### 1. Chemin headless (préféré si PAT valide)
```bash
BRIDGE_DIR="$(ls -d "$HOME"/.claude/plugins/cache/*/bridge-ds/*/ 2>/dev/null | sort -V | tail -1)"
[ -z "$BRIDGE_DIR" ] && echo "⚠️ plugin bridge-ds introuvable" || node "${BRIDGE_DIR}bin/bridge.js" extract --headless 2>&1 || true
```
Nécessite `FIGMA_TOKEN` valide **et** un plan Enterprise pour l'API Variables REST.
> Le chemin du plugin est résolu dynamiquement (version la plus récente du cache) — pas de version figée.

### 2. Fallback plugin MCP (si 401 PAT expiré, ou 403 variables plan-gated)
1. `figma_get_status` — connexion OK ? sinon demander de relancer le Desktop Bridge.
2. Via `figma_execute`, extraire en **un seul objet** `{ fileKey, fileName, variables, components, textStyles, effectStyles }` (chemin éprouvé sur ce projet) :
   - **variables** : `figma.variables.getLocalVariablesAsync()` (+ collections) → `{ key, name, id, collection, resolvedType, valuesByMode, scopes }`
   - **composants** : `figma.root.findAllWithCriteria({types:['COMPONENT_SET','COMPONENT']})`, en **excluant les COMPONENT enfants d'un COMPONENT_SET** → `{ name, key, id, type, variants, page, category, properties, description }`
   - **text styles** : `figma.getLocalTextStylesAsync()` → `{ key, name, fontFamily, fontStyle, fontSize, lineHeight }`
   - **effect styles** : `figma.getLocalEffectStylesAsync()` → `{ key, name, effects }`
   > Le résultat est volumineux (~170 Ko) → l'outil le **sauvegarde automatiquement dans un fichier** tool-results. Note son chemin.
3. **Écrire + valider via le script dédié** (allowlisté, ne déclenche pas de prompt bash) — depuis la racine du projet :
   ```bash
   node bridge-ds/scripts/sync-registries.mjs "<chemin-du-payload-tool-results>"
   ```
   Le script écrit les 4 registries (`{variables,components,text-styles,effect-styles}.json`, envelope `{ version:1, generatedAt, source, figmaFileKey, ... }`), prend la `figmaFileKey` depuis le payload (`result.fileKey`), puis valide (chaque entrée a un `key`, `figmaFileKey` cohérent). Sortie JSON `{ fileKey, fileName, counts, valid }` ; exit ≠ 0 si invalide.

### 3. Rapport
Affiche les compteurs par registry (variables / composants / text styles) avant→après.
