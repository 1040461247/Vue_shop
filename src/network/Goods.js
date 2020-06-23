import { request } from './request' 

// 获取商品分类数据列表
export function getCategoryList({ type, pagenum, pagesize }) {
  return request({
    url: 'categories',
    method: 'get',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

// 添加商品分类
export function addCategory({ cat_pid, cat_name, cat_level }) {
  return request({
    url: 'categories',
    method: 'post',
    data: {
      cat_pid,
      cat_name,
      cat_level
    }
  })
}

// 编辑商品分类
export function upodateCategory({ cat_id, cat_name }) {
  return request({
    url: 'categories/' + cat_id,
    method: 'put',
    data: {
      cat_name
    }
  })
}

// 删除商品分类
export function deleteCategory(id) {
  return request({
    url: 'categories/' + id,
    method: 'delete'
  })
}

// 获取分类参数列表
export function getPramasList(id, sel) {
  return request({
    url: 'categories/' + id + '/attributes',
    method: 'get',
    params: {
      sel
    }
  })
}

// 添加分类参数
export function addPrams({ id, attr_name, attr_sel, attr_vals }) {
  return request({
    url: 'categories/' + id + '/attributes',
    method: 'post',
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

// 编辑分类参数
export function editPrams({ cat_id, attr_id, attr_name, attr_sel, attr_vals }) {
  return request({
    url: 'categories/' + cat_id + '/attributes/' + attr_id,
    method: 'put',
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

// 删除分类参数
export function deletePrams({ cat_id, attr_id }){
  return request({
    url: 'categories/' + cat_id + '/attributes/' + attr_id,
    method: 'delete'
  })
}