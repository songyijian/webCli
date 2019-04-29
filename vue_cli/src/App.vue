<!--
 * @Description: vue 入口组建
 * @Author: yijian.song
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-23 19:30:52
 * @LastEditTime: 2019-04-29 19:36:40
 -->
<template>
  <div id="app">
    <router-view/>
    <hr>
    <button @click="ajaxGet">ajax get test</button>
    <button @click="ajaxAll">ajax All test</button>
  </div>
</template>

<script>
import a from "@config/mian.js"

export default {
  name: 'App',
  methods:{
    async ajaxGet(){
      console.log('go')
      let getdata = await this.$axiosGet('http://localhost/mockwaits?time=3000',{a:333})
      console.log('yes',getdata)
    },
    ajaxAll(){
      this.$httpAll(
        [
          this.$axios.get('http://localhost/mockwait?time=3000&index=1'),
          this.$axios.get('http://localhost/mockwait?time=1000&index=2')
        ]
      ).then( data=>{
          console.log(data)
        }
      )
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
