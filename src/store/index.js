import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import guard from "./modules/guard";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		app,
		settings,
		guard,
		user,
	},
	getters,
});

export default store;
