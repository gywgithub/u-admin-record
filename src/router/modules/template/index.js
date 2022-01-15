import Layout from "@/layouts";
export default [
	{
		path: "/template",
		component: Layout,
		redirect: "/template/tinymce",
		name: "Share",
		meta: { title: "测试模板", icon: "rocket", permissions: ["admin"] },
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
				path: "tinymce2",
				name: "Tinymce2",
				hidden: false,
				component: () => import("@/views/template/editor/index"),
				meta: {
					title: "tinymce富文本2",
					icon: "rocket",
					permissions: ["admin"],
				},
			},
		],
	},
];
