import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/reset.css'
import '@/utils/flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import components from './utils/components'
import 'vant/lib/index.less' // vant主题定制

import serve from '@/api'
Vue.use(components)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$API = serve

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
