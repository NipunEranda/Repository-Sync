import index from '..';
import * as fs from '@tauri-apps/api/fs';
import * as tauriPath from '@tauri-apps/api/path';
import * as shell from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import * as os from '@tauri-apps/api/os';
import { notify } from '../../utils';

const getDefaultState = () => {
    return {
        files: null,
    }
}

export default {
    state() {
        return getDefaultState();
    },
    getters: {
        getFiles(state) {
            return state.files;
        },
    },
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        // updateCurrentUser(state, data) {
        //     state.currentUser = data;
        // },
        // updateUserBalanceCurrency(state, data) {
        //     state.currentUser.balance = data.balance;
        //     state.currentUser.currency = data.currency;
        // }
    },
    actions: {
        resetState({ commit }) {
            commit('resetState')
        },
        async createFile(context, data) {
            // data structure => { filePath: value, rootFolderPath: value, fileName: value, dir: value, notify: value, notificationTitle: value, notificationMessage: value }

            const filePath = data.filePath;
            fs.readTextFile(filePath)
                .then(async () => {
                    if(data.forceWrite){
                        await fs.writeTextFile(`${data.rootFolderPath}${(await os.platform()) == 'win32' ? '\\' : '/'}${data.fileName}`, JSON.stringify(data.data, null, 2), { dir: data.dir });
                    }
                 })
                .catch(async e => {
                    console.log(e);
                    if (e.includes('os error 3') || e.includes('os error 2')) {
                        await fs.createDir(data.rootFolderPath, { dir: data.dir, recursive: true })
                        await fs.writeTextFile(`${data.rootFolderPath}${(await os.platform()) == 'win32' ? '\\' : '/'}${data.fileName}`, JSON.stringify(data.data, null, 2), { dir: data.dir });
                        notify(data.notificationTitle, data.notificationMessage);
                    } else {
                        notify('Something went wrong', e);
                    }
                });
        },
        async readFile(context, data) {
            try {
                return await fs.readTextFile(data);
            } catch (e) {
                return null;
            }
        }
        // updateCurrentUser(context, data) {
        //     context.commit("updateCurrentUser", data);
        // },
        // updateUserBalanceCurrency(context, data) {
        //     context.commit("updateUserBalanceCurrency", data);
        // }
    }
}