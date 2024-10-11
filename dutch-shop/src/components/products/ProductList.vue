<template>
  <!-- Products Title --> 
  <h2 v-if="!isLoading" class="text-xl mb-6">Products</h2>
  <!-- Loading state -->
  <div v-if="isLoading && !products.length" class="flex flex-col justify-center items-center gap-4">
    <p>Loading products...</p>
    <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-purple"></div>
  </div>
  <!-- Products list -->
  <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchGraphQLData } from '../../api/apiClient';
import { useProductStore } from '../../stores/productStore';
import { GET_PRODUCTS } from '../../api/queries/products';
import { Product, ProductsResponse } from '../../types/types';
import ProductCard from './ProductCard.vue';

const products = ref<Product[]>([]);
const isLoading = ref(false);

const productStore = useProductStore();

// Fetch products on mount
onMounted(async () => {
  // Show cached data from store immediately
  products.value = productStore.products;

  // If there are no cached products, show a loading state
  if (!products.value.length) {
    isLoading.value = true;
  }

  // Fetch fresh products from the API in the background
  await fetchAndUpdateProducts();

  isLoading.value = false;
});

// Function to fetch products
const fetchProducts = async (): Promise<Product[]> => {
  const variables = { first: 20 };
  const data = await fetchGraphQLData(GET_PRODUCTS, variables) as ProductsResponse;
  return data.products.edges.map((edge) => edge.node);
};

// Function to fetch and update products if there are new ones
const fetchAndUpdateProducts = async () => {
  const fetchedProducts = await fetchProducts();

  // Compare the new products with the cached ones
  const cachedProducts = productStore.products;

  if (!areProductsEqual(fetchedProducts, cachedProducts)) {
    productStore.setProducts(fetchedProducts);
    products.value = fetchedProducts;
  }
};

// Function to check if the cached products and fetched products are equal
const areProductsEqual = (newProducts: Product[], cachedProducts: Product[]): boolean => {
  if (newProducts.length !== cachedProducts.length) { // Only checking for length on this exercise
    return false;
  }

  return newProducts.every((newProduct, index) => newProduct.id === cachedProducts[index].id);
};
</script>
