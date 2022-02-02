<template>
	<div class="messenger">
		<transition name="modal">
			<VModal v-if="modalIsVisible" @toggleModal="toggleModal" />
		</transition>

		<VAside
			:items="items"
			:currentChat="currentChat"
			@setCurrentChat="setCurrentChat"
			@toggleModal="toggleModal"
		/>
		<VChat v-if="currentChat" @sendMessage="sendMessage" :messages="messages" :currentChatId="currentChatId" />
		<div v-else class="chat-else">
			<span class="chat-else__msg">Выберите чат</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { io } from 'socket.io-client'
import VAside from '../components/VAside.vue'
import VChat from '../components/VChat.vue'
import VModal from '../components/VModal.vue'
import useAuthStore from '../store/authStore'
import useMessengerStore from '../store/messengerStore'
import { MessageRender } from '../types'

const authStore = useAuthStore()
const messengerStore = useMessengerStore()

const currentChat = ref<string | null>(null)
const currentChatId = ref<string | null>(null)
const modalIsVisible = ref(false)

const setCurrentChat = (elem: string, chatId: string) => {
	currentChat.value = elem
	currentChatId.value = chatId
}
const toggleModal = () => {
	modalIsVisible.value = !modalIsVisible.value
}

const items = computed(() => messengerStore.getChats)
const user = computed(() => authStore.getUser)
const socket = ref(io('ws://localhost:30054'))
const getMessagesByChatId = messengerStore.getMessages

const messages = computed(() : MessageRender => getMessagesByChatId(currentChatId.value))

const sendMessage = (text: string) => {
	const chat = items.value.find(elem => elem.chatId === currentChatId.value)

	const to =
		chat?.firstUser.email === user.value.email
			? chat.secondUser.email
			: chat?.firstUser.email
	if (to) {
		const from = user.value.email
		messengerStore.addNewMessage(to, from, text, currentChatId.value)
		socket.value.emit('sendMessage', to, from, text)
	}
}

socket.value.on('getMessage', data => {
	console.log(data)
	messengerStore.addNewMessage(data.to, data.from, data.text, currentChatId.value)
})

onMounted(async () => {
	if (authStore.getToken) {
		authStore
			.setUser()
			.then(() =>
				messengerStore.setChats(authStore.getUser.email, authStore.getToken)
			)
	}

	watch(user, () => {
		socket.value.emit('addNewUser', user.value)
	})
})
</script>

<style scoped lang="scss">
.messenger {
	display: grid;
	grid-template-columns: minmax(200px, 18%) 1fr;
	grid-template-areas: 'aside chat';
}

.chat-else {
	grid-area: chat;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	&__msg {
		color: #fff;
		border-radius: 10px;
		height: 30px;
		width: 200px;
		background: rgba(255, 255, 255, 0.05);
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.modal-enter-active,
.modal-leave-active {
	transition: all 0.35s;
}
.modal-leave-to,
.modal-enter-from {
	opacity: 0;
	transform: scale(1.15);
}
</style>
