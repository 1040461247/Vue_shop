import { request } from './request'

// 请求权限列表页数据
export function getRights() {
  return request({
    url: 'rights/list',
    method: 'get'
  })
}

// 请求角色列表数据
export function getRoles() {
  return request({
    url: 'roles',
    method: 'get'
  })
}

// 添加角色
export function postRoles({ roleName, roleDesc }) {
  return request({
    url: 'roles',
    method: 'post',
    data: {
      roleName,
      roleDesc
    }
  })
}

// 修改角色
export function putRoles({id, roleName, roleDesc }) {
  return request({
    url: 'roles/' + id,
    method: 'put',
    data: {
      roleName,
      roleDesc
    }
  })
}

// 删除角色
export function deleteRoles(id) {
  return request({
    url: 'roles/' + id,
    method: 'delete'
  })
} 

// 根据id删除角色权限
export function deleteRights({roleId, rightId}) {
  return request({
    url: 'roles/' + roleId + '/rights/' + rightId,
    method: 'delete'
  })
}

// 请求权限列表页数据
export function getRightsTree() {
  return request({
    url: 'rights/tree',
    method: 'get'
  })
}

// 分配角色权限
export function getRolesRights(roleId, rids) {
  return request({
    url: 'roles/' + roleId + '/rights',
    method: 'post',
    data: {
      rids
    }
  })
}