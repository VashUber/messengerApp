<template>
	<div class="chat">
		<div class="chat__messages">
			<VMessage
				v-for="message in messages"
				:key="message?.text"
				:name="message?.name"
				:text="message?.text"
			/>

			<VMessage name="Саша" text="Хуй" />
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
import { ref } from 'vue'

const newMessage = ref('')
const messages = ref<Array<{ name: string; text: string }>>([])
const sendMessage = () => {
	if (newMessage.value) {
		messages.value.push({ name: 'samara', text: newMessage.value })
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
