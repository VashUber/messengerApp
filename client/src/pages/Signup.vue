<template>
	<div class="signup">
		<h2 class="signup__title">Регистрация</h2>
		<form action="#" @submit.prevent class="signup__form">
			<label class="signup__label">
				<VInput placeholder="Введите имя" type="name" v-model="name" class="" />
			</label>
			<label class="signup__label">
				<VInput
					placeholder="Введите почту"
					type="email"
					v-model="email"
					class=""
				/>
			</label>
			<label class="signup__label">
				<VInput
					placeholder="Введите пароль"
					type="password"
					v-model="password"
					class=""
				/>
			</label>
			<VButton
				text="Зарегистрироваться"
				class="signup__button"
				@click="signup"
			/>
		</form>
		<router-link to="/signin" class="signup__link"
			>Уже есть аккаунт?</router-link
		>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VInput from '../components/VInput.vue'
import VButton from '../components/VButton.vue'
import useAuthStore from '../store/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const signup = () => {
	authStore.signup(name.value, email.value, password.value).then(() => {
		name.value = ''
		email.value = ''
		password.value = ''
		router.push({ name: 'Messenger' })
	})
}
</script>

<style scoped lang="scss">
.signup {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	&__title {
		margin-bottom: 20px;
		color: #fff;
		font-weight: 500;
	}

	&__form {
		display: flex;
		flex-direction: column;
	}

	&__label:not(:first-child) {
		margin-top: 15px;
	}

	&__button {
		margin-top: 10px;
		align-self: flex-end;
	}

	&__link {
		margin-top: 10px;
	}
}
</style>
