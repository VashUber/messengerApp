<template>
	<input
		:type="type"
		:placeholder="placeholder"
		@input="$emit('update:modelValue', $event?.target?.value)"
		:value="modelValue"
		class="input"
	/>
</template>

<script setup lang="ts">
const { type, placeholder, modelValue } =
	defineProps<{ type: string; placeholder: string; modelValue: string }>()
</script>

<style scoped lang="scss">
.input {
	padding: 6px;
	border-radius: 4px;
	outline: none;
	border: none;
	transition: all 0.15s ease-in-out;
	color: $primary;
	font-size: 20px;
}
</style>
