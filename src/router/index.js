import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import About from '../views/About.vue';
import InitialSetup from '../views/InitialSetup.vue';
import Home from '../views/Home.vue';
import store from '../store';
import * as tauriPath from '@tauri-apps/api/path';
import * as os from '@tauri-apps/api/os';

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/init',
        name: 'InitialSetup',
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

router.beforeEach((to, from) => {
    tauriPath.documentDir().then(docDir => {
        os.platform().then(osPlatform => {
            store.dispatch('readFile', `${docDir}RepositorySync${osPlatform == 'win32' ? '\\' : '/'}config.json`).then(file => {
                if(!file)
                    router.push('/');
                if(file && from.fullPath == '/init' && to.fullPath == '/')
                    router.push('/init');
            });
        })
    });
});

export default router;