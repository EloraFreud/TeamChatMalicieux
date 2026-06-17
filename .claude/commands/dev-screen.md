---
description: Assemble une page à partir des sections/composants (placeholder + rapport si manque)
argument-hint: [NomDeLaPage | lien Figma de la page] [--motion]
allowed-tools: Bash, Read, Write, Edit, mcp__figma-console__figma_get_status, mcp__figma-console__figma_execute, mcp__figma-console__figma_capture_screenshot
---

Page demandée : **$ARGUMENTS**

Assemble une page complète à partir des sections et composants — **y compris des pages qui
n'existent pas encore dans Figma**. Objectif : utiliser tes composants au maximum.

**Cible** : "$ARGUMENTS" peut être un **nom** (page inventée, décrite par toi → **pas de réf Figma**,
donc pas de vérif visuelle au niveau page) ou un **lien Figma** d'une page existante à reproduire.
Pour un lien : extrais le node-id de `node-id=` (`1813-17126` → `1813:17126`), `getNodeByIdAsync`
pour lire la maquette, vérifie la file key vs `docs.config.yaml`, et **vérifie alors la page contre ce
node** (la réf existe). Le `--motion` et le reste sont en fin d'argument.

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-screen`** + le contrat placeholder dans
`references/workflow.md`. Comportement par défaut (**option B**) quand un composant/section manque :

1. Assemble la page avec **tout ce qui est dispo**.
2. Pour chaque zone non couverte → un **`<Placeholder>` clairement étiqueté** (visuellement évident)
   + une entrée dans la **liste « composants manquants »**. Jamais de ré-implémentation silencieuse.
3. **Rapport** : la page assemblée + la liste des manquants (→ `/dev-component` / `/dev-section`, puis
   relancer).

⚠️ Une page **inventée** n'a **pas de référence Figma** → pas de vérif visuelle au niveau page (seuls
les composants réutilisés ont été vérifiés à leur création). Dis-le clairement.

`--motion` : ajoute des animations GSAP **après** que la page statique soit validée (couche bonus,
jamais un substitut au match des composants). Si "$ARGUMENTS" est vide → demande le nom.
