import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Signin from "../pages/Signin.vue"
import Signup from "../pages/Signup.vue"
import Messenger from "../pages/Messenger.vue"

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
    name: "Messenger",
    path: "/",
    component: Messenger,
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
