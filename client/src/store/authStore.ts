import { defineStore } from "pinia";
import axios from "axios";
import { tokenType } from "../types";

const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: null as tokenType
    }),
    getters: {

    },
    actions: {
        async signin(email: string, password: string) {
            await axios.post('http://localhost:30054/auth/signin', {email, password}).then(resp => this.token = resp.data)
        }
    }
})

export default useAuthStore