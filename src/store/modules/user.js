import { login, logout } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
	return {
		token: getToken(),
		name: "",
		avatar: "",
	};
};

const state = getDefaultState();

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState());
	},
	SET_TOKEN: (state, token) => {
		state.token = token;
	},
	SET_NAME: (state, name) => {
		state.name = name;
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar;
	},
};

const actions = {
	// user login
	login({ commit }, loginInfo) {
		return new Promise((resolve, reject) => {
			login(loginInfo)
				.then((response) => {
					if (response.success) {
						commit("SET_TOKEN", response.data.token);
						setToken(response.data.token);
					}
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token)
				.then(() => {
					removeToken(); 
					resetRouter();
					commit("RESET_STATE");
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// remove token
	resetToken({ commit }) {
		return new Promise((resolve) => {
			removeToken();
			commit("RESET_STATE");
			resolve();
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
