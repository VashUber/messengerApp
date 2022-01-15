import { createApp } from "vue"
import App from "./App.vue"
import Router from "./router"
import { createPinia } from "pinia"
import useAuthStore from "./store/authStore"

createApp(App).use(Router).use(createPinia()).mount("#app")

const authStore = useAuthStore()

Router.beforeEach((to, from, next) => {
  if (authStore.token) {
    if (to.name === "Signin" || to.name === "Signup") next({ name: "Main" })
    else next()
  } else {
    if (to.name !== "Signin" && to.name !== "Signup") next({ name: "Signin" })
    else next()
  }
})
