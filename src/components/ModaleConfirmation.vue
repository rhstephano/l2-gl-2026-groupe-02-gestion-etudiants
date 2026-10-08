<script setup>
/* =========================================================
   ModaleConfirmation.vue  —  PÔLE 5 (Stats & modale)
   ---------------------------------------------------------
   Remplace le vilain confirm() du navigateur par une vraie
   fenêtre de confirmation.

   Montre : v-if, props, emit, <Teleport>, et le slot par défaut.
   ========================================================= */

defineProps({
  visible: { type: Boolean, default: false },
  titre:   { type: String,  default: 'Confirmer' },
  message: { type: String,  default: 'Êtes-vous sûr ?' }
})

const emit = defineEmits(['confirmer', 'annuler'])
</script>

<template>
  <!-- Teleport : déplace la modale à la fin du <body>,
       pour qu'elle passe au-dessus de tout le reste -->
  <Teleport to="body">
    <!-- v-if : la modale n'existe dans le DOM que si visible = true -->
    <div v-if="visible" class="fond" @click.self="emit('annuler')">
      <div class="modale" role="dialog" aria-modal="true">
        <h3>{{ titre }}</h3>
        <p>{{ message }}</p>
        <div class="boutons">
          <button class="btn-annuler" @click="emit('annuler')">Annuler</button>
          <button class="btn-confirmer" @click="emit('confirmer')">Supprimer</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.fond {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}
.modale {
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}
h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
  color: #0f172a;
}
p {
  margin: 0 0 20px;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.5;
}
.boutons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
button {
  border: none;
  padding: 9px 17px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.btn-annuler { background: #e2e8f0; color: #334155; }
.btn-annuler:hover { background: #cbd5e1; }
.btn-confirmer { background: #dc2626; color: #fff; }
.btn-confirmer:hover { background: #b91c1c; }
</style>
