/* =========================================================
   useEtudiants.js  —  PÔLE 1 (Noyau)
   ---------------------------------------------------------
   Un "composable" = une fonction qui regroupe de la logique
   réactive réutilisable. Ici : toute la gestion de la liste
   des étudiants (CRUD + sauvegarde localStorage).

   Avantage : App.vue reste court et lisible, et cette logique
   peut être testée / réutilisée ailleurs.
   ========================================================= */

import { ref, computed, watch } from 'vue'

const CLE_STOCKAGE = 'etudiants'

// Quelques étudiants d'exemple au tout premier lancement
const DONNEES_INITIALES = [
  { id: 1, nom: 'Rakoto',       prenom: 'Hery',   matricule: 'GL-2026-001', email: 'hery.rakoto@example.mg',   niveau: 'L2' },
  { id: 2, nom: 'Rasoa',        prenom: 'Miora',  matricule: 'GL-2026-002', email: 'miora.rasoa@example.mg',   niveau: 'L2' },
  { id: 3, nom: 'Randrianarisoa', prenom: 'Tiana', matricule: 'GL-2026-003', email: '',                        niveau: 'L3' }
]

export function useEtudiants() {
  // --- L'ÉTAT ---
  const etudiants = ref(charger())

  // --- SAUVEGARDE AUTOMATIQUE à chaque modification ---
  watch(etudiants, (liste) => {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(liste))
  }, { deep: true })

  // --- LECTURE DU localStorage ---
  function charger() {
    try {
      const brut = localStorage.getItem(CLE_STOCKAGE)
      if (!brut) return [...DONNEES_INITIALES]
      const liste = JSON.parse(brut)
      return Array.isArray(liste) ? liste : [...DONNEES_INITIALES]
    } catch (e) {
      console.warn('Données illisibles dans le localStorage, réinitialisation.', e)
      return [...DONNEES_INITIALES]
    }
  }

  // --- LES 4 OPÉRATIONS DEMANDÉES PAR LE SUJET ---

  function ajouter(etudiant) {
    etudiants.value.push({
      id: Date.now() + Math.floor(Math.random() * 1000), // identifiant unique
      ...etudiant
    })
  }

  function modifier(etudiantModifie) {
    const index = etudiants.value.findIndex((e) => e.id === etudiantModifie.id)
    if (index !== -1) {
      etudiants.value[index] = { ...etudiantModifie }
    }
  }

  function supprimer(id) {
    etudiants.value = etudiants.value.filter((e) => e.id !== id)
  }

  function trouverParId(id) {
    return etudiants.value.find((e) => e.id === id) || null
  }

  // --- UTILISÉ PAR L'IMPORT CSV (pôle 6) ---
  function remplacerTout(nouvelleListe) {
    etudiants.value = nouvelleListe.map((e, i) => ({
      id: Date.now() + i,
      ...e
    }))
  }

  function viderTout() {
    etudiants.value = []
  }

  // --- DONNÉES CALCULÉES ---
  const total = computed(() => etudiants.value.length)

  const matriculesExistants = computed(() =>
    etudiants.value.map((e) => e.matricule.toLowerCase())
  )

  // Tout ce que les composants pourront utiliser
  return {
    etudiants,
    total,
    matriculesExistants,
    ajouter,
    modifier,
    supprimer,
    trouverParId,
    remplacerTout,
    viderTout
  }
}
