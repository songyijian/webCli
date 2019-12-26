import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '~pages/HelloWorld'
import pugTest from '~pages/pugTest'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pugTest',
      name: 'pugTest',
      component: pugTest
    }
  ]
})
