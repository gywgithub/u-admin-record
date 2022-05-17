import axios from "axios";
import store from "@/store";
import { Message,Loading } from "element-ui";
import { getToken } from "@/utils/auth";
import Router from "../router";

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, 
	timeout: 50000,
});

let loadingInstance;

service.defaults.headers.common["Content-Type"] =
	"application/json;charset=UTF-8";

service.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = getToken();
		if (config.loading) {
			loadingInstance = Loading.service({ background: "transparent" });
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

service.interceptors.response.use(
	async (response) => {
		//3004  token失效
		if(response.data.code == "3004"){
			await store.dispatch("user/logout");
			Router.push({ path: "/login" });
		}
		if (response.config.loading) {
			loadingInstance.close();
		}
		
		return response.data;
	},
	(error) => {
		Message({
			message: error.message,
			type: "error",
			duration: 5 * 1000,
		});
		return Promise.reject(error);
	}
);

export default service;
