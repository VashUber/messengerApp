import { defineStore } from 'pinia'
import axios from 'axios'
import { nullableString, User } from '../types'
import { VueCookieNext } from 'vue-cookie-next'
import { useRouter } from 'vue-router'

const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		token: (null || VueCookieNext.getCookie('token')) as nullableString,
		email: (null || VueCookieNext.getCookie('email')) as nullableString,
		user: {} as User
	}),
	getters: {
		getToken(): nullableString {
			return this.token
		}
	},
	actions: {
		async signin(email: string, password: string) {
			const response = await axios.post('http://localhost:30054/auth/signin', {
				email,
				password
			})
			this.token = response.data.token
			this.email = response.data.email
			VueCookieNext.setCookie('token', response.data.token)
			VueCookieNext.setCookie('email', response.data.email)
			this.setUser()
		},
		async signup(name: string, email: string, password: string) {
			await axios.post('http://localhost:30054/auth/signup', {
				name,
				email,
				password
			})
		},
		signout() {
			VueCookieNext.removeCookie('token')
			VueCookieNext.removeCookie('email')
			this.token = null
			this.email = null
		},
		async setUser() {
			if (this.token && this.email) {
				const response = await axios.post(
					'http://localhost:30054/api/getuser',
					{ email: this.email },
					{
						headers: {
							'content-Type': 'application/json',
							Authorization: `Bearer ${this.token}`
						}
					}
				)
				const { email, name } = response.data
				this.user = { email, name }
			}
		}
	}
})

export default useAuthStore
