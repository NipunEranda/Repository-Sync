<template>
    <div class="main">
        <img class="main-logo center" src="../assets/icon.png" />
        <h1 class="main-title">Welcome To Repository Sync</h1>
        <button class="btn btn-sm btn-primary mt-3" @click="goToInit()">Get Started</button>
    </div>
</template>

<script>
import { useStore } from "vuex";
import store from "../store";
import * as tauriPath from '@tauri-apps/api/path';
import * as fs from '@tauri-apps/api/fs';
import * as os from '@tauri-apps/api/os';
export default {
    data() {
        return {
            store: useStore(),
        }
    },
    methods: {
        goToInit: async function () {
            await this.createFile();
            this.$router.push('/init');
        },
        createFile: async function () {
            await store.dispatch("createFile", {
                filePath: `${await tauriPath.documentDir()}RepositorySync${(await os.platform()) == 'win32' ? '\\' : '/'}config.json`,
                rootFolderPath: 'RepositorySync',
                fileName: 'config.json',
                dir: fs.BaseDirectory.Document,
                notify: true,
                notificationTitle: 'User Data',
                notificationMessage: 'Repository Sync data store is located in Documents/RepositorySync',
                data: { createdOn: (new Date().toLocaleString()) }
            });
        }
    }
};


</script>

<style scoped>
.main-logo {
    width: 150px;
}

.btn {
    margin: auto;
    padding: 5px 20px 5px 20px;
}
</style>