import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import router from '../router';
import file from './File';
import github from './Github';

const store = createStore({
    modules: {
        file: file,
        github: github
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