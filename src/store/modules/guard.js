const guard = {
	namespaced: true,
	state: {},
	mutations: {
		CLEAR_CACHE: (state, data) => {
			//清除token
			localStorage.setItem("token", "");
		},
	},
	actions: {
		storeClearCache({ commit }, data) {
			commit("CLEAR_CACHE", data);
		},
	}
};

export default guard;
