import axios from 'axios'
import { Toast } from 'vant'
import { getLocal } from '@/utils/local'
import router from '@/router'

// 创建axios实例
const request = axios.create({
  baseURL: 'https://autumnfish.cn/heimamm_server/',
  // withCredentials: true  // 是否允许跨域
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 设置token
    if (config.token) {
      const _token = getLocal()
      if (_token) {
        config.headers.authorization = `Bearer ${_token}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 如果没有状态码，那么特殊返回，目前是文件上传接口
    if (!response.data.code) {
      return response
    }
    // 200请求成功
    if (response.data.code === 200 || response.config.nocheck === true) {
      return response.data
      // 401未登录 403token过期
    } else if (response.data.code === 401 || response.data.code === 403) {
      Toast.fail('请先登录')
      // 去登录页
      router.toLogin()
      return Promise.reject(new Error(''))
    } else {
      return Promise.reject(new Error(''))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
