/* =========================================================
   validation.js  —  PÔLE 2 (Formulaire)
   ---------------------------------------------------------
   Fonctions pures (pas de Vue ici) qui vérifient les données
   saisies dans le formulaire.

   "Fonction pure" = même entrée → même sortie, aucun effet de
   bord. C'est la partie la plus facile à tester.
   ========================================================= */

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Vérifie un étudiant et renvoie un objet d'erreurs.
 * Objet vide = tout est bon.
 *
 * @param {Object} etudiant            - les données du formulaire
 * @param {Array}  matriculesExistants - matricules déjà pris (en minuscules)
 * @returns {Object} ex: { nom: "Le nom est obligatoire." }
 */
export function validerEtudiant(etudiant, matriculesExistants = []) {
  const erreurs = {}

  // --- Nom ---
  if (!etudiant.nom || !etudiant.nom.trim()) {
    erreurs.nom = 'Le nom est obligatoire.'
  } else if (etudiant.nom.trim().length < 2) {
    erreurs.nom = 'Le nom doit faire au moins 2 caractères.'
  }

  // --- Prénom ---
  if (!etudiant.prenom || !etudiant.prenom.trim()) {
    erreurs.prenom = 'Le prénom est obligatoire.'
  } else if (etudiant.prenom.trim().length < 2) {
    erreurs.prenom = 'Le prénom doit faire au moins 2 caractères.'
  }

  // --- Matricule ---
  if (!etudiant.matricule || !etudiant.matricule.trim()) {
    erreurs.matricule = 'Le matricule est obligatoire.'
  } else if (matriculesExistants.includes(etudiant.matricule.trim().toLowerCase())) {
    erreurs.matricule = 'Ce matricule est déjà utilisé.'
  }

  // --- Email (facultatif, mais s'il est rempli il doit être valide) ---
  if (etudiant.email && etudiant.email.trim() && !REGEX_EMAIL.test(etudiant.email.trim())) {
    erreurs.email = "Format d'email invalide."
  }

  return erreurs
}

/** Y a-t-il au moins une erreur ? */
export function estValide(erreurs) {
  return Object.keys(erreurs).length === 0
}

/** Nettoie les espaces inutiles avant l'enregistrement. */
export function nettoyerEtudiant(etudiant) {
  return {
    ...etudiant,
    nom: (etudiant.nom || '').trim(),
    prenom: (etudiant.prenom || '').trim(),
    matricule: (etudiant.matricule || '').trim().toUpperCase(),
    email: (etudiant.email || '').trim().toLowerCase()
  }
}
