<template>
	<div class="chat">
		{{ chat }}
		{{ currentChatId }}
		<div class="chat__messages" v-if="messages">
			<VMessage
				v-for="message in messages.messages"
				:key="message?.text"
				:message="message"
				:chatId="currentChatId"
				:user="user"
				:secondUser="secondUser"
			/>
		</div>
		<div class="chat__bottom">
			<VTextarea
				v-model="newMessage"
				class="chat__textarea"
				@keydown.enter="sendMessage"
				placeholder="Напишите сообщение..."
			/>
			<VButton class="chat__button" @click="sendMessage">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					aria-hidden="true"
					role="img"
					width="34"
					height="34"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
				>
					<g fill="none">
						<path
							d="M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12L3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15"
							stroke="white"
							stroke-width="1.2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				</svg>
			</VButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import VTextarea from './VTextarea.vue'
import VMessage from './VMessage.vue'
import VButton from './VButton.vue'
import { MessageRender } from '../types'
import { computed, ref, watch } from 'vue'
import useMessengerStore from '../store/messengerStore'
import useAuthStore from '../store/authStore'

const authStore = useAuthStore()
const user = computed(() => authStore.getUser)

const newMessage = ref('')

const { messages, currentChatId } =
	defineProps<{ messages: MessageRender; currentChatId: string }>()

const messengerStore = useMessengerStore()
const getChatById = messengerStore.getChatById

const chat = computed(() => getChatById(currentChatId))


const secondUser = computed(() => messengerStore.getSecondUser )

const emits = defineEmits(['sendMessage'])
const sendMessage = () => {
	if (newMessage.value) {
		emits('sendMessage', newMessage.value)
		newMessage.value = ''
	}
}
</script>

<style scoped lang="scss">
.chat {
	grid-area: chat;
	min-height: 100vh;
	margin: 0 50px;
	display: flex;
	flex-direction: column;

	&__bottom {
		display: grid;
		grid-template-columns: 1fr 140px;
		color: #fff;
		margin-top: auto;
		margin-right: 10px;
	}

	&__button {
		border-radius: 0;
	}

	&__messages {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 20px 0;
		height: calc(100vh - 100px);
		overflow-y: scroll;
		overflow-x: hidden;

		&::-webkit-scrollbar {
			width: 20px;
			height: 200px;
			overflow: auto;
			float: left;
			margin: 0 10px;
			width: 3px;
		}
		&::-webkit-scrollbar-track {
			background: $secondary;
		}

		&::-webkit-scrollbar-thumb {
			background: $secondary-200;
		}
	}
}
</style>
