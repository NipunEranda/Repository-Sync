<template>
    <div>
        Home
        <button @click="$router.push('/about')">About</button>
        <button @click="signOut()">Signout</button>
    </div>
</template>

<script>
import { useStore } from "vuex";
import store from "../store";
import * as tauriPath from '@tauri-apps/api/path';
import * as fs from '@tauri-apps/api/fs';
import * as os from '@tauri-apps/api/os';
import helper from '../mixin/helper';
export default {
    data() {
        return {
            store: useStore(),
            user: store.getters.getUser
        }
    },
    methods: {
        signOut: async function(){
            await helper.methods.signOut();
            location.reload();
        }
    }
}
</script>