<template>
  <div class="rightSide">
    <div class="itemsContainer">
      <div class="item" v-for="item in cartStore.items" :key="item.id">
        <div class="imageContainer">
          <img class="itemImage" :src="item.images[0]" alt="" />
          <span class="itemQuantity">{{ item.quantity }}</span>
        </div>
        <div class="itemDesc">
          <span>{{ item.name }}</span>
          <span class="variant" v-if="item.material !== 'No Material'">{{
            item.material
          }}</span>
          <span class="variant" v-if="item.color !== 'No Color'">{{
            item.color
          }}</span>
        </div>
        <div class="price">{{ item.price.toFixed(2) }} $</div>
      </div>
    </div>
    <div class="discountContainer">
      <div class="discountWrapper">
        <div
          :class="[
            'inputContainer',
            {
              active: activeInput === 'discount',
              invalidDiscountC: !cartStore.isValidDiscount && isDiscountChecked,
            },
          ]"
          @click="setActiveInput('discount')"
          data-input="discount"
        >
          <span
            class="inputText"
            v-if="activeInput !== 'discount' && !formInfoProps.discount"
            @click.stop="setActiveInput('discount')"
            >Discount code</span
          >
          <div
            class="inputActive"
            v-if="
              activeInput === 'discount' || formInfoProps.discount.length > 0
            "
          >
            <span class="inputActiveTop">Discount code</span>
            <input
              class="inputActiveBottom"
              type="text"
              v-model="formInfoProps.discount"
              @input="handleInputChange"
              @focus="handleInputFocus('discount')"
              @blur="handleInputBlur('discount')"
            />
          </div>
        </div>
        <span
          v-if="discountMessage"
          :class="{
            discountMessage: true,
            validDiscount: cartStore.isValidDiscount,
            invalidDiscount: !cartStore.isValidDiscount,
          }"
          >{{ discountMessage }}</span
        >
      </div>
      <button
        :class="[
          'applyButton',
          {
            neutral: !isDiscountChecked,
            invalidDiscountB: !cartStore.isValidDiscount && isDiscountChecked,
          },
        ]"
        @click.stop="addDiscountCode"
      >
        Apply
      </button>
    </div>
    <div class="totalContainer">
      <div class="totalRow">
        <span>Subtotal</span>
        <span>$ {{ cartStore.cartTotal.toFixed(2) }}</span>
      </div>
      <div class="totalRow">
        <span>Shipping</span>
        <span v-if="cartStore.isValidDiscount">FREE</span>
        <span v-else>Enter shipping address</span>
      </div>
      <div class="discountActive" v-if="cartStore.isValidDiscount">
        <span class="lineThrough">$ {{ cartStore.cartTotal.toFixed(2) }}</span>
        <span>discount</span>
        <span>-{{ cartStore.discountPercentage }}%</span>
      </div>
      <div class="totalRow">
        <h5>Total</h5>
        <h5>$ {{ cartStore.discountedTotal.toFixed(2) }}</h5>
      </div>
      <span
        >Including $ {{ (0.19 * cartStore.discountedTotal).toFixed(2) }} in
        taxes</span
      >
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { nextTick, ref } from "vue";

const props = defineProps({
  formInfoProps: {
    type: Object,
    required: true,
  },
  countries: {
    type: Array,
    required: true,
  },
});

const cartStore = useCartStore();

const discountMessage = ref("");
const isDiscountChecked = ref(false);
const activeInput = ref("");

const addDiscountCode = () => {
  isDiscountChecked.value = true;
  cartStore.applyDiscount(props.formInfoProps.discount);

  if (cartStore.isValidDiscount) {
    discountMessage.value = "Discount applied!";
  } else {
    discountMessage.value = "Enter a valid discount code";
  }

  props.formInfoProps.discount = "";
};

const setActiveInput = (inputName) => {
  activeInput.value = inputName;
  nextTick(() => {
    const activeInputField = document.querySelector(
      `.inputContainer[data-input="${inputName}"] .inputActiveBottom`
    );
    if (activeInputField) activeInputField.focus();
  });
};

function handleInputFocus(inputName) {
  activeInput.value = inputName;
}

function handleInputBlur(inputName) {
  if (activeInput.value === inputName) {
    activeInput.value = "";
  }
}
</script>

<style scoped>
.rightSide {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.itemsContainer {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.itemDesc {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.itemDesc span {
  font-size: 14px;
}

.variant {
  font-weight: 300;
}

.imageContainer {
  position: relative;
  background-color: rgb(34, 32, 32);
  opacity: 0.9;
  padding: 2px;
  border: 1px solid rgb(70, 66, 66);
  border-radius: 10px;
}

.itemQuantity {
  position: absolute;
  top: -10px;
  right: -10px;
  min-width: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
  border-radius: 50%;
  color: black;
}

.itemImage {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.discountContainer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.discountWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.inputContainer {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid rgb(80, 75, 75);
  cursor: text;
  z-index: 11;
}

.inputText {
  color: rgb(80, 75, 75);
  font-size: 14px;
  font-weight: 300;
}

.inputActive {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.inputActiveBottom {
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  color: #fff;
}

.inputActiveTop {
  font-size: 13px;
  font-weight: 300;
}

.invalidDiscountC {
  border: 1px solid var(--primary);
}

.applyButton {
  width: 80px;
  height: 50px;
  padding: 0px 5px;
  outline: none;
  color: #b6afaf;
  background-color: rgb(46, 43, 43);
  border: 1px solid rgb(70, 66, 66);
  border-radius: 5px;
}

.totalContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.totalRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.totalRow span {
  font-size: 14px;
  font-weight: 300;
}

.discountActive {
  display: flex;
  align-self: flex-end;
  gap: 10px;
  color: var(--primary);
}

.lineThrough {
  text-decoration: line-through;
}

.totalContainer span {
  font-size: 14px;
  font-weight: 300;
}

.validDiscount {
  color: green;
  font-size: 14px;
  font-weight: 300;
}

.invalidDiscount {
  color: var(--primary);
  font-size: 14px;
  font-weight: 300;
}

.neutral {
  background-color: rgb(94, 89, 89);
  color: #fff;
}

.invalidDiscountB {
  background-color: var(--primary);
  color: #fff;
}

@media (max-width: 800px) {
  .rightSide {
    width: 100%;
  }

  .item {
    justify-content: center;
    gap: 10px;
  }

  .price {
    min-width: 80px;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
  .item {
    justify-content: center;
    gap: 10px;
  }

  .price {
    min-width: 100px;
  }
}
</style>
