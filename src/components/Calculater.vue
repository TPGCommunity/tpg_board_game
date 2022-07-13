<script setup>
import { ref, computed } from "vue";

const blue = ref(0);
const red = ref(0);
const green = ref(0);

const blueTop = ref(0);
const redTop = ref(0);
const greenTop = ref(0);

const countBlue = computed(() => "Blue:"+blue.value);
const countRed = computed(() => "Red:"+red.value);
const countGreen = computed(() => "Green:"+green.value);

const init = ref(false)

const finishInit = () => {
    init.value = true;
    blue.value += blueTop.value
    red.value += redTop.value
    green.value += greenTop.value
}
</script>

<template>
    <div class="Top" v-if="init == false">
        Top
        <div>
            <label for="blueTop">BLUE</label>
            <select name="blueTop" id="blueTop" v-model.number="blueTop">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select>--
            <label for="redTop">RED</label>
            <select name="redTop" id="redTop" v-model.number="redTop">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select>--
            <label for="greenTop">GREEN</label>
            <select name="greenTop" id="greenTop" v-model.number="greenTop">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select>
        </div>
        <button @click="finishInit">決定</button>
    </div>

    <div v-if="init == true">
        <button @click="init = false">初期値を設定しなおす</button>
    </div>

    <div class="calculater" v-if="init == true">
        {{ countBlue }}
        {{ countRed }}
        {{ countGreen }}
    </div>

</template>

<style>
</style>