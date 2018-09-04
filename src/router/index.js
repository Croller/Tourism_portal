import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'


import Index from '@/views/Index.vue'
import Search from '@/views/Search.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // remove # from url
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search/',
      name: 'Search',
      component: Search,
      props(route) {
        return  route.query || {}
      }
    },
    // { 
    //   path: '*', 
    //   component: Index 
    // }
    // {
    //   path: '/search/:uuid',
    //   name: 'Search',
    //   component: Search,
    //   props(route) {
    //     return  route.query || {}
    //   }
    // },
  ]
})
