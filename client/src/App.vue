<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

  * {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
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
