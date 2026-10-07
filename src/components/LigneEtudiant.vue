<script setup>
/* =========================================================
   LigneEtudiant.vue
   Une seule ligne du tableau.
   Exemple TRÈS clair de "props vers le bas, événements vers le haut".
   ========================================================= */

// PROP : un seul étudiant, envoyé par ListeEtudiants.vue
defineProps({
  etudiant: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['editer', 'supprimer'])
</script>

<template>
  <tr>
    <td class="matricule">{{ etudiant.matricule }}</td>
    <td class="nom">{{ etudiant.nom }}</td>
    <td>{{ etudiant.prenom }}</td>
    <!-- v-if / v-else pour gérer l'email vide -->
    <td>
      <span v-if="etudiant.email">{{ etudiant.email }}</span>
      <span v-else class="absent">—</span>
    </td>
    <td><span class="badge">{{ etudiant.niveau }}</span></td>
    <td class="actions">
      <!-- @click = écoute de l'événement clic -->
      <button class="btn-editer" @click="emit('editer', etudiant)">Modifier</button>
      <button class="btn-supprimer" @click="emit('supprimer', etudiant.id)">Supprimer</button>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding: 10px 8px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}
.matricule { font-family: monospace; color: #64748b; }
.nom { font-weight: 600; }
.absent { color: #cbd5e1; }
.badge {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.actions {
  display: flex;
  gap: 6px;
}
.actions button {
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.btn-editer { background: #fef3c7; color: #92400e; }
.btn-editer:hover { background: #fde68a; }
.btn-supprimer { background: #fee2e2; color: #b91c1c; }
.btn-supprimer:hover { background: #fecaca; }
</style>
