import axios from 'axios'
import { defineStore } from 'pinia'
import { Chat, Message } from '../types'

const useMessengerStore = defineStore({
	id: 'messengerStore',
	state: () => ({
		chats: [] as Array<Chat>,
		messages: [] as Array<Message>
	}),
	getters: {
		getChats(): Array<Chat> {
			return this.chats
		},
		getMessages: (state) => (chatId: string) => {
			
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

			this.chats = [...chats]
		},
		async createChat(emailToFind: string, email: string, token: string) {
			await axios.post(
				'http://localhost:30054/api/createChat/',
				{
					emailToFind,
					email
				},
				{
					headers: {
						'content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)

			this.setChats(email, token)
		},
		signout() {
			this.chats = []
		}
	}
})

export default useMessengerStore
