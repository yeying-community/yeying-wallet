import { createApp } from 'vue';
// import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { sdkRoutes, sdkSetupRouter } from './router';
import App from './App.vue';
import {t} from '@yeying-community/yeying-i18n'
import $account, {setConfig} from "./plugins/account";
import { Buffer } from 'buffer';
import { createRouter, createWebHistory } from 'vue-router'

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer; // 全局注入
const createAuthApp = (options: any = {}) => {
  const app = createApp(App);
  app.config.globalProperties.$t = t || {}
  // -----本地调试start------
  // const router = createRouter({
  //   history: createWebHistory(import.meta.env.BASE_URL),
  //   routes: [...sdkRoutes]
  // })
  // sdkSetupRouter(router)
  // app.use(router);
  // -----本地调试end------
  setConfig(options)
  app.use(ElementPlus);
  app.mount('#app')

  return app;
};
// -----本地调试start------
// createAuthApp()
// -----本地调试end------
// 导出所有需要的对象
export {
  createAuthApp,
  sdkRoutes,
  sdkSetupRouter,
  $account
};



