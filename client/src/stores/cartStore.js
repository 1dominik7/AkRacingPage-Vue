import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    discountPercentage: 0,
    discountedTotal: 0,
    isValidDiscount: false,
    discountCode: "ADD10",
  }),
  actions: {
    addToCart(item) {
      const existingItem = this.items.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.variantId === item.variantId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
      this.calculateDiscountedTotal();
    },
    removeFromCart(itemId, variantId) {
      this.items = this.items.filter(
        (item) => !(item.id === itemId && item.variantId === variantId)
      );
      this.calculateDiscountedTotal();
      this.checkDiscountValidity();
    },
    clearCart() {
      this.items = [];
      this.discountPercentage = 0;
      this.isValidDiscount = false;
      this.discountedTotal = 0;
    },
    increaseQuantity(itemId, variantId) {
      const item = this.items.find(
        (cartItem) => cartItem.id === itemId && cartItem.variantId === variantId
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(itemId, variantId) {
      const item = this.items.find(
        (cartItem) => cartItem.id === itemId && cartItem.variantId === variantId
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.removeFromCart(itemId, variantId);
        }
      }
    },
    updateQuantity(itemId, quantity, variantId) {
      const item = this.items.find(
        (cartItem) => cartItem.id === itemId && cartItem.variantId === variantId
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    applyDiscount(code) {
      if (code === this.discountCode) {
        this.isValidDiscount = true;
        this.discountPercentage = 10;
      } else {
        this.isValidDiscount = false;
        this.discountPercentage = 0;
      }
      this.calculateDiscountedTotal();
    },
    calculateDiscountedTotal() {
      const total = this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      this.discountedTotal = total - (total * this.discountPercentage) / 100;
    },
    resetDiscount() {
      this.discountPercentage = 0;
      this.isValidDiscount = false;
      this.discountedTotal = this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    checkDiscountValidity() {
      if (this.items.length === 0) {
        this.resetDiscount();
      }
    },
  },
  getters: {
    cartItemCount: (state) =>
      state.items.reduce((count, item) => count + item.quantity, 0),
    cartTotal: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    hasItemsInBasket: (state) => state.cartItemCount > 0,
  },
  persist: true,
});
