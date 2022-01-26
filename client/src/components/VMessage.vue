<template>
	<div
		class="message"
		:class="{
			message_right: user.name !== name,
			message_left: user.name === name
		}"
	>
		<h2>{{ name }}</h2>
		<p>{{ text }}</p>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import useAuthStore from '../store/authStore'

const authStore = useAuthStore()
const user = computed(() => authStore.getUser)

const { text, name } = defineProps<{ text: string; name: string }>()
</script>

<style scoped lang="scss">
.message {
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	padding: 4px;
	min-width: 100px;
	max-width: 310px;
	text-overflow: ellipsis;
	background: #fff;
	word-break: break-word;
	gap: 10px;
	border-radius: 4px;

	&_right {
		margin-left: auto;
		margin-right: 10px;
	}

	&_left {
		margin-right: auto;
	}
}
</style>
