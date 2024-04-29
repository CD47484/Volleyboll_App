<script setup>
import AdminDropdown from '@/components/AdminDropdown.vue'
import { ref } from 'vue'
import * as api from '@/assets/api.js'

const props = defineProps(['user', 'token'])
const emits = defineEmits(['next'])

const tournamentIn = ref('')
const tournament = ref(null)

const error = ref('')
const popupError = ref('')
const popupMessage = ref('')

const teamIn = ref('')
const team = ref('')

const groupAmount = ref(2)
const group = ref('')
const groupIn = ref('')

getTournament()

function getTournament() {
  api.apiGet(`tournament/info/?token=${props.token}`, function (data, res) {
    if (res) {
      tournament.value = data.tournament[0]
    }
  })
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

function createTournament() {
  api.apiPost(
    `tournament/?tournament_name=${tournamentIn.value}&token=${props.token}`,
    function (data, res) {
      if (!res) {
        if (data?.detail == 'User already has a tournament') {
          error.value = 'Något gick fel, du borde inte vara här'
          return
        }
        error.value = 'Kunde inte skapa turnering, försök igen senare'
        return
      }
      tournament.value = data
    }
  )
}

function updateTournament() {
  if (!tournamentIn.value) {
    popupError.value = 'Turneringen måste ha ett namn'
    return
  }
  api.apiPut(
    `tournament/${tournament.value.name}/?new_tournament_name=${tournamentIn.value}&token=${props.token}`,
    function (data, res) {
      if (!res) {
        if (data.detail == 'Tournament name already exists') {
          popupError.value = 'Turneringsnamnet används redan'
          return
        }
        popupError.value = 'Något gick fel'
        return
      }
      getTournament()
    }
  )
}

function deleteTournament() {
  api.apiDelete(`tournament/${tournament.value.name}/?token=${props.token}`, function (data, res) {
    if (!res) {
      popupError.value = 'Något gick fel'
      return
    }
    closePopup('')
    tournament.value = null
  })
}

function createTeam() {
  if (teamIn.value == '') {
    popupError.value = 'Laget måste ha ett namn'
    return
  }
  api.apiPost(`team/?team_name=${teamIn.value}&token=${props.token}`, function (data, res) {
    if (!res) {
      popupError.value = 'Något gick fel'
      return
    }
    getTournament()
    closePopup('')
  })
}

function updateTeam() {
  api.apiPut(
    `team/${team.value}/?new_name=${teamIn.value}&token=${props.token}`,
    function (data, res) {
      if (!res) {
        popupError.value = 'Något gick fel'
        return
      }
      team.value = teamIn.value
      getTournament()
    }
  )
}

function deleteTeam() {
  api.apiDelete(`team/?token=${props.token}&team_name=${team.value}`, function (data, res) {
    if (!res) {
      popupError.value = 'Något gick fel'
      return
    }
    getTournament()
    closePopup('')
  })
}

function bulkGroup() {
  if (
    groupAmount.value < 1 ||
    groupAmount.value > Math.floor(tournament.value.teams.length * 0.5)
  ) {
    return
  }

  api.apiPost(
    `group/bulk/?num_groups=${groupAmount.value}&token=${props.token}`,
    function (data, res) {
      if (res) {
        getTournament()
      }
    }
  )
}

function createGroup() {
  if (!groupIn.value) {
    popupError.value = 'Gruppen måste ha ett namn'
    return
  }
  api.apiPost(`group/?group_name=${groupIn.value}&token=${props.token}`, function (data, res) {
    if (!res) {
      //WIP
      console.log(data)
      return
    }
    getTournament()
    closePopup('')
  })
}

function updateGroup() {
  if (!groupIn.value) {
    popupError.value = 'Gruppen måste ha ett namn'
    return
  }
  api.apiPut(
    `group/${group.value}/?new_group_name=${groupIn.value}&token=${props.token}`,
    function (data, res) {
      if (!res) {
        //WIP
        console.log(data)
        return
      }
      group.value = groupIn.value
      getTournament()
    }
  )
}

function deleteGroup() {
  api.apiDelete(`group/${group.value}/?token=${props.token}`, function (data, res) {
    if (!res) {
      popupError.value = 'Något gick fel'
      return
    }
    getTournament()
    closePopup('')
  })
}

function toggleGroupTeam(t) {
  if (!tournament.value.groups.find((i) => i.name == group.value)?.teams.find((i) => i.name == t)) {
    for (let g of tournament.value.groups) {
      if (g.teams.find((i) => i.name == t)) {
        api.apiDelete(
          `group/team/?group_name=${g.name}&team_name=${t}&token=${props.token}`,
          function (data, res) {
            if (res) {
              getTournament()
            }
            return
          }
        )
      }
    }
    api.apiPost(
      `group/team/?group_name=${group.value}&team_name=${t}&token=${props.token}`,
      function (data, res) {
        if (res) {
          getTournament()
        }
        return
      }
    )
  }
  api.apiDelete(
    `group/team/?group_name=${group.value}&team_name=${t}&token=${props.token}`,
    function (data, res) {
      if (res) {
        getTournament()
      }
      return
    }
  )
}

function groupTeamStatus(t) {
  if (tournament.value.groups.find((i) => i.name == group.value)?.teams.find((i) => i.name == t)) {
    return 'background-color:hsl(100,50%,50%); border: 0.125rem solid hsl(100,50%,50%);'
  }
  return 'background-color:unset; border: 0.125rem solid hsl(0,0%,100%);'
}

function inOtherGroup(t) {
  if (tournament.value.groups.find((i) => i.name == group.value)?.teams.find((i) => i.name == t)) {
    return false
  }
  for (let g of tournament.value.groups) {
    if (g.teams.find((i) => i.name == t)) {
      return true
    }
  }
  return false
}

function beginGroupGames() {
  api.apiPost(`group_match/?token=${props.token}`, function (data, res) {
    if (res) {
      emits('next', 'group')
    }
  })
}
</script>

<template>
  <template v-if="!tournament">
    <div class="label">Du har inte skapat en turnering ännu</div>
    <input
      type="text"
      class="full"
      id="tname-input"
      placeholder="Turneringsnamn"
      :value="tournamentIn"
      @blur="
        (e) => {
          tournamentIn = e.target.value
        }
      "
    />
    <div class="full btn" @click="createTournament">Skapa Turnering</div>
    <div v-if="error" class="label error">{{ error }}</div>
  </template>
  <template v-else>
    <div id="createteamP" style="display: none" class="popup" @click="closePopup">
      <div>
        <h2>Skapa nytt lag</h2>
        <div class="label">Lagnamn:</div>
        <input
          type="text"
          class="btn pop-input"
          placeholder="Lagnamn"
          @blur="
            (e) => {
              teamIn = e.target.value
            }
          "
        />
        <div v-if="popupError" class="label error">{{ popupError }}</div>
        <div class="btn" @click="createTeam">Skapa lag</div>
      </div>
    </div>
    <div id="teamP" style="display: none" class="popup" @click="closePopup">
      <div>
        <h2>Laguppgifter, {{ team }}</h2>
        <div class="label">Lagnamn:</div>
        <input
          type="text"
          class="btn pop-input"
          :value="team"
          placeholder="Lagnamn"
          @blur="
            (e) => {
              teamIn = e.target.value
            }
          "
        />
        <div class="btn" @click="updateTeam">Spara</div>
        <div class="btn" @click="deleteTeam">Ta bort {{ team }}</div>
        <div v-if="popupError" class="label error">{{ popupError }}</div>
      </div>
    </div>
    <div id="tournamentP" style="display: none" class="popup" @click="closePopup">
      <div>
        <h2>{{ tournament.name }}</h2>
        <div class="label">Turneringsnamn:</div>
        <input
          type="text"
          class="btn pop-input"
          :value="tournament.name"
          placeholder="Turneringsnamn"
          @blur="
            (e) => {
              tournamentIn = e.target.value
            }
          "
        />
        <div class="btn" @click="updateTournament">Spara</div>
        <div class="btn" @click="deleteTournament">Ta bort {{ tournament.name }}</div>
        <div v-if="popupError" class="label error">{{ popupError }}</div>
      </div>
    </div>
    <div id="creategroupP" style="display: none" class="popup" @click="closePopup">
      <div>
        <h2>Skapa ny grupp</h2>
        <div class="label">Gruppnamn:</div>
        <input
          type="text"
          class="btn pop-input"
          placeholder="Gruppnamn"
          @blur="
            (e) => {
              groupIn = e.target.value
            }
          "
        />
        <div v-if="popupError" class="label error">{{ popupError }}</div>
        <div class="btn" @click="createGroup">Skapa grupp</div>
      </div>
    </div>
    <div id="groupP" style="display: none" class="popup" @mousedown="closePopup">
      <div>
        <h2>Gruppöversikt, {{ group }}</h2>
        <div class="label">Gruppnamn:</div>
        <input
          type="text"
          class="btn pop-input"
          :value="group"
          placeholder="Gruppnamn"
          @blur="
            (e) => {
              groupIn = e.target.value
            }
          "
        />
        <div class="btn" @click="updateGroup">Spara</div>
        <div class="btn" @click="deleteGroup">Ta bort {{ group }}</div>
        <div class="label">Medvalda lag:</div>
        <div class="bar" id="group-teams">
          <template v-for="t in tournament.teams" :key="t.name">
            <div
              v-if="!inOtherGroup(t.name)"
              :style="groupTeamStatus(t.name)"
              @click="toggleGroupTeam(t.name)"
            >
              {{ t.name }}
            </div>
          </template>
        </div>
        <div v-if="popupError" class="label error">{{ popupError }}</div>
      </div>
    </div>
    <div id="tournament-edit" class="bar" @click="openPopup('tournamentP')">
      <h1>{{ tournament.name }}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="#ffffff"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
        <path d="M13.5 6.5l4 4" />
      </svg>
    </div>
    <AdminDropdown
      @addclick="openPopup('createteamP')"
      @itemclick="
        (e) => {
          team = e.name
          openPopup('teamP')
        }
      "
      title="Lag"
      :icon="`
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.5rem' height='1.5rem'
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
        <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
        <path d='M5 14h14l-4.5 -4.5l4.5 -4.5h-14v16' />
      </svg>
      `"
      :items="tournament.teams"
    />
    <div class="full bar">
      <div class="btn" style="flex-grow: 1" @click="bulkGroup">Slumpmässig gruppering</div>
      <input
        id="group-amount"
        class="btn"
        type="number"
        placeholder="Antal"
        min="1"
        value="2"
        :max="Math.floor(tournament.teams.length * 0.5)"
        @blur="
          (e) => {
            if (e.target.value < 1) {
              e.target.value = 1
            }
            if (e.target.value > Math.floor(tournament.teams.length * 0.5)) {
              e.target.value = Math.floor(tournament.teams.length * 0.5)
            }
            groupAmount = e.target.value
          }
        "
      />
    </div>
    <AdminDropdown
      @addclick="openPopup('creategroupP')"
      @itemclick="
        (e) => {
          group = e.name
          openPopup('groupP')
        }
      "
      title="Grupper"
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
        <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
        <path d='M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1' />
        <path d='M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M17 10h2a2 2 0 0 1 2 2v1' />
        <path d='M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M3 13v-1a2 2 0 0 1 2 -2h2' />
      </svg>
      `"
      :items="tournament.groups"
    />
    <div
      v-if="tournament.teams.length >= 2 && tournament.groups.length >= 1"
      class="fresh full btn"
      @click="beginGroupGames()"
    >
      Fortsätt till gruppspel
    </div>
  </template>
</template>

<style scoped>
@import '@/assets/adminview.css';

#return-btn {
  background-color: hsl(0, 0%, 40%);
  padding: 0.5rem;
  border-radius: 0.5rem;

  cursor: pointer;
  transition: filter 0.125s linear;
}

#return-btn:hover {
  filter: brightness(105%);
}

#tname-input {
  padding: 1.25rem;
  margin: 0.5rem;
  border: 0;
  border-radius: 1rem;
  font-weight: bold;
}

#tournament-edit {
  cursor: pointer;
}

#group-amount {
  text-align: center;
  background-color: white;
  border: 0;
  width: 6rem;
  height: calc(100% - 1rem);
  box-sizing: border-box;
}

#group-teams {
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0.25rem;
}

#group-teams > * {
  flex-grow: 1;
  background-color: hsl(0, 0%, 35%);
  margin: 0.25rem;
  padding: 1rem;
  border-radius: 1rem;
}
</style>