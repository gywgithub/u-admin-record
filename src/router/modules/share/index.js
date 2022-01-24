import Layout from "@/layouts";
export default [
	{
		path: "/share",
		component: Layout,
		redirect: "noRedirect",
		name: "Share",
		meta: { title: "经验管理", icon: "share-alt", permissions: ["admin"] },
		children: [
			{
				path: "shareList",
				name: "ShareList",
				hidden: false,
				component: () => import("@/views/share/shareList/index"),
				meta: {
					title: "我的经验",
					icon: "arrows-alt",
					permissions: ["admin"],
				},
			},
			{
				path: "addShare",
				name: "AddShare",
				hidden: false,
				component: () => import("@/views/share/addShare/index"),
				meta: {
					title: "发起经验",
					icon: "arrow-alt-circle-up",
					permissions: ["admin"],
				},
			},
			{
				path: "seekShare",
				name: "SeekShare",
				hidden: false,
				component: () => import("@/views/share/seekShare/index"),
				meta: {
					title: "寻找经验",
					icon: "arrow-circle-down",
					permissions: ["admin"],
				},
			},
			{
				path: "editShare",
				name: "EditShare",
				hidden: true,
				component: () => import("@/views/share/editShare/index"),
				meta: {
					title: "编辑经验",
					icon: "rocket",
					permissions: ["admin"],
				},
			},
			{
				path: "editor",
				name: "Editor",
				hidden: true,
				component: () =>
					import("@/views/share/components/editor/index"),
				meta: {
					title: "编辑内容",
					icon: "rocket",
					permissions: ["admin"],
				},
			},
			{
				path: "tinymceEditor",
				name: "TinymceEditor",
				hidden: true,
				component: () =>
					import("@/views/share/components/tinyedit/index"),
				meta: {
					title: "编辑内容",
					icon: "rocket",
					permissions: ["admin"],
				},
			},
			{
				path: "shareSuccess",
				name: "ShareSuccess",
				hidden: true,
				component: () =>
					import("@/views/share/components/shareSuccess/index"),
				meta: {
					title: "经验成功",
					icon: "rocket",
					permissions: ["admin"],
				},
			},
		],
	},
];
