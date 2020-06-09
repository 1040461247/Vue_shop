import axios from 'axios'
// 封装axios，我们在使用axios时，导入request.js，使用里面的request方法，为该方法传递网络请求相关的配置对象"config"即可。
export function request (config) {
  // 1、创建axios实例
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1',
    timeout: 5000
  })
  // 2、axios拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log('网络请求发生错误：' + err)
  })
  // 3、发送网络请求
  return instance(config)
}
