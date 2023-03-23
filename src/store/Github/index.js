import index from '..';
import axios from 'axios';

const getDefaultState = () => {
    return {
        githubToken: null,
        user: null,
        organizations: [],
        repositories: {}
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
        },
        getOrganizations(state) {
            return state.organizations;
        },
        getRepositories(state) {
            return state.repositories;
        }
    },
    mutations: {
        state() {
            return getDefaultState();
        },
        setGithubToken(state, data) {
            state.githubToken = data;
        },
        updateUser(state, data) {
            state.user = data;
        },
        setOrganizations(state, data) {
            state.organizations = data;
        },
        setRepositories(state, data) {
            state.repositories = data;
        }
    },
    actions: {
        resetState({ commit }) {
            commit('resetState')
        },
        async getUser({ commit, state }, data) {
            let response = null;
            try {
                response = await axios.get(`https://api.github.com/user`, { headers: { Authorization: 'token ' + data } });
                commit("updateUser", response.data);
                commit("setGithubToken", data);
                return response.data;
            } catch (e) {
                console.log(e);
                return null;
            }
        },
        async getOrganizations({ commit, state }, data) {
            let response = null;
            try {
                response = await axios.get('https://api.github.com/user/orgs', { headers: { Authorization: 'token ' + data } });
                commit("setOrganizations", response.data);
                return response.data;
            } catch (e) {
                console.log(e);
                return [];
            }
        },
        async getRepositories({ commit, state }, data) {
            let response = null;
            let count = 1;
            try {
                //get user repositories
                do {
                    response = await axios.get(`https://api.github.com/users/${state.user.login}/repos?type=all&per_page=100&page=${count}`, { headers: { Authorization: 'token ' + data } });
                    if (response.data.length > 0)
                        if(!state.repositories[state.user.login])
                            state.repositories[state.user.login] = [];
                        state.repositories[state.user.login].push(...response.data);
                    count++;
                } while (response.data.length != 0);

                //Reset Count
                count = 1;

                //org repositories
                await Promise.all(state.organizations.map(async org => {
                    count = 1;
                    do {
                        response = await axios.get(`https://api.github.com/orgs/${org.login}/repos?type=all&per_page=100&page=${count}`, { headers: { Authorization: 'token ' + data } });
                        if (response.data.length > 0){
                            if(!state.repositories[org.login])
                                state.repositories[org.login] = [];
                            state.repositories[org.login].push(...response.data);
                        }
                        count++;
                    } while (response.data.length != 0);
                }));

                return state.repositories;
            } catch (e) {
                console.log(e);
                return [];
            }
        }
    }

}