import axios from "axios";
import store from "@/store";
import Router from "../../router";
import { Loading } from "element-ui";

const service = axios.create({
	baseURL: `${process.env.DATA_API}`,
	timeout: 50000,
});
let loadingInstance;

service.defaults.headers.common["Content-Type"] =
	"application/json;charset=UTF-8";

// request interceptor
service.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] =
			"token " + localStorage.getItem("zebraToken") || "token ";
		if (config.loading) {
			loadingInstance = Loading.service({ background: "transparent" });
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// response interceptor
service.interceptors.response.use(
	(response) => {
		if (
			response.headers.token !== "null" &&
			response.headers.token !== undefined
		) {
			localStorage.setItem("zebraToken", response.headers.token);
		}
		if (response.config.loading) {
			loadingInstance.close();
		}

		return response.data;
	},
	(error) => {
		if (error.response.config.loading) {
			loadingInstance.close();
		}
		if (error.response.status === 401) {
			store.dispatch("guard/storeClearCache");
			Router.push({ path: "/login" });
		}
		return Promise.reject(error);
	}
);

export default service;
