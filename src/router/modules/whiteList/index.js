import Layout from '@/layouts'
export default [
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
    component: () => import('@/views/common/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/404'),
    hidden: true,
  },
]
