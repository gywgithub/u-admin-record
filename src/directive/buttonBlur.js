// 提交以后禁用按钮一段时间，防止重复提交
import Vue from "vue";
Vue.directive("autoBlur", {
	bind: function(el, binding, vnode) {
		// el.blur();
	},
	inserted(el, binding) {
		// el.addEventListener("click", (e) => {
		// 	let target = el.children[0];
		// 	if (target.nodeName == "SPAN") {
		// 		target = target.parentNode;
		// 	}
		// 	target.blur();
		// });
	}
});
