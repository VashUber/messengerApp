<template>
	<button class="button">{{ text }}</button>
</template>

<script setup lang="ts">
const { text } = defineProps<{ text: string }>()
</script>

<style scoped lang="scss">
.button {
	background: $secondary;
	color: #fff;
	outline: none;
	border: none;
	border-radius: 5px;
	padding: 8px 14px;
	font-size: 18px;

	&_secondary-100 {
		background: $secondary-100;
	}
}
</style>
