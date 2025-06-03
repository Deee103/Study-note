<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>

<template>
  <h2>App</h2>
  <RouterLink to="/login">Login</RouterLink>
  <RouterLink to="/main">Main</RouterLink>
  <RouterView />
</template>

<style scoped></style>
