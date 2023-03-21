import * as tauriPath from '@tauri-apps/api/path';
import * as fs from '@tauri-apps/api/fs';
import * as os from '@tauri-apps/api/os';
import store from "../store";

export default {
    methods: {
        async signOut(){
            await store.dispatch("removeFile", {file: false, folderPath: `${await tauriPath.documentDir()}RepositorySync`,  dir: fs.BaseDirectory.Document});
        }
    }
}