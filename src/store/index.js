import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import router from '../router';
import file from './File';

const store = createStore({
    modules: {
        file: file
    },
    plugins: [createPersistedState()],
    actions: {
        logout(){
            this.commit('resetState');
            router.push("/");
        },
    },
});

export default store;