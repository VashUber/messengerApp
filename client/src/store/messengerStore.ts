import axios from 'axios'
import { defineStore } from 'pinia'
import { Chat } from '../types'

const useMessengerStore = defineStore({
	id: 'messengerStore',
	state: () => ({
		chats: [] as Array<Chat>
	}),
	getters: {
		getChats(): Array<Chat> {
			return this.chats
		}
	},
	actions: {
		async setChats(email: string, token: string) {
			const userEmail = email
			const response = await axios.get(
				`http://localhost:30054/api/getchats?email=${userEmail}`,
				{
					headers: {
						'content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)
			const { chats } = response.data

			this.chats = [...this.chats, ...chats]
		},
		signout() {
			this.chats = []
		}
	}
})

export default useMessengerStore
