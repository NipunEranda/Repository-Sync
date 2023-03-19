import index from '..';
import axios from 'axios';

const getDefaultState = () => {
    return {
        githubToken: null,
        user: null,
    }
}

export default {
    state() {
        return getDefaultState();
    },
    getters: {
        getGithubToken(state) {
            return state.githubToken;
        },
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        getUser(state, data) {
            state.user = data;
        }
    },
    actions: {
        async getUser(context, data) {
            let response = null;
            try {
                response = await axios.get(`https://api.github.com/user`, { headers: { Authorization: 'token ' + data } });
                context.commit("updateUser", response.data);
                return response.data;
            } catch (e) {
                console.log(e);
                return null;
            }
        }
    }

}