/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 22:23:37
 * @LastEditTime: 2019-04-30 00:03:54
 */
// import Axios from 'axios' 
import axios from '@/axios.js'
import {
  httpStart,
  httpEnd,
  httpErr
}
from '@config/http.config.js'


class Http{
  constructor({
      httpStart,
      httpEnd,
      httpErr
    }) {
    this.axios = axios
    this.httpStart = httpStart
    this.httpEnd = httpEnd
    this.httpErr = httpErr
  }

  httpGet(url, data){
    console.log('////get', url, data)
    // return this.axios.get(url, { params: data })
    // 其实上面已经够用，这里为了加个钩子
    return new Promise((resolve, reject) => {
      let { url, data } = this.httpStart({ url, data },'get')
      
      this.axios.get(url, { params: data })
        .then(data => {
          resolve(this.httpEnd(data))
        })
        .catch(err => {
          reject(this.httpErr(err))
        })
    })
  }

  httpPost(url, data) {
    console.log('////post', url, data)
    // return this.axios.post(url, data)
    return new Promise((resolve, reject) => {
      let { url, data } = this.httpStart({ url, data },'post')
      this.axios.post(url, data)
        .then(data => {
          resolve(this.httpEnd(data))
        })
        .catch(err => {
          reject(this.httpErr(err))
        })
    })
  }


  httpAll(arr) {
    console.log('////all',arr)
    return new Promise((resolve, reject) => {
      let arr = this.httpGetStart(arr,'all')
      this.axios.all(arr)
        .then(
          this.axios.spread(( ...data )=>{
            resolve(this.httpEnd(data))
          })
        )
        .catch(err => {
          reject(this.httpErr(err))
        })
    })
  }

  
}

export default new Http(httpStart, httpEnd, httpErr)

