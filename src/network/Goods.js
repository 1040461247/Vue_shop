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