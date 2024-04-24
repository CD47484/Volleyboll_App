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
  left: 20%;
}
.silver{
  left: 13%;
}
.bronze{
  left: 5%;
}


@media only screen and (min-width: 700px) {
 .gold, .silver, .bronze{
  position: relative;
  text-align: center;
  color: white;
}
.gold{
  left: 8%;
}
.silver{
  left: -15%;
}
.bronze{
  left: -38%;
}
}
#nav {
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: 0%;
  right: 0%;
  top: 0%;
  height: 10%;
  min-height: 60px;
  align-items: center;
  z-index: 1;
  background-color: #124076;
}
#main {
  position: absolute;
  top: 10%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  height: fit-content;
  min-height: 90%;
  overflow: auto;
  background-image: url(./assets/Bakgrundsbild.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.hamburger{
  background-image: url(./assets/hamburger.png);
  position: relative;
  width: 50px;
  height: 43px;
  background-color: transparent;
  border:none;
  right:5px;
}
.volleyimg {
  position:absolute;
  z-index:150;
  height:3.5em;
  width:3.5em;
}
</style>