import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: false, // 打包完成后自动打开分析页面
      gzipSize: true, // 显示gzip压缩后的大小
      brotliSize: true // 显示brotli压缩后的大小
    }),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    dts({
      // outputDir: './dist',
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // cssCodeSplit: false, // 强制内联样式
    // minify: false, // 关闭压缩便于调试
    // sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'VueAuthSdk',
      fileName: (format) => `yeying-wallet.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia', 'element-plus',
        '@yeying-community/yeying-i18n',
        '@yeying-community/yeying-client-ts',
        '@yeying-community/yeying-next',
        '@yeying-community/yeying-web3',
      ],
      output: {
        globals: {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'pinia': 'Pinia',
          'element-plus': 'ElementPlus',
          '@yeying-community/yeying-client-ts': 'YeyingClientTS',
          '@yeying-community/yeying-i18n': 'YeyingI18n',
          '@yeying-community/yeying-next': 'YeyingNext',
          '@yeying-community/yeying-web3': 'YeyingWeb3',
        },
      },
    },
  },
})
