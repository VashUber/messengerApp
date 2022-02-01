<template>
	<div class="app">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { io } from 'socket.io-client'
import useAuthStore from './store/authStore'
import useMessengerStore from './store/messengerStore'

const authStore = useAuthStore()
const messengerStore = useMessengerStore()

onMounted(() => {
	if (authStore.getToken) {
		authStore
			.setUser()
			.then(() =>
				messengerStore.setChats(authStore.getUser.email, authStore.getToken)
			)
	}
	io('ws://localhost:30054')
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
	margin: 0;
	padding: 0;
	font-family: 'Roboto', sans-serif;
}

.app {
	min-height: 100vh;
	background: $background;
}

input::placeholder {
	color: $placeholder;
}

a {
	text-decoration: none;
	color: #fff;

	&:hover {
		text-decoration: underline;
	}
}
</style>
