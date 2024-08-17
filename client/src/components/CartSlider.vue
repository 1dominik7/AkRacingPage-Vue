<template>
  <div class="cartSliderContainer">
    <div class="cartOverlay" :class="{ visible: isCartOpen }"></div>
    <div
      class="cartRight"
      ref="searchBannerRef"
      :class="{ visible: isCartOpen }"
    >
      <div class="cartTitle">
        <h4>Basket</h4>
        <i @click="closeBasket" class="bi bi-x-lg"></i>
      </div>
      <div class="itemsBasket" v-if="cartItemCount > 0">
        <div class="item" v-for="item in cartStore.items" :key="item.id">
          <img :src="item.images[0]" alt="" />
          <div class="info">
            <span class="title">{{ item.name }}</span>
            <span class="variant" v-if="item.material !== 'No Material'">{{
              item.material
            }}</span>
            <span class="variant" v-if="item.color !== 'No Color'">{{
              item.color
            }}</span>
            <div class="bottom">
              <div class="quantity">
                <div
                  class="icon"
                  @click="() => decreaseItemQuantity(item.id, item.variantId)"
                >
                  <i class="bi bi-dash"></i>
                </div>
                <input
                  class="quantityText"
                  type="number"
                  v-model.number="item.quantity"
                  @change="(e) => updateItemQuantity(item.id, e, item.variantId)"
                  min="1"
                />
                <div
                  class="icon"
                  @click="() => increaseItemQuantity(item.id, item.variantId)"
                >
                  <i class="bi bi-plus"></i>
                </div>
              </div>
              <span class="price">{{ item.price }} $</span>
            </div>
          </div>
        </div>
        <div class="textAreaContainer">
          <span class="orderNote">Order note</span>
          <textarea name="" id="" cols="10" rows="3"></textarea>
        </div>
      </div>
      <span class="emptyBasket" v-else>Your basket is currently empty.</span>
      <div class="finalInfo" v-if="cartItemCount > 0">
        <div class="finalTop">
          <span>Subtotal</span>
          <span>{{ cartTotal }} $</span>
        </div>
        <span class="finalDesc"
          >Shipping, taxes, and discounts codes calculated at checkout.
        </span>
        <div class="checkOut" @click="checkoutNavigator">Check Out</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchBannerRef = ref(null);
const isCartOpen = ref(false);

const { cartToggle, toggleCartState } = defineProps([
  "cartToggle",
  "toggleCartState",
]);

const cartStore = useCartStore();
const cartItemCount = cartStore.cartItemCount;

const closeBasket = () => {
  isCartOpen.value = false;
  setTimeout(() => {
    toggleCartState(false);
  }, 500);
};

const updateItemQuantity = (itemId, event) => {
  const parsedQuantity = parseInt(event.target.value, 10);
  if (!isNaN(parsedQuantity) && parsedQuantity >= 1) {
    cartStore.updateQuantity(itemId, parsedQuantity,item.variantId);
  } else {
    cartStore.removeFromCart(itemId,item.variantId);
  }
};

const increaseItemQuantity = (itemId, variantId) => {
  cartStore.increaseQuantity(itemId, variantId);
};

const decreaseItemQuantity = (itemId, variantId) => {
  cartStore.decreaseQuantity(itemId, variantId);
};

const checkoutNavigator = () => {
  closeBasket();
  router.push("/checkout");
};

const handleClickOutside = (event) => {
  if (searchBannerRef.value && !searchBannerRef.value.contains(event.target)) {
    closeBasket();
  }
};

const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    closeBasket();
  }
};

const cartTotal = computed(() => {
  return cartStore.cartTotal;
});

onMounted(() => {
  watch(
    () => cartToggle,
    (newVal) => {
      if (newVal) {
        setTimeout(() => {
          isCartOpen.value = true;
        }, 10);
      } else {
        closeBasket();
      }
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
      }, 0);
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscapeKey);
});

onMounted(() => {
  if (cartToggle) {
    setTimeout(() => {
      isCartOpen.value = true;
    }, 10);
  }
});
</script>

<style scoped>
.cartSliderContainer {
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  overflow: hidden;
  transition: opacity 0.5s ease-in-out;
}

.cartOverlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(99, 98, 98, 0.9);
  opacity: 0;
  transition: opacity 0.5s ease-in-out; 
}

.cartRight {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 20px;
  right: -500px;
  padding: 50px 30px;
  background: black;
  transition: right 0.5s ease-in-out; 
}

.cartRight.visible {
  right: 0px;
}

.cartOverlay.visible {
  opacity: 1;
}

.cartTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
  color: #fff;
  border-bottom: solid 0.5px rgb(78, 77, 77);
}

.emptyBasket {
  margin-top: 20px;
  color: #fff;
}

.bi {
  cursor: pointer;
}

.itemsBasket {
  width: 100%;
  overflow-y: scroll;
}

.item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0 30px;
  border-bottom: solid 1px rgb(80, 75, 75);
}

.info {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
}

.variant {
  font-size: 14px;
}

img {
  width: 100px;
  height: 150px;
  object-fit: contain;
}

.quantity {
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid grey;
}

.quantityText {
  width: 50px;
  text-align: center;
  background-color: transparent;
  color: #fff;
  border: none;
  border-left: 1px solid rgb(80, 75, 75);
  border-right: 1px solid rgb(80, 75, 75);
  outline: none;
}

.bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.icon:hover {
  background-color: #fff;
  color: black;
}

.price {
  align-self: flex-end;
}

.textAreaContainer {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
}

.orderNote {
  font-weight: 300;
  font-size: 14px;
}

textarea {
  background-color: transparent;
  border: 1px solid rgb(80, 75, 75);
  color: #fff;
  outline: none;
  padding: 10px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.finalInfo {
 width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0 60px;
  border-top: 1px solid rgb(80, 75, 75);
  color: #fff;
  background-color: black;
}

.finalTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.finalDesc {
  width: 100%;
  font-size: 14px;
  font-weight: 300;
}

.checkOut {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 30px;
  font-size: 13px;
  margin-top: 10px;
  clip-path: polygon(2% 0%, 100% 0, 98% 100%, 0% 100%);
  background: var(--primary);
  cursor: pointer;
}

@media (max-width: 800px) {
  .cartRight {
    width: 300px;
    padding: 20px;
  }

  .cartTitle{
    padding-bottom: 10px;
  }

  .itemsBasket{
    padding: 0px 10px;
  }

  .info{
    width: 260px;
  }

  .bottom{
    flex-direction: column;
    gap: 10px;
  }

  .quantity{
    align-self: flex-start;
  }

  .price{
    align-self: flex-start;
  }

  .finalInfo{
   width: 100%;
  }
}

</style>
