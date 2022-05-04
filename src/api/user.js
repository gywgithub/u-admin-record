import request from "@/utils/request";

export function login(data) {
	return request({
		url: "/user/login",
		method: "post",
		data,
	});
}

export function regiterReq(data) {
	return request({
		url: "/user/register",
		method: "post",
		data,
	});
}

export function logout() {
	return request({
		url: "/user/outLogin",
		method: "get",
	});
}
