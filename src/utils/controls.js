import { Loading, Message, MessageBox, Notification } from "element-ui";
let loadingText = "加载中...";
let messageDuration = 3000;
const install = (Vue, opts = {}) => {
	/* 全局加载层 */
	Vue.prototype.$baseLoading = (index, text) => {
		let loading;
		if (!index) {
			loading = Loading.service({
				lock: true,
				text: text || loadingText,
				background: "hsla(0,0%,100%,.8)",
			});
		} else {
			loading = Loading.service({
				lock: true,
				text: text || loadingText,
				spinner: "loading" + index,
				background: "hsla(0,0%,100%,.8)",
			});
		}
		return loading;
	};
	/* 全局多彩加载层 */
	Vue.prototype.$baseColorfullLoading = (index, text) => {
		let loading;
		if (!index) {
			loading = Loading.service({
				lock: true,
				text: text || loadingText,
				spinner: "dots-loader",
				background: "hsla(0,0%,100%,.8)",
			});
		} else {
			switch (index) {
				case 1:
					index = "dots";
					break;
				case 2:
					index = "gauge";
					break;
				case 3:
					index = "inner-circles";
					break;
				case 4:
					index = "plus";
					break;
			}
			loading = Loading.service({
				lock: true,
				text: text || loadingText,
				spinner: index + "-loader",
				background: "hsla(0,0%,100%,.8)",
			});
		}
		return loading;
	};
	/* 全局Message */
	Vue.prototype.$baseMessage = (message, type) => {
		Message({
			offset: 60,
			showClose: true,
			message: message,
			type: type,
			dangerouslyUseHTMLString: true,
			duration: messageDuration,
		});
	};

	/* 全局Alert */
	Vue.prototype.$baseAlert = (content, title, callback) => {
		MessageBox.alert(content, title || "温馨提示", {
			confirmButtonText: "确定",
			dangerouslyUseHTMLString: true,
			callback: (action) => {
				if (callback) {
					callback();
				}
			},
		});
	};

	/* 全局Confirm */
	Vue.prototype.$baseConfirm = (content, title, callback1, callback2) => {
		MessageBox.confirm(content, title || "温馨提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			closeOnClickModal: false,
			type: "warning",
		})
			.then(() => {
				if (callback1) {
					callback1();
				}
			})
			.catch(() => {
				if (callback2) {
					callback2();
				}
			});
	};

	/* 全局Notification */
	Vue.prototype.$baseNotify = (message, title, type, position) => {
		Notification({
			title: title,
			message: message,
			position: position || "top-right",
			type: type || "success",
			duration: messageDuration,
		});
	};

	/* 全局事件总线 */
	Vue.prototype.$baseEventBus = new Vue();
};

if (typeof window !== "undefined" && window.Vue) {
	install(window.Vue);
}

export default install;
