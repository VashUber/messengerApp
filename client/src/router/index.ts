import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Signin from "../pages/Signin.vue"

const routes: Array<RouteRecordRaw> = [
  {
    name: "Signin",
    path: "/signin",
    component: Signin,
  },
]

const Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default Router
