import axios from 'axios'
// 封装axios，我们在使用axios时，导入request.js，使用里面的request方法，为该方法传递网络请求相关的配置对象"config"即可。
export function request (config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 5000
  })

  // 请求拦截，每次发送请求都携带token
  instance.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
  }, err => {
    console.log('请求拦截发生错误：' + err)
  })
  // 响应拦截，过滤拿到的数据
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log('响应拦截发生错误：' + err)
  }) 

  // 发送网络请求
  return instance(config)
}
