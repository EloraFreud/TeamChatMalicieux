---
description: Commit les changements sur main avec un message gitmoji, puis push
allowed-tools: Bash, Read
argument-hint: "[message optionnel]"
---

Crée un commit sur la branche **`main`** avec un **message gitmoji** ([gitmoji.dev](https://gitmoji.dev/)),
puis pousse vers `origin`. Message optionnel en argument : `$ARGUMENTS` (sinon, déduis-le du diff).

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-commit`**.

> Pré-requis : repo déjà lié (`/dev-git-init`) et utilisateur authentifié (`gh auth status`).
> Commit **direct sur `main`** par choix de workflow de ce projet. ℹ️ Pour du travail à plusieurs,
> une PR + review reste plus sûr (voir SKILL.md « Relationship to Bridge ») — propose-le si le diff
> est important, mais respecte ce choix par défaut.

### Étapes

1. **Inspecte** : `git status --short` + `git diff --stat`. S'il n'y a rien à committer → stop, dis-le.
2. **Garde-fou secrets** : avant de stager, vérifie qu'aucun token n'entre dans le commit
   (`figd_`, `ghp_`, `github_pat_`, `FIGMA_TOKEN=…`). Si oui → stop et corrige le `.gitignore`.
3. **Stage** les changements pertinents (`git add -A`, sauf fichiers déjà ignorés).
4. **Choisis le gitmoji** selon la nature dominante du diff (table ci-dessous), et compose le
   **résumé** : `<emoji> <résumé impératif court>`. Si `$ARGUMENTS` est fourni, utilise-le comme
   résumé et préfixe juste l'emoji adéquat. Corps optionnel = liste à puces des changements notables.
5. **Commit** avec le trailer obligatoire :
   ```
   <emoji> <résumé>

   - <détail 1>
   - <détail 2>

   Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
   ```
6. **Push** : `git push origin main`. Si le push est rejeté (la remote a avancé) →
   `git pull --rebase origin main` puis re-push.

### Table gitmoji (DS Jujotte)

| Emoji | Code | Quand |
|---|---|---|
| ✨ | `:sparkles:` | nouveau composant / section / page (`/dev-component`, `/dev-section`, `/dev-screen`) |
| 💄 | `:lipstick:` | ajustement visuel / style / UI sans logique nouvelle |
| ♻️ | `:recycle:` | refactor sans changement de comportement |
| 🎨 | `:art:` | tokens régénérés / structure / format (`/dev-tokens`) |
| 🐛 | `:bug:` | correction de bug |
| 🔧 | `:wrench:` | config (tailwind, storybook, vite, scripts) |
| ➕ | `:heavy_plus_sign:` | ajout de dépendance |
| 📝 | `:memo:` | docs / skills / commands / README |
| 🔥 | `:fire:` | suppression de code ou de fichiers |
| ✅ | `:white_check_mark:` | tests / stories de vérification |
| 🔄 | `:arrows_counterclockwise:` | sync Figma → code (`/dev-sync`, `/fig-sync` registries) |
| 🔖 | `:bookmark:` | tag de version / release |
| 🚧 | `:construction:` | travail en cours (WIP) |
| 🎉 | `:tada:` | commit initial du projet |

> Diff mixte → choisis l'emoji du changement **dominant** ; détaille le reste dans le corps.

### Rapport
Affiche le hash court, le message (1re ligne) et l'état du push (`main → origin/main`).
