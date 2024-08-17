import { computed, ref } from "vue";

export function useDiscount(cartTotal) {
  const discountPercentage = ref(0.1);
  const isValidDiscount = ref(false);

  const discountedTotal = computed(() => {
    if (isValidDiscount.value) {
      return (cartTotal * (1 - discountPercentage.value)).toFixed(2);
    }
    return cartTotal;
  });
  

  return {
    discountPercentage,
    isValidDiscount,
    discountedTotal
  };
}
