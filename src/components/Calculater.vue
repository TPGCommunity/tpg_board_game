<script setup>
import { ref, computed } from "vue";

const blue = ref(0);
const red = ref(0);
const green = ref(0);

const blueTop = ref(7);
const redTop = ref(8);
const greenTop = ref(9);

const blueCount = computed(() => "Blue:" + blue.value);
const redCount = computed(() => "Red:" + red.value);
const greenCount = computed(() => "Green:" + green.value);

const init = ref(false)

const blueList = ref([]);
const redList = ref([]);
const greenList = ref([]);

const blueBomb = ref(false);
const redBomb = ref(false);
const greenBomb = ref(false);

const finishInit = () => {
    init.value = true;
    blue.value += blueTop.value
    red.value += redTop.value
    green.value += greenTop.value

    blueList.value = [["top:", blue.value]]
    redList.value = [["top:", red.value]]
    greenList.value = [["top:", green.value]]
}

const add = (color, operator, num) => {
    if (color == "blue") {
        blueList.value.push([operator, num])
        blue.value = calc(blueList.value)
    } else if (color == "red") {
        redList.value.push([operator, num])
        red.value = calc(redList.value)
    } else if (color == "green") {
        greenList.value.push([operator, num])
        green.value = calc(greenList.value)
    }
}

const deleteLast = (color) => {
    if (color == "blue") {
        blueList.value.pop()
        blue.value = calc(blueList.value)
    } else if (color == "red") {
        redList.value.pop()
        red.value = calc(redList.value)
    } else if (color == "green") {
        green.value = calc(greenList.value)
    }
}
const calc = (list) => {
    var n = 0
    for (const [operator, num] of list) {
        if (operator == "top:") {
            n = num
        } else if (operator == "+") {
            n += num
        } else if (operator == "-") {
            n -= num
        } else if (operator == "x") {
            n = n * num
        }
    }
    return n
}
</script>

<template>
    <h1>計算システム</h1>
    <div class="Top" v-if="init == false">
        <strong>TOP</strong>
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
        <button @click="init = false; blue = 0; red = 0; green = 0">トップカードを設定しなおす</button>
    </div>

    <div class="calculater" v-if="init == true">
        <div class="cards-list">
            <div class="blue">
                <strong>{{ blueCount }}</strong>
                <div class="blueButtons">
                    <div>
                        <button @click="add('blue', '+', 1)">+1</button>
                        <button @click="add('blue', '+', 2)">+2</button>
                        <button @click="add('blue', '+', 3)">+3</button>
                        <button @click="add('blue', '+', 4)">+4</button>
                    </div>
                    <div>
                        <button @click="add('blue', '+', 5)">+5</button>
                        <button @click="add('blue', '+', 6)">+6</button>
                        <button @click="add('blue', '+', 10)">+10</button>
                    </div>
                    <div>
                        <button @click="add('blue', '-', 1)">-1</button>
                        <button @click="add('blue', '-', 2)">-2</button>
                        <button @click="add('blue', 'x', 2)">x2</button>
                        <button @click="add('blue', 'x', 3)">x3</button>
                        <button @click="add('blue', 'x', 5)">x5</button>
                    </div>
                    <div>
                        <button @click="deleteLast('blue')">取り消す</button>
                    </div>
                </div>
                <div v-for="blueCard in blueList">
                    <div>{{ blueCard[0] }}{{ blueCard[1] }}</div>
                </div>
            </div>
            <div class="red">
                <strong>{{ redCount }}</strong>
                <div class="redButtons">
                    <div>
                        <button @click="add('red', '+', 1)">+1</button>
                        <button @click="add('red', '+', 2)">+2</button>
                        <button @click="add('red', '+', 3)">+3</button>
                        <button @click="add('red', '+', 4)">+4</button>
                    </div>
                    <div>
                        <button @click="add('red', '+', 5)">+5</button>
                        <button @click="add('red', '+', 6)">+6</button>
                        <button @click="add('red', '+', 10)">+10</button>
                    </div>
                    <div>
                        <button @click="add('red', '-', 1)">-1</button>
                        <button @click="add('red', '-', 2)">-2</button>
                        <button @click="add('red', 'x', 2)">x2</button>
                        <button @click="add('red', 'x', 3)">x3</button>
                        <button @click="add('red', 'x', 5)">x5</button>
                    </div>
                    <div>
                        <button @click="deleteLast('red')">取り消す</button>
                    </div>
                </div>
                <div v-for="redCard in redList">
                    <div>{{ redCard[0] }}{{ redCard[1] }}</div>
                </div>
            </div>
            <div class="green">
                <strong>{{ greenCount }}</strong>
                <div class="greenButtons">
                    <div>
                        <button @click="add('green', '+', 1)">+1</button>
                        <button @click="add('green', '+', 2)">+2</button>
                        <button @click="add('green', '+', 3)">+3</button>
                        <button @click="add('green', '+', 4)">+4</button>
                    </div>
                    <div>
                        <button @click="add('green', '+', 5)">+5</button>
                        <button @click="add('green', '+', 6)">+6</button>
                        <button @click="add('green', '+', 10)">+10</button>
                    </div>
                    <div>
                        <button @click="add('green', '-', 1)">-1</button>
                        <button @click="add('green', '-', 2)">-2</button>
                        <button @click="add('green', 'x', 2)">x2</button>
                        <button @click="add('green', 'x', 3)">x3</button>
                        <button @click="add('green', 'x', 5)">x5</button>
                    </div>
                    <div>
                        <button @click="deleteLast('green')">取り消す</button>
                    </div>
                </div>
                <div v-for="greenCard in greenList">
                    <div>{{ greenCard[0] }}{{ greenCard[1] }}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
.cards-list {
    display: flex;
    justify-content: center;
    /* 中央寄せ */
}

.cards-list .blue {
    box-sizing: border-box;
    padding: 40px 80px;
}

.cards-list .red {
    box-sizing: border-box;
    padding: 40px 80px;
}

.cards-list .green {
    box-sizing: border-box;
    padding: 40px 80px;
}
</style>