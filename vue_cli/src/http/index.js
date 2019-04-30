/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 22:23:37
 * @LastEditTime: 2019-04-30 19:35:42
 */
// import Axios from 'axios' 
import axios from '@/axios.js'
import {
  httpStart,
  httpEnd,
  httpErr
}
from '@config/http.config.js'


class HttpRock {
  constructor(httpStart, httpEnd, httpErr) {
    this.axios = axios
    this.httpStart = httpStart || function (data) { return data}
    this.httpEnd = httpEnd || function (data) { return data }
    this.httpErr = httpErr || function (data) { return data }
  }

  // get请求
  httpGet(url, data) {
    if (!url || typeof url !== 'string') throw new TypeError('参数错误')
    return new Promise((resolve, reject) => {
      let thisHttpData = this.httpStart({
        HttpRockType: "httpGet",
        method: 'GET',
        url,
        data
      })
      this.axios.get(thisHttpData.url, {
          params: thisHttpData.data
        })
        .then(data => {
          this.httpEnd(data)
          console.log('ddddd', data)
          resolve(data)
        })
        .catch(err => {
          this.httpErr(err)
          console.log(err);
          reject(err)
        })
    })
  }

  // post请求 
  httpPost(url, data) {
    if (!url || typeof url !== 'string') throw new TypeError('参数错误')
    return new Promise((resolve, reject) => {
      let thisHttpData = this.httpStart({
        HttpRockType: "httpPost",
        method: 'POST',
        url,
        data
      })
      this.axios.post(thisHttpData.url, thisHttpData.data)
        .then(data => {
          resolve(this.httpEnd(data))
        })
        .catch(err => {
          reject(this.httpErr(err))
        })
    })
  }

  // 并发处理逻辑
  httpAll(...htArr) {
    // 验证
    if (
      !htArr.every(item => {
        return (
          Array.isArray(item)
          && item.length >= 2
          && typeof item[0] == 'string'
          && typeof item[1] == 'string'
          && (item[0].toUpperCase() == "GET" || "POST")
        )
      })
    ) {
      throw new TypeError('httpAll,参数错误')
    }

    // 主体
    return new Promise((resolve, reject) => {
      let htDatas = {
        HttpRockType: "httpPost",
        datas: htArr.map(item => {
          return (
            {
              method: item[0].toUpperCase(),
              url: item[1],
              data: item[2] || ''
            }
          )
        })
      }

      let thisHttpData = this.httpStart(htDatas)
      this.axios.all(
          thisHttpData.datas.map(item => {
            return item.method === "GET" 
              ? this.axios.get(item.url, item.data) 
              : this.axios.post(item.url, item.data)
          })
        )
        .then(
          this.axios.spread((...data) => {
            resolve(this.httpEnd(data))
          })
        )
        .catch(err => {
          reject(this.httpErr(err))
        })
    })
  }


  // 中间件（流式请求）逻辑
  httpNext(...fns) {
    console.log('////httpNext', fns)
    // return new Promise((resolve, reject) => {
      // let arr = this.httpGetStart(arr, 'all')
      // this.axios.all(arr)
      //   .then(
      //     this.axios.spread((...data) => {
      //       resolve(this.httpEnd(data))
      //     })
      //   )
      //   .catch(err => {
      //     reject(this.httpErr(err))
      //   })
    // })
  }

  get(){}

  post(){}


}

export default new HttpRock(httpStart, httpEnd, httpErr)