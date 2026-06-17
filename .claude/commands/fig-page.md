---
description: Switch la page Figma courante (fuzzy match) avant de générer
argument-hint: [nom de page]
allowed-tools: mcp__figma-console__figma_get_status, mcp__figma-console__figma_execute
---

Page demandée : **$ARGUMENTS**

Switch la page Figma courante via le plugin (MCP figma-console), à faire **avant** toute génération.

1. `figma_get_status` (probe) pour vérifier la connexion. Si `transport: none`, demande de relancer le Desktop Bridge plugin dans Figma.
2. Charge les pages :
   ```js
   await figma.loadAllPagesAsync();
   return figma.root.children.map(p => p.name);
   ```
3. Fuzzy match insensible à la casse **et aux accents/emojis** sur "$ARGUMENTS" :
   - normalise (minuscules, retire accents + emojis) côté noms de pages ET requête, puis `includes`.
   - **1 match** → `await figma.setCurrentPageAsync(page)` puis confirme le nom complet de la page.
   - **plusieurs** → liste-les et demande de préciser.
   - **aucun** → liste toutes les pages disponibles.

Pages connues (réf. skill `jujotte-design-system`) : `🧸 · Playground` (défaut), `🔲 · Wireframes`, `💻 · Desktop`, `📱 · Mobile`, `💠 · Components`, `📘 · Foundations`, `⚒️ · Utilities`, `👀 · Moodboard`.
