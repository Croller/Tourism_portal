import Vue from 'vue'
import VueRes from 'vue-resource'
import VueRoute from 'vue-route'



Vue.use(VueRes)
// Vue.use(bootstrap)

// window.jQuery = jquery


// const GlobalComponents = {
//   install (Vue) {
//     Vue.component(MapSearchFilter.name, MapSearchFilter)
//     Vue.component(NavBar.name, NavBar)
//     Vue.component(Map.name, Map)
//   }
// }

import App from './App.vue'

new Vue({
  el: '#App',
  render: h => h(App)
})

// new Vue({
//   el: '#MapSearchFilter',
//   render: h => h(MapSearchFilter)
// })

// new Vue({
//   el: '#NavBar',
//   render: h => h(NavBar)
// })

// new Vue({
//   el: '#Map',
//   render: h => h(Map)
// })