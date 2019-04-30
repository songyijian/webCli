/*
 * @Description: http的各种配置
 * @Author: yijian.song
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 17:33:39
 * @LastEditTime: 2019-04-30 17:40:32
 */

module.exports = {
  /**
   * @Description: 全局http请求拦截桶
   * @param {type} 
   * @return: {type} 
   * @case: 
  * ---------
   * @Author: yijian.song
   * @Date: 2019-04-30 14:38:45
   */
  
  // 超过该时间默认延时
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

  /**
   * @Description: HttpRock请求再封装函数的全局桶
   * --------------------------------------
   * @Author: yijian.song
   * @Date: 2019-04-30 09:55:28
   */

   /**
   * @Description: HttpRock > 发出前
   * @param {obj} thisHttpData 上行参数对象
   * @param {obj-str} HttpRockType httpGet|httpPost|httpAll|httpNext
   * httpGet|httpPost------
   * @param {obj-str} method  什么类型的请求 get|post
   * @param {obj-str} url  url
   * @param {obj-obj} data 上传参数
   * httpAll|httpNext-----
   * @param {obj-arr} datas 多个请求的数据集【{}】
   * @param {obj-arr-str} method  什么类型的请求 get|post
   * @param {obj-arr-str} url  url
   * @param {obj-arr-obj} data 上传参数
   * @return: {obj} 返回处理后的上行必要参数
   * @return: {obj-str} *url  请求url 
   * @return: {obj-obj} *data 上行参数
   * ---------
   * @Author: yijian.song
   * @Date: 2019-04-30 15:23:07
   */
  httpStart: function httpStart(thisHttpData) {
    console.log('> httpStart', thisHttpData)
    return thisHttpData
  },

  //  http成功，回调桶
  httpEnd: function httpEnd(data) {
    console.log('y > httpEnd', data)
    return data
  },

  // http错误，回调桶
  httpErr: function httpErr(data) {
    console.log('x > httpErr', data)
    return data
  },

}
