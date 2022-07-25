<script setup>
import { ref, computed } from "vue";

const blue = ref(0);
const yellow = ref(0);
const green = ref(0);

const blueTop = ref(7);
const yellowTop = ref(7);
const greenTop = ref(7);

const blueCount = computed(() => "青:" + blue.value);
const yellowCount = computed(() => "黄:" + yellow.value);
const greenCount = computed(() => "緑:" + green.value);

const init = ref(false)

const blueList = ref([]);
const yellowList = ref([]);
const greenList = ref([]);


const blueBomb = ref(false);
const yellowBomb = ref(false);
const greenBomb = ref(false);
const bombList = ref([0, 0]);
const bombError = ref(false);



const finishInit = () => {
    init.value = true;
    blue.value += blueTop.value
    yellow.value += yellowTop.value
    green.value += greenTop.value

    blueList.value = [["top:", blue.value]]
    yellowList.value = [["top:", yellow.value]]
    greenList.value = [["top:", green.value]]
}

const add = (color, operator, num) => {
    if (color == "blue") {
        blueList.value.push([operator, num])
        blue.value = calc(blueList.value)
    } else if (color == "yellow") {
        yellowList.value.push([operator, num])
        yellow.value = calc(yellowList.value)
    } else if (color == "green") {
        greenList.value.push([operator, num])
        green.value = calc(greenList.value)
    }
}

const deleteLast = (color) => {
    if (color == "blue") {
        blueList.value.pop()
        blue.value = calc(blueList.value)
    } else if (color == "yellow") {
        yellowList.value.pop()
        yellow.value = calc(yellowList.value)
    } else if (color == "green") {
        greenList.value.pop()
        green.value = calc(greenList.value)
    }
}

const reset = () => {
    blueList.value = [["top:", blueTop.value]]
    yellowList.value = [["top:", yellowTop.value]]
    greenList.value = [["top:", greenTop.value]]
    blue.value = calc(blueList.value)
    yellow.value = calc(yellowList.value)
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
        } else if (color == "yellow") {
            for (const n of bombList.value) {
                if (n > 0) {
                    yellowList.value.splice(n, 1);
                }
            }
            yellow.value = calc(yellowList.value);
            yellowBomb.value = false;
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
            <label for="blueTop">青</label>
            <select name="blueTop" id="blueTop" v-model.number="blueTop">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select>--
            <label for="yellowTop">黄</label>
            <select name="yellowTop" id="yellowTop" v-model.number="yellowTop">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select>--
            <label for="greenTop">緑</label>
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

    <div v-if="init == true && blueBomb == false && yellowBomb == false && greenBomb == false">
        <button @click="init = false; blue = 0; yellow = 0; green = 0">トップカードからを設定しなおす</button>
        <br>
        <button @click="reset">トップカード以外をはじめから入力する</button>
    </div>

    <div class="calculater" v-if="init == true && blueBomb == false && yellowBomb == false && greenBomb == false">
        <div class="colors">
            <div class="blue">
                <h2 class="blueCount">{{ blueCount }}</h2>
                <br>
                <br>
                <div class="blue-buttons">
                    <button @click="blueBomb = true">逆鱗</button>
                    <br><br>
                    <div class="blue-buttons-n">
                        <button @click="add('blue', '+', 1)" class="blue-button">+1</button>
                        <button @click="add('blue', '+', 2)" class="blue-button">+2</button>
                        <button @click="add('blue', '+', 3)" class="blue-button">+3</button>
                        <button @click="add('blue', '+', 4)" class="blue-button">+4</button>
                        <button @click="add('blue', '+', 5)" class="blue-button">+5</button>
                        <button @click="add('blue', '+', 6)" class="blue-button">+6</button>
                        <button @click="add('blue', '+', 7)" class="blue-button">+7</button>
                        <button @click="add('blue', '+', 10)" class="blue-button">+10</button>
                        <button @click="add('blue', '+', 30)" class="blue-button">+30</button>
                        <br>
                        <button @click="add('blue', '-', 1)" class="blue-button">-1</button>
                        <button @click="add('blue', '-', 2)" class="blue-button">-2</button>
                        <br>
                        <button @click="add('blue', 'x', 2)" class="blue-button">x2</button>
                        <button @click="add('blue', 'x', 3)" class="blue-button">x3</button>
                        <button @click="add('blue', 'x', 5)" class="blue-button">x5</button>
                        <button @click="add('blue', 'x', 7)" class="blue-button">x7</button>
                    </div>
                    <br><br>
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
            <div class="yellow">
                <h2 class="yellowCount">{{ yellowCount }}</h2>--<button @click="yellowBomb = true">逆鱗</button>
                <br>
                <br>
                <div class="yellow-buttons">
                    <div>
                        <button @click="add('yellow', '+', 1)">+1</button>
                        <button @click="add('yellow', '+', 2)">+2</button>
                        <button @click="add('yellow', '+', 3)">+3</button>
                        <button @click="add('yellow', '+', 4)">+4</button>
                        <button @click="add('yellow', '+', 5)">+5</button>
                    </div>
                    <div>
                        <button @click="add('yellow', '+', 6)">+6</button>
                        <button @click="add('yellow', '+', 7)">+7</button>
                        <button @click="add('yellow', '+', 10)">+10</button>
                        <button @click="add('yellow', '+', 30)">+30</button>
                    </div>
                    <div>
                        <button @click="add('yellow', '-', 1)">-1</button>
                        <button @click="add('yellow', '-', 2)">-2</button>
                        <button @click="add('yellow', 'x', 2)">x2</button>
                        <button @click="add('yellow', 'x', 3)">x3</button>
                        <button @click="add('yellow', 'x', 5)">x5</button>
                        <button @click="add('yellow', 'x', 7)">x7</button>
                    </div>
                    <br>
                    <br>
                    <div>
                        <button @click="deleteLast('yellow')">ひとつ戻す</button>
                    </div>
                </div>
                <br>
                <br>
                <div v-for="yellowCard in yellowList" class="yellow-list">
                    <div>{{ yellowCard[0] }}{{ yellowCard[1] }}</div>
                </div>
            </div>
            <div class="green">
                <h2 class="greenCount">{{ greenCount }}</h2>--<button @click="greenBomb = true">逆鱗</button>
                <br>
                <br>
                <div class="green-buttons">
                    <div>
                        <button @click="add('green', '+', 1)">+1</button>
                        <button @click="add('green', '+', 2)">+2</button>
                        <button @click="add('green', '+', 3)">+3</button>
                        <button @click="add('green', '+', 4)">+4</button>
                    </div>
                    <div>
                        <button @click="add('green', '+', 5)">+5</button>
                        <button @click="add('green', '+', 6)">+6</button>
                        <button @click="add('green', '+', 7)">+7</button>
                        <button @click="add('green', '+', 10)">+10</button>
                        <button @click="add('green', '+', 30)">+30</button>
                    </div>
                    <div>
                        <button @click="add('green', '-', 1)">-1</button>
                        <button @click="add('green', '-', 2)">-2</button>
                        <button @click="add('green', 'x', 2)">x2</button>
                        <button @click="add('green', 'x', 3)">x3</button>
                        <button @click="add('green', 'x', 5)">x5</button>
                        <button @click="add('green', 'x', 7)">x7</button>
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
            <h2 class="blue-bomb-t">逆鱗　青</h2>
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
                <button @click="bomb('blue')">逆鱗!</button>
                <button @click="blueBomb = false; bombList = [0, 0]">逆鱗をキャンセル</button>
            </div>
        </div>
        <div class="yellow-bomb" v-if="yellowBomb == true">
            <h2 class="yellow-bomb-t">逆鱗　黄</h2>
            <div v-for="(yellowCard, index) in yellowList">
                {{ index }}:{{ yellowCard[0] }}{{ yellowCard[1] }}
            </div>
            <div>取り除くカードの番号を２つまで選択（トップカードは選択できません）</div>
            <div v-if="bombError == true" class="bomb-error"><strong>同じカードを２回選んでいます！</strong></div>
            <div>
                <select name="yellowBomb1" id="yellowBomb1" v-model.number="bombList[0]">
                    <option v-for="(b, i) in yellowList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <select name="yellowBomb2" id="yellowBomb2" v-model.number="bombList[1]">
                    <option v-for="(b, i) in yellowList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <button @click="bomb('yellow')">逆鱗!</button>
                <button @click="yellowBomb = false; bombList = [0, 0]">逆鱗をキャンセル</button>
            </div>
        </div>
        <div class="green-bomb" v-if="greenBomb == true">
            <h2 class="green-bomb-t">逆鱗　緑</h2>
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
                <button @click="bomb('green')">逆鱗!</button>
                <button @click="greenBomb = false; bombList = [0, 0]">逆鱗をキャンセル</button>
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
    background-color: rgba(62, 139, 255, 0.22);
}

.colors .yellow {
    box-sizing: border-box;
    width: 31%;
    background-color: rgba(250, 221, 93, 0.22);
}

.colors .green {
    box-sizing: border-box;
    width: 31%;
    background-color: rgba(147, 184, 108, 0.22);
}

.blueCount {
    color: blue;
    background-color: white;
}

.yellowCount {
    color: rgb(255, 208, 0);
    background-color: white;
}

.greenCount {
    color: green;
    background-color: white;
}

.blue-bomb-t {
    color: blue;
}

.yellow-bomb-t {
    color: rgb(255, 196, 0);
}

.green-bomb-t {
    color: green;
}


.blue-bottons-n {
    display: flex;
    justify-content: center;
    /* 中央寄せ */
    padding: 20px;
}

.blue-button {
    background-color: rgb(123, 123, 229);
}
</style>