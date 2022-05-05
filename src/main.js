import Vue from "vue";
import Clipboard from "v-clipboard";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/styles/business-style.css";
import "@/styles/business-style-Impl.css";
import "@/styles/index.scss"; // global css

import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import "element-ui/lib/theme-chalk/index.css";
import "ant-design-vue/dist/antd.css";
import { Sortable, Swap } from "sortablejs/modular/sortable.esm";

import App from "./App";
import store from "./store";
import router from "./router";
import business from "./utils/modules/business";
import "@/directive/dialog"; //拖拽

import "@/icons"; // icon
import "@/permission"; // permission control
import ctrol from "@/utils/controls";

Vue.prototype.$_ = (this || (0, eval)("this")).$_z;
Vue.prototype.$b = business;

Vue.use(Clipboard);
Vue.use(ElementUI);
Vue.use(Antd);
Vue.use(ctrol);
Sortable.mount(new Swap());

Vue.config.productionTip = false;

new Vue({
	el: "#app",
	router,
	store,
	render: (h) => h(App),
});
