import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue';

const routes = [
    {
        path: '/', redirect: '/load', meta: {
            title: '加载页',
        }
    },
    // 加载页
    { path: '/load', name: 'load', component: () => import('@/views/load/LoadIndex.vue') },
    {

        path: '/layout', name: 'layout', component: () => import('@/views/layout/LayoutIndex.vue'),
        children: [{
            // 主页
            path: '/home', name: 'home', component: () => import('@/views/home/homeIndex.vue')
        }, {
            // 前端-javascript
            path: '/javascript', name: 'javascript', component: () => import('@/views/font-end/javascript/JavascriptIndex.vue')
        }]
    },
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