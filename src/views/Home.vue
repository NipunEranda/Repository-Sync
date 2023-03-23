<template>
    <div>
        <div>
            <button class="btn btn-danger btn-sm float-right ms-2 pointer" @click="signOut()"><font-awesome-icon icon="fa-power-off" /></button>
            <button class="btn btn-secondary btn-sm float-right ms-2 pointer"><font-awesome-icon icon="fa-gear" /></button>
            <div class="dropdown float-right" data-bs-theme="dark">
                <button class="btn btn-dark dropdown-toggle btn-sm ps-3 pe-2" type="button" id="dropdownMenuButtonDark"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {{ selectedItem == -1 ? user.login : organizations[selectedItem].login }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonDark">
                    <li><a class="dropdown-item" :class="{ 'active': selectedItem == -1 }" href="#" @click="selectedItem = -1">{{ user.login }}</a></li>
                    <li><a class="dropdown-item"  :class="{ 'active': selectedItem == o }" href="#" v-for="(org,o) in organizations" :key="o" @click="selectedItem = o">{{ org.login }}</a></li>
                </ul>
            </div>
        </div>

        {{ repositories }}
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
            user: store.getters.getUser,
            selectedItem: -1,
            organizations: [],
            repositories: [],
        }
    },
    methods: {
        init: async function(){
            this.organizations = await store.dispatch("getOrganizations", store.getters.getGithubToken);
            this.repositories = await store.dispatch("getRepositories", store.getters.getGithubToken);
            console.log(this.repositories);
        },
        signOut: async function () {
            await helper.methods.signOut();
            this.$router.push('/');
        }
    },
    mounted: async function(){
        await this.init();
    }
}
</script>