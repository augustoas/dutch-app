import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Product } from '../types/types';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);

  // Method to set the products
  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts;
  };

  return { products, setProducts };
});
