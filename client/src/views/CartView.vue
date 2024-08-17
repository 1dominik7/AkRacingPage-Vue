<template>
  <div class="cart">
    <div class="cartTop">
      <h1>Basket</h1>
      <div class="spanContainer">
        <span
          class="hover-span"
          @mouseover="startLoading"
          @mouseleave="resetLoading"
          >Continue shopping</span
        >
        <div class="underline"></div>
        <div class="loading-bar" :style="{ width: loadingWidth }"></div>
      </div>
      <div class="tableCart" v-if="cartItemCount > 0">
        <div class="topTable">
          <span class="wMin">Price</span>
          <span class="wMin">Quantity</span>
          <span class="wMax">Total</span>
        </div>
        <div class="line"></div>
        <div class="itemsCart">
          <div class="item" v-for="item in cartStore.items" :key="item.id">
            <div class="itemLeft">
              <img :src="item.images[0]" alt="" />
              <div class="itemLeftDesc">
                <span>{{ item.name }}</span>
                <span class="variant" v-if="item.material !== 'No Material'">{{
                  item.material
                }}</span>
                <span class="variant" v-if="item.color !== 'No Color'">{{
                  item.color
                }}</span>
                <button class="removeButton">Remove</button>
              </div>
            </div>
            <div class="itemRight">
              <span class="wMin">{{ item.price }} $</span>
              <div class="inputC">
                <input
                  class="quantityText"
                  type="number"
                  v-model.number="item.quantity"
                  @change="(e) => updateItemQuantity(item.id, e)"
                  min="1"
                />
              </div>
              <span class="wMax">{{ item.price * item.quantity }} $</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="lbSide">
            <span>Order note</span>
            <textarea name="" id="" cols="30" rows="5"></textarea>
          </div>
          <div class="rbSide">
            <div class="totalPrice">
              <span>Subtotal</span>
              <span>{{ cartTotal }} $</span>
            </div>
            <span class="shippingText"
              >Shipping, taxes, and discounts codes calculated at checkout</span
            >
            <div class="buttonContainer">
              <button class="bottomButton white">Update Basket</button>
              <button @click="checkOutHandler" class="bottomButton">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const loadingWidth = ref("0%");
let intervalId = ref(null);

const router = useRouter();

const cartStore = useCartStore();
const cartItemCount = cartStore.cartItemCount;

const checkOutHandler = () => {
  router.push({ name: "checkout" });
};

const startLoading = () => {
  loadingWidth.value = "0%";
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const currentWidth = parseFloat(loadingWidth.value);
    if (currentWidth < 100) {
      loadingWidth.value = `${currentWidth + 2}%`;
    } else {
      clearInterval(intervalId);
    }
  }, 5);
};

const resetLoading = () => {
  clearInterval(intervalId);
  loadingWidth.value = "0%";
};

const updateItemQuantity = (itemId, event) => {
  const parsedQuantity = parseInt(event.target.value, 10);
  if (!isNaN(parsedQuantity) && parsedQuantity >= 1) {
    cartStore.updateQuantity(itemId, parsedQuantity);
  } else {
    cartStore.removeFromCart(itemId);
  }
};

const cartTotal = computed(() => {
  return cartStore.cartTotal;
});
</script>

<style scoped>
.cart {
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
}

.cartTop {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0px 50px;
}

.spanContainer {
  position: relative;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
}

.hover-span {
  font-size: 16px;
  cursor: pointer;
  position: relative;
}

.underline {
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  background-color: grey;
  width: 100%;
}

.loading-bar {
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  background-color: white;
  width: 0;
  transition: width 0.4s ease;
  z-index: 1;
}

.tableCart {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  color: #fff;
}

.topTable {
  width: 40%;
  display: flex;
  align-self: flex-end;
}

.line {
  width: 100%;
  height: 1px;
  margin: 10px 0 30px;
  background-color: rgb(80, 75, 75);
}

.itemsCart {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
  border-bottom: 1px solid rgb(80, 75, 75);
}

img {
  width: 150px;
  height: 200px;
  object-fit: contain;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.itemLeft {
  width: 60%;
  display: flex;
  align-items: center;
  gap: 20px;
}

.variant {
  font-weight: 300;
}

.removeButton {
  width: 100px;
  margin-top: 20px;
  background-color: transparent;
  outline: none;
  border: 1px solid rgb(80, 75, 75);
  font-weight: 300;
  font-size: 12px;
  padding: 10px 0;
  color: #fff;
}

.itemLeftDesc {
  display: flex;
  flex-direction: column;
}

.itemRight {
  width: 40%;
  display: flex;
  align-items: center;
}

.wMin {
  width: 25%;
  text-align: end;
}

.inputC {
  width: 25%;
  text-align: end;
}

input {
  width: 70px;
  text-align: center;
  padding: 10px;
  outline: none;
  color: #fff;
  border: 1px solid rgb(80, 75, 75);
  background-color: transparent;
}

.wMax {
  width: 50%;
  text-align: end;
}

.bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
}

.lbSide {
  width: 50%;
  display: flex;
  flex-direction: column;
}

textarea {
  background-color: transparent;
  outline: none;
  border: 1px solid rgb(80, 75, 75);
}

.rbSide {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.totalPrice {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
}

.shippingText {
  font-size: 13px;
  align-self: flex-end;
}

.buttonContainer {
  display: flex;
  justify-content: space-between;
}

.bottomButton {
  position: relative;
  width: 40%;
  padding: 10px 0;
  color: #fff;
  outline: none;
  border: none;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  background-color: var(--primary);
  z-index: 1;
}

.white {
  background-color: #fff;
  color: black;
}
</style>
