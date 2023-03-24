<template>
    <div data-tauri-drag-region class="titlebar pointer">
        <span data-tauri-drag-region class="titlebarLabel">
            <img src="../assets/32x32.png" alt="" width="25"><span class="ms-1" style="vertical-align: middle;">Repository Sync</span>
        </span>
        <div class="titlebar-button ps-4 pe-4" id="titlebar-minimize" @click="windowMinimize()">
            <font-awesome-icon icon="fa-window-minimize" />
        </div>
        <div class="titlebar-button ps-4 pe-4" id="titlebar-maximize" @click="windowMaximize()">
            <font-awesome-icon icon="fa-window-maximize" />
        </div>
        <div class="titlebar-button ps-4 pe-4" id="titlebar-close" @click="windowClose()">
            <font-awesome-icon icon="fa-close"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { appWindow } from '@tauri-apps/api/window';

function windowClose() {
    appWindow.close();
}

function windowMinimize() {
    appWindow.minimize();
}

function windowMaximize() {
    appWindow.toggleMaximize();
}

</script>

<style scoped>
.titlebar {
    height: 30px;
    background: #242424;
    color: #FFF;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
}

.titlebar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #ddd;
    width: 30px;
    height: 30px;
}

.titlebar-button img {
    width: 14px;
}

#titlebar-minimize:hover {
    background-color: #3d3d3d;
}

#titlebar-maximize:hover {
    background-color: #3d3d3d;
}

#titlebar-close:hover {
    background-color: red;
}

.titlebar-button img:hover {
    cursor: pointer;
}

/* titlebarLabel: {
        display: 'inline',
        marginLeft: 5,
        // marginLeft: 46 * 2,  // for center labels
        lineHeight: '30px'
    }, */

.titlebarLabel {
    margin-top: 2px;
    position: absolute;
    left: 5px;
}
</style>