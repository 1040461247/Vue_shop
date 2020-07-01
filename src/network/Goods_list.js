import { request } from './request'

// 获取商品列表数据
export function getGoodsList({ query, pagenum, pagesize }) {
  return request({
    url: 'goods',
    method: 'get',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

// 删除商品
export function deleteGoods({ goods_id }) {
  return request({
    url: 'goods/' + goods_id,
    method: 'delete'
  })
}

// 请求商品分类数据
export function getCategoryList() {
  return request({
    url: 'categories',
    method: 'get'
  })
} 

// 获取动态参数列表
export function getPramasList(id) {
  return request({
    url: 'categories/' + id + '/attributes',
    method: 'get',
    params: {
      sel: 'many'
    }
  })
}

// 获取静态属性列表
export function getOnlyPramasList(id) {
  return request({
    url: 'categories/' + id + '/attributes',
    method: 'get',
    params: {
      sel: 'only'
    }
  })
}

// 添加商品
export function addGoods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }) {
  return request({
    url: 'goods',
    method: 'post',
    data: {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics,
      attrs
    }
  })
}

// 修改商品信息
export function alGoods({ goods_id, goods_name, goods_price, goods_number, goods_weight, goods_introduce, attrs }, pics, goods_cat) {
  return request({
    url: 'goods/' + goods_id,
    method: 'put',
    data: {
      goods_name,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics,
      attrs,
      goods_cat
    }
  })
}