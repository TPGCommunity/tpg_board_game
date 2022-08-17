<script setup>
import { ref, computed } from "vue";
import { primeBool } from './eratosutenesu.js';

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

const playerNumber = ref(3);
const playersList = ref(["Player1", "Player2", "Player3", "Player4", "Player5", "Player6"]);

const blueBomb = ref(false);
const yellowBomb = ref(false);
const greenBomb = ref(false);
const bombList = ref([0, 0, 0]);
const bombError = ref(false);

const roundScoreList = ref([]);
const finishPlayer = ref("");
const dragon = ref(false)

const finishInit = () => {
    init.value = true;
    blue.value += blueTop.value
    yellow.value += yellowTop.value
    green.value += greenTop.value

    blueList.value = [["top:", blue.value]]
    yellowList.value = [["top:", yellow.value]]
    greenList.value = [["top:", green.value]]

    if (playerNumber.value != 6) {
        playersList.value.splice(playerNumber.value, 6 - playerNumber.value)
    }
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

const finishOnePlayer = (playerIndex, color, dragon) => {
    var n = 0
    if (color == "blue") {
        n = blue.value
    } else if (color == 'yellow') {
        n = yellow.value
    } else if (color == 'green') {
        n = green.value
    }

    var score = 0
    if (dragon) {
        score = dragonCheck(n)
    } else {
        score = factorization(n)
    }
    roundScoreList[playerIndex] = score
}

const factorization = (n) => {
    var score = 0
    if (n > 0) {
        var p = 3
        var l = []
        while (n % 2 == 0) {
            l.push(2)
            n = n / 2
        }
        while (p <= Math.sqrt(n)) {
            while (n % p == 0) {
                l.push(p)
                n = n / p
            }
            if (n == 1) {
                break
            }
            p += 2
            if (p % 5 == 0 && p > 5) {
                p += 2
            }
        }
        if (n != 1) {
            l.push(n)
        }

        for (const pn of l) {
            score += pn
        }
        return score
    }

}

const dragonCheck = (n) => {
    while (!primeBool[n]) {
        n -= 1
    }
    return n
}

const bomb = (color) => {
    //console.log(bombList.value)
    if (bombList.value[0] == bombList.value[1] || bombList.value[1] == bombList.value[2] || bombList.value[0] == bombList.value[2]) {
        bombError.value = true;
    }
    else {
        bombError.value = false;
        var newBombList = [bombList.value[0], bombList.value[1], bombList.value[2]]
        //console.log(newBombList)
        newBombList.sort().reverse()
        //console.log(newBombList)
        if (color == "blue") {
            for (const n of newBombList) {
                if (n > 0) {
                    blueList.value.splice(n, 1);
                }
            }
            blue.value = calc(blueList.value);
            blueBomb.value = false;
        } else if (color == "yellow") {
            for (const n of newBombList) {
                if (n > 0) {
                    yellowList.value.splice(n, 1);
                }
            }
            yellow.value = calc(yellowList.value);
            yellowBomb.value = false;
        } else if (color == "green") {
            for (const n of newBombList) {
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
    <h2>計算システム</h2>
    <div class="Top" v-if="init == false">
        <h3>TOP CARD</h3>
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
        <h3>プレイヤーの設定</h3>
        <div class="player-setting">
            <label for="playerNumber">プレイヤーの人数を選択（３から６人）</label>
            <select name="playerNumber" id="playerNumber" v-model.number="playerNumber">
                <option value=3>3人</option>
                <option value=4>4人</option>
                <option value=5>5人</option>
                <option value=6>6人</option>
            </select>
            <div class="player-name-setting">
                <div>Player1:<input v-model="playersList[0]"></div>
                <div>Player2:<input v-model="playersList[1]"></div>
                <div>Player3:<input v-model="playersList[2]"></div>
                <div v-if="playerNumber > 3">Player4:<input v-model="playersList[3]"></div>
                <div v-if="playerNumber > 4">Player5:<input v-model="playersList[4]"></div>
                <div v-if="playerNumber > 5">Player6:<input v-model="playersList[5]"></div>
            </div>
        </div>
        <button @click="finishInit">決定</button>
    </div>

    <div v-if="init == true && blueBomb == false && yellowBomb == false && greenBomb == false">
        <button @click="init = false; blue = 0; yellow = 0; green = 0">トップカードからを設定しなおす</button>
        <br>
        <button @click="reset">トップカード以外をはじめから入力する</button>
    </div>

    <div v-if="init == true && blueBomb == false && yellowBomb == false && greenBomb == false" class="finish">
        <button @click="">上がる</button>
        <label for="finishPlayer">上がるプレイヤー</label>
        <select v-model.number="finishPlayer" name="finishPlayer">
            <option v-for="(player, index) in playersList" :value="index">
                <div>{{ player }}</div>
            </option>
        </select>
        <label for="dragon">龍王</label>
        <input type="checkbox" v-model="dragon" name="dragon">
    </div>

    <div class="calculater" v-if="init == true && blueBomb == false && yellowBomb == false && greenBomb == false">
        <div class="colors">
            <div class="blue">
                <h2 class="blueCount">{{ blueCount }}</h2>
                <br>
                <div class="blue-buttons">
                    <button @click="blueBomb = true" class="blue-button">逆鱗</button>
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
                    <br>
                    <div>
                        <button @click="deleteLast('blue')" class="back">ひとつ戻す</button>
                    </div>
                </div>
                <br>
                <div v-for="blueCard in blueList" class="blue-list">
                    <div>{{ blueCard[0] }}{{ blueCard[1] }}</div>
                </div>
            </div>
            <div class="yellow">
                <h2 class="yellowCount">{{ yellowCount }}</h2>
                <br>
                <div class="yellow-buttons">
                    <button @click="yellowBomb = true" class="yellow-button">逆鱗</button>
                    <br><br>
                    <div class="yellow-buttons-n">
                        <button @click="add('yellow', '+', 1)" class="yellow-button">+1</button>
                        <button @click="add('yellow', '+', 2)" class="yellow-button">+2</button>
                        <button @click="add('yellow', '+', 3)" class="yellow-button">+3</button>
                        <button @click="add('yellow', '+', 4)" class="yellow-button">+4</button>
                        <button @click="add('yellow', '+', 5)" class="yellow-button">+5</button>
                        <button @click="add('yellow', '+', 6)" class="yellow-button">+6</button>
                        <button @click="add('yellow', '+', 7)" class="yellow-button">+7</button>
                        <button @click="add('yellow', '+', 10)" class="yellow-button">+10</button>
                        <button @click="add('yellow', '+', 30)" class="yellow-button">+30</button>
                        <br>
                        <button @click="add('yellow', '-', 1)" class="yellow-button">-1</button>
                        <button @click="add('yellow', '-', 2)" class="yellow-button">-2</button>
                        <br>
                        <button @click="add('yellow', 'x', 2)" class="yellow-button">x2</button>
                        <button @click="add('yellow', 'x', 3)" class="yellow-button">x3</button>
                        <button @click="add('yellow', 'x', 5)" class="yellow-button">x5</button>
                        <button @click="add('yellow', 'x', 7)" class="yellow-button">x7</button>
                    </div>
                </div>
                <br>
                <div>
                    <button @click="deleteLast('yellow')">ひとつ戻す</button>
                </div>
                <br>
                <div v-for="yellowCard in yellowList" class="yellow-list">
                    <div>{{ yellowCard[0] }}{{ yellowCard[1] }}</div>
                </div>
            </div>
            <div class="green">
                <h2 class="greenCount">{{ greenCount }}</h2>
                <br>
                <div class="green-buttons">
                    <button @click="greenBomb = true" class="green-button">逆鱗</button>
                    <br>
                    <br>
                    <div class="green-buttons-n">
                        <button @click="add('green', '+', 1)" class="green-button">+1</button>
                        <button @click="add('green', '+', 2)" class="green-button">+2</button>
                        <button @click="add('green', '+', 3)" class="green-button">+3</button>
                        <button @click="add('green', '+', 4)" class="green-button">+4</button>
                        <button @click="add('green', '+', 5)" class="green-button">+5</button>
                        <button @click="add('green', '+', 6)" class="green-button">+6</button>
                        <button @click="add('green', '+', 7)" class="green-button">+7</button>
                        <button @click="add('green', '+', 10)" class="green-button">+10</button>
                        <button @click="add('green', '+', 30)" class="green-button">+30</button>
                        <br>
                        <button @click="add('green', '-', 1)" class="green-button">-1</button>
                        <button @click="add('green', '-', 2)" class="green-button">-2</button>
                        <br>
                        <button @click="add('green', 'x', 2)" class="green-button">x2</button>
                        <button @click="add('green', 'x', 3)" class="green-button">x3</button>
                        <button @click="add('green', 'x', 5)" class="green-button">x5</button>
                        <button @click="add('green', 'x', 7)" class="green-button">x7</button>
                    </div>
                    <br>
                    <div>
                        <button @click="deleteLast('green')" class="back">ひとつ戻す</button>
                    </div>
                </div>
                <br>
                <div v-for="greenCard in greenList" class="green-list">
                    <div>{{ greenCard[0] }}{{ greenCard[1] }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="bombs">
        <div class="blue-bomb" v-if="blueBomb == true">
            <h3 class="blue-bomb-t">逆鱗　青</h3>
            <div v-for="(blueCard, index) in blueList">
                {{ index }}:{{ blueCard[0] }}{{ blueCard[1] }}
            </div>
            <div>取り除くカードの番号を3つまで選択（トップカードは選択できません）</div>
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
                <select name="blueBomb3" id="blueBomb3" v-model.number="bombList[2]">
                    <option v-for="(b, i) in blueList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <button @click="bomb('blue')">逆鱗!</button>
                <button @click="blueBomb = false; bombList = [0, 0, 0]">逆鱗をキャンセル</button>
                <div v-if="bombError == true" class="bomb-error"><strong>同じカードを２回以上選んでいます！</strong></div>
            </div>
        </div>
        <div class="yellow-bomb" v-if="yellowBomb == true">
            <h2 class="yellow-bomb-t">逆鱗　黄</h2>
            <div v-for="(yellowCard, index) in yellowList">
                {{ index }}:{{ yellowCard[0] }}{{ yellowCard[1] }}
            </div>
            <div>取り除くカードの番号を3つまで選択（トップカードは選択できません）</div>
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
                <select name="yellowBomb3" id="yellowBomb3" v-model.number="bombList[2]">
                    <option v-for="(b, i) in yellowList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <button @click="bomb('yellow')">逆鱗!</button>
                <button @click="yellowBomb = false; bombList = [0, 0, 0]">逆鱗をキャンセル</button>
                <div v-if="bombError == true" class="bomb-error"><strong>同じカードを２回選んでいます！</strong></div>
            </div>
        </div>
        <div class="green-bomb" v-if="greenBomb == true">
            <h2 class="green-bomb-t">逆鱗　緑</h2>
            <div v-for="(greenCard, index) in greenList">
                {{ index }}:{{ greenCard[0] }}{{ greenCard[1] }}
            </div>
            <div>取り除くカードの番号を２つまで選択（トップカードは選択できません）</div>
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
                <select name="greenBomb3" id="greenBomb3" v-model.number="bombList[2]">
                    <option v-for="(b, i) in greenList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>選ばない</option>
                </select>
                <button @click="bomb('green')">逆鱗!</button>
                <button @click="greenBomb = false; bombList = [0, 0, 0]">逆鱗をキャンセル</button>
                <div v-if="bombError == true" class="bomb-error"><strong>同じカードを２回選んでいます！</strong></div>
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

.blue-bomb {
    background-color: rgba(62, 139, 255, 0.22);
}

.yellow-bomb-t {
    color: rgb(255, 196, 0);
}

.yellow-bomb {
    background-color: rgba(250, 221, 93, 0.22);
}

.green-bomb-t {
    color: green;
}

.green-bomb {
    background-color: rgba(147, 184, 108, 0.22);
}

.blue-bottons-n {
    display: flex;
    justify-content: center;
    /* 中央寄せ */
    padding: 20px;
}

.blue-button {
    background-color: rgba(62, 139, 255, 0.22);
    width: 19%;
    padding: 0.1em;
    font-size: large;
    border: 1px solid black;
    border-radius: 5%;
}

.yellow-bottons-n {
    display: flex;
    justify-content: center;
    /* 中央寄せ */
    padding: 20px;
}

.yellow-button {
    background-color: rgba(250, 221, 93, 0.22);
    width: 19%;
    padding: 0.1em;
    font-size: large;
    border: 1px solid black;
    border-radius: 5%;
}

.green-bottons-n {
    display: flex;
    justify-content: center;
    /* 中央寄せ */
    padding: 20px;
}

.green-button {
    background-color: rgba(147, 184, 108, 0.22);
    width: 19%;
    padding: 0.1em;
    font-size: large;
    border: 1px solid black;
    border-radius: 5%;
}
</style>