<template>
	<aside class="aside">
		<VButton text="Создать чат" class="aside__button button_secondary-100" />
		<div class="aside__wrapper">
			<div
				v-for="item in items"
				:key="item"
				class="aside__item"
				:class="{ aside__item_active: currentChat === item }"
				@click="setCurrentChat(item)"
			>
				{{ item }}
			</div>
		</div>

		<VButton
			text="Выйти"
			class="aside__button aside__button_fixed button_secondary-100"
			@click="signout"
		/>
	</aside>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { vAsideItem } from '../types'
import VButton from './VButton.vue'
import useAuthStore from '../store/authStore'

const { items, currentChat } =
	defineProps<{ items: vAsideItem; currentChat: string | null }>()
const emits = defineEmits(['setCurrentChat'])
const router = useRouter()
const authStore = useAuthStore()
const signout = () => {
	authStore.signout()
	router.push({ name: 'Signin' })
}
const setCurrentChat = (elem: string) => {
	emits('setCurrentChat', elem)
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
