import Layout from '@/layouts'
export default [
  {
    path: '/personnelManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '账户配置', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/userManage/index'),
        meta: { title: '用户管理', icon: 'user-friends' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/roleManage/index'),
        meta: { title: '角色管理', icon: 'user-secret' },
      },
    ],
  },
]
