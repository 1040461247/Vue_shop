import { request } from './request'

// 左侧菜单栏数据
export function getMenuInfo() {
  return request({
    url: 'menus',
    method: 'get'
  })
}

// users：用户数据列表
export function getUsers({ query, pagenum, pagesize }) {
  return request({
    url: 'users',
    method: 'get',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

// users：更改用户状态
export function putState(uId, type){
  return request({
    url: 'users/' + uId + '/state/' + type,
    method: 'put'
  })
}

// users: 添加用户
export function postUsers({ username, password, email, mobile }) {
  return request({
    url: 'users',
    method: 'post',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

// users: 根据id查询用户信息
export function getUserInfo(id) {
  return request({
    url: 'users/' + id,
    method: 'get'
  })
}

// users：更改用户信息
export function putUserInfo({ id, email, mobile }) {
  return request({
    url: 'users/' + id,
    method: 'put',
    data: {
      email,
      mobile
    }
  })
}

// users: 根据id删除单个用户
export function deleteUser(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}

// 请求角色列表数据
export function getRoles() {
  return request({
    url: 'roles',
    method: 'get'
  })
}

// 分配用户角色
export function setRights(id, rid) {
  return request({
    url: 'users/' + id + '/role',
    method: 'put',
    data: {
      rid
    }
  })
}