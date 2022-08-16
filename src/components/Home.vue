<script setup>
import { ref } from "vue";
import Calculater from './Calculater.vue';
import SideBar from './SideBar.vue';
import UpdateInfo from './Modals/UpdateInfo.vue';

const showSideBar = ref(false);
const openSideBar = () => {
    showSideBar.value = true
}

const updateInfoModal = ref(false);
const openModal = (modalName) => {
    if (modalName = 'update') {
        updateInfoModal.value = true
    }
}
</script>

<template>
    <div class="header">
        <div @click="openSideBar" class="open-side-bar">
            <p><span></span>MENU</p>
        </div>
        <h1>Prime Dragon</h1>
    </div>

    <SideBar v-if="showSideBar" @update="openModal('update')" @closeSideBar="showSideBar = false" />
    <Calculater />
    <UpdateInfo v-if="updateInfoModal" @closeModal="updateInfoModal = false" />
</template>

<style>
.open-side-bar {
    display: flex;
    align-items: left;
    justify-content: left;
    position: fixed;
    vertical-align: top;
}

.open-side-bar p span::before {
    content: "\25B6";
    color: black;
    display: inline-block;
    padding-left: 20px;
}
</style>