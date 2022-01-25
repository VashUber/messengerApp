<template>
	<aside class="aside">
		<div class="aside__wrapper">
			<div
				v-for="item in items"
				:key="item"
				class="aside__item"
				@click="setCurrentChat(item)"
			>
				{{ item }}
			</div>
		</div>

		<VButton
			text="Выйти"
			class="aside__button button_secondary-100"
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
	width: 300px;
	position: fixed;
	background: $secondary;
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	&__item {
		margin-top: 20px;
		padding: 10px 20px;
		display: flex;
		align-items: center;
		color: #fff;
	}

	&__button {
		margin-top: auto;
	}
}
</style>
