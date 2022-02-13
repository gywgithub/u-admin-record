import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
	{
		path: "/login",
		component: () => import("@/views/login/index"),
		hidden: true,
	},
	{
		path: "/404",
		component: () => import("@/views/404"),
		hidden: true,
	},
	{
		path: "/",
		component: Layout,
		redirect: "/dashboard",
		children: [
			{
				path: "dashboard",
				name: "Dashboard",
				component: () => import("@/views/dashboard/index"),
				meta: { title: "经验大厅", icon: "dashboard" },
			},
		],
	},
	{
		path: "/experience",
		component: Layout,
		redirect: "/experience/list",
		name: "Experience",
		meta: { title: "经验管理", icon: "el-icon-s-management" },
		children: [
			{
				path: "list",
				name: "List",
				component: () => import("@/views/experience/list/index"),
				meta: { title: "经验列表", icon: "table" },
			},
			{
				path: "participantList",
				name: "ParticipantList",
				hidden: true,
				component: () =>
					import("@/views/experience/list/participantList/index"),
				meta: { title: "参与者列表", icon: "table" },
			},
			{
				path: "articleList",
				name: "ArticleList",
				hidden: true,
				component: () =>
					import("@/views/experience/list/articleList/index"),
				meta: { title: "文章列表", icon: "table" },
			},
			{
				path: "release",
				name: "Release",
				component: () => import("@/views/experience/release/index"),
				meta: { title: "发布经验", icon: "form" },
			},
			{
				path: "seek",
				name: "Seek",
				component: () => import("@/views/experience/seek/index"),
				meta: { title: "寻求经验", icon: "el-icon-s-help" },
			},
			{
				path: "tinymceEditor",
				name: "TinymceEditor",
				hidden: true,
				component: () =>
					import("@/views/experience/components/tinyedit/index"),
				meta: {
					title: "编辑经验",
					icon: "form",
				},
			},
			{
				path: "releaseSuccess",
				name: "ReleaseSuccess",
				hidden: true,
				component: () =>
					import(
						"@/views/experience/components/releaseSuccess/index"
					),
				meta: {
					title: "发布成功",
					icon: "form",
				},
			},
		],
	},
	{
		path: "/deploy",
		component: Layout,
		redirect: "/deploy/userManage",
		name: "Experience",
		meta: { title: "配置", icon: "el-icon-s-tools" },
		children: [
			{
				path: "personalCenter",
				name: "PersonalCenter",
				meta: { title: "个人中心", icon: "user" },
			},
			{
				path: "userManage",
				name: "UserManage",
				component: () =>
					import("@/views/experience/list/participantList/index"),
				meta: { title: "用户管理", icon: "peoples" },
			},
			{
				path: "roleManage",
				name: "RoleManage",
				meta: { title: "角色管理", icon: "password" },
			},
		],
	},
	{
		path: "/topology",
		component: Layout,
		redirect: "/topology/trunk",
		children: [
			{
				path: "trunk",
				name: "Trunk",
				component: () => import("@/views/topology/index"),
				meta: { title: "拓扑图", icon: "tree" },
			},
		],
	},
	// 404 page must be placed at the end !!!
	{ path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes,
	});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher; // reset router
}

export default router;

// export const constantRoutes = [
// 	{
// 		path: "/login",
// 		component: () => import("@/views/login/index"),
// 		hidden: true,
// 	},

// 	{
// 		path: "/404",
// 		component: () => import("@/views/404"),
// 		hidden: true,
// 	},

// 	{
// 		path: "/",
// 		component: Layout,
// 		redirect: "/dashboard",
// 		children: [
// 			{
// 				path: "dashboard",
// 				name: "Dashboard",
// 				component: () => import("@/views/dashboard/index"),
// 				meta: { title: "Dashboard", icon: "dashboard" },
// 			},
// 		],
// 	},

// 	{
// 		path: "/example",
// 		component: Layout,
// 		redirect: "/example/table",
// 		name: "Example",
// 		meta: { title: "Example", icon: "el-icon-s-help" },
// 		children: [
// 			{
// 				path: "table",
// 				name: "Table",
// 				component: () => import("@/views/table/index"),
// 				meta: { title: "Table", icon: "table" },
// 			},
// 			{
// 				path: "tree",
// 				name: "Tree",
// 				component: () => import("@/views/tree/index"),
// 				meta: { title: "Tree", icon: "tree" },
// 			},
// 		],
// 	},

// 	{
// 		path: "/form",
// 		component: Layout,
// 		children: [
// 			{
// 				path: "index",
// 				name: "Form",
// 				component: () => import("@/views/form/index"),
// 				meta: { title: "Form", icon: "form" },
// 			},
// 		],
// 	},

// 	{
// 		path: "/nested",
// 		component: Layout,
// 		redirect: "/nested/menu1",
// 		name: "Nested",
// 		meta: {
// 			title: "Nested",
// 			icon: "nested",
// 		},
// 		children: [
// 			{
// 				path: "menu1",
// 				component: () => import("@/views/nested/menu1/index"), // Parent router-view
// 				name: "Menu1",
// 				meta: { title: "Menu1" },
// 				children: [
// 					{
// 						path: "menu1-1",
// 						component: () => import("@/views/nested/menu1/menu1-1"),
// 						name: "Menu1-1",
// 						meta: { title: "Menu1-1" },
// 					},
// 					{
// 						path: "menu1-2",
// 						component: () => import("@/views/nested/menu1/menu1-2"),
// 						name: "Menu1-2",
// 						meta: { title: "Menu1-2" },
// 						children: [
// 							{
// 								path: "menu1-2-1",
// 								component: () =>
// 									import(
// 										"@/views/nested/menu1/menu1-2/menu1-2-1"
// 									),
// 								name: "Menu1-2-1",
// 								meta: { title: "Menu1-2-1" },
// 							},
// 							{
// 								path: "menu1-2-2",
// 								component: () =>
// 									import(
// 										"@/views/nested/menu1/menu1-2/menu1-2-2"
// 									),
// 								name: "Menu1-2-2",
// 								meta: { title: "Menu1-2-2" },
// 							},
// 						],
// 					},
// 					{
// 						path: "menu1-3",
// 						component: () => import("@/views/nested/menu1/menu1-3"),
// 						name: "Menu1-3",
// 						meta: { title: "Menu1-3" },
// 					},
// 				],
// 			},
// 			{
// 				path: "menu2",
// 				component: () => import("@/views/nested/menu2/index"),
// 				name: "Menu2",
// 				meta: { title: "menu2" },
// 			},
// 		],
// 	},

// 	{
// 		path: "external-link",
// 		component: Layout,
// 		children: [
// 			{
// 				path: "https://panjiachen.github.io/vue-element-admin-site/#/",
// 				meta: { title: "External Link", icon: "link" },
// 			},
// 		],
// 	},

// 	// 404 page must be placed at the end !!!
// 	{ path: "*", redirect: "/404", hidden: true },
// ];
