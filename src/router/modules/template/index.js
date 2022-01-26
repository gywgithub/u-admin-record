import Layout from "@/layouts";
export default [
	{
		path: "/template",
		component: Layout,
		redirect: "/template/tinymce",
		name: "Share",
		meta: {
			title: "测试",
			icon: "drafting-compass",
			permissions: ["admin"],
		},
		children: [
			{
				path: "tinymce",
				name: "Tinymce",
				hidden: false,
				component: () => import("@/views/template/editor/index"),
				meta: {
					title: "tinymce富文本",
					icon: "rocket",
					permissions: ["admin"],
				},
			},
			{
				path: "d3",
				name: "D3",
				hidden: false,
				component: () => import("@/views/template/d3/index"),
				meta: {
					title: "D3.js",
					icon: "dove",
					permissions: ["admin"],
				},
			},
		],
	},
];
