---
description: Initialise le repo git du projet et le lie à un repo GitHub distant (à lancer une fois)
allowed-tools: Bash, Read, Write
argument-hint: <lien-du-repo-github>
---

Initialise le versioning du projet et le connecte à un repo GitHub **distant déjà créé**.
Le lien du repo est passé en argument : `$ARGUMENTS` (ex. `https://github.com/Org/repo` ou
`Org/repo`). À lancer **une fois** par clone de projet.

Suis le skill **`jujotte-figma-to-code`** → section **`/dev-git-init`**.

> ⚠️ **L'authentification n'est PAS dans le lien.** Le lien ne donne aucun droit. Pour pousser,
> l'utilisateur doit, sur SA machine : (1) être authentifié à GitHub (`gh auth login`, ou clé
> SSH / PAT git), ET (2) avoir un accès **en écriture** au repo (collaborateur ou membre de l'org).
> Cette commande **n'embarque jamais de credential** — un secret n'a rien à faire dans un repo.

### Étapes

1. **Lien.** Récupère l'URL depuis `$ARGUMENTS`. Si absent → demande-le. Normalise en URL
   `https://github.com/<owner>/<repo>.git` (accepte aussi `owner/repo`).
2. **Auth.** `gh auth status`. Si non authentifié → **stop** et explique : `gh auth login`
   (ou config SSH/PAT). Ne tente pas de pousser sans auth.
3. **Idempotence.** Si `git rev-parse --is-inside-work-tree` réussit déjà → ne ré-initialise pas ;
   vérifie/ajuste seulement le remote `origin` et rapporte. Sinon `git init -q && git branch -M main`.
4. **`.gitignore`.** S'il manque, crée-le : `.DS_Store`, `.claude/settings.local.json`
   (config machine-locale), `.bridge/last-sync-report.md`, `/tmp/bridge-*`, `node_modules/`.
   **Vérifie qu'aucun secret n'est stagé** (`grep` patterns `figd_`, `ghp_`, `github_pat_`,
   `FIGMA_TOKEN=…`) avant le commit — si un token apparaît, ajoute-le au `.gitignore`, jamais au commit.
5. **Commit initial** (si l'arbre n'a pas encore de commit) : stage tout puis commit avec un message
   gitmoji `🎉 init: <dsName depuis docs.config.yaml>` (+ trailer `Co-Authored-By` comme `/dev-commit`).
6. **Remote + reconcile.** `git remote add origin <url>` (ou `set-url` s'il existe).
   `git fetch -q origin`. Si `origin/main` existe déjà (README, etc.) → `git rebase origin/main`
   (replaye le commit local par-dessus, évite « unrelated histories »).
7. **Push.** `git push -u origin main`.

### Rapport
Affiche : repo lié (URL), branche, nb de fichiers trackés, et le rappel **collègues** :
chacun doit `gh auth login` + avoir l'accès écriture pour pouvoir pousser à son tour.
