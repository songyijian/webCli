# webpack_item
> A Vue.js project


## 项目结构
```js
.
├── App.vue     // 组建入口文件
├── assets      // 静态文件
│   └── logo.png  
├── components  // 业务层组建
│   └── HelloWorld.vue
├── config      // 业务配置文件
├── main.js     // 核心
├── pages       // 页面组织目录
├── router      // 路由
│   └── index.js  
├── screw       // 纯粹的组建（不参与实际任务）
├── store       // VueX
├── func        // 公用函数整理
└── style       // css
    ├── _var.scss   // 全局sass变量
    └── unify.scss  // 全局样式处理
```



## 路径别名设置
```js
alias: {
  'vue$': 'vue/dist/vue.esm.js',
  // 路径别名设置
  '@': resolve('src'),  
  '@assets': resolve('src/assets'),         // 静态文件
  '@components': resolve('src/components'), // 业务组建
  '@config': resolve('src/config'),         // 配置表整理
  '@screw': resolve('src/screw'),           // 纯粹的组建
  '@store': resolve('src/store'),           // vuex
  '@style': resolve('src/style'),           // 样式
  '@func': resolve('src/func'),             // 公用函数整理
}

```




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
