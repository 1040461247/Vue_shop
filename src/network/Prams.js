import { request } from './request'

// 编辑提交参数 
export function setPramas({ cat_id, attr_id, attr_name, attr_sel, attr_NumVals}) {
  return request({
    url: 'categories/' + cat_id + '/attributes/' + attr_id,
    method: 'put',
    data: {
      attr_name,
      attr_sel,
      attr_vals: attr_NumVals
    }
  })
}