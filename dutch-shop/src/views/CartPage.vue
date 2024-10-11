<template>
  <!-- Cart Title -->
  <h2 class="m-10 text-xl">Your Cart</h2>
  <div class="p-4 border rounded mt-10 w-[90%] max-w-[800px] mx-auto">
    <!-- Empty cart message -->
    <span v-if="isCartEmpty">Your cart is empty.</span>
    <!-- Cart items list -->
    <ul v-else>
      <li v-for="item in cartStore.cart" :key="item.id" class="flex justify-between mb-2">
        <div class="flex items-center">
          <img :src="item.featuredImage?.url" alt="Product Image" v-if="item.featuredImage" class="w-20 h-20 mr-2" />
          <span>{{ item.title }} - {{ getProductPrice(item) }} (x{{ item.quantity }})</span>
        </div>
        
        <!-- Plus and minus buttons -->
        <div class="flex gap-2 items-center justify-center">
          <button @click="onRemoveOne(item.id)" class="bg-primary-purple text-white py-1 px-2 rounded hover:bg-primary-yellow hover:text-black transition-colors duration-300">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="onAddToCart(item)" class="bg-primary-purple text-white py-1 px-2 rounded hover:bg-primary-yellow hover:text-black transition-colors duration-300">+</button>
        </div>
      </li>
    </ul>

    <div class="flex justify-end">
      <p class="font-bold mt-4">Total: {{ cartStore.total }} {{ getCurrencyCode }}</p>
    </div>
  
    <!-- Checkout and Back to Shop buttons -->
    <div class="flex justify-between mt-6">
      <router-link to="/" class="bg-primary-purple text-white py-2 px-4 rounded">Continue Shopping</router-link>
      <button v-if="!isCartEmpty" @click="checkout" class="bg-green-500 text-white py-2 px-4 rounded">Checkout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';
import { computed } from 'vue';
import { Product } from '../types/types';

const cartStore = useCartStore();

// Computed property for cart empty state
const isCartEmpty = computed(() => cartStore.cart.length === 0);

// Method to get the price of a product with safe access to variants
const getProductPrice = (product: Product) => {
  return product.variants?.edges?.[0]?.node.price
    ? `${product.variants.edges[0].node.price.amount} ${product.variants.edges[0].node.price.currencyCode}`
    : 'Price unavailable';
};

// Computed property to get the currency code (based on first product)
const getCurrencyCode = computed(() => {
  return cartStore.cart.length > 0
    ? cartStore.cart[0].variants.edges[0].node.price.currencyCode
    : '';
});

// Add product to cart
const onAddToCart = (product: Product) => {
  cartStore.addToCart(product);
};

// Remove one product from cart
const onRemoveOne = (productId: string) => {
  cartStore.removeOneFromCart(productId);
};

// Checkout method
const checkout = () => {
  console.log('Checkout clicked');
};
</script>
