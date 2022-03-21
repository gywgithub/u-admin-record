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

//获取日记
export function getDiaryListReq(data) {
	return request({
		url: `/diary/selectDiary`,
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
