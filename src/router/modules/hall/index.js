import Layout from "@/layouts";
export default [
	{
		path: "/hall",
		component: Layout,
		redirect: "/hall/index",
		meta: {
			title: "经验大厅",
			icon: "globe",
		},
		hidden: false,
		children: [
			{
				path: "index",
				name: "Index",
				hidden: false,
				component: () => import("@/views/hall/index"),
				meta: {
					title: "经验大厅",
					icon: "globe",
					affix: true,
				},
			},
		],
	},
];
