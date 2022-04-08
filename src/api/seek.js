import request from "@/utils/request";

export function saveSeekReq(data) {
	return request({
		url: "/findExperience/save",
		method: "post",
		data: data,
	});
}
