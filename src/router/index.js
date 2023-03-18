import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import About from '../views/About.vue';
import InitialSetup from '../views/Initial-Setup/Index.vue';

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
        name: 'initial-setup',
        component: InitialSetup
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;