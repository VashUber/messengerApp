<template>
	<input
		class="textarea"
		@input="$emit('update:modelValue', $event?.target?.value)"
		:value="modelValue"
		:placeholder="placeholder"
	/>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const { modelValue, placeholder } = defineProps<{ modelValue: string, placeholder: string }>()
</script>

<style scoped lang="scss">
.textarea {
	display: block;
	font-size: 18px;
	border: none;
	min-height: 40px;
	background: $secondary-300;
	color: #fff;
	outline: none;
	padding: 10px;
	width: 100%;

	&::placeholder {
		color: grey;
	}
}
</style>
