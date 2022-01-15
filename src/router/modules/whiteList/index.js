export default [
	{
		path: "/login",
		component: () => import("@/views/login/index"),
		meta: {
			title: "login",
			icon: "home",
		},
		hidden: true,
	},
	{
		path: "/register",
		component: () => import("@/views/register/index"),
		meta: {
			title: "register",
			icon: "home",
		},
		hidden: true,
	},
	{
		path: "/401",
		name: "401",
		component: () => import("@/views/common/401"),
		meta: {
			title: "401",
			icon: "401",
		},
		hidden: true,
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/common/404"),
		meta: {
			title: "404",
			icon: "404",
		},
		hidden: true,
	},
];
