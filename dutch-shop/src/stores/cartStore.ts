import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { CartItem, Product } from '../types/types';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

  // Method to add a product to the cart
  const addToCart = (product: Product) => {
    const existing = cart.value.find((item) => item.id === product.id);
    if (!existing) {
      cart.value.push({ ...product, quantity: 1 });
    } else {
      existing.quantity++;
    }
    saveCart();
  };

  // Method to remove one unit from the cart
  const removeOneFromCart = (productId: string) => {
    const existing = cart.value.find((item) => item.id === productId);
    if (existing && existing.quantity > 1) {
      existing.quantity--;
    } else {
      removeFromCart(productId);
    }
    saveCart();
  };

  // Method to remove a product from the cart
  const removeFromCart = (productId: string) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
    saveCart();
  };

  // Computed property to get the total price of the cart
  const total = computed(() =>
    cart.value.reduce((sum: number, item: CartItem) => {
      // Check if variants and edges exist
      const price =
        item.variants &&
        item.variants.edges &&
        item.variants.edges.length > 0 &&
        item.variants.edges[0].node.price
          ? parseFloat(item.variants.edges[0].node.price.amount)
          : 0;
      return sum + price * item.quantity;
    }, 0).toFixed(1)
  );

  // Computed property to get the total number of items in the cart
  const totalCartItems = computed(() =>
    cart.value.reduce((sum: number, item: CartItem) => {
      return sum + item.quantity;
    }, 0)
  );

  // Method to save the cart to localStorage
  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  };

  return { cart, addToCart, removeOneFromCart, removeFromCart, total, totalCartItems };
});
