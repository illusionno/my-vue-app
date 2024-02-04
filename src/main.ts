import { createApp } from 'vue'
import './style.css'
import 'uno.css';
import App from './App.vue'
import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css'
import { setupI18n } from '@/modules/i18n'
import { setupStore } from '@/store';
import { setupRouter } from '@/router'
// 使用async/await会按顺序执行，前面任务完成后再执行后面的任务
// 否则，有些任务会在同一时间执行，从而导致等待时间延长

(async () => {
    const app = createApp(App);
    // 注意注册的顺序
    // 注册store
    await setupStore(app)
    // 注册i18n
    await setupI18n(app)
    // 注册router
    await setupRouter(app)
    app.mount('#app')
})()