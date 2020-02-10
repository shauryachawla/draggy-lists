import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import EditList from '@/components/EditList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/edit-board/:list_id',
      name: 'EditList',
      component: EditList,
    }
  ]
})
