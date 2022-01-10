import Vue from 'vue'
import 'normalize.css/normalize.css'
import '@/styles/business-style.css'
import '@/styles/business-style-Impl.css'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'

Vue.config.productionTip = false
new Vue({
  el: '#elephant-admin',
  router,
  store,
  render: (h) => h(App),
})
