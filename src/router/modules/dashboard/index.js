import Layout from "@/layouts";
export default [
	{
		path: "/dashboard",
		component: Layout,
		redirect: "/dashboard/index",
		meta: {
			title: "经验大厅",
			icon: "home",
		},
		children: [
			{
				path: "index",
				name: "Dashboard",
				hidden: false,
				component: () => import("@/views/dashboard/index"),
				meta: {
					title: "经验大厅",
					icon: "home",
					affix: true,
				},
			},
		],
	},
];
