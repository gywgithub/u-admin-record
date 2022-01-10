import request from '@/utils/request'

//获取分类
export function getIndustryCategoryReq(data) {
  return request({
    url: '/industry/category',
    method: 'get',
  })
}
