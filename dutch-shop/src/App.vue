<template>
  <div>
    <TopBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TopBar from './components/TopBar.vue';
</script>

<style>
body {
  padding-top: 70px;
}
</style>
