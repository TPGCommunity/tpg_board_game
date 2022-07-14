<script setup>
import {ref} from "vue";

var a = ref(0);

const f = (b,c) => {
    a.value = a.value + b + c;
}
</script>

<template>
    <button @click="f(3,5)">{{a}}</button>
</template>