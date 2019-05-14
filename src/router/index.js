import Vue from 'vue'
import Router from 'vue-router'
import Main from '../page/main/index'
import TimeEdit from '../page/main/time_edit'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Main', component: Main},
    {path: '/timeedit', name: 'TimeEdit', component: TimeEdit},
  ]
})
