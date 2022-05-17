import request from "@/utils/request";

//添加维度
export function addDimensionReq(data) {
	return request({
		url: "/dimension/addDimension",
		method: "post",
		data: data,
	});
}

//删除维度
export function deleteDimensionReq(data) {
	return request({
		url: `/dimension/deleteDimension`,
		method: "post",
		data: data,
	});
}

//修改维度
export function updateDimensionReq(data) {
	return request({
		url: `/dimension/updateDimension`,
		method: "post",
		data: data,
	});
}

//查询维度
export function queryDimensionReq(data) {
	return request({
		url: `/dimension/queryDimension`,
		method: "post",
		data: data
	});
}