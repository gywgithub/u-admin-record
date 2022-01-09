import Layout from '@/layouts'
export default [
  {
    path: '/systemManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'SystemManagement',
    meta: { title: '系统管理', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/systemManage/userManage/index'),
        meta: { title: '用户管理', icon: 'user-friends' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/systemManage/roleManage/index'),
        meta: { title: '角色管理', icon: 'user-secret' },
      },
    ],
  },
]
