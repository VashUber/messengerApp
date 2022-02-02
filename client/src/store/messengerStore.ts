import axios from 'axios'
import { defineStore } from 'pinia'
import { Chat, Message, MessageRender } from '../types'

const useMessengerStore = defineStore({
	id: 'messengerStore',
	state: () => ({
		chats: [] as Array<Chat>,
		messages: [] as Array<{ chatId: string; messages: Array<Message> }>
	}),
	getters: {
		getChats(): Array<Chat> {
			return this.chats
		},
		getMessages: state => (chatId: string) : MessageRender | undefined => {
			return state.messages.find(elem => elem.chatId === chatId)
		},
		getChatById: state => (chatId: string) => {
			return state.chats.find(elem => elem.chatId === chatId)
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
		addNewMessage(to: string, from: string, text: string, chatId: string) {
			const chat = this.messages.find(elem => elem.chatId === chatId)
			if (chat) chat.messages.push({ to, from, text })
			else this.messages.push({ chatId, messages: [{ to, from, text }] })
		},
		signout() {
			this.chats = []
		}
	}
})

export default useMessengerStore
