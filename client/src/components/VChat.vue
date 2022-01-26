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
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import VTextarea from './VTextarea.vue'
import VMessage from './VMessage.vue'
import { ref } from 'vue'

const newMessage = ref('')
const messages = ref<Array<{ name: string; text: string }>>([])
const sendMessage = () => {
	messages.value.push({ name: 'samara', text: newMessage.value })
	newMessage.value = ''
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
		grid-template-columns: 1fr 100px;
		color: #fff;
		margin-top: auto;
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
