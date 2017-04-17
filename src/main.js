import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueAnalytics from 'vue-analytics'

import App from './App.vue'
import Quiz from './Quiz.vue'
import Question from './Question.vue'
import Result from './Result.vue'

import storeInfo from './store'

const routes = [
  {
    path: '/result',
    component: Result
  }, {
    path: '/', redirect: '/1', component: Quiz,
    children: [
      {
        path: ':id',
        component: Question
      }
    ]
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAnalytics, {
  id: 'UA-97492227-1',
  router
})

const store = new Vuex.Store(storeInfo)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
