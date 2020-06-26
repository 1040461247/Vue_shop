import { request } from './request'

// 请求order数据列表
export function getOrderList(obj) {
  return request({
    url: 'orders',
    method: 'get',
    params: obj
  })
}

// 查看物流信息
export function getProgress() {
  return request({
    url: 'kuaidi/' + 1106975712662,
    methods: 'get'
  })
}