<script setup>
const props = defineProps({
  finishPlayer: String,
  finishColor: String,
  number: Number,
  haveFinished: Boolean,
  dragon: Boolean
})


</script>

<template>
  <transition appear>
    <div class="modal" @click.self="$emit('cancel')">
      <div class="modal-window">
        <button @click="$emit('cancel')" class="close" type="button"><span class="batsu"></span></button>
        <div class="modal-content">
          <h2>奉納/Check</h2>
          <li>プレイヤー/Player:{{ finishPlayer }}</li>
          <li>色/Color:{{ finishColor }}</li>
          <li>{{ finishColor }}の数字（得点ではありません）/Number(NOT Score):{{ number }}</li>
          <li v-if="dragon" :class="{dragon:'dragon'}">龍王/Ryuo</li>
        </div>
        <div v-if="haveFinished" class="warning">{{ finishPlayer }}はすでに一度奉納しています。もう一度奉納しますか？得点が上書きされます。<br>
          {{finishPlayer}} has already "checked" in this round. Do you really want to "check" one more time?<br>The score will be overwrited.</div>
        <div>
          <button @click="$emit('cancel')">やめる/Cancel</button>
          <button @click="$emit('confirm')" class="decide-button">決定/OK</button>
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

.warning {
  color: red;
  font-size: larger;
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

.dragon {
  color: red;
}
</style>