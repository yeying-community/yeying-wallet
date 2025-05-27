import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import $account from "../plugins/account";
import { Router } from 'vue-router'
import ToLogin from '../views/login/ToLoginView.vue'
import Login from '../views/login/LoginView.vue'
import Reg from '../views/login/RegisterView.vue'

// const authOptions = "hash";
// const historyCreator = authOptions === 'hash' ? createWebHashHistory : createWebHistory;
// console.log(55555,import.meta.env.BASE_URL)
export const sdkRoutes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('../views/index.vue'),
  //   meta: { public: true },
  // },
  {
    path: '/toLogin',
    name: 'toLogin',
    component: ToLogin,
    // component: () => import('../views/login/ToLoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    // component: () => import('../views/login/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    // component: () => import('../views/login/RegisterView.vue'),
    meta: { public: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/user/ProfileView.vue'),
    children:[
      {
        path: '',
        name: 'user',
        component: () => import('../views/user/UserView.vue'),
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('../views/user/MessageView.vue'),
      },
    ]
  },
]
/**
 * 登录路由守卫:
 * 1. 检查是否需要登录
 * 2. 非公开路由:未登录跳转到登录页面、登录后跳转到之前的页面
 * @param router
 */
export const sdkSetupRouter = (router: Router) => {
  router.beforeEach((to,from,next) => {
    // 如果是不是公开路由，并且没有登录，跳转到登录页面
    if (!to.meta.public && !$account.checkLogin()) {
      next('/toLogin');
      // return { name: 'authMiddleware', query: { redirect: to.fullPath } };
    }else{
      next()
    }
  });
}

