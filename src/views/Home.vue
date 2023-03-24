<template>
    <div>
        <div class="row w-100 m-0 p-0">
            <div class="col col-12 m-0 p-0">
                <button class="btn btn-danger btn-sm float-right ms-2 pointer" @click="signOut()"><font-awesome-icon
                        icon="fa-power-off" /></button>
                <button class="btn btn-secondary btn-sm float-right ms-2 pointer"><font-awesome-icon
                        icon="fa-gear" /></button>
                <div class="dropdown float-right" data-bs-theme="dark">
                    <button class="btn btn-dark dropdown-toggle btn-sm ps-3 pe-2" type="button" id="dropdownMenuButtonDark"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        {{ selectedItem == -1 ? user.login : organizations[selectedItem].login }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonDark">
                        <li><a class="dropdown-item" :class="{ 'active': selectedItem == -1 }" href="#"
                                @click="selectedItem = -1">{{ user.login }}</a></li>
                        <li><a class="dropdown-item" :class="{ 'active': selectedItem == o }" href="#"
                                v-for="(org, o) in organizations" :key="o" @click="selectedItem = o">{{ org.login }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <div class="row m-0 p-0">
                <div class="col-sm-6 col-lg-4 col-xl-3 mb-3 p-3"
                    v-for="repository in repositories[selectedItem == -1 ? user.login : organizations[selectedItem].login]">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ repository.name }}</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.
                            </p>
                            <div>
                                <span class="float-left">Last synced: {{ new Date().toLocaleDateString() }}</span>
                                <span><a href="#" class="btn btn-success float-right btn-sm">Sync</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        init: async function () {
            $(".container-loader").removeClass("hidden").addClass("show");
            this.organizations = await store.dispatch("getOrganizations", store.getters.getGithubToken);
            this.repositories = await store.dispatch("getRepositories", store.getters.getGithubToken);
            console.log(this.repositories);
            $(".container-loader").removeClass("show").addClass("hidden");
        },
        signOut: async function () {
            await helper.methods.signOut();
            this.$router.push('/');
        }
    },
    mounted: async function () {
        await this.init();
    }
}
</script>