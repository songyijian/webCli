/*
 * @Description: vue
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 17:33:39
 * @LastEditTime: 2019-04-30 00:04:01
 */

module.exports = {
  
  // 全局http请求拦截桶
  defaultsTimeout:30000,

  // 上行拦截
  requestFn: (config) => {
    console.log('>>>>', config);
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },

  // 上行错误拦截
  requestErr:(err)=>{
    return Promise.reject(err)
  },

  // 下行拦截
  responseFn: res => {
    console.log("<<<<<<", res)
    let status = res.data.code
    if (status === 200 || status === 304 || status === 206) {
      // return res.data
    } else {
      // res.data.errorHandler = errorHandler(status)
    }
    return res
  },

  // 下行错误拦截
  responseErr: err => {
    // err => { //这里是返回状态码不为200时候的错误处理}
  },


  // http 发出请求前回调
  httpStart: function httpStart(data) {
      console.log('httpStart', data)
      return data
    },

    //  http成功，回调桶
    httpEnd: function httpEnd(data) {
      console.log('httpEnd', data)
      return data
    },

    // http错误，回调桶
    httpErr: function httpErr(data) {
      console.log('httpErr', data)
      return data
    },
  
}
