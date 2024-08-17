<template>
  <div class="transaction">
    <div class="bgTransaction"></div>
    <div class="transactionContainer" ref="transactionContainer">
      <i class="bi bi-check-circle-fill"></i>
      <div class="top">
        <span>Order has been created</span>
        <span class="smaller">Order Number: {{ orderId }}</span>
        <div class="line"></div>
      </div>
      <div class="bottomInfo">
        <div class="bottomItem">
          <span class="title">Amount paid</span>
          <span class="desc">$ {{ orderPrice }}</span>
        </div>
        <div class="bottomItem">
          <span class="title">Payed by</span>
          <span class="desc">Card</span>
        </div>
      </div>
      <i class="bi bi-x-lg" @click="emitClose"></i>
      <button @click="emitClose">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  openSuccTransaction: {
    type: Boolean,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  orderPrice: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const emitClose = () => {
  emit("close");
};

const transactionContainer = ref(null);

const handleClickOutside = (event) => {
  if (
    transactionContainer.value &&
    !transactionContainer.value.contains(event.target)
  ) {
    emitClose();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.transaction {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
}

.bgTransaction {
  background-color: black;
  opacity: 0.8;
  width: 100%;
  height: 100%;
}

.transactionContainer {
  position: absolute;
  top: 50%;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: black;
  color: rgb(156, 151, 151);
  border-radius: 10px;
  border: 1px solid var(--primary);
}

.bi-check-circle-fill {
  color: green;
  font-size: 120px;
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 26px;
}

.smaller {
  font-size: 20px;
}

.line {
  margin-top: 20px;
  width: 120%;
  height: 2px;
  background-color: grey;
}

.bottomInfo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.bottomItem {
  display: flex;
  gap: 10px;
}

.title {
  font-size: 20px;
}

.desc {
  font-size: 20px;
  color: var(--primary);
}

.bi-x-lg {
  position: absolute;
  top: 20px;
  right: 25px;
  color: var(--primary);
  font-size: 36px;
  cursor: pointer;
}

button {
  margin-top: 20px;
  padding: 15px 40px;
  background-color: var(--primary);
  color: #fff;
  outline: none;
  font-weight: 600;
  font-size: 20px;
  border: none;
  border-radius: 10px;
}

@media (max-width: 800px) {
  .transactionContainer {
    width: 95%;
    height: 500px;
    gap:20px;
  }

  .bi-check-circle-fill{
    font-size: 70px;
    width: 70px;
    height: 70px;
  }

  .top {
  font-size: 20px;
}

.smaller {
  font-size: 16px;
}

.title, .desc {
  font-size: 18px;
}

.bi-x-lg {
  font-size: 26px;
}

button{
  padding: 10px 30px;;
}
}
</style>
