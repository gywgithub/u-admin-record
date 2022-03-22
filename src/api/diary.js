import request from "@/utils/request";

//获取目录
export function getCatelogDataReq(data) {
	return request({
		url: `/diary/selectDiaryCatalog`,
		method: "post",
		data: data,
	});
}

//新增目录
export function addCatelogReq(data) {
	return request({
		url: `/diary/addDiaryCatalog`,
		method: "post",
		data: data,
	});
}

//保存日记
export function saveDiaryReq(data) {
	return request({
		url: `/diary/addDiary`,
		method: "post",
		data: data,
	});
}

//根据条件获取日记
export function queryDiaryReq(data) {
	return request({
		url: `/diary/queryDiary`,
		method: "post",
		data: data,
	});
}

//获取单条日记
export function queryByIdDiaryReq(data) {
	return request({
		url: `/diary/queryByIdDiary`,
		method: "post",
		data: data,
	});
}

//删除日记
export function deleteDiaryReq(data) {
	return request({
		url: `/diary/deleteDiary`,
		method: "post",
		data: data,
	});
}

//更新日记
export function updateDiaryReq(data) {
	return request({
		url: `/diary/updateDiary`,
		method: "post",
		data: data,
	});
}

//更新目录
export function updateDiaryCatalogReq(data) {
	return request({
		url: `/diary/updateDiaryCatalog`,
		method: "post",
		data: data,
	});
}

//删除目录
export function deleteDiaryCatalogReq(data) {
	return request({
		url: `/diary/deleteDiaryCatalog`,
		method: "post",
		data: data,
	});
}
