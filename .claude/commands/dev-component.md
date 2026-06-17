---
description: Code un composant DS Figma en React (.tsx + story), vérifié contre Figma
argument-hint: [NomDuComposant | lien Figma du composant]
allowed-tools: Bash, Read, Write, Edit, mcp__figma-console__figma_get_status, mcp__figma-console__figma_execute, mcp__figma-console__figma_capture_screenshot, mcp__figma-console__figma_search_components
---

Composant demandé : **$ARGUMENTS**

Transforme un composant DS en `Component.tsx` + `Component.stories.tsx` + `index.ts`, tokenisé et
**vérifié visuellement** contre Figma.

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-component`** (recette de vérif dans
`references/workflow.md`). En résumé :

1. **Résous la cible** — "$ARGUMENTS" peut être :
   - un **nom** → lookup dans `components.json` / `variants.json` (⚠️ ambigu si noms en double) ;
   - un **lien Figma** (recommandé pour être précis) → extrais le node-id de `node-id=` (`1813-17126`
     → `1813:17126`), `getNodeByIdAsync`, puis remonte au set / variante et mappe sur le registry.
     Vérifie au passage que la file key du lien == `figmaFileKey` de `docs.config.yaml` (sinon, avertis).
   → axes de variants, props, node-id du master. Les node-ids sont éphémères en session : pars du lien
   ou re-cherche dans le registry, ne réutilise jamais un id d'une session précédente.
2. **Vois-le** : `figma_capture_screenshot` sur le node (export plugin — jamais `figma_take_screenshot`
   REST, pas de PAT ici). Le rendu Figma est la cible.
3. **Code-le** : props typées depuis les variants ; **classes Tailwind/tokens uniquement** (aucune
   valeur en dur) ; compose avec `cn()`.
4. **Story** : une story par variant du registry + contrôles.
5. **Build + vérif (le gate)** : typecheck, puis screenshot de la story vs node Figma, itère ~3×.
   Un composant est fait quand le rendu ≈ Figma, pas quand il compile. Montre les 2 screenshots.
6. **Exporte** depuis `src/index.ts`.

Si "$ARGUMENTS" est vide → demande le nom. S'il dépend d'un sous-composant non construit → **signale**
plutôt que d'inliner un one-off.
