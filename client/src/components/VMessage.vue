<template>
	<div
		class="message"
		:class="{
			message_right: message.from === user.email
		}"
	>
		<h2 v-if="message.from === user.email">{{ user.name }}</h2>
		<h2 v-else>{{ secondUser }}</h2>
		<p>{{ message.text }}</p>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Message, User } from '../types'

const { message, chatId, user, secondUser } = defineProps<{
	message: Message
	chatId: string
	user: User
	secondUser: string
}>()
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
	margin-right: auto;

	&_right {
		margin-left: auto;
		margin-right: 10px;
	}
}
</style>
