<script setup>
import { ref } from "vue";

const props = defineProps({
  oneRoundScore: Array,
  playersList: Array,
  playerNumber: Number,
  status: String,
  round: Number,
})

const score = ref([[], [], []])
const totalScore = ref([])
const added = ref(false)

const add = () => {
  if (props.playerNumber != 6 && totalScore.value.length == 6) {
    totalScore.value.splice(props.playerNumber, 6 - props.playerNumber)
  }
  for (let i = 0; i < props.playerNumber; i += 1) {
    console.log(props.playerNumber)
    console.log(i)
    if (props.round == 0) {
      totalScore.value[i] = props.oneRoundScore[i]
      score.value[props.round][i] = props.oneRoundScore[i]
    } else {
      totalScore.value[i] = totalScore.value[i] + props.oneRoundScore[i]
      score.value[props.round][i] = props.oneRoundScore[i]
    }
  }
  added.value = true
}
</script>

<template>
  <transition appear>
    <div class="modal" @click.self="$emit('closeModal')">
      <div class="modal-window">
        <button @click="$emit('closeModal')" class="close" type="button"><span class="batsu"></span></button>
        <!--TODO:xボタンを出すタイミング-->
        <div class="modal-content">
          <h2>得点</h2>
          <div class="round-score" v-if="status == 'endOfRound'">
            <h3>第{{ round + 1 }}ラウンドの得点</h3>
            <table border="1" class="round-score-table">
              <thead>
                <tr>
                  <th v-for="player in playersList">{{ player }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="score in oneRoundScore">{{ score }}</td>
                </tr>
              </tbody>
            </table>
            <button @click="add" :disabled="added">合計得点に足す</button>
          </div>
          <div class="total-result">
            <h3>今までの得点</h3>
            <table border="1" class="total-result-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="player in playersList">{{ player }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td v-for="score1 in score[0]">{{ score1 }}</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td v-for="score2 in score[1]">{{ score2 }}</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td v-for="score3 in score[2]">{{ score3 }}</td>
                </tr>
                <tr>
                  <th>合計</th>
                  <td v-for="total in totalScore">{{ total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <button v-if="round < 2" :disabled="!added" @click="$emit('closeModalAndNext'); added = false">つぎのラウンドへ</button>
            <button v-if="round == 2" :disabled="!added">ゲームを終了する</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}

.modal-window {
  background-color: white;
  border-radius: 5px;
  min-width: 70%;
}

.modal-content {
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 5%;
  vertical-align: top;
}

.close {
  float: right;
  background-color: lightgray;
  border-color: #333;
  border-radius: 5px;
}

.close:hover {
  background-color: gray;
}

.batsu {
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
}

.batsu::before,
.batsu::after {
  /* 共通設定 */
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  /* 棒の幅（太さ） */
  height: 20px;
  /* 棒の高さ */
  background: #333;
}

.batsu::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.batsu::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

table,
td {
  border: 1px solid #333;
  text-align: left;
  font-size: 14pt;
}

thead th {
  font-size: 2vw;
}

thead,
tfoot {
  background-color: rgb(87, 86, 86);
  color: #fff;
}
</style>