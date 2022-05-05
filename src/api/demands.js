import request from "@/utils/request";

//新增需求
export function addDemandReq(data) {
	return request({
		url: `/demand/addDemand`,
		method: "post",
		data: data,
	});
}

//删除需求
export function deleteDemandReq(data) {
	return request({
		url: `/demand/deleteDemand`,
		method: "post",
		data: data,
	});
}

//更新需求
export function updateDemandReq(data) {
	return request({
		url: `/demand/updateDemand`,
		method: "post",
		data: data,
	});
}

//获取需求
export function getDemandDataReq(data) {
	return request({
		url: `/demand/selectDemand`,
		method: "post",
		data: data,
	});
}
