import request from "@/utils/request";

//获取
export function getInitDataReq(data) {
	return request({
		url: `/experience/seachExperience?userId=${data.userId}`,
		method: "get",
	});
}
