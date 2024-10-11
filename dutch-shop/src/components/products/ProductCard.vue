<template>
  <div class="border p-4 rounded">
    <!-- Product Title -->
    <h2 class="text-lg font-bold mb-2 text-center">{{ product.title }}</h2>

    <!-- Product Image -->
    <img :src="product.featuredImage?.url" alt="Product Image" v-if="product.featuredImage" />

    <!-- Product Description -->
    <p class="mb-2 mt-2 text-justify text-sm max-h-[100px] overflow-hidden">{{ product.description }}</p>

    <!-- Product Price -->
    <div v-for="variant in product.variants.edges" :key="variant.node.price.amount">
      <p class="text-sm">{{ getVariantPrice(variant) }} / unit</p>
    </div>

    <!-- Cart Controls -->
    <div v-if="isProductInCart" class="flex gap-2 items-center justify-center mt-2">
      <button @click="onRemoveOne(product.id)" class="bg-primary-purple text-white py-1 px-2 rounded hover:bg-primary-yellow hover:text-black transition-colors duration-300">-</button>
      <span>{{ getProductQuantity }}</span>
      <button @click="onAddToCart(product)" class="bg-primary-purple text-white py-1 px-2 rounded hover:bg-primary-yellow hover:text-black transition-colors duration-300">+</button>
    </div>
    
    <!-- Add to Cart Button -->
    <button v-else @click="onAddToCart(product)" class="bg-primary-purple text-white py-1 px-3 rounded mt-2 w-full hover:bg-primary-yellow hover:text-black transition-colors duration-300">
      Add to Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../../stores/cartStore';
import { Product, VariantEdge } from '../../types/types';

// Props to receive product data
const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

// Method to extract variant price safely
const getVariantPrice = (variant: VariantEdge) => {
  return `${variant.node.price.amount} ${variant.node.price.currencyCode}`;
};

// Computed property to check if a product is in the cart
const isProductInCart = computed(() => {
  return cartStore.cart.some((item) => item.id === props.product.id);
});

// Computed property to get the quantity of a product in the cart
const getProductQuantity = computed(() => {
  const cartItem = cartStore.cart.find((item) => item.id === props.product.id);
  return cartItem ? cartItem.quantity : 0;
});

// Handlers for cart actions
const onAddToCart = (product: Product) => {
  cartStore.addToCart(product);
};

const onRemoveOne = (productId: string) => {
  cartStore.removeOneFromCart(productId);
};
</script>
