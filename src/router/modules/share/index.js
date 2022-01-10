import Layout from '@/layouts'
export default [
  {
    path: '/share',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Share',
    meta: { title: '分享管理', icon: 'rocket', permissions: ['admin'] },
    children: [
      {
        path: 'shareList',
        name: 'ShareList',
        hidden: false,
        component: () => import('@/views/share/shareList/index'),
        meta: {
          title: '我的分享',
          icon: 'rocket',
          permissions: ['admin'],
        },
      },
      {
        path: 'addShare',
        name: 'AddShare',
        hidden: false,
        component: () => import('@/views/share/addShare/index'),
        meta: {
          title: '发起分享',
          icon: 'rocket',
          permissions: ['admin'],
        },
      },
      {
        path: 'editShare',
        name: 'EditShare',
        hidden: true,
        component: () => import('@/views/share/editShare/index'),
        meta: {
          title: '编辑分享',
          icon: 'rocket',
          permissions: ['admin'],
        },
      },
      {
        path: 'seekShare',
        name: 'SeekShare',
        hidden: false,
        component: () => import('@/views/share/seekShare/index'),
        meta: {
          title: '征求分享',
          icon: 'rocket',
          permissions: ['admin'],
        },
      },
      {
        path: 'editor',
        name: 'Editor',
        hidden: true,
        component: () => import('@/views/share/editor/index'),
        meta: {
          title: '编辑内容',
          icon: 'rocket',
          permissions: ['admin'],
        },
      },
    ],
  },
]
