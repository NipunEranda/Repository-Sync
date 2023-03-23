import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import router from '../router';
import file from './File';
import github from './Github';
import * as tauriPath from '@tauri-apps/api/path';
import * as fs from '@tauri-apps/api/fs';
import * as os from '@tauri-apps/api/os';

const store = createStore({
    modules: {
        file: file,
        github: github
    },
    plugins: [createPersistedState()],
    actions: {
        async logout(){
            await this.dispatch("removeFile", {file: false, folderPath: `${await tauriPath.documentDir()}RepositorySync`,  dir: fs.BaseDirectory.Document});
            router.push("/");
        },
    },
});

export default store;