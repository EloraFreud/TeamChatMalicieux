---
name: jujotte-figma-to-code
description: >
  Jujotte Figma → code track. Turns the Bridge/Jujotte Figma design system into a
  versioned React + Storybook component library (`bridge-ui/`), driven by the extracted
  registries. Use this skill whenever the user wants to scaffold the React/Storybook
  project, code a DS component or section in React from Figma, assemble a page/homepage
  from those components, regenerate design tokens after a `/fig-sync`, propagate Figma changes
  into the code, or check coverage/health of the code library — including the `/dev-init`,
  `/dev-tokens`, `/dev-component`, `/dev-section`, `/dev-screen`, `/dev-sync`, `/dev-status`
  commands, and any "build the design system in React", "create a storybook", "code this
  component from Figma", "make a homepage from my components", or "design-to-code" request.
  This is the code-side companion to Bridge's Figma-side `make`/`done` flow — they meet only
  at the registries. This skill NEVER writes to Figma.
---

# Jujotte — Figma → Code (React + Storybook)

The **code-side** track of the Jujotte design system. Bridge generates *into* Figma
(scene graph → compiler → Figma). This skill goes the other way: **Figma is the source
of truth → it becomes a React + Storybook component library** under `bridge-ui/`, so the
team can build real product pages from reviewed, tokenized components.

> Conversation in the user's language. **All artifacts (code, stories, configs, docs,
> this skill's outputs) are English-only** — Bridge artifact policy.

---

## The one idea that makes this work: the seam

Bridge (Figma) and this track (code) share exactly **one** thing — the **registries**:

```
bridge-ds/knowledge-base/registries/{variables,components,text-styles,effect-styles,variants,icons}.json
```

`/fig-sync` extracts them from Figma. Both `make` (Figma generation) and this skill **read the
same registries**, so they cannot disagree on tokens or component metadata. Everything here
hangs off that seam. **The registry is the contract; the React code is an interpretation of
it.** Because an interpretation can drift, this skill bakes in verification and a diff-driven
re-sync — that's what `/dev-sync` and the verify steps are for.

Token names, component list and node-ids live in the **`jujotte-design-system`** skill and
the registries. Read those — never hardcode token or font names here, they change on every
Figma duplication.

---

## Core principles (the "why" behind every command)

1. **No hardcoded values — tokens/Tailwind classes only.** Colors, spacing, radius and type
   come from generated tokens (`bg-background-primary`, `text-content-primary`, `rounded-sm`,
   `text-label-base`). This is not cosmetic: the token indirection is what lets a Figma color
   change propagate to the whole library for *free* (just rerun `/dev-tokens`). A raw `#5E43FF`
   or `16px` breaks that chain and rots silently the next time Figma moves.

2. **The registry is the source of truth; code is an interpretation.** When they disagree,
   Figma wins. That's why a component isn't "done" because it compiles — it's done when its
   Storybook render matches the Figma node. Show the screenshots.

3. **Reuse, don't reimplement.** Sections compose components; pages compose sections. Re-building
   an atom inside a section forks the source of truth and guarantees future drift.

4. **Verify against Figma, then trust tokens.** Visual verification catches the residual a token
   can't express (internal alignment, an un-tokenized gap). The more a component is tokenized,
   the less there is to verify by eye — verification shrinks as discipline grows.

---

## Project layout (`bridge-ui/`, sibling of `bridge-ds/`)

```
bridge-ui/
├─ scripts/build-tokens.mjs    # registries → CSS vars + Tailwind tokens (bundled by /dev-init)
├─ src/
│  ├─ tokens/                  # generated: tailwind-tokens.cjs, tokens.ts
│  ├─ styles/
│  │  ├─ tokens.css            # generated: CSS custom properties (light/dark)
│  │  └─ globals.css           # fonts + @tailwind + base layer
│  ├─ lib/cn.ts                # className merge helper (clsx + tailwind-merge)
│  ├─ components/<Component>/   # Component.tsx · Component.stories.tsx · index.ts
│  └─ index.ts                 # public API barrel
├─ tailwind.config.cjs         # consumes generated tokens
├─ .storybook/                 # Storybook 8 (react-vite) + light/dark toolbar
└─ vite.config.ts              # library build (ESM + CJS + d.ts)
```

Theme switches via `data-theme="dark"` on the root element; the light/dark toolbar in
Storybook flips it.

---

## Commands

Seven `/dev-*` commands. The `/dev-` prefix keeps them clear of Bridge's Figma-side commands
(`/fig-sync`, `/fig-page`, `/fig-status`, `make`, `done`). Verification is **built into** the build commands,
not a separate command; coverage is **built into** `/dev-status`.

### `/dev-init` — scaffold the library (run once)

Stand up `bridge-ui/` with Storybook, the token pipeline and base config.

1. **Pre-flight.** Registries must exist (`bridge-ds/.../registries/`). If not → "Run `/fig-sync`
   first." If `bridge-ui/` already exists, do **not** clobber it — report and stop (idempotent).
2. **Scaffold** the layout above: `package.json` (React, Vite library build, Storybook 8
   react-vite, Tailwind, clsx + tailwind-merge), `vite.config.ts` (ESM + CJS + `.d.ts`),
   `.storybook/` with a light/dark global toolbar, `tailwind.config.cjs` consuming the generated
   tokens, `src/lib/cn.ts`, `src/index.ts` barrel, `src/styles/globals.css`.
3. **Fonts.** Read the actual families from `text-styles.json` (they differ per file — do not
   assume). Wire `@font-face`/`@fontsource` in `globals.css`; for a licensed display font with no
   web file yet, fall back to the body font and leave a clear TODO.
4. **Copy** `scripts/build-tokens.mjs` from this skill into `bridge-ui/scripts/`.
5. **Generate tokens** once (`/dev-tokens`) and confirm Storybook boots (`npm run dev`).

Output: the created tree + the next step (`/dev-component <Name>`).

### `/dev-tokens` — registries → token files (run after every `/fig-sync`)

Regenerate the design tokens. **Deterministic, no component edits.**

- Run `node bridge-ui/scripts/build-tokens.mjs`. It reads the registries and writes
  `src/styles/tokens.css` (CSS custom properties with **Light** and **Dark** values),
  `src/tokens/tailwind-tokens.cjs` and `src/tokens/tokens.ts`.
- This is how token-level Figma changes reach the code: a recolored token updates one CSS var
  and every consumer follows. **No component needs editing.**
- **First run / after a Figma mode change:** confirm the light/dark mapping is correct (the
  registry stores values by mode *id*, not name — see the script header). If the theme looks
  inverted, flip the mode indices in the script.
- Fail loudly if a registry is missing or empty rather than emitting half a token set.

### `/dev-component <Name>` — code one Figma component (verify built in)

Turn a single DS component into `Component.tsx` + `Component.stories.tsx` + `index.ts`.

1. **Resolve the target.** The argument is either a **component name** (lookup in
   `components.json` / `variants.json` — ambiguous when names collide) or, preferably, a **Figma
   link** to the exact component/variant. For a link: extract the node-id from `node-id=`
   (`1813-17126` → `1813:17126`), `getNodeByIdAsync`, then walk to the component set / variant and
   map it to the registry; sanity-check the link's file key against `figmaFileKey` in
   `docs.config.yaml`. A link removes name ambiguity and pins a specific variant. → variant axes,
   props, master node-id. Node-ids are session-scoped — start from the link or re-search the
   registry; never reuse an id from a previous session.
2. **See it.** Screenshot the component node with `figma_capture_screenshot` (plugin export —
   never the REST `figma_take_screenshot`, there is no PAT here). Optionally read structure for
   intent. The Figma render is the target.
3. **Code it.** Props typed from the variant axes; Tailwind classes only (tokens — see Core
   principle 1); compose with `cn()`. Match the Figma structure; don't invent visual values.
4. **Story it.** One story per registry variant + interactive controls, so the whole surface is
   visible in Storybook.
5. **Build + verify (the gate).** Typecheck, then screenshot the Storybook story and compare it
   to the Figma node. Iterate up to ~3× on mismatches. A component is done when render ≈ Figma,
   not when it compiles. Surface both screenshots.
6. **Export** from `src/index.ts`.

If the component depends on an internal sub-component that isn't built yet, **flag it** rather
than silently inlining a one-off.

### `/dev-section <Name>` — assemble a section from existing components

Compose a footer, header, hero, etc. from components **already in the library**.

1. **Resolve the target, then dependencies.** The argument is a section **name** or, preferably, a
   **Figma link** to the section (extract the node-id from `node-id=`, `getNodeByIdAsync` to read its
   real structure, sanity-check the file key against `docs.config.yaml`). Then list the components the
   section needs. If any are missing from `src/components/`, **flag and stop** (offer to
   `/dev-component` them first) — do not reimplement atoms inline (Core principle 3).
2. **Compose** `Section.tsx` + story: existing components + layout via tokens.
3. **Build + verify** against the Figma section node if one exists; otherwise a visual sanity
   pass (and say so).

### `/dev-screen <Name>` — assemble a page (may invent pages not in Figma)

Build a full page from sections and components — including **new pages the user describes that
don't exist in Figma yet**. Goal: use the user's components/sections to the maximum.

**Target.** The argument is either a page **name** (an invented page — no Figma baseline, so no
page-level visual verification) or a **Figma link** to an existing page to reproduce (extract the
node-id from `node-id=`, `getNodeByIdAsync` to read the mockup, sanity-check the file key against
`docs.config.yaml` — and then **do** verify the page against that node, since a baseline exists).

**When a needed component/section is missing (default behavior — option B):**
- Assemble the page with everything available.
- For each unmet zone, drop a **clearly-labeled `<Placeholder>` stub** (visually obvious) and
  record it in a **"missing components" list**.
- Report: the assembled page + the missing list (→ build them with `/dev-component` /
  `/dev-section`, then re-run). Never silently reimplement a missing piece.

Note: an invented page has **no Figma baseline**, so there's nothing to visually verify at the
page level — only the reused components were verified at their own build time. Say this plainly.

Optional `--motion`: layer GSAP animations *after* the static page is correct. Animation is a
bonus pass, never a substitute for matching the components.

### `/dev-sync` — propagate Figma → code after DS changes

The diff-driven counterpart of `/fig-sync` for the code side. One command to pull Figma changes in.

1. **Re-extract** the registries from Figma (same plugin path as `/fig-sync`).
2. **Diff** the new registries against the previous committed ones (needs a baseline — see
   "Prerequisite" below). Classify: **new** components, **changed** variants/props, **orphan**
   components (in code, gone from Figma).
3. **`/dev-tokens`** — token changes propagate automatically (no component work).
4. **Patch only the impacted components/stories** (a `/dev-component`-style pass scoped to the
   diff — not a rebuild of the whole library).
5. **Verify** the impacted set against Figma. **Flag** orphans for human decision — never
   auto-delete code.

Output: the changelog (`new` / `changed` / `orphan`) + patched files + verification of the
impacted set.

> **Prerequisite — you need an "after" *and* a "before" to diff.** Commit the registries to git
> (recommended — the project should be a git repo anyway for two-person work), or have the sync
> step keep a `.prev` copy before overwriting. Without a baseline, `/dev-sync` degrades to a full
> re-verify; tell the user.

### `/dev-status` — health + coverage

One-glance diagnostic of the code track (mirrors Bridge's `/fig-status`, ✅/⚠️ per row):

- **Tokens fresh?** Compare the registries' `generatedAt` to the token files' mtime — stale means
  "run `/dev-tokens`".
- **Coverage** (the old `/coverage`): a table of Figma components (from the registry) vs React
  components in `src/components/` → **done / missing / orphan**. This is the build progress board
  and the onboarding view for a teammate.
- **Drift flags** pending from the last `/dev-sync`/verify.
- **Build health:** `npm run typecheck` and a Storybook build smoke-check pass?

---

## Token pipeline detail

`scripts/build-tokens.mjs` is bundled with this skill and installed by `/dev-init`. It is the
deterministic heart of the system; read its header before changing token behavior. Key points:

- **Colors** come from the semantic `Tokens` collection (`Content/*`, `Background/*`, `Border/*`,
  `Components/Buttons/*`, `Components/Tags/*`, `Shadow/*`) and are emitted as CSS custom properties
  with Light + Dark values. Semantic variables often **alias** primitives — the script resolves
  alias chains to a concrete value.
- **Spacing / radius** come from `Tailwind Dimensions` and go straight into the Tailwind theme.
  ⚠️ Half-step spacing names use `U+2024` (one-dot leader), e.g. `Spacing (Margin & Padding)/0․5`,
  not a normal dot — the script normalizes these to Tailwind keys (`0.5`).
- **Type** comes from `text-styles.json` → Tailwind `fontSize` tokens (`label-base`,
  `heading-large`, …) carrying size + line-height.
- **Light/Dark mode mapping** is the one fragile spot: the registry stores values by mode *id*,
  not name. The script assumes the two modes are `[light, dark]` in encounter order. Verify on
  first run; flip the indices if inverted.

For a deeper walk-through (visual verification recipe, GSAP guidance), see
`references/workflow.md`.

---

## Relationship to Bridge (do not confuse the two tracks)

| | Bridge (Figma side) | This skill (code side) |
|---|---|---|
| Generates | Figma (scene graph → compiler) | React + Storybook |
| Reuse unit | recipes (Figma scene-graph templates) | reviewed `.tsx` + stories (git) |
| "Ship" / provenance | `done` → `specs/shipped/` + `history.log` | git commit / PR review |
| Shared source | **registries (`/fig-sync`)** | **registries (`/fig-sync`)** |

`make`, `done` and recipes **do not apply** here. This track's archive is **git** — which is why
two-person work wants a real repo and PR review (it's the only thing that stops silent drift).
Don't reach for Bridge's compiler or scene graph in this skill — those are Figma-side only.
