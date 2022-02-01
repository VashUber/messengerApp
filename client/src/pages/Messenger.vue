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
		<VChat v-if="currentChat" />
		<div v-else class="chat-else">
			<span class="chat-else__msg">Выберите чат</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VAside from '../components/VAside.vue'
import VChat from '../components/VChat.vue'
import VModal from '../components/VModal.vue'

const currentChat = ref<string | null>(null)
const modalIsVisible = ref(false)
const setCurrentChat = (elem: string) => {
	currentChat.value = elem
}
const toggleModal = () => {
	modalIsVisible.value = !modalIsVisible.value
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
