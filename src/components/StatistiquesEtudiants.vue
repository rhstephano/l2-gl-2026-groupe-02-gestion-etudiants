<script setup>
/* =========================================================
   StatistiquesEtudiants.vue  —  PÔLE 5 (Stats & modale)
   ---------------------------------------------------------
   Composant 100 % "présentation" : il reçoit la liste en prop
   et ne fait que calculer / afficher. Il ne modifie rien.
   ========================================================= */

import { computed } from 'vue'

const props = defineProps({
  etudiants: { type: Array, required: true }
})

// Nombre d'étudiants par niveau
const parNiveau = computed(() => {
  const compteur = {}
  for (const e of props.etudiants) {
    compteur[e.niveau] = (compteur[e.niveau] || 0) + 1
  }
  // on trie les niveaux par ordre alphabétique (L1, L2, L3, M1)
  return Object.entries(compteur).sort((a, b) => a[0].localeCompare(b[0]))
})

const avecEmail = computed(() =>
  props.etudiants.filter((e) => e.email && e.email.trim() !== '').length
)

const tauxEmail = computed(() => {
  if (props.etudiants.length === 0) return 0
  return Math.round((avecEmail.value / props.etudiants.length) * 100)
})
</script>

<template>
  <div class="stats">
    <div class="carte-stat principale">
      <span class="valeur">{{ etudiants.length }}</span>
      <span class="libelle">étudiant{{ etudiants.length > 1 ? 's' : '' }}</span>
    </div>

    <!-- v-for sur les niveaux trouvés -->
    <div v-for="[niveau, nombre] in parNiveau" :key="niveau" class="carte-stat">
      <span class="valeur">{{ nombre }}</span>
      <span class="libelle">{{ niveau }}</span>
    </div>

    <!-- v-if : on n'affiche ce bloc que s'il y a des étudiants -->
    <div v-if="etudiants.length > 0" class="carte-stat email">
      <span class="valeur">{{ tauxEmail }}%</span>
      <span class="libelle">avec email</span>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.carte-stat {
  flex: 1;
  min-width: 78px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 11px 13px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.carte-stat.principale {
  background: #eff6ff;
  border-color: #bfdbfe;
}
.carte-stat.email {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
.valeur {
  font-size: 1.45rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.1;
}
.carte-stat.principale .valeur { color: #1d4ed8; }
.carte-stat.email .valeur { color: #15803d; }
.libelle {
  font-size: 0.72rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 600;
}
</style>
