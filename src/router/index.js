import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from "@/views/homePage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Homepage,
    meta: [
      {
        title: 'Candy Post'
      }
    ]
  }
 
]

const router = new VueRouter({
  routes
})

export default router
