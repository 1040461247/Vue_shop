import { request } from './request'

// 登陆验证
export function Login ({username, password}) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}