import Vue from "vue";
import VueRouter from "vue-router";
import { publicPath, routerMode } from "@/config";
import whiteList from "./modules/whiteList";
import dashboard from "./modules/dashboard";
import share from "./modules/share";
import setting from "./modules/setting";
import everyone from "./modules/everyone";
import templateCollections from "./modules/template";
import topology from "./modules/topology";
import hall from "./modules/hall";

Vue.use(VueRouter);
export const constantRoutes = [...whiteList];
export const asyncRoutes = [
	...dashboard,
	...hall,
	...share,
	...setting,
	...topology,
	...templateCollections,
	...everyone,
];

const router = new VueRouter({
	base: publicPath,
	mode: routerMode,
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes,
});
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch((err) => err);
};

export function resetRouter() {
	router.matcher = new VueRouter({
		base: publicPath,
		mode: routerMode,
		scrollBehavior: () => ({
			y: 0,
		}),
		routes: constantRoutes,
	}).matcher;
}

export default router;
