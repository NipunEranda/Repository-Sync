<template>
  <div>
    <div class="main init">
      <h1>Select a system to sync</h1>
    </div>
    <div class="mt-3">
      <div>
        <button id="github" class="ps-5 pe-5 button pointer" @click="openModal('exampleModal', 'github')">Sync GitHub
          Repositories</button>
      </div>
      <div class="mt-2">
        <button id="gitlab" class="ps-5 pe-5 mt-3 button pointer" @click="openModal('exampleModal', 'gitlab')"
          disabled>Sync
          GitLab
          Repositories</button>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header dark-modal-background dark-modal-foreground">
            <h5 class="modal-title" id="exampleModalLongTitle">GitHub Config</h5>
            <button type="button" class="close modal-close-btn" aria-label="Close" @click="closeModal('exampleModal')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body dark-modal-background dark-modal-foreground">
            <input class="w-100" type="text" placeholder="Set Token" v-model="token" @focusout="checkUser()">
            <label class="mt-1 small" style="color: limegreen;" v-text="user ? user.name : ''"></label>
            <input class="w-100 mt-3" type="password" placeholder="Set a password" v-model="password" :disabled="!user">
          </div>
          <div class="modal-footer dark-modal-background dark-modal-foreground">
            <button type="button" class="btn btn-secondary" @click="closeModal('exampleModal')">Close</button>
            <button type="button" class="btn btn-primary" @click="save()">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import store from "../../store";
import * as tauriPath from '@tauri-apps/api/path';
import * as fs from '@tauri-apps/api/fs';
import * as os from '@tauri-apps/api/os';
import { notify, encrypt, decrypt } from "../../utils";
import { getUserDetails } from '../../utils/github';
import axios from 'axios';
export default {
  data() {
    return {
      configFile: null,
      token: '',
      password: '',
      system: null,
      modal: null,
      user: null
    }
  },
  methods: {
    openModal: function (modal, system) {
      this.modal = modal;
      this.system = system;
      this.token = '';
      this.password = '';
      $(`#${modal}`).modal('show');
    },
    closeModal: function (modal) {
      $(`#${modal}`).modal('hide');
    },
    save: async function () {
      try {
        this.configFile = JSON.parse(await store.dispatch('readFile', `${await tauriPath.documentDir()}RepositorySync${(await os.platform()) == 'win32' ? '\\' : '/'}config.json`));
        this.system == 'github' ? this.configFile.githubToken = encrypt(this.token, this.password) : this.configFile.gitlabToken = encrypt(this.token, this.password);
        await store.dispatch("createFile", {
          filePath: `${await tauriPath.documentDir()}RepositorySync${(await os.platform()) == 'win32' ? '\\' : '/'}config.json`,
          rootFolderPath: 'RepositorySync',
          fileName: 'config.json',
          dir: fs.BaseDirectory.Document,
          notify: false,
          notificationTitle: 'User Data',
          notificationMessage: 'Repository Sync data store is located in Documents/RepositorySync',
          data: this.configFile,
          forceWrite: true
        });
        $(`#${this.modal}`).modal('hide');
        this.$router.push('/home');
      } catch (e) {
        console.log(e);
      }
    },
    checkUser: async function () {
      try {
        if (this.token != '') {
          this.user = await store.dispatch("getUser", this.token);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>
.init {
  padding: 10px;
  text-align: center;
}

.button {
  margin-left: auto;
  margin-right: auto;
  display: block;
}

#github:hover {
  background-color: #6e40c9;
  border-color: #6e40c9;
}

#gitlab:hover {
  background-color: #fc6d26;
  border-color: #fc6d26;
}
</style>