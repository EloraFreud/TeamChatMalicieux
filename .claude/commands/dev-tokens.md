---
description: Régénère les tokens (CSS vars + Tailwind) depuis les registries — après chaque /fig-sync
allowed-tools: Bash, Read
---

Régénère les fichiers de tokens du track code depuis les registries. **Déterministe, ne touche
aucun composant.** À lancer après chaque `/fig-sync`.

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-tokens`**. En résumé :

1. `node bridge-ui/scripts/build-tokens.mjs` → écrit `src/styles/tokens.css` (CSS vars Light + Dark),
   `src/tokens/tailwind-tokens.cjs`, `src/tokens/tokens.ts`.
2. Un changement de token Figma se propage ainsi à toute la lib **sans éditer de composant**.
3. **1er run / après un changement de mode** : vérifie le mapping light/dark (le registry stocke les
   valeurs par mode *id*, pas par nom — voir l'en-tête du script ; inverse les indices si le thème
   semble inversé).
4. Échoue franchement si un registry manque ou est vide plutôt que d'émettre un demi-set.

Sortie : compteurs (colors / spacing / radius / fontSize) + les modes détectés.
