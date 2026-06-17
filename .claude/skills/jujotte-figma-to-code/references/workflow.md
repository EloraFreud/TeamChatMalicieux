# Figma → Code — workflow details

Read this when running `/dev-component`, `/dev-section`, `/dev-screen` or `/dev-sync`.
SKILL.md has the command contracts; this file has the recipes those commands rely on.

## Table of contents
- Visual verification (the gate inside the build commands)
- The drift model (why `/dev-sync` is shaped the way it is)
- `/dev-screen` placeholder contract
- GSAP / animation guidance
- Two-person / git workflow

---

## Visual verification (the gate)

A component is "done" when its Storybook render matches the Figma node — not when it
typechecks. The recipe, run at the end of `/dev-component` and `/dev-section`:

1. **Figma reference.** Re-search the node-id this session, then
   `figma_capture_screenshot` on the component/section node (plugin export — reflects
   runtime state). Never `figma_take_screenshot` (REST) — there is no PAT in this workflow,
   so it 403s.
2. **Code render.** Start Storybook (or build it static) and screenshot the matching story.
   Match the relevant variant/state and the theme (light first, then dark if the component
   has dark-specific tokens).
3. **Compare.** Put them side by side. Look for: spacing/padding deltas, font weight/size,
   color (should be impossible to drift if tokenized — if it does, a value was hardcoded),
   border radius, icon alignment, fill vs hug sizing.
4. **Iterate** up to ~3×. Fix the `.tsx`, re-screenshot. Surface both images so the human can
   sign off — "looks right" is not evidence; the screenshot is.

Why bounded at ~3×: past three rounds the gap is usually a Figma detail that isn't tokenized
or a genuine ambiguity. Stop and ask rather than thrash.

---

## The drift model (three layers)

Drift between Figma and the code library is not one problem — it's three, with very different
fixes. This is the reasoning behind `/dev-tokens` and `/dev-sync`.

1. **Token drift** (a color/spacing/radius/type value changed in Figma). **Auto-absorbed.**
   `/fig-sync` → `/dev-tokens` regenerates one CSS var and every consumer follows. Zero component
   edits. This is the whole payoff of "no hardcoded values" — keep components tokenized and
   ~80% of real-world drift costs nothing.
2. **Structural drift** (a variant added/removed, a prop renamed, a new or deleted component).
   **Diff-driven.** A registry diff (`new` / `changed` / `orphan`) is a deterministic data
   computation; applying it to the affected `.tsx`/stories is a scoped Claude pass. The
   registry stores component *metadata*, not internal geometry — so this layer catches API-level
   change but not pixel-level fidelity.
3. **Fidelity drift** (internal geometry changed but no token/metadata did — e.g. an un-tokenized
   inner padding). Neither tokens nor the registry diff see it. **Only a visual diff catches it**
   (the verification recipe above). The more internal values are tokenized, the more this
   collapses into layer 1.

`/dev-sync` runs all three: re-extract → diff (2) → `/dev-tokens` (1) → patch impacted → verify
impacted (3). It deliberately touches **only** the impacted set — re-verifying 78 components on
every Figma nudge is what makes hand-maintained libraries rot.

Note: Code Connect is **not** a drift tool. It maps Figma → your code for Figma's Dev Mode
(surfacing snippets); it doesn't detect or propagate change. Detection lives in the registry
diff + visual diff above.

---

## `/dev-screen` placeholder contract

When assembling a page (including pages that don't exist in Figma), use the user's components
and sections to the maximum. For any zone with no available component/section:

- Render a `<Placeholder label="…" />` stub that is **visually unmistakable** (e.g. dashed
  border, muted token background, the missing component's intended name).
- Collect every placeholder into a **"missing components" report** returned with the page.
- Never silently reimplement the missing piece inline — that forks the source of truth.

After the user builds the missing components (`/dev-component` / `/dev-section`), re-run
`/dev-screen` to swap placeholders for the real thing.

Because an invented page has no Figma baseline, there is no page-level visual verification —
only the reused components were verified at their own build time. State this in the report so
nobody assumes a full-page Figma match exists.

---

## GSAP / animation guidance

Animation is a **bonus pass over a page that already matches** — never a way to paper over a
component that doesn't. Apply it only in `/dev-screen --motion`, after the static page is
signed off.

- Keep motion in a dedicated layer/hook, not tangled into component internals (components stay
  presentational and reusable).
- Prefer transform/opacity (GPU-friendly) over animating layout properties.
- Respect `prefers-reduced-motion`.
- Animations are not part of the Figma source of truth, so they're out of scope for verification
  and `/dev-sync` — they live purely in the code track.

---

## Two-person / git workflow

The code track's "ship" and provenance is **git**, not `done`/recipes. For multi-person work
this isn't optional — it's the only thing that stops silent drift.

- **One repo per project**, containing both `bridge-ds/` (registries) and `bridge-ui/` (code).
- **Commit the registries.** They are the baseline `/dev-sync` diffs against — no committed
  "before", no structural diff (it degrades to a full re-verify).
- **PR workflow:** each `/dev-component` or `/dev-sync` is a branch → PR → the other person
  reviews the Storybook before merge.
- `.gitignore`: `bridge-ui/node_modules`, `bridge-ui/dist`, `bridge-ui/storybook-static`,
  Bridge's `specs/active/` and `/tmp/bridge-*` (local work, not deliverables).
