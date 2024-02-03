import { defineConfig } from 'vite';
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const srcPath = resolve(__dirname, 'src');
// const baseApi = process.env.VITE_APP_BASE_API || '';
// const baseUrl = process.env.VITE_APP_BASE_URL || '';
// https://vitejs.dev/config/
export default defineConfig({
  // 解决环境变量不加载的问题 https://github.com/vitejs/vite/discussions/2260
  server: {
    host: '0.0.0.0',
    port: 4299,
    // proxy:{
    // [baseApi]: {
    //   target: baseUrl + baseApi,
    //   changeOrigin: true,
    //   rewrite: (_path: string) => _path.replace(baseApi, ''),
    // },
  },
  resolve: {
    alias: {
      '@/': `${srcPath}/`
    }
  },
  plugins: [
    vue({
      script: {
        defineModel: true//允许在单文件组件（SFC）的 <script setup> 语法中更方便地使用 v-model 双向绑定。
      }
    }),
    // 自定引入hook:https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', 'pinia', '@vueuse/core',{
        'naive-ui': [
          'useDialog',
          'useMessage',
          'useNotification',
          'useLoadingBar'
        ]
      }],
      // dts: '/auto-imports.d.ts',//防止类型不识别
      dts: true,// 正确提示类型
      dirs: ['src/composables/**', 'src/utils/**'],//自定义导入该文件夹下的文件
      vueTemplate: true,
      eslintrc: {
        enabled: true, // <-- this
      },
      resolvers: [
        ElementPlusResolver({
          importStyle: false, // 自定义主题全量导入 src/styles/element-plus/index.scss
        }),
      ]
    }),
    // 按需加载组件
    Components({
      //自动注册图标组件
      resolvers: [
        IconsResolver({
          prefix: false,
          alias: { park: 'icon-park' },
          enabledCollections: [
            'ep', // element-plus https://icones.netlify.app/collection/ep
            'icon-park', // icon-park https://icones.netlify.app/collection/icon-park
            'mdi', // Material Design Icons https://icones.netlify.app/collection/mdi
          ],
        }),
        // 自动注册element-plus组件
        ElementPlusResolver({
          importStyle: false,
        }),
        // Naive UI
        NaiveUiResolver()
      ]
    }),
    // 图标：https://github.com/unplugin/unplugin-icons
    Icons({
      autoInstall: true, // Auto install components
      scale: 1.2, // Scale of icons against 1em
      defaultStyle: '', // Style apply to icons
      defaultClass: 'v-icon', // Class names apply to icons
      compiler: 'vue3', // 'vue2', 'vue3', 'jsx'
      jsx: 'react', // 'react' or 'preact'
    }),
    // 原子样式：https://github.com/antfu/unocss
    UnoCSS(),
    // 国际化：https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [resolve(__dirname, 'locales/**')],
    })
  ],
})
