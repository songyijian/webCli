// import Axios from 'axios' 
import axios from '@/axios' 


class Http{
  constructor(httpStart, httpEnd, httpErr) {
    this.axios = axios
    this.httpStart = httpStart || (obj, type) => { return { ...obj} }
    this.httpEnd = httpEnd || function () { }
    this.httpErr = httpErr || function () { }
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
            resolve(this.httpGetEnd(data))
          })
        )
        .catch(err => {
          reject(this.httpGetErr(err))
        })
    })
  }

  
}

export default new Http()

