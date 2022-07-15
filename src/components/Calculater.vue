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
const bombList = ref([0, 0]);
const bombError = ref(false);



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
        greenList.value.pop()
        green.value = calc(greenList.value)
    }
}

const reset = () => {
    blueList.value = [["top:", blueTop.value]]
    redList.value = [["top:", redTop.value]]
    greenList.value = [["top:", greenTop.value]]
    blue.value = calc(blueList.value)
    red.value = calc(redList.value)
    green.value = calc(greenList.value)
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

const bomb = (color) => {
    console.log("here!")
    if (bombList.value[0] == bombList.value[1]) {
        bombError.value = true;
    }
    else {
        bombError.value = false;
        if (bombList.value[0] < bombList.value[1]) {
            bombList.value.reverse();
        }
        if (color == "blue") {
            for (const n of bombList.value) {
                if (n > 0) {
                    blueList.value.splice(n, 1);
                }
            }
            blue.value = calc(blueList.value);
            blueBomb.value = false;
        } else if (color == "red") {
            for (const n of bombList.value) {
                if (n > 0) {
                    redList.value.splice(n, 1);
                }
            }
            red.value = calc(redList.value);
            redBomb.value = false;
        } else if (color == "green") {
            for (const n of bombList.value) {
                if (n > 0) {
                    greenList.value.splice(n, 1);
                }
            }
            green.value = calc(greenList.value);
            greenBomb.value = false;
        }
        bombList.value = [0, 0]
    }
}
</script>

<template>
    <h1>計算システム</h1>
    <div class="Top" v-if="init == false">
        <h2>TOP CARD</h2>
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

    <div v-if="init == true && blueBomb == false && redBomb == false && greenBomb == false">
        <button @click="init = false; blue = 0; red = 0; green = 0">トップカードからを設定しなおす</button>
        <br>
        <button @click="reset">トップカード以外をはじめから入力する</button>
    </div>

    <div class="calculater" v-if="init == true && blueBomb == false && redBomb == false && greenBomb == false">
        <div class="colors">
            <div class="blue">
                <h2 class="blueCount">{{ blueCount }}</h2>--<button @click="blueBomb = true">Bomb</button>
                <br>
                <br>
                <div class="blue-button">
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
                    <br>
                    <br>
                    <div>
                        <button @click="deleteLast('blue')">ひとつ戻す</button>
                    </div>
                </div>
                <br>
                <br>
                <div v-for="blueCard in blueList" class="blue-list">
                    <div>{{ blueCard[0] }}{{ blueCard[1] }}</div>
                </div>
            </div>
            <div class="red">
                <h2 class="redCount">{{ redCount }}</h2>--<button @click="redBomb = true">Bomb</button>
                <br>
                <br>
                <div class="red-button">
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
                    <br>
                    <br>
                    <div>
                        <button @click="deleteLast('red')">ひとつ戻す</button>
                    </div>
                </div>
                <br>
                <br>
                <div v-for="redCard in redList" class="red-list">
                    <div>{{ redCard[0] }}{{ redCard[1] }}</div>
                </div>
            </div>
            <div class="green">
                <h2 class="greenCount">{{ greenCount }}</h2>--<button @click="greenBomb = true">Bomb</button>
                <br>
                <br>
                <div class="green-button">
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
                    <br>
                    <br>
                    <div>
                        <button @click="deleteLast('green')">ひとつ戻す</button>
                    </div>
                </div>
                <br>
                <br>
                <div v-for="greenCard in greenList" class="green-list">
                    <div>{{ greenCard[0] }}{{ greenCard[1] }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="bombs">
        <div class="blue-bomb" v-if="blueBomb == true">
            <h2 class="blue-bomb-t">Blue Bomb</h2>
            <div v-for="(blueCard, index) in blueList">
                {{ index }}:{{ blueCard[0] }}{{ blueCard[1] }}
            </div>
            <div>取り除くカードの番号を２つまで選択（トップカードは選択できません）</div>
            <div v-if="bombError == true" class="bomb-error"><strong>同じカードを２回選んでいます！</strong></div>
            <div>
                <select name="blueBomb1" id="blueBomb1" v-model.number="bombList[0]">
                    <option v-for="(b, i) in blueList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <select name="blueBomb2" id="blueBomb2" v-model.number="bombList[1]">
                    <option v-for="(b, i) in blueList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <button @click="bomb('blue')">Bomb!</button>
                <button @click="blueBomb = false; bombList = [0, 0]">Bombをキャンセル</button>
            </div>
        </div>
        <div class="red-bomb" v-if="redBomb == true">
            <h2 class="red-bomb-t">Red Bomb</h2>
            <div v-for="(redCard, index) in redList">
                {{ index }}:{{ redCard[0] }}{{ redCard[1] }}
            </div>
            <div>取り除くカードの番号を２つまで選択（トップカードは選択できません）</div>
            <div v-if="bombError == true" class="bomb-error"><strong>同じカードを２回選んでいます！</strong></div>
            <div>
                <select name="redBomb1" id="redBomb1" v-model.number="bombList[0]">
                    <option v-for="(b, i) in redList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <select name="redBomb2" id="redBomb2" v-model.number="bombList[1]">
                    <option v-for="(b, i) in redList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <button @click="bomb('red')">Bomb!</button>
                <button @click="redBomb = false; bombList = [0, 0]">Bombをキャンセル</button>
            </div>
        </div>
        <div class="green-bomb" v-if="greenBomb == true">
            <h2 class="green-bomb-t">Green Bomb</h2>
            <div v-for="(greenCard, index) in greenList">
                {{ index }}:{{ greenCard[0] }}{{ greenCard[1] }}
            </div>
            <div>取り除くカードの番号を２つまで選択（トップカードは選択できません）</div>
            <div v-if="bombError == true" class="bomb-error"><strong>同じカードを２回選んでいます！</strong></div>
            <div>
                <select name="greenBomb1" id="greenBomb1" v-model.number="bombList[0]">
                    <option v-for="(b, i) in greenList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <select name="greenBomb2" id="greenBomb2" v-model.number="bombList[1]">
                    <option v-for="(b, i) in greenList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <button @click="bomb('green')">Bomb!</button>
                <button @click="greenBomb = false; bombList = [0, 0]">Bombをキャンセル</button>
            </div>
        </div>
    </div>
</template>

<style>
.colors {
    display: flex;
    justify-content: center;
    /* 中央寄せ */
}

.colors .blue {
    box-sizing: border-box;
    width: 31%;
}

.colors .red {
    box-sizing: border-box;
    width: 31%;
}

.colors .green {
    box-sizing: border-box;
    width: 31%;
}

.blueCount {
    color: blue
}
.redCount {
    color: red
}
.greenCount {
    color: green
}

.blue-bomb-t {
    color: blue;
}
.red-bomb-t {
    color: red;
}
.green-bomb-t {
    color: green;
}
</style>