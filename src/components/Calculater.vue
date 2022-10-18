<script setup>
import { ref, computed } from "vue";
import { primeBool } from './eratosutenesu.js';
import PlayerSettingHelp from './Modals/PlayerSettingHelp.vue'
import Result from './Modals/Result.vue'
import FinishConfirm from "./Modals/FinishConfirm.vue";

const showResult = ref(false)
const round = ref(0)

const startSetting = ref(false)
const usePlayer = ref(true)
const openPlayerSettingHelp = ref(false)
const finishedPlayerList = ref([false, false, false, false, false, false])

const init = ref(false)

const blue = ref(0);
const yellow = ref(0);
const green = ref(0);

const blueTop = ref(7);
const yellowTop = ref(7);
const greenTop = ref(7);

const blueCount = computed(() => "青/Blue:" + blue.value);
const yellowCount = computed(() => "黄/Yellow:" + yellow.value);
const greenCount = computed(() => "緑/Green:" + green.value);

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

const roundScoreList = ref([0, 0, 0, 0, 0, 0]);
const finishPlayer = ref(0);
const finishColor = ref("blue");
const finishConfirm = ref(false);
const dragon = ref(false);

const finishSetting = () => {//人数設定完了
    blue.value = 0
    yellow.value = 0
    green.value = 0
    usePlayer.value = true
    startSetting.value = true
    roundScoreList.value = [0, 0, 0, 0, 0, 0]
    finishedPlayerList.value = [false, false, false, false, false, false]
    if (playerNumber.value != 6) {
        playersList.value.splice(playerNumber.value, 6 - playerNumber.value)
        roundScoreList.value.splice(playerNumber.value, 6 - playerNumber.value)
        finishedPlayerList.value.splice(playerNumber.value, 6 - playerNumber.value)
    }
}

const finishInit = () => {
    init.value = true;
    blue.value += blueTop.value
    yellow.value += yellowTop.value
    green.value += greenTop.value

    blueList.value = [["top:", blue.value]]
    yellowList.value = [["top:", yellow.value]]
    greenList.value = [["top:", green.value]]

    finishPlayer.value = 0
    finishColor.value = 'blue'
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

const restartRound = () => {//トップカードから。次のラウンドに行くときも使用
    console.log("restart")
    startSetting.value = true
    init.value = false
    blue.value = 0
    yellow.value = 0
    green.value = 0
    roundScoreList.value = [0, 0, 0, 0, 0, 0]
    finishedPlayerList.value = [false, false, false, false, false, false]
    if (playerNumber.value != 6) {
        roundScoreList.value.splice(playerNumber.value, 6 - playerNumber.value)
        finishedPlayerList.value.splice(playerNumber.value, 6 - playerNumber.value)
    }

}

const resetExceptTop = () => {//カード足してくところから
    blueList.value = [["top:", blueTop.value]]
    yellowList.value = [["top:", yellowTop.value]]
    greenList.value = [["top:", greenTop.value]]
    blue.value = calc(blueList.value)
    yellow.value = calc(yellowList.value)
    green.value = calc(greenList.value)
    roundScoreList.value = [0, 0, 0, 0, 0, 0]
    finishedPlayerList.value = [false, false, false, false, false, false]
    if (playerNumber.value != 6) {
        roundScoreList.value.splice(playerNumber.value, 6 - playerNumber.value)
        finishedPlayerList.value.splice(playerNumber.value, 6 - playerNumber.value)
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

const colorTranslate = (finishColor) => {
    var colorJp = ""
    if (finishColor == 'blue') {
        colorJp = "青"
    } else if (finishColor == 'yellow') {
        colorJp = "黄"
    } else if (finishColor == 'green') {
        colorJp = "緑"
    }
    return colorJp
}

const colorToNumber = (finishColor) => {
    var number = 0
    if (finishColor == 'blue') {
        number = blue.value
    } else if (finishColor == 'yellow') {
        number = yellow.value
    } else if (finishColor == 'green') {
        number = green.value
    }
    return number
}

const haveFinishedCheck = (finishPlayer) => {
    var check = false
    if (finishedPlayerList.value[finishPlayer]) {
        check = true
    }
    return check
}

const finishOnePlayer = (playerIndex, color, dragonLc) => {
    var n = 0
    if (color == "blue") {
        n = blue.value
    } else if (color == 'yellow') {
        n = yellow.value
    } else if (color == 'green') {
        n = green.value
    }

    var score = 0
    if (n <= 0) {
        score = 0
    } else if (dragonLc) {
        score = dragonCheck(n)
    } else {
        score = factorization(n)
    }
    roundScoreList.value[playerIndex] = score

    finishedPlayerList.value[playerIndex] = true

    if (!(finishedPlayerList.value.includes(false))) {
        showResult.value = true
    }
    dragon.value = false
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
    <PlayerSettingHelp v-if="openPlayerSettingHelp" @closePlayerSettingHelp="openPlayerSettingHelp = false" />
    <FinishConfirm v-if="finishConfirm"
        @confirm="finishConfirm = false; finishOnePlayer(finishPlayer, finishColor, dragon)"
        @cancel="finishConfirm = false" :finishColor="colorTranslate(finishColor)"
        :finishPlayer="playersList[finishPlayer]" :number="colorToNumber(finishColor)"
        :haveFinished="haveFinishedCheck(finishPlayer)" :dragon="dragon" />
    <Result v-show="showResult" @closeModalAndNext="showResult = false; round += 1; restartRound()"
        @finishGame="startSetting = false; init = false; showResult = false" :oneRoundScore="roundScoreList"
        :playersList="playersList" :playerNumber="playerNumber" status="endOfRound" :round="round" />

    <h2>計算システム</h2>

    <div class="player-setting" v-if="!startSetting && !init">
        <h3>プレイヤーの設定<button class="help-button" @click="openPlayerSettingHelp = true">?</button></h3>
        <br>
        <label for="playerNumber">
            プレイヤーの人数を選択（３から６人）<br>
            Choose players number (3 or more and 6 or less)
        </label>
        <select name="playerNumber" id="playerNumber" style="height: 2em" v-model.number="playerNumber">
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
        <br>
        <button @click="usePlayer = false; startSetting = true">プレイヤー設定無し<br>start without player setting</button>
        <button @click="finishSetting" class="decide-button">ゲームを始める<br>START</button>
    </div>

    <div class="top" v-if="!init && startSetting">
        <h3>TOP CARD</h3>
        <h4>トップカードを選んでください。/Choose top cards.</h4>
        <div>
            <label for="blueTop" class="blue-bomb" style="font-size: 1.5em;">青/Blue</label>
            <select name="blueTop" id="blueTop" style="height: 2em;" v-model.number="blueTop">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select><br>
            <label for="yellowTop" class="yellow-bomb" style="font-size: 1.5em;">黄/Yellow</label>
            <select name="yellowTop" id="yellowTop" style="height: 2em;" v-model.number="yellowTop">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select><br>
            <label for="greenTop" class="green-bomb" style="font-size: 1.5em;">緑/Green</label>
            <select name="greenTop" id="greenTop" style="height: 2em;" v-model.number="greenTop">
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
                <option value=11>11</option>
                <option value=12>12</option>
            </select><br>
        </div>
        <button @click="startSetting = false">プレイヤー設定に戻る</button>
        <button @click="finishInit" class="decide-button">決定</button>
    </div>

    <div class="reset-buttons" v-if="init == true && blueBomb == false && yellowBomb == false && greenBomb == false">
        <button @click="startSetting = false; init = false">人数から設定しなおす</button>
        <!--TODO:処理を関数にして、プレイヤーリストを初期化-->
        <button @click="restartRound">トップカードから設定しなおす</button>
        <br>
        <button @click="resetExceptTop">トップカード以外をはじめから入力する</button>
    </div>

    <div class="score"
        v-if="init == true && usePlayer && blueBomb == false && yellowBomb == false && greenBomb == false">
        <div style="font-size:larger;">得点/Score</div>
        <div class="score-table-wrapper">
            <table border="1" class="score-table">
                <!--TODO:名前の文字数が違っても幅を等しく-->
                <thead>
                    <tr>
                        <th class="table-content" v-for="player in playersList">{{ player }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="table-content" v-for="(pl, index) in playersList">{{ roundScoreList[index] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <div class="finish">
            <div style="font-size:larger;">奉納/Check</div>
            <table>
                <thead>
                    <tr>
                        <td class="check-table-cont">プレイヤー/Player</td>
                        <td class="check-table-cont">色/Color</td>
                        <td class="check-table-cont">龍王/Ryuo</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="check-table-cont">
                            <select v-model.number="finishPlayer" name="finish-player">
                                <option v-for="(player, index) in playersList" :value="index">
                                    <div>{{ player }}</div>
                                </option>
                            </select>
                        </td>
                        <td class="check-table-cont" :style="{background: finishColor}">
                            <select v-model="finishColor" name="finish-color"
                                >
                                <option value="blue" class="blue-button">青/Blue</option>
                                <option value="yellow" class="yellow-button">黄/Yellow</option>
                                <option value="green" class="green-button">緑/Green</option>
                            </select>
                        </td>
                        <td class="check-table-cont">
                            <input type="checkbox" v-model="dragon" name="dragon">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <br>
    <div class="calculater" v-if="init == true && blueBomb == false && yellowBomb == false && greenBomb == false">
        <div style="font-size:larger">マーケット/Market</div>
        <div class="colors">
            <div class="blue">
                <h2 class="blueCount">{{ blueCount }}</h2>
                <br>
                <div class="blue-buttons">
                    <button @click="blueBomb = true; bombError=false" class="blue-button"
                        style="width: 40%; font-size:medium;">
                        逆鱗/Outrage</button>
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
                        <button @click="deleteLast('blue')" class="back">最後を消す<br>Delete last</button>
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
                    <button @click="yellowBomb = true; bombError=false" class="yellow-button"
                        style="width: 40%; font-size:medium;">逆鱗/Outrage</button>
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
                    <button @click="deleteLast('yellow')">最後を消す<br>Delete last</button>
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
                    <button @click="greenBomb = true; bombError=false" class="green-button"
                        style="width: 40%; font-size:medium;">逆鱗/Outrage</button>
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
                        <button @click="deleteLast('green')" class="back">最後を消す<br>Delete last</button>
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
            <h3 class="blue-bomb-t">逆鱗 青 / Outrage Blue</h3>
            <div>取り除くカードの番号を2つまで選択（トップカードは選択できません）<br>
                Select up to 2 cards to remove.(EXCEPT the top card)</div>
            <div>
                <select name="blueBomb1" id="blueBomb1" v-model.number="bombList[0]">
                    <option v-for="(b, i) in blueList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>no card</option>
                </select>
                <select name="blueBomb2" id="blueBomb2" v-model.number="bombList[1]">
                    <option v-for="(b, i) in blueList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>no card</option>
                </select>
                <button @click="bomb('blue')" class="decide-button">決定/OK</button>
                <button @click="blueBomb = false; bombList = [0, 0, 0]">取り消す/Cancel</button>
                <div v-if="bombError == true" class="bomb-error">
                    <strong>同じカードを２回選んでいます！<br>You selected the same two cards!</strong>
                </div>
            </div>
            <br>
            <div v-for="(blueCard, index) in blueList">
                {{ index }}:{{ blueCard[0] }}{{ blueCard[1] }}
            </div>
        </div>
        <div class="yellow-bomb" v-if="yellowBomb == true">
            <h2 class="yellow-bomb-t">逆鱗 黄 / Outrage Yellow</h2>

            <div>取り除くカードの番号を2つまで選択（トップカードは選択できません）<br>
                Select up to 2 cards to remove.(EXCEPT the top card)</div>
            <div>
                <select name="yellowBomb1" id="yellowBomb1" v-model.number="bombList[0]">
                    <option v-for="(b, i) in yellowList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>no card</option>
                </select>
                <select name="yellowBomb2" id="yellowBomb2" v-model.number="bombList[1]">
                    <option v-for="(b, i) in yellowList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>no card</option>
                </select>
                <button @click="bomb('yellow')" class="decide-button">決定/OK</button>
                <button @click="yellowBomb = false; bombList = [0, 0, 0]">取り消し/Cancel</button>
                <div v-if="bombError == true" class="bomb-error">
                    <strong>同じカードを２回選んでいます！<br>You selected the same two cards!</strong>
                </div>
            </div>
            <br>
            <div v-for="(yellowCard, index) in yellowList">
                {{ index }}:{{ yellowCard[0] }}{{ yellowCard[1] }}
            </div>
        </div>
        <div class="green-bomb" v-if="greenBomb == true">
            <h2 class="green-bomb-t">逆鱗 緑 / Outrage Green</h2>

            <div>取り除くカードの番号を２つまで選択（トップカードは選択できません）<br>
                Select up to 2 cards to remove.(EXCEPT the top card)</div>
            <div>
                <select name="greenBomb1" id="greenBomb1" v-model.number="bombList[0]">
                    <option v-for="(b, i) in greenList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>no card</option>
                </select>
                <select name="greenBomb2" id="greenBomb2" v-model.number="bombList[1]">
                    <option v-for="(b, i) in greenList" v-bind:value="i">
                        <div v-if="i > 0">{{ i }}:{{ b[0] }}{{ b[1] }}</div>
                    </option>
                    <option value=0>no card</option>
                </select>
                <button @click="bomb('green')" class="decide-button">決定/OK</button>
                <button @click="greenBomb = false; bombList = [0, 0, 0]">取り消し/Cancel</button>
                <div v-if="bombError == true" class="bomb-error">
                    <strong>同じカードを２回選んでいます！<br>You selected the same twocards!</strong>
                </div>
            </div>
            <br>
            <div v-for="(greenCard, index) in greenList">
                {{ index }}:{{ greenCard[0] }}{{ greenCard[1] }}
            </div>
        </div>
    </div>
</template>

<style>
.help-button {
    vertical-align: middle;
}

.reset-buttons {
    text-align: right;
}

.decide-button {
    background-color: rgb(247, 251, 113);
    padding: 6px;
    font-weight: bold;
    border-radius: 5px;
}

.decide-button:hover {
    background-color: rgb(205, 208, 114);
    padding: 6px;
    font-weight: bold;
    border-radius: 5px;
}

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
    text-align: center;
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

.table-content {
    background-color: white;
    color: black;
    text-align: center;
}

table {
    margin-left: auto;
    margin-right: auto;
}

.check-table-cont {
    text-align: center;
}
</style>