/*
 * @Description: vue
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 17:33:39
 * @LastEditTime: 2019-04-29 20:34:31
 */

import axios from 'axios' 


/**
 * @Description: http 发出请求前回调
 * @param {obj} data 参数
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-29 19:16:18
 */
export function httpGetStart(data) {
  console.log('httpGetStart', data)
}


/**
 * @Description: http成功，回调桶
 * @param {obj} data 参数
 * @return: {obj} 记得将桶里面的数据返回
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-29 19:20:27
 */
export function httpGetEnd(data) {
  console.log('httpGetEnd', data)
  return data
}



/**
 * @Description: http错误，回调桶
 * @param {obj} data 参数
 * @return: {obj} 记得将桶里面的数据返回
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-29 19:20:27
 */
export function httpGetErr(data) {
  console.log('httpGetErr', data)
  return data
}

