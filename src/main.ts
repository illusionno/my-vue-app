import { createApp } from 'vue'
import './style.css'
import 'uno.css';
import App from './App.vue'
import 'element-plus/dist/index.css'
import { setupI18n } from '@/modules/i18n'
// 使用async/await会按顺序执行，前面任务完成后再执行后面的任务
// 否则，有些任务会在同一时间执行，从而导致等待时间延长
(async () => {
    const app = createApp(App);
    // 注册i18n
    setupI18n(app)
    app.mount('#app')
})()