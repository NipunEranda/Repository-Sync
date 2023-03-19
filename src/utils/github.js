import axios from 'axios';

export async function getUserDetails(token) {
    let response = null;
    try {
        response = await axios.get(`https://api.github.com/user`, { headers: { Authorization: 'token ' + token } });
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export async function getOrganizations(token) {
    let response = null;
    try {
        response = await axios.get(`https://api.github.com/user/orgs`, { headers: { Authorization: 'token ' + token, Accept: 'application/vnd.github.v3+json' } });
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getOrgRepositories(org, token) {
    let response = null;
    try {
        response = await axios.get(`https://api.github.com/orgs/${org}/repos`, { headers: { Authorization: 'token ' + token, Accept: 'application/vnd.github.v3+json' } });
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getPersonalRepositories(token) {
    let response = null;
    try {
        response = await axios.get(`https://api.github.com/user/repos?visibility=all&per_page=100`, { headers: { Authorization: 'token ' + token, Accept: 'application/vnd.github.v3+json' } });
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}
export async function getLanguagesInRepository(link, token) {
    let response = null;
    try {
        response = await axios.get(link, { headers: { Authorization: 'token ' + token, Accept: 'application/vnd.github.v3+json' } });
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}
