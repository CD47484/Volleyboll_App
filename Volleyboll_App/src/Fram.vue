<script>
import { RouterLink, RouterView } from 'vue-router'
import gruppspel from './views/gruppspel.vue';
import slutspel from './views/slutspel.vue';

export default {
  data() {
    return {
      activeTab: 'home',
    };
  },
  methods: {
    Nav_burgur() {
      const myPopup4 = new Popup({
        id: "Burger",
        title: "WOW",
        content: this.$refs.Olika_view.innerHTML,
      });
      myPopup4.show();
    },
  },
};

</script>

<template>
  <nav id="nav">
      <img class="volleyimg" src="./assets/volleybollnobg.png">
    
      <div class="gold">
        <img class="goldimg" src="@/assets/gold.png">
        <div class="goldteam">IT21</div>
      </div>
      <div class="silver">
        <img class="silverimg" src="@/assets/silver.png">
        <div class="silverteam">IT22</div>
      </div>
      <div class="bronze">
        <img class="bronzeimg" src="@/assets/bronze.png">
        <div class="bronzeteam">MERK 40</div>
      </div>
      <button class="hamburger" @click="Nav_burgur"></button>   
  </nav>

  <main id="main">
    <div ref="Olika_view" style="display: none;">
      <div>
        <RouterLink to="/gruppspel">gruppspel</RouterLink>
      </div>
      <div>
        <RouterLink to="/slutspel">slutspel</RouterLink>
      </div>
      <div>
        <RouterLink to="/app">admin</RouterLink>
      </div>
    </div>

    <RouterView />
    </main>
</template>

<style scoped>

.gold, .silver, .bronze{
  position: relative;
  text-align: center;
  color: white;
}
.gold{
  left: 23%;
}
.silver{
  left: 16%;
}
.bronze{
  left: 9%;
}
#nav {
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: 0%;
  right: 0%;
  top: 0%;
  height: 12%;
  min-height: 60px;
  align-items: center;
  z-index: 150;
  background-color: #124076;
}
#main {
  position: absolute;
  top: 12%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  height: fit-content;
  min-height: 88%;
  overflow: auto;
  background-image: url(./assets/Bakgrundsbild.png);
  background-repeat: no-repeat;
  background-size: cover;
}
@media only screen and (max-height: 700px) {
  #nav {
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: 0%;
  right: 0%;
  top: 0%;
  height: 15%;
  min-height: 60px;
  align-items: center;
  z-index: 1;
  background-color: #124076;
}
#main {
  position: absolute;
  top: 15%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  height: fit-content;
  min-height: 85%;
  overflow: auto;
  background-image: url(./assets/Bakgrundsbild.png);
  background-repeat: no-repeat;
  background-size: cover;
}
}
  
@media only screen and (min-width: 700px) {
 .gold, .silver, .bronze{
  position: relative;
  text-align: center;
  color: white;
}
.gold{
  left: 12%;
}
.silver{
  left: -8%;
}
.bronze{
  left: -30%;
}

#nav {
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: 0%;
  right: 0%;
  top: 0%;
  height: 15%;
  min-height: 60px;
  align-items: center;
  z-index: 1;
  background-color: #124076;
}
#main {
  position: absolute;
  top: 15%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  height: fit-content;
  min-height: 85%;
  overflow: auto;
  background-image: url(./assets/Bakgrundsbild.png);
  background-repeat: no-repeat;
  background-size: cover;
}
}

@media only screen and (max-height:550px){
  .goldteam, .silverteam, .bronzeteam{
  
  font-size:15px;
}
.goldimg, .silverimg, .bronzeimg{
  width:24px;
  height:32px;
}
}

.hamburger{
  background-image: url(./assets/hamburger.png);
  position: relative;
  width: 50px;
  height: 43px;
  background-color: transparent;
  border:none;
  right:2%;
}
.volleyimg {
  position:absolute;
  z-index:150;
  height:3.5em;
  width:3.5em;
  left: 1%;
}
</style>