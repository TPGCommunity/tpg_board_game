<script setup>
</script>

<template>
    <transition>
        <div class="sidebar" @click.self="$emit('closeSideBar')">
            <div class="sidebar-wrapper">
                <div class="contents">
                    <p @click="$emit('closeSideBar')"><span></span>MENU</p>
                    <p @click="">ルール(工事中)/Rule(not ready)</p>
                    <p @click="">途中結果(工事中)/Progress(not ready)</p>
                    <p @click="$emit('update')">アップデート情報/Update Info</p>
                    <p><a href="https://www.tpgd.jp/" target="_blank"
                            rel="noopener noreferrer">AboutUs "TPG"（外部リンク）</a></p>
                    <p><a href="https://mobile.twitter.com/ikura_hamu" target="_blank" rel="noopener noreferrer">
                            Contact to the page creator (Twitter)</a></p>
                </div>
            </div>
        </div>
    </transition>
</template>

<style>
.sidebar {
    display: flex;
    align-items: left;
    justify-content: left;
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
}

.sidebar-wrapper {
    align-items: left;
    z-index: 20;
    height: 100%;
    width: 25%;
    background-color: white;
    border-right: solid 3px;
    border-color: gray;
}

.contents p {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 0;
    border-bottom: solid 1px;
}

.contents {
    padding-top: 30px;
}

.contents p span::before {
    content: "\25B6";
    color: black;
    display: inline-block;
    transform: rotate(90deg);
}

.contents p:hover {
    color: gray;
    background-color: lightgray;
}
</style>