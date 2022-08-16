<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
//import HelloWorld from './components/HelloWorld.vue';
//import Calculater from './components/Calculater.vue';
//import UpdateInfo from './components/Modals/UpdateInfo.vue';
//import Test from './components/Test.vue';

import Home from './components/Home.vue'

/*const showModal = ref(false);
const updateInfoModal = ref(false);
const openModal = (modalName) => {
  showModal.value = true
  if (modalName = 'update') {
    updateInfoModal.value = true
  }
}*/
</script>

<template>
  <!--<div class="header">
    <h1>Prime Dragon</h1>
    <div class="info">
      <a href="https://takiplazagardener.wixsite.com/official">ABOUT US "TPG"</a> |
      <a href="https://mobile.twitter.com/ikura_hamu_pr">Contact to the page creator</a>
    </div>
    <div>
      <button @click="openModal('update')">Update Info</button>
    </div>
  </div>-->
  <!--<img alt="Vue logo" src="./assets/logo.png" />-->
  <!--<HelloWorld msg="Hello Vue 3 + Vite" />-->
  <Home />
  <!--<Test />-->
  <!--<UpdateInfo @close="showModal=false; updateInfoModal=false" v-if="showModal && updateInfoModal" />-->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.info {
  text-align: right;
}
</style>
