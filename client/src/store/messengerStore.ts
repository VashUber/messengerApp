import axios from 'axios'
import { defineStore } from 'pinia'
import { Chat, MessageRender } from '../types'

const useMessengerStore = defineStore({
	id: 'messengerStore',
	state: () => ({
		chats: [] as Array<Chat>,
		messages: [] as Array<MessageRender>,
		secondUserName: '' as string | undefined,
		secondUserEmail: '' as string | undefined,
		currentChatId: '',
		page: 1,
		pagingCounter: 1
	}),
	getters: {
		getChats(): Array<Chat> {
			return this.chats
		},
		getMessages:
			state =>
			(chatId: string): MessageRender | undefined => {
				return state.messages.find(elem => elem.chatId === chatId)
			},
		getChatById: state => (chatId: string) => {
			return state.chats.find(elem => elem.chatId === chatId)
		},
		getSecondUser: state => ({
			name: state.secondUserName,
			email: state.secondUserEmail
		}),
		getCurrentChatId: state => state.currentChatId
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
		},
		setSecondUser(userEmail: string, currentChatId: string) {
			const chat = this.chats.find(elem => elem.chatId === currentChatId)
			if (chat?.firstUser.email !== userEmail) {
				this.secondUserName = chat?.firstUser.name
				this.secondUserEmail = chat?.firstUser.email
			} else {
				this.secondUserName = chat?.secondUser.name
				this.secondUserEmail = chat?.secondUser.email
			}
		},
		setCurrentChatId(chatId: string) {
			this.currentChatId = chatId
		},
		async setMessages(chatId: string, token: string, email: string) {
			if (!this.messages.find(elem => elem.chatId === chatId)) {
				const response = await axios.get(
					`http://localhost:30054/api/getmessages?email=${email}&chatId=${chatId}&page=${this.page}`,
					{
						headers: {
							'content-Type': 'application/json',
							Authorization: `Bearer ${token}`
						}
					}
				)

				if (response.data.messages.length !== 0) {
					if (this.pagingCounter === 1) this.pagingCounter = response.data.pagingCounter
					this.messages.push({
						chatId,
						messages: [...response.data.messages]
					})
				}
			}
		},
		setNewPage() {
			this.page++
		}
	}
})

export default useMessengerStore
