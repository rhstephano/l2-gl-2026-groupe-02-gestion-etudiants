<script setup>

import { reactive, ref, watch, computed } from 'vue'
import { validerEtudiant, estValide, nettoyerEtudiant } from '../utils/validation.js'

// 1) PROPS = données reçues du parent (App.vue)
const props = defineProps({
  etudiantAModifier: { type: Object, default: null },
  matriculesExistants: { type: Array, default: () => [] }
})

// 2) EMITS = événements que ce composant peut envoyer au parent
const emit = defineEmits(['ajouter', 'modifier', 'annuler'])

// 3) reactive() = un objet réactif (pratique pour un formulaire)
const formulaire = reactive({
  id: null, nom: '', prenom: '', matricule: '', email: '', niveau: 'L2'
})

const erreurs = ref({})

// Mode édition ou mode ajout ?
const estEnEdition = computed(() => props.etudiantAModifier !== null)

// 4) Quand le parent envoie un étudiant à modifier, on remplit le formulaire
watch(() => props.etudiantAModifier, (etudiant) => {
  if (etudiant) {
    Object.assign(formulaire, etudiant)
    erreurs.value = {}
  } else {
    viderFormulaire()
  }
})

function viderFormulaire() {
  Object.assign(formulaire, {
    id: null, nom: '', prenom: '', matricule: '', email: '', niveau: 'L2'
  })
  erreurs.value = {}
}

// 5) Validation + envoi au parent
function valider() {
  // En édition, on retire le matricule de l'étudiant courant de la liste
  // des matricules "déjà pris", sinon il se bloquerait lui-même.
  const dejaPris = estEnEdition.value
    ? props.matriculesExistants.filter(
        (m) => m !== (props.etudiantAModifier.matricule || '').toLowerCase()
      )
    : props.matriculesExistants

  erreurs.value = validerEtudiant(formulaire, dejaPris)
  if (!estValide(erreurs.value)) return

  const propre = nettoyerEtudiant({ ...formulaire })

  if (estEnEdition.value) {
    emit('modifier', propre)
  } else {
    delete propre.id
    emit('ajouter', propre)
  }
  viderFormulaire()
}

function annuler() {
  viderFormulaire()
  emit('annuler')
}
</script>

<template>
  <form class="carte" @submit.prevent="valider">
    <!-- v-if / v-else = affichage conditionnel -->
    <h2 v-if="estEnEdition">✏️ Modifier l'étudiant</h2>
    <h2 v-else>➕ Ajouter un étudiant</h2>

    <label>
      Nom *
      <!-- v-model = liaison à double sens entre l'input et la variable -->
      <input v-model="formulaire.nom" type="text" placeholder="Rakoto" :class="{ invalide: erreurs.nom }" />
      <small v-if="erreurs.nom" class="erreur">{{ erreurs.nom }}</small>
    </label>

    <label>
      Prénom *
      <input v-model="formulaire.prenom" type="text" placeholder="Hery" :class="{ invalide: erreurs.prenom }" />
      <small v-if="erreurs.prenom" class="erreur">{{ erreurs.prenom }}</small>
    </label>

    <label>
      Matricule *
      <input v-model="formulaire.matricule" type="text" placeholder="GL-2026-004" :class="{ invalide: erreurs.matricule }" />
      <small v-if="erreurs.matricule" class="erreur">{{ erreurs.matricule }}</small>
    </label>

    <label>
      Email
      <input v-model="formulaire.email" type="text" placeholder="hery@example.mg" :class="{ invalide: erreurs.email }" />
      <small v-if="erreurs.email" class="erreur">{{ erreurs.email }}</small>
    </label>

    <label>
      Niveau
      <select v-model="formulaire.niveau">
        <option>L1</option><option>L2</option><option>L3</option><option>M1</option>
      </select>
    </label>

    <div class="boutons">
      <button type="submit" class="btn-principal">
        {{ estEnEdition ? 'Enregistrer' : 'Ajouter' }}
      </button>
      <button v-if="estEnEdition" type="button" class="btn-secondaire" @click="annuler">
        Annuler
      </button>
    </div>
  </form>
</template>

<style scoped>
.carte {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
h2 { margin: 0 0 4px; font-size: 1.05rem; color: #1e293b; }
label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
}
input, select {
  padding: 9px 11px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 400;
  font-family: inherit;
}
input:focus, select:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -1px;
  border-color: #3b82f6;
}
input.invalide { border-color: #dc2626; background: #fef2f2; }
.erreur { color: #b91c1c; font-weight: 500; font-size: 0.75rem; }
.boutons { display: flex; gap: 8px; margin-top: 4px; }
button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.btn-principal { background: #2563eb; color: #fff; }
.btn-principal:hover { background: #1d4ed8; }
.btn-secondaire { background: #e2e8f0; color: #334155; }
.btn-secondaire:hover { background: #cbd5e1; }
</style>
