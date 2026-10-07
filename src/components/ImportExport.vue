<script setup>
/* =========================================================
   ImportExport.vue  —  PÔLE 6 (Import/Export)
   ---------------------------------------------------------
   Exporter la liste en CSV et réimporter un CSV.
   Tout se passe dans le navigateur : aucun serveur.

   Montre : refs sur le DOM, l'API File, Blob, emit.
   ========================================================= */

import { ref } from 'vue'

const props = defineProps({
  etudiants: { type: Array, required: true }
})

const emit = defineEmits(['importer'])

const champFichier = ref(null)   // référence vers <input type="file">
const message = ref('')

const COLONNES = ['nom', 'prenom', 'matricule', 'email', 'niveau']

// ---------- EXPORT ----------
function exporterCSV() {
  if (props.etudiants.length === 0) {
    message.value = 'Aucun étudiant à exporter.'
    return
  }

  const lignes = [COLONNES.join(',')]
  for (const e of props.etudiants) {
    const valeurs = COLONNES.map((col) => echapper(e[col] ?? ''))
    lignes.push(valeurs.join(','))
  }

  const contenu = '\uFEFF' + lignes.join('\n')   // BOM : accents corrects dans Excel
  const blob = new Blob([contenu], { type: 'text/csv;charset=utf-8;' })

  const lien = document.createElement('a')
  lien.href = URL.createObjectURL(blob)
  lien.download = `etudiants-${new Date().toISOString().slice(0, 10)}.csv`
  lien.click()
  URL.revokeObjectURL(lien.href)

  message.value = `${props.etudiants.length} étudiant(s) exporté(s).`
}

function echapper(valeur) {
  const texte = String(valeur)
  // Si la valeur contient une virgule, un guillemet ou un saut de ligne → on la protège
  if (/[",\n]/.test(texte)) {
    return '"' + texte.replace(/"/g, '""') + '"'
  }
  return texte
}

// ---------- IMPORT ----------
function declencherImport() {
  champFichier.value.click()
}

function lireFichier(evenement) {
  const fichier = evenement.target.files[0]
  if (!fichier) return

  const lecteur = new FileReader()
  lecteur.onload = () => {
    try {
      const liste = analyserCSV(lecteur.result)
      if (liste.length === 0) {
        message.value = 'Le fichier ne contient aucun étudiant valide.'
        return
      }
      emit('importer', liste)
      message.value = `${liste.length} étudiant(s) importé(s).`
    } catch (e) {
      message.value = 'Fichier illisible : ' + e.message
    }
    evenement.target.value = ''   // permet de réimporter le même fichier
  }
  lecteur.readAsText(fichier, 'UTF-8')
}

function analyserCSV(texte) {
  const lignes = texte.replace(/^\uFEFF/, '').trim().split(/\r?\n/)
  if (lignes.length < 2) return []

  const entetes = lignes[0].split(',').map((h) => h.trim().toLowerCase())

  return lignes.slice(1).map((ligne) => {
    const cellules = decouper(ligne)
    const etudiant = { nom: '', prenom: '', matricule: '', email: '', niveau: 'L2' }
    entetes.forEach((entete, i) => {
      if (COLONNES.includes(entete)) {
        etudiant[entete] = (cellules[i] || '').trim()
      }
    })
    return etudiant
  }).filter((e) => e.nom && e.matricule)
}

// Découpe une ligne CSV en tenant compte des guillemets
function decouper(ligne) {
  const resultat = []
  let courant = ''
  let dansGuillemets = false

  for (let i = 0; i < ligne.length; i++) {
    const c = ligne[i]
    if (c === '"') {
      if (dansGuillemets && ligne[i + 1] === '"') { courant += '"'; i++ }
      else dansGuillemets = !dansGuillemets
    } else if (c === ',' && !dansGuillemets) {
      resultat.push(courant)
      courant = ''
    } else {
      courant += c
    }
  }
  resultat.push(courant)
  return resultat
}
</script>

<template>
  <div class="import-export">
    <button class="btn" @click="exporterCSV">⬇ Exporter CSV</button>
    <button class="btn" @click="declencherImport">⬆ Importer CSV</button>

    <!-- champ caché, déclenché par le bouton ci-dessus -->
    <input
      ref="champFichier"
      type="file"
      accept=".csv,text/csv"
      class="cache"
      @change="lireFichier"
    />

    <!-- v-if : le message n'apparaît qu'après une action -->
    <span v-if="message" class="message">{{ message }}</span>
  </div>
</template>

<style scoped>
.import-export {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
}
.btn {
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #475569;
  padding: 7px 13px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.btn:hover { background: #f1f5f9; }
.cache { display: none; }
.message {
  font-size: 0.78rem;
  color: #15803d;
  background: #f0fdf4;
  padding: 4px 9px;
  border-radius: 6px;
}
</style>
