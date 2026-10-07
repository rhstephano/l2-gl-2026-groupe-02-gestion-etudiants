<script setup>
/* =========================================================
   BarreRecherche.vue
   Petit composant qui gère seulement le champ de recherche.
   defineModel() permet d'utiliser v-model depuis le parent.
   ========================================================= */

// Équivaut à : prop "modelValue" + événement "update:modelValue"
const recherche = defineModel()
</script>

<template>
  <div class="recherche">
    <span class="loupe">🔍</span>
    <input
      v-model="recherche"
      type="text"
      placeholder="Rechercher par nom, prénom ou matricule..."
    />
    <!-- v-if : le bouton "effacer" n'apparaît que si on a tapé quelque chose -->
    <button v-if="recherche" class="effacer" @click="recherche = ''" title="Effacer">
      ✕
    </button>
  </div>
</template>

<style scoped>
.recherche {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0 10px;
  background: #f8fafc;
}
.recherche:focus-within {
  border-color: #3b82f6;
  background: #fff;
}
.loupe { font-size: 0.9rem; }
input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 0;
  font-size: 0.9rem;
  font-family: inherit;
}
input:focus { outline: none; }
.effacer {
  border: none;
  background: #e2e8f0;
  color: #475569;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 1;
  cursor: pointer;
  font-size: 0.7rem;
}
</style>
