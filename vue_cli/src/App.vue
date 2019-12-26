<!--
 * @Description: vue 入口组建
 * @Author: yijian.song
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-23 19:30:52
 * @LastEditTime: 2019-05-09 17:15:52
 -->
<template>
  <div id="app">
    <router-view/>
    <hr>
    <button @click="httpGet">http get test</button>
    <button @click="httpAll">http All test</button>
    <button @click="httpNxet">http Nxet test</button>
  </div>
</template>

<script>
import a from "~config/mian.js"
import { rename } from 'fs';

export default {
  name: 'App',
  methods:{
    async httpGet(){
      console.log('vue>go')
      let getdata = await this.$httpGet('http://10.130.151.60/mockwait?time=3000',{a:333})
      console.log('vue>yes',getdata)
    },
    httpAll(){
      this.$httpAll(
        ['GET','http://10.130.151.60/mockwait?time=3000&index=1',{t:'get'}],
        ['GET','http://10.130.151.60/mockwait?time=100&index=1',{t:'get2'}],
      ).then( data=>{
          console.log(data)
      })
    },
    httpNxet(){
      function ts1(cxt) {
        // let {data,next} = cxt;
        return 1
      }
      function ts2(params) {
        return 2
      }
      this.$httpNext(ts1,ts2)
      // this.$httpNext.getNext('http://10.130.151.60/mockwait?time=3000&index=1',function(next){

      //   next()

      // })

      
    }
  }
}
</script>

<style lang="scss">
/**
 * @Description: 全局css
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-26 15:04:47
 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $bg;
  margin-top: 60px;
}
</style>
