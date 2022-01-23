import { createApp } from "vue"
import App from "./App.vue"
import Router from "./router"
import { createPinia } from "pinia"
import useAuthStore from "./store/authStore"
import { VueCookieNext } from "vue-cookie-next"

createApp(App).use(Router).use(createPinia()).use(VueCookieNext).mount("#app")

const authStore = useAuthStore()

Router.beforeEach((to, from, next) => {
  switch (true) {
    case to.matched.some((record) => record.meta.requiresAuth):
      if (!authStore.token) next({ name: "Signin" })
      else next()
      break
    case to.matched.some((record) => record.meta.requiresGuest):
      if (authStore.token) next({ name: "Main" })
      else next()
      break
  }
})
