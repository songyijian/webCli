<!--
 * @Description: vue 入口组建
 * @Author: yijian.song
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-23 19:30:52
 * @LastEditTime: 2019-04-26 15:15:47
 -->

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import a from "@config/mian.js"
a(1)

export default {
  name: 'App'
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
