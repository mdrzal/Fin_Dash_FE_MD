import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import { RoutePaths } from './routePaths';
import Dashboard from '../views/Dashboard.vue';
import ErrorPage from '../views/Error.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: RoutePaths.Home,
        name: 'Home',
        component: Home
    },
    {
        path: RoutePaths.Dashboard,
        name: 'Dashboard',
        component: Dashboard,
        props: true
    },
    {
        path: RoutePaths.Error,
        name: 'Error',
        component: ErrorPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
