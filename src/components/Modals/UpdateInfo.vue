<template>
    <transition appear>
        <div class="modal" @click.self="$emit('closeModal')">
            <div class="modal-window">
                <button @click="$emit('closeModal')" class="close" type="button"><span class="batsu"></span></button>
                <div class="modal-content">
                    <h2>UPDATE INFO</h2>
                    <div>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>TITLE</th>
                                    <th>CONTENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--TODO:masterへのマージ前に書き足す。-->
                                <!--コピペ用
                                <tr>
                                    <td>YYYY/MM/DD</td>
                                    <td>タイトル</td>
                                    <td>説明</td>
                                </tr>
                            -->
                                <tr>
                                    <td>2022/08/09</td>
                                    <td>「UPDATE INFO」ページを追加</td>
                                    <td>アップデート情報を告知するページを追加しました。</td>
                                </tr>
                                <tr>
                                    <td>2022/08/21</td>
                                    <td>得点管理機能を追加</td>
                                    <td>３ラウンドの得点を合算できるようになりました。</td>
                                </tr>
                                <tr>
                                    <td>2022/10/18</td>
                                    <td>英語対応・UIを改善</td>
                                    <td>英語を併記しました。<br>UIを改善して使いやすくしました。</td>
                                </tr>
                            </tbody>
                        </table>
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
}

thead,
tfoot {
    background-color: rgb(87, 86, 86);
    color: #fff;
}
</style>