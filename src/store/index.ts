import type { App } from 'vue';
import { createPinia } from 'pinia';
// https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/advanced.html
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia();
store.use(piniaPluginPersistedstate);

// https://pinia.vuejs.org/
export function setupStore(app: App<Element>) {
  return new Promise((resolve) => {
    app.use(store);
    resolve('store 挂载完成');
  });
}
export * from './modules';
export { store };