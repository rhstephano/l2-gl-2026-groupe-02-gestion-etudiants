#!/usr/bin/env bash
# ============================================================
#  preparer-repartition.sh
#  Retire du depot les 11 fichiers qui appartiennent aux autres
#  membres, pour que CHACUN cree et pousse le sien lui-meme.
#
#  Les fichiers sont sauvegardes dans ~/modeles-projet/
#  (tu les gardes comme modele, ils ne sont plus sur GitHub).
#
#  A lancer DEPUIS ~/gestion-etudiants
# ============================================================
set -e

if [ ! -f package.json ] || [ ! -d .git ]; then
  echo "✗ Tu n'es pas dans ~/gestion-etudiants (ou ce n'est pas un depot git)."
  exit 1
fi

FICHIERS=(
  "src/App.vue"
  "src/style.css"
  "src/utils/validation.js"
  "src/components/BarreRecherche.vue"
  "src/components/FiltresEtudiants.vue"
  "src/components/FormulaireEtudiant.vue"
  "src/components/ImportExport.vue"
  "src/components/LigneEtudiant.vue"
  "src/components/ListeEtudiants.vue"
  "src/components/ModaleConfirmation.vue"
  "src/components/StatistiquesEtudiants.vue"
)

echo ""
echo "Ces 11 fichiers vont etre RETIRES du depot GitHub :"
printf '   - %s\n' "${FICHIERS[@]}"
echo ""
echo "Ils seront sauvegardes dans  ~/modeles-projet/"
echo "Tu gardes :  src/main.js  et  src/composables/useEtudiants.js (le tien)"
echo ""
echo "⚠  L'application ne fonctionnera plus tant que les 11 fichiers"
echo "   ne sont pas revenus, pousses par leurs proprietaires."
echo ""
read -rp "Continuer ? [o/N] " rep
[[ "$rep" =~ ^[oO]$ ]] || { echo "Annule."; exit 0; }

# --- sauvegarde ---
mkdir -p ~/modeles-projet/src/components ~/modeles-projet/src/utils
for f in "${FICHIERS[@]}"; do
  [ -f "$f" ] && cp "$f" ~/modeles-projet/"$f"
done
echo "✓ Sauvegarde faite dans ~/modeles-projet/"

# --- retrait du depot ---
for f in "${FICHIERS[@]}"; do
  git rm -q --cached "$f" 2>/dev/null || true
  rm -f "$f"
done

# --- garder les dossiers visibles apres un clone ---
mkdir -p src/components src/utils
cat > src/components/.gitkeep <<'K'
Les composants Vue arrivent ici.
Chaque membre cree le sien et le pousse depuis son propre compte.
K
cat > src/utils/.gitkeep <<'K'
Les fonctions utilitaires arrivent ici.
K

git add -A
git commit -q -m "Repartition du travail : chaque membre ajoutera son propre fichier"

echo ""
echo "✅ Termine."
echo ""
echo "Il reste a pousser :"
echo "   git push"
echo ""
echo "Tes modeles de secours sont dans :  ~/modeles-projet/"
echo "(utilise-les si quelqu'un n'arrive vraiment pas a copier depuis le guide)"
echo ""
