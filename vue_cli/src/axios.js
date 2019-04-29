/*
 * @Description: axios全局配置
 * @Author: yijian.song
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 11:19:50
 * @LastEditTime: 2019-04-29 19:37:57
 */
import axios from 'axios'
import qs from 'qs'

// 请求延时
axios.defaults.timeout = 30000

// 代理需要切换成api
// axios.defaults.baseURL = '/api'

// 上行拦截
axios.interceptors.request.use(config => {
  console.log('>>>>', config);
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
},
  error => {
    return Promise.reject(error)
  }
)

// 下行拦截
axios.interceptors.response.use(
  res => {
    console.log("<<<<<<", res)
    let status = res.data.code
    if (status === 200 || status === 304 || status === 206) {
      // return res.data
    } else {
      // res.data.errorHandler = errorHandler(status)
    }
    return res
  },
  err => {
    // err => { //这里是返回状态码不为200时候的错误处理}
  }
)

export default axios