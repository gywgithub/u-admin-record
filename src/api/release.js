import request from "@/utils/request";

//获取分类
export function getCategoryReq(data) {
	return request({
		url: "/categoryList",
		method: "get",
	});
}

//获取行业分类
export function getIndustryCategoryReq(data) {
	return request({
		url: "/industry/category",
		method: "get",
	});
}

//发布经验
export function releaseExperienceReq(data) {
	return request({
		url: "/experience/saveExperience",
		method: "post",
		data: data,
	});
}
