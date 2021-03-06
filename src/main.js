/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import App from './App.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
//import routes from './routes/routes'
import { router } from './routes/routes';

import './registerServiceWorker'
import store from './store'

import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
Vue.use(Vuex)
Vue.use(VueAxios, axios)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import setupInterceptors from './services/setupInterceptors';
setupInterceptors(store);


import Skeleton from 'vue-loading-skeleton';
import 'vue-search-select/dist/VueSearchSelect.css'

Vue.use(Skeleton)

// plugin setup
Vue.use(LightBootstrap)


import VuePaginate from 'vue-paginate'
Vue.use(VuePaginate)



// configure router
/*const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})*/

/* eslint-disable no-new */
new Vue({
  router,

  el: '#app',
  render: h => h(App),
  store,

})
