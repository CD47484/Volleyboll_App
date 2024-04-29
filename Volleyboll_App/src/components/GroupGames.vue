<script setup>
import AdminDropdown from '@/components/AdminDropdown.vue'
import { ref } from 'vue'
import * as api from '@/assets/api.js'

const props = defineProps(['user', 'token'])

const error = ref('')
const popupError = ref('')
const popupMessage = ref('')

const remaining = ref([])
const ongoing = ref([])
const played = ref([])

const match = ref({})
const matchSets = ref({
  465: [
    { team1: 0, team2: 0 },
    { team1: 1, team2: 0 }
  ]
})

getMatches()

function getMatches() {
  api.apiGet(`group_match/info/?token=${props.token}`, function (data, res) {
    if (!res) {
      error.value = 'Kunde inte hämta gruppspel'
      return
    }
    remaining.value = []
    played.value = []
    for (let m of data.groups_matches) {
      const name = { name: `${m.team1_name} - ${m.team2_name}` }
      if (m.is_completed) {
        played.value.push({ ...m, ...name })
      } else if (m.active) {
        ongoing.value.push({ ...m, ...name })
      } else {
        remaining.value.push({ ...m, ...name })
      }
    }
  })
}

function beginMatch() {
  if (!match.value) {
    return
  }
  api.apiPut(
    `group_match/active/${match.value.id}/?token=${props.token}&active=true`,
    function (data, res) {
      if (res) {
        getMatches()
      }
    }
  )
}

function openPopup(name) {
  closePopup('')
  document.getElementById(name).style.display = null
  popupError.value = null
  popupMessage.value = null
}

function closePopup(e) {
  if (typeof e == 'string') {
    if (e == '') {
      const popups = document.getElementsByClassName('popup')
      for (let popup of popups) {
        popup.style.display = 'none'
      }
      return
    }

    document.getElementById(e).style.display = 'none'
    return
  }
  if (e.target.classList.contains('popup')) {
    e.target.style.display = 'none'
  }
}
</script>

<template>
  <div id="matchP" class="popup" style="display: none" @click="closePopup">
    <div>
      <h2>{{ match.team1_name }} <span style="font-weight: normal;">vs</span> {{ match.team2_name }}</h2>
      <div v-if="!match.active" class="fresh btn" @click="beginMatch()">Påbörja match</div>
      <template v-else>
        <div class="btn">Nytt set</div>
        <table class="full" id="set-table">
          <tr>
            <th>Set</th>
            <th>Poäng - {{ match.team1_name }}</th>
            <th>Poäng - {{ match.team2_name }}</th>
          </tr>
          <tr v-for="(set, i) in matchSets[match.id]" :key="set.team1 + set.team2">
            <td>{{ i+1 }}</td>
            <td>
              <input class="set-input" type="number" placeholder="Poäng" :value="set.team1" />
            </td>
            <td>
              <input class="set-input" type="number" placeholder="Poäng" :value="set.team2" />
            </td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="set-remove"
              >
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </td>
          </tr>
        </table>
        <div class="fresh btn">Avsluta match</div>
      </template>
    </div>
  </div>
  <h1>Gruppspel</h1>
  <div v-if="error" class="label error">{{ error }}</div>
  <AdminDropdown
    @addclick="console.log('add')"
    @itemclick="
      (e) => {
        match = e
        openPopup('matchP')
      }
    "
    noadd="y"
    title="Återstående"
    :icon="`
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.5rem'
        height='1.5rem'
        viewBox='0 0 24 24'
        stroke-width='2'
        stroke='#ffffff'
        fill='none'
        stroke-linecap='round'
        stroke-linejoin='round'
        style='
          background-color: hsl(100, 50%, 50%);
          border-bottom-left-radius: 1rem;
          border-top-left-radius: 0rem;
        '
        >
        <path d='M5 14h14v-9h-14v16' />
      </svg>
    `"
    :items="remaining"
  />
  <AdminDropdown
    @addclick="console.log('add')"
    @itemclick="
      (e) => {
        match = e
        openPopup('matchP')
      }
    "
    noadd="y"
    title="Pågående"
    :icon="`
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5rem'
      height='1.5rem'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#ffffff'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      style='
        background-color: hsl(100, 50%, 50%);
        border-bottom-left-radius: 1rem;
        border-top-left-radius: 0rem;
      '
      >
      <path d='M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z' />
      <path d='M5 21v-7' />
    </svg>
    `"
    :items="ongoing"
  />
  <AdminDropdown
    @addclick="console.log('add')"
    @itemclick="
      (e) => {
        match = e
        openPopup('matchP')
      }
    "
    noadd="y"
    title="Spelade"
    :icon="`
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.5rem'
        height='1.5rem'
        viewBox='0 0 24 24'
        stroke-width='2'
        stroke='#ffffff'
        fill='none'
        stroke-linecap='round'
        stroke-linejoin='round'
        style='
          background-color: hsl(100, 50%, 50%);
          border-bottom-left-radius: 1rem;
          border-top-left-radius: 0rem;
        '
        >
        <path
          d='M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z'
          stroke-width='0'
          fill='currentColor'
        />
      </svg>
    `"
    :items="played"
  />
</template>

<style scoped>
@import '@/assets/adminview.css';

#set-table {
  border-spacing: 0.5rem;
  background-color: hsl(0, 0%, 40%);
  width: calc(100% - 1rem);
  margin: 0.5rem;
  padding: 1.25rem;
  border-radius: 1rem;
}

#set-table > tr > * {
  padding: 0;
}

.set-input {
  background-color: white;
  border: 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.set-remove {
  width: 1.5rem;
  height: 1.5rem;
}
</style>