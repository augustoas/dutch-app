<template>
  <!-- TopBar -->
  <header class="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center h-[70px]">
    <router-link to="/" class="text-xl text-primary-purple font-bold ml-6">
      Dutch
    </router-link>
    <router-link to="/cart" class="flex items-center space-x-2">
      <span>Cart</span>
      <span class="bg-primary-purple text-white rounded-full h-6 w-6 flex items-center justify-center">
        {{ cartStore.totalCartItems }}
      </span>
    </router-link>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

</script>

<style scoped>
header {
  z-index: 100;
}
</style>
