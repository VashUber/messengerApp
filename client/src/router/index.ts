import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Signin from "../pages/Signin.vue"
import Signup from "../pages/Signup.vue"
import Main from "../pages/Main.vue"

const routes: Array<RouteRecordRaw> = [
  {
    name: "Signin",
    path: "/signin",
    component: Signin,
    meta: {
      requiresGuest: true,
    },
  },
  {
    name: "Signup",
    path: "/signup",
    component: Signup,
    meta: {
      requiresGuest: true,
    },
  },
  {
    name: "Main",
    path: "/",
    component: Main,
    meta: {
      requiresAuth: true,
    },
  },
]

const Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default Router
