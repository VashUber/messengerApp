<template>
	<div class="modal" v-bind="$attrs">
		<div class="modal__item">
			<button class="modal__button-close" @click="toggleModal">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="img"
					width="40"
					height="40"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 1024 1024"
				>
					<path
						d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4l-66.1-.3c-4.4 0-8 3.5-8 8c0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4l66 .3c4.4 0 8-3.5 8-8c0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
						fill="currentColor"
					/>
					<path
						d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448s448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
						fill="currentColor"
					/>
				</svg>
			</button>
			<div class="modal__form">
				<VInput
					placeholder="Введите почту человека"
					type="email"
					v-model="email"
					class="modal__input"
				/>
				<VButton class="modal__button">Создать чат</VButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import VInput from './VInput.vue'
import VButton from './VButton.vue'

const emits = defineEmits(['toggleModal'])
const email = ref('')
const toggleModal = () => {
	emits('toggleModal')
	email.value = ''
}
</script>

<style scoped lang="scss">
.modal {
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	z-index: 1488;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(3px);

	&__item {
		background: $secondary-300;
		width: 450px;
		height: 300px;
		border-radius: 20px;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
	}

	&__button {
		width: 240px;
		margin-top: auto;
		margin-bottom: 20px;
	}

	&__input {
		width: 100%;
	}

	&__button-close {
		transition: transform 0.3s;
		outline: none;
		border: none;
		color: #fff;
		display: block;
		margin-left: auto;
		background: none;

		&:hover {
			transition: transform 0.2s;
			transform: scale(1.05);
		}
	}

	&__form {
		padding: 30px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		box-sizing: border-box;
	}
}
</style>
