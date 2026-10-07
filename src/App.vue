<script setup>
/* =========================================================
   App.vue  —  PÔLE 1 (Noyau / assemblage)
   ---------------------------------------------------------
   Le "chef d'orchestre". Il :
     - récupère la logique métier du composable useEtudiants()
     - garde l'état de l'interface (recherche, filtres, tri)
     - assemble tous les composants des autres pôles

   Règle d'or :
     les DONNÉES descendent (props), les ACTIONS remontent (emit).
   ========================================================= */

import { ref, computed } from 'vue'
import { useEtudiants } from './composables/useEtudiants.js'

import FormulaireEtudiant     from './components/FormulaireEtudiant.vue'
import BarreRecherche         from './components/BarreRecherche.vue'
import FiltresEtudiants       from './components/FiltresEtudiants.vue'
import ListeEtudiants         from './components/ListeEtudiants.vue'
import StatistiquesEtudiants  from './components/StatistiquesEtudiants.vue'
import ModaleConfirmation     from './components/ModaleConfirmation.vue'
import ImportExport           from './components/ImportExport.vue'

// --- 1) LA LOGIQUE MÉTIER (pôle 1 : composables/useEtudiants.js) ---
const {
  etudiants, matriculesExistants,
  ajouter, modifier, supprimer, remplacerTout
} = useEtudiants()

// --- 2) L'ÉTAT DE L'INTERFACE ---
const recherche        = ref('')
const niveauFiltre     = ref('tous')
const critereTri       = ref('nom')
const ordreTri         = ref('asc')
const etudiantEnEdition = ref(null)
const idASupprimer     = ref(null)

// --- 3) LA LISTE AFFICHÉE : recherche → filtre → tri ---
const etudiantsAffiches = computed(() => {
  let liste = [...etudiants.value]

  // a) recherche texte (pôle 4)
  const texte = recherche.value.trim().toLowerCase()
  if (texte) {
    liste = liste.filter((e) =>
      e.nom.toLowerCase().includes(texte) ||
      e.prenom.toLowerCase().includes(texte) ||
      e.matricule.toLowerCase().includes(texte)
    )
  }

  // b) filtre par niveau (pôle 4)
  if (niveauFiltre.value !== 'tous') {
    liste = liste.filter((e) => e.niveau === niveauFiltre.value)
  }

  // c) tri (pôles 3 et 4)
  liste.sort((a, b) => {
    const resultat = String(a[critereTri.value] || '')
      .localeCompare(String(b[critereTri.value] || ''), 'fr', { sensitivity: 'base' })
    return ordreTri.value === 'asc' ? resultat : -resultat
  })

  return liste
})

// --- 4) LES ACTIONS ---

function commencerEdition(etudiant) {
  etudiantEnEdition.value = { ...etudiant }  // une copie
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function enregistrerModification(etudiant) {
  modifier(etudiant)
  etudiantEnEdition.value = null
}

function demanderSuppression(id) {
  idASupprimer.value = id          // ouvre la modale (pôle 5)
}

function confirmerSuppression() {
  supprimer(idASupprimer.value)
  if (etudiantEnEdition.value?.id === idASupprimer.value) {
    etudiantEnEdition.value = null
  }
  idASupprimer.value = null
}

// Clic sur un en-tête de colonne : trier, ou inverser si déjà trié
function changerTri(colonne) {
  if (critereTri.value === colonne) {
    ordreTri.value = ordreTri.value === 'asc' ? 'desc' : 'asc'
  } else {
    critereTri.value = colonne
    ordreTri.value = 'asc'
  }
}

// Texte affiché dans la modale de confirmation
const messageSuppression = computed(() => {
  const e = etudiants.value.find((x) => x.id === idASupprimer.value)
  return e
    ? `Supprimer définitivement ${e.prenom} ${e.nom} (${e.matricule}) ?`
    : 'Supprimer cet étudiant ?'
})
</script>

<template>
  <div class="app">
    <header class="entete">
      <h1>🎓 Gestion simple des étudiants</h1>
      <p>Mini-projet Vue.js 3 + Vite — Groupe 2 — L2 Génie Logiciel</p>
    </header>

    <main class="contenu">
      <!-- ===== Colonne gauche : formulaire (pôle 2) ===== -->
      <aside>
        <FormulaireEtudiant
          :etudiant-a-modifier="etudiantEnEdition"
          :matricules-existants="matriculesExistants"
          @ajouter="ajouter"
          @modifier="enregistrerModification"
          @annuler="etudiantEnEdition = null"
        />
      </aside>

      <!-- ===== Colonne droite : liste et outils ===== -->
      <section class="panneau">
        <!-- Statistiques (pôle 5) -->
        <StatistiquesEtudiants :etudiants="etudiants" />

        <!-- Recherche (pôle 4) -->
        <BarreRecherche v-model="recherche" />

        <!-- Filtres et tri (pôle 4) -->
        <FiltresEtudiants
          v-model:niveau="niveauFiltre"
          v-model:tri="critereTri"
          v-model:ordre="ordreTri"
        />

        <p class="compteur">
          {{ etudiantsAffiches.length }} affiché(s) sur {{ etudiants.length }}
        </p>

        <!-- Tableau (pôle 3) -->
        <ListeEtudiants
          :etudiants="etudiantsAffiches"
          :tri="critereTri"
          :ordre="ordreTri"
          @editer="commencerEdition"
          @supprimer="demanderSuppression"
          @trier="changerTri"
        />

        <!-- Import / Export CSV (pôle 6) -->
        <ImportExport :etudiants="etudiants" @importer="remplacerTout" />
      </section>
    </main>

    <footer class="pied">
      Données enregistrées dans le localStorage du navigateur — aucun serveur.
    </footer>

    <!-- Modale de confirmation (pôle 5) -->
    <ModaleConfirmation
      :visible="idASupprimer !== null"
      titre="Supprimer un étudiant"
      :message="messageSuppression"
      @confirmer="confirmerSuppression"
      @annuler="idASupprimer = null"
    />
  </div>
</template>

<style scoped>
.app { max-width: 1100px; margin: 0 auto; padding: 24px 16px 48px; }
.entete { text-align: center; margin-bottom: 28px; }
.entete h1 { margin: 0 0 6px; font-size: 1.9rem; color: #1e293b; }
.entete p { margin: 0; color: #64748b; font-size: 0.95rem; }
.contenu {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  align-items: start;
}
.panneau {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
}
.compteur { margin: 0 0 12px; font-size: 0.8rem; color: #94a3b8; }
.pied { margin-top: 28px; text-align: center; font-size: 0.8rem; color: #94a3b8; }
@media (max-width: 900px) {
  .contenu { grid-template-columns: 1fr; }
}
</style>
