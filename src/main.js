
import Vue from 'vue'
import Resource from 'vue-resource'

import App from './App'
import routers from './router'

Vue.use(Resource)

require('@/assets/css/index.css')
require('@/assets/css/fonts.css')
require('@/assets/css/plugin/font-awesome/css/fontawesome-all.min.css')

require('@/assets/css/plugin/air-datepicker-master/datepicker.min.css')
require('@/assets/js/plugin/air-datepicker-master/datepicker.min.js')


Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router: routers,
  components: { App },
  template: '<App/>'
})
