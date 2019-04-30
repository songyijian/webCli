/*
 * @Description: axios全局配置
 * @Author: yijian.song
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 11:19:50
 * @LastEditTime: 2019-04-30 14:29:47
 */
import axios from 'axios'
import qs from 'qs'

// 浏览器有默认连接超时，Firefox 好像是115秒，Chrome 好像是5分钟还是6分钟
// 请求操作该时间中止请求
axios.defaults.timeout = 60000

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
    console.log('>>>>err', error);
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
  error => {
    console.log('<<<<<<err', error);
    // err => { //这里是返回状态码不为200时候的错误处理}
  }
)

export default axios