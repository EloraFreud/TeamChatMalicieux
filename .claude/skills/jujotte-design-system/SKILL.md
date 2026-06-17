---
name: jujotte-design-system
description: >
  Skill design system Jujotte — basé sur le template « Catalyst x Jujotte ».
  Noms de tokens, composants et process RÉELS du DS (la file key réelle est dans docs.config.yaml → figmaFileKey, elle change à chaque duplication).
  Lire AVANT toute action Figma via Bridge : génération (make), instanciation/clone de
  composant, application de couleur/typo/spacing, switch de page, ou diagnostic.
---

# Jujotte — Design System (fichier « Catalyst x Jujotte »)

Skill du **design system Jujotte** (la file key réelle est dans `docs.config.yaml` → `figmaFileKey` ; elle change à chaque duplication). Les noms ci-dessous sont
ceux **réellement extraits** dans `bridge-ds/knowledge-base/registries/` — utilisables tels quels
dans un scene graph Bridge. Complète Bridge (compilateur + transport).

**Principe : tokens par nom, jamais par valeur. Aucune valeur hex/px en dur. Le compilateur Bridge résout et bind.**

---

## Projet & accès

| | |
|---|---|
| **Fichier / key** | Définis dans `docs.config.yaml` (`dsName` / `figmaFileKey`) — **changent à chaque duplication**, ne jamais coder en dur ici |
| **Plan Figma** | **Non-Enterprise** → l'API Variables REST renvoie 403. PAT valide ≠ accès variables REST. |
| **Extraction** | **Toujours via le plugin MCP figma-console (WebSocket)** — lit les variables sur tout plan. `extract --headless` échoue (variables 403). |
| **KB** | `bridge-ds/knowledge-base/registries/{variables,components,text-styles,effect-styles,icons,variants}.json` |
| **Librairie publiée ?** | **Non.** → `importComponentByKeyAsync` échoue ⇒ **`createInstance()` sur le composant local** par node-id (voir Process), jamais `.clone()` (copie détachée). |

---

## Commandes (slash-commands réelles `.claude/commands/`)

| Commande | Effet |
|---|---|
| `/new-project [lien]` | Setup nouveau projet (config + extraction plugin) |
| `/fig-key [lien]` | Met à jour `figmaFileKey` dans `docs.config.yaml` |
| `/fig-page [nom]` | Switch la page Figma courante (fuzzy match accents/emojis) |
| `/fig-sync` | Re-extrait la KB via le plugin MCP |
| `/fig-status` | Diagnostic config + connexion + santé KB |

**Commandes Bridge natives** (skills bridge-ds) : `make <description>` (générer) · `fix` (apprendre des corrections Figma) · `done` (shipper + recipe).

---

## Pages

| Page | Usage |
|------|-------|
| `🧸 · Playground` | ⭐ **Défaut** — tout est généré ici sauf `/fig-page` explicite |
| `🔲 · Wireframes` | Wireframes / explorations |
| `💻 · Desktop` · `📱 · Mobile` | Écrans finaux |
| `💠 · Components` | Librairie (lecture / source des clones) |
| `📘 · Foundations` · `⚒️ · Utilities` · `👀 · Moodboard` | Tokens / templates / refs |

---

## Process Bridge — le flow réel

Le compilateur (`bridge-ds compile`) applique les 26 règles API et bind les tokens. **On n'écrit jamais d'API Figma brute pour générer** : on produit un **scene graph JSON** → compile (Gate A) → exécute via `figma_execute` → screenshot (Gate B).

### Pipeline d'exécution (scripts allowlistés — sans prompt)
Pour éviter les prompts bash et les allers-retours, le compile + l'extraction des chunks passent par **un script dédié allowlisté** (`Bash(node bridge-ds/scripts/build.mjs *)`) :

1. Écrire le scene graph dans `/tmp/bridge-scene-<name>.json`.
2. **Compiler (Gate A)** en une étape :
   ```bash
   node bridge-ds/scripts/build.mjs /tmp/bridge-scene-<name>.json
   ```
   Le script résout le plugin dynamiquement, compile, écrit le code de chaque chunk dans `/tmp/bridge-build/<name>.chunk-<i>.js`, et imprime `{ gateA, chunks:[{file,…}] }`. **Si le compile échoue, le script relaie l'erreur et sort exit ≠ 0** → Gate A préservé. Ne **jamais** rappeler `bridge.js compile` à la main (chemin non portable + prompt).
3. **Lire** chaque fichier chunk (outil `Read`, auto-approuvé) puis l'**exécuter** via `figma_execute`.
4. **Screenshot (Gate B)** : utiliser **`figma_capture_screenshot` UNIQUEMENT** (export plugin, reflète l'état runtime). **Ne jamais** appeler `figma_take_screenshot` (REST) : pas de PAT dans ce workflow → 403 systématique, appel perdu.

> Écriture de la KB (`/fig-sync`, `/new-project`) : même logique via `bridge-ds/scripts/sync-registries.mjs` (allowlisté).

### Syntaxe des tokens dans le scene graph
Utiliser **le nom complet** pour un match exact (sinon le scoring flou peut se tromper) :

| Catégorie | Préfixe | Exemple (réel) |
|---|---|---|
| Couleur | `$color/` | `$color/Background/Primary` · `$color/Content/Secondary` · `$color/Primary/500` |
| Spacing | `$spacing/` | `$spacing/Spacing (Margin & Padding)/4` (=16px) |
| Radius | `$radius/` | `$radius/Border Radius/rounded-xl` |
| Text style | `$text/` | `$text/Heading/Large` · `$text/Paragraph/Base` |
| Composant | nœud `CLONE` **patché en `createInstance()`** | `Button` `Table`… → vraie instance liée, voir « Spécificités » ci-dessous |

### ⚠️ Spécificités de CE fichier (librairie non publiée)
- **Composants → vraie INSTANCE via `createInstance()` sur le composant LOCAL.** 🚨 Ne **jamais** utiliser `.clone()` : `node.clone()` sur un COMPONENT crée une **copie détachée** (type `COMPONENT`, **aucun lien au master**) → on perd toute la plus-value DS (pas de propagation, fichier pollué). `importComponentByKeyAsync` (API des librairies **publiées**) échoue aussi ici — mais la bonne réponse n'est pas le clone : c'est `getNodeByIdAsync("<id variante>").createInstance()` → **`INSTANCE` liée** au master de la page Components.
  - **Méthode dans le flow** : écrire le nœud `{"type":"CLONE","sourceNodeId":"<id variante>"}` dans le scene graph (le compilateur émet `getNodeByIdAsync(id).clone()`), puis **PATCHER le chunk compilé** : remplacer `.clone()` par `.createInstance()` pour ces sources (ce sont des COMPONENT). Même principe que le patch text-styles ci-dessous.
  - **Vérifier après build** : chaque composant placé doit être `type === 'INSTANCE'` (pas `COMPONENT`). Pour surcharger un texte/booléen d'instance : `instance.setProperties({...})` (ou éditer le nœud texte interne), pas une copie « à la main ».
- **Text styles → résolution locale.** `importStyleByKeyAsync` échoue (non publié). Patcher le preload compilé : remplacer `figma.importStyleByKeyAsync("KEY")` par un lookup `figma.getLocalTextStylesAsync()` indexé par `key`.
- **Variables → `importVariableByKeyAsync` fonctionne** (tout plan). Rien à patcher.
- **Fonts** : `createText()` démarre en **Inter** → charger `Inter`, `Cal Sans`, `DM Sans` (Regular) dans le preload avant d'écrire `characters`.
- **Root** : le compilateur crée un frame racine **VERTICAL, hauteur AUTO (hug), largeur fixe**. Les `nodes[]` en sont les enfants. Décaler `root.x` pour ne pas chevaucher les designs existants sur Playground.

### Pièges layout (vérifiés)
- `RECTANGLE` exige **`width` ET `height`** littéraux (même avec `fillH`/`fillV`).
- Frame **VERTICAL avec `fillH`** ⇒ mettre `counterAxisSizing: "FIXED"` (sinon les enfants `fillH` s'effondrent à 0).
- `resize(w,h)` sur un frame bascule son axe primaire en `FIXED` → si on voulait un hug, remettre `primaryAxisSizingMode = "AUTO"` après.

### Règles de contenu (à la génération)
- **Toujours remplir les labels.** Une instance qui a un texte ne doit **jamais** garder le défaut du composant (`Label`, `Button text`, `Trigger Text`, `Title`…). Mettre un contenu **réaliste, même provisoire** (ex. bouton → « New report », « Save », « Add event » ; titre → le nom de l'écran). Mieux vaut un placeholder plausible qu'un libellé générique.
- **Comment** : après `createInstance()`, surcharger via `instance.setProperties({ "<Prop#id>": "valeur" })` (props texte du composant) ; sinon, trouver le nœud `TEXT` interne visible, `await figma.loadFontAsync(t.fontName)` puis `t.characters = "…"`.
- **Labels imbriqués dans des sous-instances** (Segmented, TabBar, items de liste, cellules de table…) : ces composants **n'exposent souvent AUCUNE prop texte** (ex. Segmented = seulement `Device`/`Style`). Les libellés sont des nœuds `TEXT` à l'intérieur de sous-instances → les **surcharger directement** (`t.characters = "…"`), ce qui fonctionne comme un override d'instance. ⚠️ Ne pas laisser les « Label » par défaut.
  - **Perf** : charger les **polices uniques UNE seule fois** avant la boucle (un `loadFontAsync` par nœud sur 7+ textes → timeout). Collecter `{family|style}` distincts, `await` chacun une fois, puis écrire tous les `.characters`.
- Idem pour les listes/tables : remplir des lignes plausibles plutôt que laisser le contenu de démo du composant s'il n'a pas de sens dans le contexte.

### Icônes (Phosphor — librairie publiée externe)
Les icônes sont une **librairie publiée** (≠ lib DS locale) ; chaque glyphe est un COMPONENT_SET par graisse (`Weight`). **L'API plugin ne sait PAS énumérer la librairie** → on utilise le registre **`bridge-ds/knowledge-base/registries/icons.json`** (nom → `variantKey`/`setKey`), **sous-ensemble récolté** des glyphes déjà utilisés dans le DS (≈ 32, extensible).
- **Poser / changer une icône** (slot `INSTANCE_SWAP`) :
  ```js
  const g = await figma.importComponentByKeyAsync(ICON.variantKey); // depuis icons.json
  const swapProp = Object.keys(inst.componentProperties).find(k => inst.componentProperties[k].type === 'INSTANCE_SWAP');
  inst.setProperties({ [swapProp]: g.id });
  ```
- **Graisse Regular** : si `weight` du registre n'est pas `Regular`, importer `setKey` (`importComponentSetByKeyAsync`) et prendre l'enfant `Weight=Regular`.
- ⚠️ **Latence** : `importComponentByKeyAsync` sur un composant **distant** est lent via le bridge (peut dépasser 30 s / timeout). → importer chaque glyphe **une seule fois** en début de génération (cache), réutiliser l'`id`, et **réessayer** en cas de timeout.
- **Icône absente du registre** : soit laisser le défaut du composant, soit la **glisser une fois dans le fichier** puis re-récolter `icons.json` (l'API ne permet pas de la récupérer autrement).
- **Souvent inutile** : les composants DS contiennent **déjà** leurs icônes (la Sidebar a House/MagnifyingGlass…). Le swap ne sert qu'à **personnaliser** (ex. icône de Button, onglets Segmented).

### Nettoyage final — backgrounds en dur (Gate B+)
**Pourquoi** : `figma.createFrame()` démarre avec un **fill blanc opaque NON bindé** (`#ffffff` brut). Tout frame généré sans `fill` token (conteneurs de layout : Header, rows, root…) garde ce blanc en dur → viole le principe « aucune valeur en dur ». **Après le build et AVANT le screenshot final**, lancer ce nettoyage (retire les fills SOLID non bindés des frames générés, **sans toucher l'intérieur des instances** DS) :
```js
const cleanUnboundFills = async (rootId) => {
  const root = await figma.getNodeByIdAsync(rootId);
  const toHex = c => '#' + [c.r,c.g,c.b].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('');
  const changed = [];
  const walk = (n) => {
    if (n.type === 'FRAME' && Array.isArray(n.fills)) {
      const unbound = f => f.type === 'SOLID' && !(f.boundVariables && f.boundVariables.color);
      const kept = n.fills.filter(f => !unbound(f));
      if (kept.length !== n.fills.length) {
        changed.push({ name: n.name, id: n.id, removed: n.fills.filter(unbound).map(f => toHex(f.color)) });
        n.fills = kept;
      }
    }
    if (n.type !== 'INSTANCE' && 'children' in n && n.children) n.children.forEach(walk); // ne descend pas dans les instances
  };
  walk(root);
  return changed;
};
return await cleanUnboundFills("<rootId>");
```
> Conserve les fills **bindés** à un token (ex. cartes `Background/Secondary`) et les fills internes des **instances** (affaire du composant). Si un conteneur a vraiment besoin d'un fond, lui donner un **token** (`$color/Background/*`), pas un blanc en dur.

---

## Tokens — référence réelle

> **Méthode « contexte léger » (ne pas charger `variables.json` en entier — 212 Ko).**
> Les familles sémantiques qu'on utilise pour designer (Core, Content, Background, Border, Shadow, Brand, Spacing, Radius, Text styles) sont listées **au complet** ci-dessous. **Tags, Buttons et effets** sont donnés **par motif** (noms dérivables mécaniquement) ; les **primitives** et **Fonts** sont volontairement omis (passer par les sémantiques / `$text/`). Le compilateur valide chaque `$token` (sinon `RESOLVE_TOKEN_NOT_FOUND` + suggestions Levenshtein) → c'est le filet. Donc : écrire le scene graph à partir de cette référence, et **grep ciblé** (`grep "Background/" bridge-ds/knowledge-base/registries/variables.json`) seulement en cas de doute sur un nom précis. Pas besoin de lire tout le fichier.
>
> **Collections (6)** : `Tokens` (sémantiques, modes Light/Dark) · `Colors Brand` (échelle de marque) · `Tailwind Dimensions` (spacing/radius/screens) · `Tailwind Colors (Primitives)` (primitives, à éviter) · `Fonts` + `Fonts Hierarchy` (utiliser plutôt les `$text/` styles).

### Couleurs sémantiques (collection `Tokens`, modes Light/Dark)
- **Core** : `Core/white`, `Core/black`
- **Content** (texte/icônes) : `Primary` `Secondary` `Tertiary` `InversePrimary` `InverseSecondary` `InverseTertiary` · `Brand/Brand` `Brand/Accent` · `Extensions/Error|Warning|Success|Info`
- **Background** : idem Content + `Hover` `HoverOverlay` `InverseHoverOverlay` · `Brand/Brand` `Brand/Accent` · `Extensions/*`
- **Border** : idem Content + `HoverOverlay` `InverseHoverOverlay` · `Brand/*` · `Extensions/*`
- **Components/Tags/** `{Background|Content|Border}/<Couleur>` — 18 couleurs (Zinc, Red, Orange, Amber, Yellow, Lime, Green, Emerald, Teal, Cyan, Sky, Blue, Indigo, Violet, Purple, Fuchsia, Pink, Rose)
- **Components/Buttons/** `{Primary|Secondary|Outline}/{Background|Border}/<État>` (Default/Hover/Pressed/Focus/Disabled)
- **Shadow** : `Shadow/xs` `sm` `md` `lg` `xl` `2xl`

### Échelle de marque (collection `Colors Brand`)
- `Primary/50…950` · `Secondary/50…950` · `Neutral/50…1000`
- Primary = indigo-violet (`Primary/500` ≈ #5E43FF) · Secondary = vert menthe (`Secondary/500` ≈ #01E68C) · Neutral = échelle purple-neutral.
- ⚠️ Préférer les **sémantiques** ci-dessus. La marque sert pour data-viz / accents sans token sémantique.

### Spacing (collection `Tailwind Dimensions`) — px = unité × 4
Tokens `Spacing (Margin & Padding)/<n>` (35) :
`0 · px · 0․5 · 1 · 1․5 · 2 · 2․5 · 3 · 3․5 · 4 · 5 · 6 · 7 · 8 · 9 · 10 · 11 · 12 · 14 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · 52 · 56 · 60 · 64 · 72 · 80 · 96`
Conversion : `/0․5`=2px · `/1`=4px · `/4`=16px · `/6`=24px · `/8`=32px · `/16`=64px · `/24`=96px.

> 🚨 **PIÈGE — les demi-pas utilisent `․` (U+2024 ONE DOT LEADER), PAS un point normal `.` (U+002E).**
> Le vrai nom est `Spacing (Margin & Padding)/0․5`, jamais `/0.5`. Avec un point normal, le match exact échoue (le scoring flou peut taper à côté). En cas de doute, copier le caractère depuis cette ligne ou faire un grep. Concernés : `0․5`, `1․5`, `2․5`, `3․5`.

### Radius (collection `Tailwind Dimensions`)
`Border Radius/` : `rounded-none` `rounded-sm` `rounded` `rounded-md` `rounded-lg` `rounded-xl` `rounded-2xl` `rounded-3xl` `rounded-full`

### Text styles (21) — `$text/<nom>`
| Famille | Styles | Police |
|---|---|---|
| **Display** | Extra Large(128) · Large(96) · Medium(72) · Small(60) · Tiny(48) | Cal Sans |
| **Heading** | Extra Large(36) · Large(30) · Medium(24) · Small(20) · Tiny(16) | Cal Sans |
| **Label** | Large(18) · Base(16) · Small(14) · Tiny(12) | Cal Sans |
| **Paragraph** | Large(18) · Base(16) · Small(14) · Tiny(12) | DM Sans |
| **Subtitle** | Large(24) · Base(20) · Small(16) | DM Sans |

Polices : **Cal Sans** (Display/Heading/Label), **DM Sans** (Paragraph/Subtitle), **Amertha** (Family/Alt, décoratif). Charger aussi **Inter** (défaut de `createText`).

### Effets (registry `effect-styles.json`, 25)
`Box Shadow/shadow-xs…2xl` · `Blur/*` · `Backdrop Blur/*` · `Buttons/focus-*`.

---

## Composants (45 publics) — `name | node-id | props`

**Instancier** par **node-id de la variante voulue** (enfant du set) via `createInstance()` — voir « Spécificités » (jamais `.clone()`, qui détache).

> **Résolution des variantes via `registries/variants.json`** (registre dédié, 66 sets / 562 variantes) : chercher le set par `name`, puis la variante dont `props` correspond (ex. Button `{Type:"Primary",Size:"base",State:"Default","Icon Only":"False"}` → `3858:2616`). **Évite le `figma_execute` live** sur `set.children`. ⚠️ **Stable à la duplication** (Figma préserve les node-ids) → reste valide sur les duplicatas **sans re-sync**, tant que les composants ne sont pas modifiés. Fallback live `set.children` seulement si le set est absent du registre.

**Navigation** — `Navbar` 3870:5447 (Device=Desktop,Mobile) · `Sidebar` 3870:5484 (State=Default) · `Segmented` 3883:5903 (Device · Style) · `TabBar` 3909:7540 · `Pagination` 4022:3493 (Go to)

**Formulaires** — `Button` 3858:2365 (Type=Primary,Secondary,Outline,Plain · Size=sm,base,l,xl · State=Default,Hover,Press,Focus,Disabled · Icon Only) · `Input` 3870:5025 (State=Default,Phone) · `TextArea` 3870:5135 · `ContactForm` 3891:5122 (Device) · `Checkbox` 3867:5296 · `RadioButton` 3867:6402 · `Switch` 105:16797 (Label=Leading,Trailing) · `Dropdown` 105:15773 · `Listbox` 105:19572 · `Select` 105:38223

**Affichage** — `Avatar` 105:9723 (Type=Circular,Rounded · Size=20/24/32/40 · Initials) · `Badge` 105:10747 (Color=18 teintes · State) · `Chips` 3882:6931 · `Accordion` 3892:5599 (State=Open,Default · Mobile) · `Divider` 639:11928 (Type=Default,Soft,Sidebar · Orientation) · `Heading` 639:12248 (Type=Heading,Subheading) · `Text` 228:14602 · `Description list` 3870:4715 · `ImportCard` 3894:9467 · `Sections` 3896:3557 (Image=Left,Right · Device) · `InfosState` 3895:4028 · `Snackbar` 3892:6998 (Severity) · `Dialog` 3870:4668 · `Table` 123:50704 (Type=Basic,Full-width,Striped rows,w/ Avatar,w/ Dropdowns,w/ Grid) · `Sticker Sheet Top` 3867:5156

**Progress / Charts** — `Progression` 3895:3800 (Percent=25/50/75/100%) · `Chart` 3895:3773 (donut, Percent) · `ProgressBar` 3895:3817 (State=Start,End,Not started)

**Foundations** — `icon` 1813:18694 (↳ Size=12…40, Phosphor) · `Logo` 3896:5785 (Type · Theme=Dark,White) · `Flags` 3891:7319 (42 pays, dont **Japan**) · `Partners Logos` 3909:7868 · `Rating Stars` 3909:7799 (Stae=Default,Half,Almost Full,Full) · `Icon RS` 4025:5347 (réseaux) · `Icon OS` 4025:5302 (Apple,Google)

**Mobile iOS** — `TabBar` · `Backdrop` 3909:7401 · `IOSSystemBar` 3909:7683 · `HomeIndicator` 3909:7664 · `Keyboard` 3909:7771 · `Scroll` 3894:9752

> Internes (non publiés, préfixe `.`) : `.baseComponents/.SidebarItem`, `.NavbarItem`, `.TableCells`, `.InputBackplate`, etc. — utilisés à l'intérieur des composants publics.

---

## Nommage des layers
```
PascalCase          → frames & composants  (HeroSection, StatCard)
.baseComponent/.nom → composants internes non publiés
_nom                → WIP / à masquer
```
❌ `Frame 47` · `group copy 2` · `Rectangle 12`

---

## Checklist livraison
- [ ] Couleurs via `$color/Content/*` · `Background/*` · `Border/*` (sémantiques) ; marque `Primary/Secondary/Neutral` seulement pour accents/data-viz
- [ ] Typo via `$text/{Display|Heading|Label|Paragraph|Subtitle}/*`
- [ ] Spacing via `$spacing/Spacing (Margin & Padding)/*` ; radius via `$radius/Border Radius/rounded-*`
- [ ] Tags via `Components/Tags/*` · Buttons via `Components/Buttons/*` · ombres via `Shadow/*`
- [ ] Composants = **vraies INSTANCES** (`createInstance()` sur la variante locale, `.clone()` patché → `.createInstance()`) ; vérifier `type === 'INSTANCE'`, jamais `COMPONENT` détaché
- [ ] Polices chargées (Inter + Cal Sans + DM Sans) avant `characters`
- [ ] **Labels remplis** sur toutes les instances (jamais `Label` / `Button text` par défaut) — `setProperties` ou nœud texte interne
- [ ] **Nettoyage `#ffffff`** : `cleanUnboundFills(rootId)` exécuté avant le screenshot final (aucun fill SOLID non bindé sur les frames générés)
- [ ] Gate A : `compile exit 0` · Gate B : screenshot vérifié dans le tour
- [ ] Bonne page (Playground par défaut), root décalé pour ne pas chevaucher
- [ ] Layers nommés · auto-layout sur tous les frames
