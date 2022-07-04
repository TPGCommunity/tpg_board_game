<script setup >
import { ref, computed } from "vue";

var blue = ref(0);
var red = ref(0);
var green = ref(0);

const countBlue = computed(() => "BLUE:" + blue.value);
const countRed = computed(() => "RED:" + red.value);
const countGreen = computed(() => "GREEN:" + green.value);

var init = ref(false);

const finishInit = () => {
    init.value = true;
};
</script>

<template>
    <div class="start" v-if="init == false">
        Start
        <div>
            <label for="blueStart">BLUE</label>
            <select name="blueStart" id="blueStart">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select>--
            <label for="redStart">RED</label>
            <select name="redStart" id="redStart">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select>--
            <label for="greenStart">GREEN</label>
            <select name="greenStart" id="greenStart">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select>
        </div>
        <button @click="init = true; blue = blueStart">決定</button>
    </div>
    <div v-if="init == true">
        <button @click="init = false">初期値を設定しなおす</button>
    </div>

    <div class="calculater" v-if="init == true">
        <div class="blue">
            <div>{{ countBlue }}</div>
            <button @click="blue = blue + 1">+1</button>
            <button @click="blue = blue + 2">+2</button>
            <button @click="blue = blue + 3">+3</button>
            <button @click="blue = blue + 4">+4</button>
            <button @click="blue = blue + 5">+5</button>--
            <button @click="blue = blue - 1">-1</button>
            <button @click="blue = blue - 2">-2</button>--
            <button @click="blue = blue * 2">x2</button>
            <button @click="blue = blue * 3">x3</button>
            <button @click="blue = blue * 5">x5</button>
            ---
            <button @click="blue = 0">reset</button>
        </div>
        <div class="red">
            <div>{{ countRed }}</div>----
            <button @click="red = red + 1">+1</button>
            <button @click="red = red + 2">+2</button>
            <button @click="red = red + 3">+3</button>
            <button @click="red = red + 4">+4</button>
            <button @click="red = red + 5">+5</button>--
            <button @click="red = red - 1">-1</button>
            <button @click="red = red - 2">-2</button>--
            <button @click="red = red * 2">x2</button>
            <button @click="red = red * 3">x3</button>
            <button @click="red = red * 5">x5</button>
            ---
            <button @click="red = 0">reset</button>
        </div>
        <div class="green">
            <div>{{ countGreen }}</div>----
            <button @click="green = green + 1">+1</button>
            <button @click="green = green + 2">+2</button>
            <button @click="green = green + 3">+3</button>
            <button @click="green = green + 4">+4</button>
            <button @click="green = green + 5">+5</button>--
            <button @click="green = green - 1">-1</button>
            <button @click="green = green - 2">-2</button>--
            <button @click="green = green * 2">x2</button>
            <button @click="green = green * 3">x3</button>
            <button @click="green = green * 5">x5</button>
            ---
            <button @click="green = 0">reset</button>
        </div>
    </div>
</template>

<style>
</style>