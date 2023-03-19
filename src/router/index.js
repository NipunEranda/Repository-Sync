import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import About from '../views/About.vue';
import InitialSetup from '../views/Initial-Setup/Index.vue';
import Home from '../views/Home.vue';
import store from '../store';
import * as tauriPath from '@tauri-apps/api/path';
import * as os from '@tauri-apps/api/os';

const configFile = JSON.parse(await store.dispatch('readFile', `${await tauriPath.documentDir()}RepositorySync${(await os.platform()) == 'win32' ? '\\' : '/'}config.json`));

const routes = [
    {
        path: '/',
        name: 'index',
        component: !configFile ? Index : (configFile.githubToken || configFile.gitLabToken) ? Home : InitialSetup
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/init',
        name: 'initial-setup',
        component: InitialSetup
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;