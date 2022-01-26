<template>
	<div class="messenger">
		<VAside
			:items="items"
			:currentChat="currentChat"
			@setCurrentChat="setCurrentChat"
		/>
		<VChat v-if="!currentChat" />
		<div v-else class="chat-else">
			<span class="chat-else__msg">Выберете чат</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VAside from '../components/VAside.vue'
import VChat from '../components/VChat.vue'

const currentChat = ref<string | null>(null)
const setCurrentChat = (elem: string) => {
	currentChat.value = elem
}
const items = ['Саша', 'Егор']
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
</style>
