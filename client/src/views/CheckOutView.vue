<template>
  <div class="checkOutContainer">
    <div class="checkOutWrapper">
      <CheckoutLeftSide :formInfoProps="formInfo" :countries="countries" />
      <div class="line"></div>
      <CheckoutRightSide :formInfoProps="formInfo" :countries="countries" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import CheckoutLeftSide from "../components/CheckoutLeftSide.vue";
import CheckoutRightSide from "@/components/CheckoutRightSide.vue";

const countries = [
  "Poland",
  "Germany",
  "England",
  "United States",
  "Spain",
  "Italy",
  "The Czech Republic",
];

const formInfo = reactive({ country: "--Select country", discount: "" });
</script>

<style scoped>
.checkOutContainer {
  display: flex;
  justify-content: center;
}

.checkOutWrapper {
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 40px 0;
  color: #fff;
  border-top: 1px solid rgb(70, 66, 66);
}

.line {
  background-color: rgb(70, 66, 66);
  width: 1px;
  height: 100%;
}

@media (max-width: 800px) {
  .checkOutWrapper {
    width: 90%;
    flex-direction: column-reverse;
    gap: 25px;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
  .checkOutWrapper {
    width: 90%;
    gap: 25px;
  }
}
</style>
