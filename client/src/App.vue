<template>
	<div class="app">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { io } from 'socket.io-client'
import useAuthStore from './store/authStore'

const authStore = useAuthStore()
onMounted(() => {
	if (authStore.getToken) authStore.setUser()
	io('ws://localhost:30054', {
		auth: {
			token: authStore.getToken
		}
	})
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
