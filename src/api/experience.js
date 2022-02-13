import request from "@/utils/request";

//获取form初始化数据
export function getFormInitDataReq(data) {
	return request({
		url: `/experience/initFormData`,
		method: "get",
	});
}

//获取表格数据
export function getInitDataReq(data) {
	return request({
		url: `/experience/experienceList`,
		method: "post",
		data: data,
	});
}

//批量上架/下架
export function chageStatusReq(data) {
	return request({
		url: `/experience/editExperienceStatus`,
		method: "post",
		data: data,
	});
}

//删除经验
export function deleteDataReq(data) {
	return request({
		url: `/experience/deleteExperience`,
		method: "post",
		data: data,
	});
}
