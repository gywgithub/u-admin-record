import Layout from '@/layouts'
export default [
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
          title: '发起分享',
          icon: 'rocket',
          permissions: ['admin'],
        },
      },
    ],
  },
  {
    path: '/addToShare',
    component: Layout,
    name: 'addToShare',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/addToShare/index'),
        meta: {
          title: '添加分享',
          icon: 'rocket',
          permissions: ['admin'],
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
]
