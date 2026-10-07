# 🤝 Comment contribuer à ce projet

> À lire **avant** ton premier commit. 13 personnes travaillent sur ce dépôt :
> ces règles existent pour que personne n'écrase le travail d'un autre.

---

## 1. La règle n°1 : chacun son fichier

| Pôle | Membre | Fichier — **lui seul y touche** |
|---|---|---|
| 1 | | `src/composables/useEtudiants.js` |
| 1 | | `src/App.vue` |
| 2 | | `src/components/FormulaireEtudiant.vue` |
| 2 | | `src/utils/validation.js` |
| 3 | | `src/components/ListeEtudiants.vue` |
| 3 | | `src/components/LigneEtudiant.vue` |
| 4 | | `src/components/BarreRecherche.vue` |
| 4 | | `src/components/FiltresEtudiants.vue` |
| 5 | | `src/components/StatistiquesEtudiants.vue` |
| 5 | | `src/components/ModaleConfirmation.vue` |
| 6 | | `src/components/ImportExport.vue` |
| 6 | | `src/style.css` |
| 6 | | `README.md`, `captures/` |

**Tu as besoin d'une modification dans le fichier de quelqu'un d'autre ?**
Tu ne la fais pas toi-même. Tu ouvres une *Issue* sur GitHub, ou tu lui demandes dans le groupe.

---

## 2. Configuration obligatoire (une seule fois)

```bash
git config --global user.name  "Ton Prénom Nom"
git config --global user.email "ton.email@github"   # ⚠️ EXACTEMENT celui de ton compte GitHub
```

Vérifie que tu es bien reconnu :
```bash
git log -1 --format='%an <%ae>'
```

> ⚠️ Si l'email ne correspond pas à ton compte GitHub, **tes commits n'apparaîtront pas**
> dans `Insights → Contributors`. Et c'est 20 % de la note du groupe.

---

## 3. Le cycle de travail

```bash
# ── 1. DÉBUT D'UNE TÂCHE ───────────────────────────────
git checkout main
git pull                              # récupérer le travail des autres
git checkout -b pole-2-formulaire     # ta branche de pôle

# ── 2. PENDANT LE TRAVAIL (plusieurs fois par jour) ────
git add src/components/FormulaireEtudiant.vue   # TON fichier, pas "git add ."
git commit -m "Ajout de la validation du matricule"
git push -u origin pole-2-formulaire  # la 1re fois
git push                              # ensuite

# ── 3. TÂCHE TERMINÉE ──────────────────────────────────
# Sur GitHub : bandeau "Compare & pull request"
#   Titre        : "Pôle 2 — Validation du formulaire"
#   Description  : ce qui a été fait, et par qui
#   Reviewers    : UNE personne d'un AUTRE pôle
# → Elle relit, commente, puis "Merge pull request"

# ── 4. APRÈS UNE FUSION ────────────────────────────────
git checkout main
git pull
```

---

## 4. Messages de commit

**En français, au présent, et qui disent ce qui a changé.**

| ✅ | ❌ |
|---|---|
| `Ajout formulaire étudiant` | `update` |
| `Correction filtre par niveau` | `fix` |
| `Amélioration interface du tableau` | `test` |
| `Ajout sauvegarde localStorage` | `aaa` |
| `Ajout validation du matricule unique` | `.` |
| `Mise à jour README avec les captures` | `modif` |

**Objectif : au moins 7 commits par personne.** Un commit = une petite chose qui marche.
Ne gardez pas tout pour un gros commit à la fin.

---

## 5. Avant d'ouvrir une Pull Request

- [ ] `npm run dev` démarre sans erreur
- [ ] Aucune erreur rouge dans la console du navigateur (`F12`)
- [ ] `npm run build` passe
- [ ] Je n'ai modifié **que mes fichiers** (vérifie avec `git diff --name-only main`)
- [ ] Mes messages de commit sont lisibles

---

## 6. Les erreurs qui vont arriver

| Message | Solution |
|---|---|
| `Updates were rejected... fetch first` | `git pull` puis `git push` |
| `CONFLICT (content): Merge conflict in X` | Ouvre le fichier dans VS Code, garde la bonne version, efface `<<<<<<<` `=======` `>>>>>>>`, puis `git add .` et `git commit` |
| `Permission denied (publickey)` | `eval "$(ssh-agent -s)"` puis `ssh-add ~/.ssh/id_ed25519` |
| `could not read Username for 'https://github.com'` | Tu es en HTTPS : `git remote set-url origin git@github.com:PSEUDO/DEPOT.git` |
| `fatal: not a git repository` | `cd` dans le dossier du projet |
| Le dépôt pèse 200 Mo | `node_modules` a été poussé : `git rm -r --cached node_modules` puis commit |

---

## 7. Vérifier sa participation

```bash
git shortlog -sn --no-merges       # le classement de tout le monde
git log --author="Ton Nom" --oneline
```

Sur GitHub : **Insights → Contributors**. Il doit y avoir **13 noms**.
Vérifiez-le **chaque vendredi**, pas la veille du rendu.

---

## 8. Ne jamais faire

- ❌ `git push --force` sur `main`
- ❌ Commiter `node_modules/` ou `dist/`
- ❌ Modifier le fichier d'un autre sans le prévenir
- ❌ Coder à plusieurs sur un seul ordinateur avec un seul compte
  *(le `Co-authored-by:` ne compte pas dans le graphe Contributors de github.com)*
