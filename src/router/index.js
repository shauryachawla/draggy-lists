import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Lists from '@/components/Lists'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/b/:board_id',
      name: 'Lists',
      component: Lists,
    }
  ]
})
