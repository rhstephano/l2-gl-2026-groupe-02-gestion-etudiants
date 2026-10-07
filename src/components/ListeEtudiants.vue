<script setup>
/* =========================================================
   ListeEtudiants.vue  —  PÔLE 3 (Tableau)
   ---------------------------------------------------------
   Affiche le tableau des étudiants grâce à v-for.
   Il ne modifie RIEN lui-même : il prévient le parent avec les
   événements "editer", "supprimer" et "trier".
   ========================================================= */

import LigneEtudiant from './LigneEtudiant.vue'

defineProps({
  etudiants: { type: Array,  required: true },
  tri:       { type: String, default: 'nom' },
  ordre:     { type: String, default: 'asc' }
})

const emit = defineEmits(['editer', 'supprimer', 'trier'])

// Les colonnes cliquables pour trier
const COLONNES = [
  { cle: 'matricule', libelle: 'Matricule' },
  { cle: 'nom',       libelle: 'Nom' },
  { cle: 'prenom',    libelle: 'Prénom' },
  { cle: null,        libelle: 'Email' },
  { cle: 'niveau',    libelle: 'Niveau' }
]
</script>

<template>
  <!-- v-if / v-else : message si la liste est vide -->
  <p v-if="etudiants.length === 0" class="vide">
    Aucun étudiant à afficher.<br />
    Ajoutez-en un avec le formulaire, ou changez les filtres.
  </p>

  <table v-else class="tableau">
    <thead>
      <tr>
        <th
          v-for="colonne in COLONNES"
          :key="colonne.libelle"
          :class="{ cliquable: colonne.cle, actif: tri === colonne.cle }"
          @click="colonne.cle && emit('trier', colonne.cle)"
        >
          {{ colonne.libelle }}
          <!-- petite flèche sur la colonne de tri active -->
          <span v-if="tri === colonne.cle" class="fleche">
            {{ ordre === 'asc' ? '▲' : '▼' }}
          </span>
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <!-- v-for : une ligne par étudiant. :key est OBLIGATOIRE -->
      <LigneEtudiant
        v-for="etudiant in etudiants"
        :key="etudiant.id"
        :etudiant="etudiant"
        @editer="emit('editer', $event)"
        @supprimer="emit('supprimer', $event)"
      />
    </tbody>
  </table>
</template>

<style scoped>
.vide {
  text-align: center;
  color: #94a3b8;
  padding: 36px 12px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  font-size: 0.9rem;
  line-height: 1.6;
}
.tableau {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.tableau th {
  text-align: left;
  padding: 10px 8px;
  border-bottom: 2px solid #e2e8f0;
  color: #64748b;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
}
.tableau th.cliquable { cursor: pointer; user-select: none; }
.tableau th.cliquable:hover { color: #2563eb; }
.tableau th.actif { color: #2563eb; }
.fleche { font-size: 0.6rem; }
</style>
