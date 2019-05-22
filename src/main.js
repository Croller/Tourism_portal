
import Vue from 'vue';

import App from './App';
import store from './store/store.js';
import router from './router/router.js';
import Resource from 'vue-resource';

Vue.use(Resource);

require('@/assets/css/index.css')
require('@/assets/css/fonts.css')

require('@/assets/css/plugin/font-awesome/css/fontawesome-all.min.css')

require('@/assets/css/plugin/air-datepicker-master/datepicker.min.css')
require('@/assets/js/plugin/air-datepicker-master/datepicker.min.js')

require('@/assets/js/plugin/air-datepicker-master/datepicker.min.js')





Vue.config.productionTip = false

/* eslint-disable no-new */

// new Vue({
//   router: router,
//   el: '#app',
//   // render: h => h(App)
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');