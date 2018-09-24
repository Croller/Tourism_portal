import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import YandexMetrika from 'vue-yandex-metrika' 

import Index from '@/views/Index.vue'
import Search from '@/views/Search.vue'

Vue.use(Router)

Vue.use(YandexMetrika, {
  id: 50306371,
  clickmap:true,trackLinks:true,
  router: Router,
  env: process.env.NODE_ENV
  // other options
})

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
