import { defineStore } from "pinia"
import axios from "axios"
import { tokenType } from "../types"
import { VueCookieNext } from "vue-cookie-next"
import { useRouter } from "vue-router"

const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: (null || VueCookieNext.getCookie("token")) as tokenType,
  }),
  getters: {
    getToken(): tokenType {
      return this.token
    },
  },
  actions: {
    async signin(email: string, password: string) {
      await axios.post("http://localhost:30054/auth/signin", { email, password }).then((resp) => {
        this.token = resp.data.token
        VueCookieNext.setCookie("token", resp.data.token)
      })
    },
    async signup(name: string, email: string, password: string) {
      await axios.post("http://localhost:30054/auth/signup", { name, email, password })
    },
    signout() {
      VueCookieNext.removeCookie("token")
      this.token = null
      const router = useRouter()
      router.push({ name: "Signin" })
    },
  },
})

export default useAuthStore
