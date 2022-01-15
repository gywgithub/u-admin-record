import Layout from "@/layouts";
export default [
	{
		path: "/topology",
		component: Layout,
		redirect: "/topology/index",
		meta: {
			title: "拓扑图",
			icon: "home",
		},
		hidden: true,
		children: [
			{
				path: "index",
				name: "Index",
				hidden: true,
				component: () => import("@/views/topology/index"),
				meta: {
					title: "拓扑图",
					icon: "home",
					affix: true,
				},
			},
		],
	},
];
