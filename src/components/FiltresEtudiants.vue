<script setup>
/* =========================================================
   FiltresEtudiants.vue  —  PÔLE 4 (Recherche & filtres)
   ---------------------------------------------------------
   Filtre par niveau + choix du tri.
   Utilise plusieurs v-model NOMMÉS (Vue 3.4+) :
     <FiltresEtudiants v-model:niveau="..." v-model:tri="..." />
   ========================================================= */

const niveau = defineModel('niveau')   // 'tous' | 'L1' | 'L2' | 'L3' | 'M1'
const tri    = defineModel('tri')      // 'nom' | 'prenom' | 'matricule' | 'niveau'
const ordre  = defineModel('ordre')    // 'asc' | 'desc'

const NIVEAUX = ['tous', 'L1', 'L2', 'L3', 'M1']

function inverserOrdre() {
  ordre.value = ordre.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div class="filtres">
    <!-- Filtre par niveau : v-for sur un tableau simple -->
    <div class="groupe">
      <span class="etiquette">Niveau</span>
      <div class="pastilles">
        <button
          v-for="n in NIVEAUX"
          :key="n"
          class="pastille"
          :class="{ active: niveau === n }"
          @click="niveau = n"
        >
          {{ n === 'tous' ? 'Tous' : n }}
        </button>
      </div>
    </div>

    <!-- Choix du tri -->
    <div class="groupe">
      <span class="etiquette">Trier par</span>
      <div class="ligne-tri">
        <select v-model="tri">
          <option value="nom">Nom</option>
          <option value="prenom">Prénom</option>
          <option value="matricule">Matricule</option>
          <option value="niveau">Niveau</option>
        </select>
        <button class="sens" :title="ordre === 'asc' ? 'Croissant' : 'Décroissant'" @click="inverserOrdre">
          {{ ordre === 'asc' ? '↑ A-Z' : '↓ Z-A' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  padding: 12px 0 14px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 12px;
}
.groupe {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.etiquette {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #94a3b8;
}
.pastilles { display: flex; gap: 5px; }
.pastille {
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #475569;
  padding: 5px 11px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.pastille:hover { background: #f1f5f9; }
.pastille.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}
.ligne-tri { display: flex; gap: 6px; }
select {
  padding: 6px 9px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 0.8rem;
  font-family: inherit;
  background: #fff;
}
.sens {
  border: 1px solid #cbd5e1;
  background: #fff;
  border-radius: 7px;
  padding: 6px 10px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  color: #475569;
  font-family: inherit;
  white-space: nowrap;
}
.sens:hover { background: #f1f5f9; }
</style>
