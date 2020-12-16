/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: false,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/topicManage',
    component: Layout,
    name: 'TopicManage',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/topicManage/index'),
        meta: {
          title: '分享管理',
          icon: 'comments-dollar',
          permissions: ['admin'],
        },
      },
    ],
  },
  // {
  //   path: 'icon',
  //   component: EmptyLayout,
  //   redirect: 'noRedirect',
  //   name: 'Icon',
  //   meta: {
  //     title: '图标',
  //     permissions: ['admin'],
  //   },
  //   children: [
  //     {
  //       path: 'awesomeIcon',
  //       name: 'AwesomeIcon',
  //       component: () => import('@/views/vab/icon/index'),
  //       meta: { title: '常规图标' },
  //     },
  //     {
  //       path: 'remixIcon',
  //       name: 'RemixIcon',
  //       component: () => import('@/views/vab/icon/remixIcon'),
  //       meta: { title: '小清新图标' },
  //     },
  //     {
  //       path: 'colorfulIcon',
  //       name: 'ColorfulIcon',
  //       component: () => import('@/views/vab/icon/colorfulIcon'),
  //       meta: { title: '多彩图标' },
  //     },
  //   ],
  // },
  {
    path: '/createTopic',
    component: Layout,
    name: 'createTopic',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/createTopic/index'),
        meta: {
          title: '创建分享',
          icon: 'balance-scale',
          permissions: ['admin'],
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
