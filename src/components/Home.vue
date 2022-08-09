<script setup>
import { ref } from "vue";
import Calculater from './Calculater.vue';
import UpdateInfo from './Modals/UpdateInfo.vue';

const showModal = ref(false);
const updateInfoModal = ref(false);
const openModal = (modalName) => {
    showModal.value = true
    if (modalName = 'update') {
        updateInfoModal.value = true
    }
}
</script>

<template>
    <div class="header">
        <h1>Prime Dragon</h1>
        <div class="info">
            <a href="https://takiplazagardener.wixsite.com/official" target="_blank" rel="noopener noreferrer">
                AboutUs "TPG"</a> |
            <a href="https://mobile.twitter.com/ikura_hamu_pr" target="_blank" rel="noopener noreferrer">
                Contact to the page creator</a>
        </div>
        <div>
            <button @click="openModal('update')">Update Info</button>
        </div>
    </div>
    <Calculater />
    <UpdateInfo @close="showModal=false; updateInfoModal=false" v-if="showModal && updateInfoModal" />
</template>