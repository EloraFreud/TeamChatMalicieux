---
description: Diagnostic Bridge — config, connexion plugin, santé de la KB
allowed-tools: Bash, mcp__figma-console__figma_get_status
---

Diagnostic complet du projet (équivalent `bridge-ds doctor`).

1. **Config** — lis `docs.config.yaml` : affiche `dsName`, `figmaFileKey`, `kbPath`.
2. **Connexion** — `figma_get_status` (probe:true). Reporte le transport actif + la page courante. Si KO, donne les étapes de reconnexion.
3. **KB** — charge les registries et affiche les compteurs + toute erreur de schéma (chemin du plugin résolu dynamiquement, sans version figée) :
   ```bash
   BRIDGE_DIR="$(ls -d "$HOME"/.claude/plugins/cache/*/bridge-ds/*/ 2>/dev/null | sort -V | tail -1)"
   [ -z "$BRIDGE_DIR" ] && echo "⚠️ plugin bridge-ds introuvable dans le cache" || \
     node -e "const {loadRegistry}=require(process.argv[1]+'dist/lib/compiler/registry.js'); const r=loadRegistry('bridge-ds'); console.log('variables',r.variables.byName.size,'| components',r.components.byName.size,'| textStyles',r.textStyles?r.textStyles.byName.size:0);" "$BRIDGE_DIR"
   ```
4. **PAT** — indique si `FIGMA_TOKEN` est défini (`[ -n \"$FIGMA_TOKEN\" ] && echo set || echo absent`) **sans jamais l'afficher**.

Présente un résumé en tableau (✅/⚠️ par ligne).
