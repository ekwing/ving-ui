import '@/utils/flexible.js'
import 'packages/theme/index.scss'

import EkUI from '@/index.js'
import Vue from 'vue'
import VueRouter from 'vue-router'

import entry from './app'
import demoBlock from './components/demo-block'
import FooterNav from './components/footer-nav'
import MainHeader from './components/header'
import SideNav from './components/side-nav'
import routes from './router.js'

Vue.use(EkUI)
Vue.use(VueRouter)
Vue.component('demo-block', demoBlock)
Vue.component('main-header', MainHeader)
Vue.component('side-nav', SideNav)
Vue.component('footer-nav', FooterNav)

document.title = 'APP组件'
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app')
