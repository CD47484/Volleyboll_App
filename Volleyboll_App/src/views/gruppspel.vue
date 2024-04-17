<script>
export default {
  name: 'App',
  data() {
    return {
      isVisible: {},
      tournament: []
    };
  },
  computed: {
    group1Data() {
      return this.tournament[0]?.groups?.[0]?.teams || [];
    },
    group2Data() {
      return this.tournament[0]?.groups?.[1]?.teams || [];
    },
    group3Data() {
      return this.tournament[0]?.groups?.[2]?.teams || [];
    },
    group4Data() {
      return this.tournament[0]?.groups?.[3]?.teams || [];
    },
    group5Data() {
      return this.tournament[0]?.groups?.[4]?.teams || [];
    },
    validGroup1Data() {
      return this.group1Data.filter(item => item);
    },
    validGroup2Data() {
      return this.group2Data.filter(item => item);
    },
    validGroup3Data() {
      return this.group3Data.filter(item => item);
    },
    validGroup4Data() {
      return this.group4Data.filter(item => item);
    },
    validGroup5Data() {
      return this.group5Data.filter(item => item);
    }
  },
  mounted() {
    this.fetchTournamentData();
  },
  methods: {
    fetchTournamentData() {
      fetch('https://volleyboll-dev-quiet-mountain-3664.fly.dev/tournament/info/?tournament_name=test2')
        .then(response => response.json())
        .then(data => {
          this.tournament = data.tournament;
          // In Vue 3, we directly set the property for reactivity.
          this.tournament.forEach((_, index) => {
            this.isVisible[index] = false;
          });
        })
        .catch(error => {
          console.error('Error fetching tournament data:', error);
        });
    },
    toggleVisibility(index) {
      // Directly toggle the boolean value for the index
      if (this.isVisible.hasOwnProperty(index)) {
        this.isVisible[index] = !this.isVisible[index];
      } else {
        // If it doesn't exist, Vue 3 will reactively add it.
        this.isVisible[index] = true;
      }
    },
    showPopup(groupId) {
      const myPopup = new Popup({
        id: `Grupp${groupId}`,
        title: `Grupp ${groupId}`,
        content: this.$refs[`group${groupId}Template`].innerHTML,
      });
      myPopup.show();
    },
    populateTable(tableId, data) {
      this.$nextTick(() => {
        let tableElement = document.getElementById(tableId);
        if (!tableElement) {
          console.error(`Table with id ${tableId} not found.`);
          return;
        }
        data.forEach((rowData) => {
          let row = tableElement.insertRow();
          Object.values(rowData).forEach((cellData) => {
            let cell = row.insertCell();
            cell.textContent = cellData;
          });
        });
      });
    }
  }
}
</script>


<template>
  <nav id="nav">
    <button class="hamburger" @click="Nav_burgur"></button>   
  </nav>

  <main id="main">
    <div class="search-container">
      <input type="text" class="search-input" placeholder="Search..">
      <button class="search-btn" @click="search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      </button>
    </div>

    <!-- Dynamic group rendering based on visibility and group data -->
    <div v-for="(groupData, index) in [validGroup1Data, validGroup2Data, validGroup3Data, validGroup4Data, validGroup5Data]" :key="'group-' + index">
      <button @click="toggleVisibility(index)" class="group-container" v-if="groupData.length > 0">
        <h3 class="Grupper">Grupp {{ index + 1 }}</h3>
        <p class="lag">IT21, IT23, IT22, IT24</p>
        <img class="pil" src="./assets/pngwing2.png" alt="dropdown-pil">
      </button>
      <div v-if="isVisible[index]" class="group-dropdown">
        <table :id="'group' + (index + 1)">
          <tr>
            <th>POS</th>
            <th>LAG</th>
            <th>S</th>
            <th>V</th>
            <th>F</th>
            <th>PS</th>
            <th>POÄ</th>
          </tr>
          <tr v-for="item in groupData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.games }}</td>
            <td>{{ item.wins }}</td>
            <td>{{ item.losses }}</td>
            <td>{{ item.lost_points }}</td>
            <td>{{ item.points }}/{{ item.lost_points }}</td>
          </tr>
        </table>
        <button @click="showPopup(index + 1)" class="popup-btn">Mer</button>
      </div>
    </div>
    <div v-for="i in 5" :ref="'group' + i + 'Template'" style="display: none;">
      <div>
        <table :id="'group' + i">
          <tr>
            <th>POS</th>
            <th>LAG</th>
            <th>S</th>
            <th>V</th>
            <th>F</th>
            <th>PS</th>
            <th>POÄ</th>
          </tr>
        </table>
      </div>
      <div id="nasta_match">Hello, testing new match information.</div>
    </div>

  </main>
</template>


<style scoped>
#nav {
  position: absolute;
  display: flex;
  left: 0%;
  right: 0%;
  top: 0%;
  height: 10%;
  align-items: center;
  background-color: darkgreen;
}
#main {
  position: absolute;
  top: 10%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  height: fit-content;
  min-height: 90%;
  background-image: url(./assets/Bakgrundsbild.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.Grupper{
  position: relative;
  color: black;
  text-align: left;
  width: fit-content;
  font-size: 20px;
  left: 40%;
  top: 0.6em;
  width: fit-content;
}
.lag{
  position: relative;
  color: black;
  text-align: left;
  left: 20%;
  top: 1em;
  font-size: 17px;
  width: fit-content;
}
.group-container {
  position: relative;
  left: 5%;
  margin: 5%;
  margin-bottom: 1.5%;
  height: 10%;
  width: 80%;
  background-color: white;
  border-radius: 10px;
  
}
.group-dropdown {
  position: relative;
  left: 5%;
  margin-left: 5%;
  margin-bottom: 5%;
  height: fit-content;
  width: 80%;
  background-color: white;
  color: black;
  border-radius: 10px;
}
.pil{
  position: relative;
  width: 40px;
  height: 30px;
  left: 39%;
  bottom: 0.8em;
  font-size: 23px;
}
.hamburger{
  background-image: url(./assets/hamburger.png);
  position: relative;
  width: 50px;
  height: 43px;
  left: 80%;
  background-color: transparent;
  border:none;
}
.search-container {
  position: relative;
  left: 5%;
  right: 5%;
  margin: 5%;
  height: 20px;
  width: 80%;
  align-items: center;
}
.search-input{
  position: relative;
  right: -5%;
  margin: 5%;
  height: 30px;
  width: 70%;
  align-items: center;
  border-radius: 7px;
}
.search-btn{
  position: relative;
  right: -5.2%;
  margin: -5%;
  top: 18%;
  height: 30px;
  width: 15%;
  align-items: center;
  border-radius: 7px;
}
.popup-btn {
  position: relative;
  margin-top: 2%;
  margin-bottom: 2%;
  cursor: pointer;
  background-color: grey;
  bottom: 0%;
  left: 35%; 
  width: 30%; 
  border-radius: 7px;
  /* Add more styles as needed */
}

#nasta_match {
  position: relative;
  margin: 5%;
  margin-bottom: 1.5%;
  height: 25%;
  width: 90%;
}

table {
  width: 100%;
  border-collapse: collapse; 
  margin-bottom: 10px;
}

th, tr {
  border-bottom: 1px solid black;
}

th:last-child, td:last-child, tr:last-child {
  border-right: none;
}
td {
  text-align: center;
}
@media (min-width: 600px) {
  #nav {
    position: absolute;
    display: flex;
    left: 0%;
    right: 0%;
    top: 0%;
    height: 16%;
    align-items: center;
    background-color: darkgreen;
  }
  #main{
    position: absolute;
    top: 16%;
    bottom: 0%;
    left: 0%;
    right: 0%;
    height: fit-content;
    min-height: 90%;
    background-image: url(./assets/Bakgrundsbild.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
