import { defineStore } from "pinia"
import axios from "axios"
import { tokenType } from "../types"

const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null as tokenType,
  }),
  getters: {
    getToken(): tokenType {
      return this.token
    }
  },
  actions: {
    async signin(email: string, password: string) {
      await axios
        .post("http://localhost:30054/auth/signin", { email, password })
        .then((resp) => (this.token = resp.data.token))
    },
    async signup(name: string, email: string, password: string) {
      await axios.post("http://localhost:30054/auth/signup", { name, email, password })
    },
  },
})

export default useAuthStore
