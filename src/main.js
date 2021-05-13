import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'  // 引入vant-ui组件库
import 'vant/lib/index.css'  // 全局引入vant-ui组件样式
import './style/base.scss'  // 导入自己的预制样式
import './style/font.scss'  // 导入字体图标
import 'normalize.css'  // 导入normalize.css
import 'amfe-flexible'  // 导入flexible动态设置rem大小
import './filters'  // 导入全局过滤器

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,  // 挂载router
  store,   // 挂载store
  render: h => h(App),
}).$mount('#app')
