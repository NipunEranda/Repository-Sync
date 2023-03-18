<template>
    <div class="main">
        <img class="main-logo center" src="../assets/icon.png" />
        <h1 class="main-title">Welcome To Repository Sync</h1>
        <button class="btn btn-sm btn-primary mt-3" @click="goToInit()">Get Started</button>
    </div>
</template>

<script>

import * as fs from '@tauri-apps/api/fs';
import * as os from '@tauri-apps/api/os';
import * as tauriPath from '@tauri-apps/api/path';
import * as shell from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import { notify } from '../utils';

export default {
    data() {
        return {}
    },
    methods: {
        goToInit: async function () {
            this.$router.push('/init');
            await this.createFile();
        },
        createFile: async function () {
            // https://tauri.app/v1/api/js/modules/fs
            const appObj = {
                createdOn: (new Date().toLocaleString())
            };

            const platform = await os.platform();

            const filePath = `${await tauriPath.documentDir()}RepositorySync${platform == 'win32' ? '\\' : '/'}config.json`;
            fs.readTextFile(filePath).then((data) => {
                // console.log('file exists');
            }).catch(async e => {
                if (e.includes('os error 3')) {
                    await fs.createDir('RepositorySync', { dir: fs.BaseDirectory.Document, recursive: true })
                    await fs.writeTextFile('RepositorySync\\config.json', JSON.stringify(appObj, null, 2), { dir: fs.BaseDirectory.Document });
                    notify('User Data', 'Repository Sync data store is located in Documents/RepositorySync');
                } else {
                    notify('Something went wrong', e);
                }
            })

            // console.log(await fs.readTextFile(filePath));
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