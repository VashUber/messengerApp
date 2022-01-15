import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Signin from "../pages/Signin.vue"
import Signup from "../pages/Signup.vue"
import Main from "../pages/Main.vue"

const routes: Array<RouteRecordRaw> = [
  {
    name: "Signin",
    path: "/signin",
    component: Signin,
  },
  {
    name: "Signup",
    path: "/signup",
    component: Signup,
  },
  {
    name: "Main",
    path: "/",
    component: Main,
  },
]

const Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default Router
