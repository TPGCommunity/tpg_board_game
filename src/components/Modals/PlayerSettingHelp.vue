<template>
  <transition appear>
    <div class="modal" @click.self="$emit('closePlayerSettingHelp')">
      <div class="modal-window">
        <butoon @click="$emit('closePlayerSettingHelp')" class="close" type="button"><span class="batsu"></span></butoon>
        <div class="modal-content">
          <h2>プレイヤーの設定について</h2>
          <div class="msg">
            PrimeDragonは3から6人のプレイヤーで、3ラウンドの合計点を競うことを想定して作られていますが、必ずしもこのルールでなくては遊べないというわけではありません。
            このアプリには各ラウンドの得点を自動計算して合計得点を出す機能がありますが、「3から6人、3ラウンド」のルールのときのみ使える機能です。
            このルール以外で遊ぶ場合は、「プレイヤーを設定しない」を選んでください。
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
}

.modal-content {
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 5%;
  vertical-align: top;
}

.msg {
  text-align:justify;
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

</style>