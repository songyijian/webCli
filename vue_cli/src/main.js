/*
 * @Description: vue核心入口
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-23 19:30:52
 * @LastEditTime: 2019-04-29 20:35:47
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios.js'
import { httpGetStart, httpGetEnd,httpGetErr} from '@config/axios.config.js'

// 代码检查
Vue.config.productionTip = false

/**
 * @Description: 基于axios为vue扩展http方法
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-29 14:59:48
 */
Vue.prototype.$http = Vue.prototype.$axios = axios
/**
 * @Description: get封装
 * @param {string} url 请求url 
 * @param {obj} data   上传参数
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-29 19:16:21
 */
Vue.prototype.$httpGet = Vue.prototype.$axiosGet = function(url, data) {
  // return axios.get(url, { params: data})
  // 其实上面已经够用，这里为了加个钩子
  return new Promise((resolve, reject) => {
    let { url, data } = httpGetStart({ url, data })
    axios.get(url, {
      params: data
    })
      .then(data => {
        resolve(httpGetEnd(data))
      })
      .catch(err => {
        reject(httpGetErr(err))
      })
  })
}

/**
 * @Description: post封装
 * @param {string} url 请求url
 * @param {obj} data   上传参数
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-29 19:16:21
 */
Vue.prototype.$httpPost = Vue.prototype.$axiosPost = function httpPost(url, data) {
  // return axios.post(url, data)
  return new Promise((resolve, reject) => {
    let { url, data} = httpGetStart({ url, data })

    axios.post(url, data)
      .then(data => {
        resolve(httpGetEnd(data))
      })
      .catch(err => {
        reject(httpGetErr(err))
      })
  })
}

/**
 * @Description: 多个并发请求封装
 * @param {Arr} Arr   多个【axios.get,axios.post】
 * @param {obj} data   上传参数
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-29 19:16:21
 */
Vue.prototype.$httpAll = Vue.prototype.$axiosAll = function axiosAll(Arr) {
  // return axios.all(Arr)
  return new Promise((resolve, reject) => {
    httpGetStart(Arr)
    axios.all(Arr)
      .then(
        axios.spread(( ...data )=>{
          console.log(data)
          resolve(httpGetEnd(data))
        })
      )
      .catch(err => {
        reject(httpGetErr(err))
      })
  })
}



/**
 * @Description:  创建一个vue对象，挂在window.vm方便调试
 * @param {type}  这个参考vue api
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-29 19:56:03
 */
window.vm = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})