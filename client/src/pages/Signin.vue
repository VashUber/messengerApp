<template>
  <div class="signin">
    <h2 class="signin__title">Вход</h2>
    <form action="#" @submit.prevent class="signin__form">
      <label class="signin__label">
        <VInput placeholder="Введите почту" type="text" v-model="mail" class="signin__input" />
      </label>
      <label class="signin__label">
        <VInput placeholder="Введите пароль" type="password" v-model="password" class="signin__input" />
      </label>
    </form>
    <router-link to="/signup" class="signin__link">У вас еще нет аккаунта?</router-link>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import VInput from "../components/VInput.vue"

  const mail = ref("")
  const password = ref("")
</script>

<style scoped lang="scss">
  .signin {
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

    &__link {
      margin-top: 10px;
    }
  }
</style>
