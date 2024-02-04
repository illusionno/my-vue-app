// vite.config.ts
import { defineConfig } from "file:///D:/code/my-vue-app/node_modules/.pnpm/vite@5.0.11_@types+node@20.11.5_sass@1.70.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///D:/code/my-vue-app/node_modules/.pnpm/@vitejs+plugin-vue@5.0.3_vite@5.0.11_vue@3.4.15/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/code/my-vue-app/node_modules/.pnpm/unplugin-auto-import@0.17.3_@vueuse+core@10.7.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/code/my-vue-app/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.15/node_modules/unplugin-vue-components/dist/vite.js";
import Icons from "file:///D:/code/my-vue-app/node_modules/.pnpm/unplugin-icons@0.18.2/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///D:/code/my-vue-app/node_modules/.pnpm/unplugin-icons@0.18.2/node_modules/unplugin-icons/dist/resolver.js";
import { ElementPlusResolver } from "file:///D:/code/my-vue-app/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.15/node_modules/unplugin-vue-components/dist/resolvers.js";
import VueI18nPlugin from "file:///D:/code/my-vue-app/node_modules/.pnpm/@intlify+unplugin-vue-i18n@2.0.0_vue-i18n@9.9.0/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import UnoCSS from "file:///D:/code/my-vue-app/node_modules/.pnpm/unocss@0.58.3_postcss@8.4.33_vite@5.0.11/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\code\\my-vue-app";
var srcPath = resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  // 解决环境变量不加载的问题 https://github.com/vitejs/vite/discussions/2260
  server: {
    host: "0.0.0.0",
    port: 4299
    // proxy:{
    // [baseApi]: {
    //   target: baseUrl + baseApi,
    //   changeOrigin: true,
    //   rewrite: (_path: string) => _path.replace(baseApi, ''),
    // },
  },
  resolve: {
    alias: {
      "@/": `${srcPath}/`
    }
  },
  plugins: [
    vue({
      script: {
        defineModel: true
        //允许在单文件组件（SFC）的 <script setup> 语法中更方便地使用 v-model 双向绑定。
      }
    }),
    // 自定引入hook:https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n", "pinia", "@vueuse/core"],
      dts: true,
      // 正确提示类型
      dirs: ["src/composables/**", "src/utils/**"],
      //自定义导入该文件夹下的文件
      vueTemplate: true,
      eslintrc: {
        enabled: true
        // <-- this
      },
      resolvers: [
        ElementPlusResolver({
          importStyle: false
          // 自定义主题全量导入 src/styles/element-plus/index.scss
        })
      ]
    }),
    // 按需加载组件
    Components({
      //自动注册图标组件
      resolvers: [
        IconsResolver({
          prefix: false,
          alias: { park: "icon-park" },
          enabledCollections: [
            "ep",
            // element-plus https://icones.netlify.app/collection/ep
            "icon-park",
            // icon-park https://icones.netlify.app/collection/icon-park
            "mdi"
            // Material Design Icons https://icones.netlify.app/collection/mdi
          ]
        }),
        // 自动注册element-plus组件
        ElementPlusResolver({
          importStyle: false
        })
      ]
    }),
    // 图标：https://github.com/unplugin/unplugin-icons
    Icons({
      autoInstall: true,
      // Auto install components
      scale: 1.2,
      // Scale of icons against 1em
      defaultStyle: "",
      // Style apply to icons
      defaultClass: "v-icon",
      // Class names apply to icons
      compiler: "vue3",
      // 'vue2', 'vue3', 'jsx'
      jsx: "react"
      // 'react' or 'preact'
    }),
    // 原子样式：https://github.com/antfu/unocss
    UnoCSS(),
    // 国际化：https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [resolve(__vite_injected_original_dirname, "locales/**")]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXG15LXZ1ZS1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcbXktdnVlLWFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS9teS12dWUtYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIlxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBWdWVJMThuUGx1Z2luIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJztcblxuY29uc3Qgc3JjUGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XG4vLyBjb25zdCBiYXNlQXBpID0gcHJvY2Vzcy5lbnYuVklURV9BUFBfQkFTRV9BUEkgfHwgJyc7XG4vLyBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuVklURV9BUFBfQkFTRV9VUkwgfHwgJyc7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gXHU4OUUzXHU1MUIzXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU0RTBEXHU1MkEwXHU4RjdEXHU3Njg0XHU5NUVFXHU5ODk4IGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9kaXNjdXNzaW9ucy8yMjYwXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBwb3J0OiA0Mjk5LFxuICAgIC8vIHByb3h5OntcbiAgICAvLyBbYmFzZUFwaV06IHtcbiAgICAvLyAgIHRhcmdldDogYmFzZVVybCArIGJhc2VBcGksXG4gICAgLy8gICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgLy8gICByZXdyaXRlOiAoX3BhdGg6IHN0cmluZykgPT4gX3BhdGgucmVwbGFjZShiYXNlQXBpLCAnJyksXG4gICAgLy8gfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQC8nOiBgJHtzcmNQYXRofS9gXG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKHtcbiAgICAgIHNjcmlwdDoge1xuICAgICAgICBkZWZpbmVNb2RlbDogdHJ1ZS8vXHU1MTQxXHU4QkI4XHU1NzI4XHU1MzU1XHU2NTg3XHU0RUY2XHU3RUM0XHU0RUY2XHVGRjA4U0ZDXHVGRjA5XHU3Njg0IDxzY3JpcHQgc2V0dXA+IFx1OEJFRFx1NkNENVx1NEUyRFx1NjZGNFx1NjVCOVx1NEZCRlx1NTczMFx1NEY3Rlx1NzUyOCB2LW1vZGVsIFx1NTNDQ1x1NTQxMVx1N0VEMVx1NUI5QVx1MzAwMlxuICAgICAgfVxuICAgIH0pLFxuICAgIC8vIFx1ODFFQVx1NUI5QVx1NUYxNVx1NTE2NWhvb2s6aHR0cHM6Ly9naXRodWIuY29tL3VucGx1Z2luL3VucGx1Z2luLWF1dG8taW1wb3J0XG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3Z1ZS1pMThuJywgJ3BpbmlhJywgJ0B2dWV1c2UvY29yZSddLFxuICAgICAgZHRzOiB0cnVlLC8vIFx1NkI2M1x1Nzg2RVx1NjNEMFx1NzkzQVx1N0M3Qlx1NTc4QlxuICAgICAgZGlyczogWydzcmMvY29tcG9zYWJsZXMvKionLCAnc3JjL3V0aWxzLyoqJ10sLy9cdTgxRUFcdTVCOUFcdTRFNDlcdTVCRkNcdTUxNjVcdThCRTVcdTY1ODdcdTRFRjZcdTU5MzlcdTRFMEJcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy8gPC0tIHRoaXNcbiAgICAgIH0sXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcih7XG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlLCAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTRFM0JcdTk4OThcdTUxNjhcdTkxQ0ZcdTVCRkNcdTUxNjUgc3JjL3N0eWxlcy9lbGVtZW50LXBsdXMvaW5kZXguc2Nzc1xuICAgICAgICB9KSxcbiAgICAgIF1cbiAgICB9KSxcbiAgICAvLyBcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcdTdFQzRcdTRFRjZcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIC8vXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDXHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgcHJlZml4OiBmYWxzZSxcbiAgICAgICAgICBhbGlhczogeyBwYXJrOiAnaWNvbi1wYXJrJyB9LFxuICAgICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogW1xuICAgICAgICAgICAgJ2VwJywgLy8gZWxlbWVudC1wbHVzIGh0dHBzOi8vaWNvbmVzLm5ldGxpZnkuYXBwL2NvbGxlY3Rpb24vZXBcbiAgICAgICAgICAgICdpY29uLXBhcmsnLCAvLyBpY29uLXBhcmsgaHR0cHM6Ly9pY29uZXMubmV0bGlmeS5hcHAvY29sbGVjdGlvbi9pY29uLXBhcmtcbiAgICAgICAgICAgICdtZGknLCAvLyBNYXRlcmlhbCBEZXNpZ24gSWNvbnMgaHR0cHM6Ly9pY29uZXMubmV0bGlmeS5hcHAvY29sbGVjdGlvbi9tZGlcbiAgICAgICAgICBdLFxuICAgICAgICB9KSxcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDZWxlbWVudC1wbHVzXHU3RUM0XHU0RUY2XG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoe1xuICAgICAgICAgIGltcG9ydFN0eWxlOiBmYWxzZSxcbiAgICAgICAgfSksXG5cbiAgICAgIF1cbiAgICB9KSxcbiAgICAvLyBcdTU2RkVcdTY4MDdcdUZGMUFodHRwczovL2dpdGh1Yi5jb20vdW5wbHVnaW4vdW5wbHVnaW4taWNvbnNcbiAgICBJY29ucyh7XG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSwgLy8gQXV0byBpbnN0YWxsIGNvbXBvbmVudHNcbiAgICAgIHNjYWxlOiAxLjIsIC8vIFNjYWxlIG9mIGljb25zIGFnYWluc3QgMWVtXG4gICAgICBkZWZhdWx0U3R5bGU6ICcnLCAvLyBTdHlsZSBhcHBseSB0byBpY29uc1xuICAgICAgZGVmYXVsdENsYXNzOiAndi1pY29uJywgLy8gQ2xhc3MgbmFtZXMgYXBwbHkgdG8gaWNvbnNcbiAgICAgIGNvbXBpbGVyOiAndnVlMycsIC8vICd2dWUyJywgJ3Z1ZTMnLCAnanN4J1xuICAgICAganN4OiAncmVhY3QnLCAvLyAncmVhY3QnIG9yICdwcmVhY3QnXG4gICAgfSksXG4gICAgLy8gXHU1MzlGXHU1QjUwXHU2ODM3XHU1RjBGXHVGRjFBaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3Vub2Nzc1xuICAgIFVub0NTUygpLFxuICAgIC8vIFx1NTZGRFx1OTY0NVx1NTMxNlx1RkYxQWh0dHBzOi8vZ2l0aHViLmNvbS9pbnRsaWZ5L2J1bmRsZS10b29scy90cmVlL21haW4vcGFja2FnZXMvdW5wbHVnaW4tdnVlLWkxOG5cbiAgICBWdWVJMThuUGx1Z2luKHtcbiAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxuICAgICAgY29tcG9zaXRpb25Pbmx5OiB0cnVlLFxuICAgICAgZnVsbEluc3RhbGw6IHRydWUsXG4gICAgICBpbmNsdWRlOiBbcmVzb2x2ZShfX2Rpcm5hbWUsICdsb2NhbGVzLyoqJyldLFxuICAgIH0pXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4TyxTQUFTLG9CQUFvQjtBQUMzUSxTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFlBQVk7QUFUbkIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTSxVQUFVLFFBQVEsa0NBQVcsS0FBSztBQUl4QyxJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9SO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLEdBQUcsT0FBTztBQUFBLElBQ2xCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsUUFBUTtBQUFBLFFBQ04sYUFBYTtBQUFBO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxTQUFTLENBQUMsT0FBTyxjQUFjLFlBQVksU0FBUyxjQUFjO0FBQUEsTUFDbEUsS0FBSztBQUFBO0FBQUEsTUFDTCxNQUFNLENBQUMsc0JBQXNCLGNBQWM7QUFBQTtBQUFBLE1BQzNDLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQTtBQUFBLE1BQ1g7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNULG9CQUFvQjtBQUFBLFVBQ2xCLGFBQWE7QUFBQTtBQUFBLFFBQ2YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBLElBRUQsV0FBVztBQUFBO0FBQUEsTUFFVCxXQUFXO0FBQUEsUUFDVCxjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsVUFDUixPQUFPLEVBQUUsTUFBTSxZQUFZO0FBQUEsVUFDM0Isb0JBQW9CO0FBQUEsWUFDbEI7QUFBQTtBQUFBLFlBQ0E7QUFBQTtBQUFBLFlBQ0E7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGLENBQUM7QUFBQTtBQUFBLFFBRUQsb0JBQW9CO0FBQUEsVUFDbEIsYUFBYTtBQUFBLFFBQ2YsQ0FBQztBQUFBLE1BRUg7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBLElBRUQsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBO0FBQUEsTUFDYixPQUFPO0FBQUE7QUFBQSxNQUNQLGNBQWM7QUFBQTtBQUFBLE1BQ2QsY0FBYztBQUFBO0FBQUEsTUFDZCxVQUFVO0FBQUE7QUFBQSxNQUNWLEtBQUs7QUFBQTtBQUFBLElBQ1AsQ0FBQztBQUFBO0FBQUEsSUFFRCxPQUFPO0FBQUE7QUFBQSxJQUVQLGNBQWM7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLFNBQVMsQ0FBQyxRQUFRLGtDQUFXLFlBQVksQ0FBQztBQUFBLElBQzVDLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
