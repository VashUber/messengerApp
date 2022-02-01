<template>
	<aside class="aside">
		<VButton class="aside__button button_secondary-100" @click="toggleModal">
			Создать чат
		</VButton>
		<div class="aside__wrapper">
			<div
				v-for="item in items"
				:key="item.chatId"
				class="aside__item"
				:class="{
					aside__item_active:
						currentChat === item.firstUser || currentChat === item.secondUser
				}"
				@click="setCurrentChat(item.firstUser)"
			>
				<span v-if="item.firstUser !== user.email">{{ item.firstUser }}</span>
				<span v-else>{{ item.secondUser }}</span>
			</div>
		</div>

		<VButton
			class="aside__button aside__button_fixed button_secondary-100"
			@click="signout"
		>
			Выйти
		</VButton>
	</aside>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import VButton from './VButton.vue'
import useAuthStore from '../store/authStore'
import useMessengerStore from '../store/messengerStore'
import { Chat } from '../types'

const router = useRouter()
const authStore = useAuthStore()
const messengerStore = useMessengerStore()

const { items, currentChat } =
	defineProps<{ items: Array<Chat>; currentChat: string | null }>()
const emits = defineEmits(['setCurrentChat', 'toggleModal'])

const signout = () => {
	authStore.signout()
	messengerStore.signout()
	router.push({ name: 'Signin' })
}

const setCurrentChat = (elem: string) => {
	emits('setCurrentChat', elem)
}

const user = computed(() => authStore.getUser)

const toggleModal = () => {
	emits('toggleModal')
}
</script>

<style scoped lang="scss">
.aside {
	grid-area: aside;
	width: 18%;
	min-width: 200px;
	background: $secondary;
	display: flex;
	flex-direction: column;
	padding-bottom: 40px;
	top: 0;
	bottom: 0;
	position: fixed;
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

	&__item {
		margin-top: 20px;
		padding: 10px 20px;
		display: flex;
		align-items: center;
		color: #fff;
		cursor: pointer;
		transition: background 0.2s;
		user-select: none;

		&:hover {
			background: $secondary-200;
		}

		&_active {
			background: $secondary-300;
		}
	}

	&__button {
		border-radius: 0px;

		&_fixed {
			width: 18%;
			min-width: 200px;
			position: fixed;
			left: 0;
			bottom: 0;
		}
	}
}
</style>
