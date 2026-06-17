---
description: Met à jour figmaFileKey dans docs.config.yaml depuis un lien Figma
argument-hint: [lien figma]
---

Lien Figma fourni : **$ARGUMENTS**

Met à jour uniquement la `figmaFileKey` du projet.

1. Extrais la file key : le segment entre `/design/` (ou `/file/`) et le `/` suivant dans l'URL.
   - Regex : `figma\.com/(?:design|file)/([a-zA-Z0-9_-]+)`
2. Lis `docs.config.yaml` à la racine du projet.
3. Remplace la valeur de `figmaFileKey` par la key extraite. **Ne touche à rien d'autre.**
4. Affiche l'ancienne et la nouvelle key pour confirmation.

Si aucun lien n'est fourni dans `$ARGUMENTS`, demande-le.
