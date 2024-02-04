import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue';

const Home = () => import('@/views/Home.vue');
const Load = () => import('@/views/Load.vue');
const routes = [
    { path: '/', component: Load },
    { path: '/load',name:'load', component: Load },
    { path: '/home',name:'home', component: Home },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export function setupRouter(app: App<Element>) {
    return new Promise((resolve) => {
        app.use(router);
        resolve('router挂载完成');
    })

}