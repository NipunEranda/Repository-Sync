import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    modules: {
    },
    plugins: [createPersistedState()],
});

export default store;