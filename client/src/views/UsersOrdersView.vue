<template>
  <div class="usersOrdersContainer">
    <div class="usersOrdersWrapper">
      <div class="usersOrdersItems">
        <h2>Orders</h2>
        <div class="userOrder" v-for="order in sortedOrders" :key="order._id">
          <div class="itemInfoContainer">
            <div class="orderTop">
              <span class="orderId">Order id: {{ order._id }}</span>
              <span class="orderInfo red" @click="navigateToOrderDetails(order)"
                >Check order</span
              >
            </div>
            <div class="orderMidInfo">
              <div class="orderMidInfoItem">
                <span class="bold">Order date</span>
                <span class="normalSpan">{{
                  formatDate(order.createdAt)
                }}</span>
              </div>
              <div class="orderMidInfoItem">
                <span class="bold">Total Cost:</span>
                <span class="normalSpan"
                  >{{ order.totalPrice.toFixed(2) }} $</span
                >
              </div>
              <div class="orderMidInfoItem">
                <span class="bold">Transaction Status:</span>
                <span class="normalSpan">Paid</span>
              </div>
            </div>
            <div class="orderBottomInfo">
              <div class="orderBottomInfoLeft">
                <div class="sendStatus">
                  <span>Day shipping</span>
                  <span>{{ formatDate(order.createdAt) }}</span>
                </div>
                <div class="statusShipping">
                  <span>Track your order</span>
                  <i class="bi bi-arrow-right"></i>
                </div>
              </div>
              <div class="orderBottomInfoRight">
                <div
                  class="itemInfo"
                  v-for="(item, index) in order.products"
                  :key="index"
                >
                  <img
                    :src="item.productDetails.filteredVariants[0].imageUrls[0]"
                    alt=""
                    @click="navigateToItem(item.productDetails)"
                  />
                  <div class="sideInfo">
                    <span
                      v-if="
                        item.productDetails.filteredVariants[0].color !==
                        'No Color'
                      "
                      >Color:
                      {{ item.productDetails.filteredVariants[0].color }}</span
                    >
                    <span
                      v-if="
                        item.productDetails.filteredVariants[0].material !==
                        'No Material'
                      "
                      >Material:
                      {{
                        item.productDetails.filteredVariants[0].material
                      }}</span
                    >
                    <span class="red">Quantity: {{ item.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { generateProductLink } from "@/data/generateProductLink";
import { useAuthStore } from "@/stores/auth";
import { useOrdersStore } from "@/stores/orders";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const ordersStore = useOrdersStore();
const authStore = useAuthStore();
const router = useRouter();

const sortedOrders = computed(() => {
  return [...ordersStore.orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
});

const navigateToItem = (item) => {
  const updatedItem = {
    ...item,
    variants: item.filteredVariants,
  };

  delete updatedItem.filteredVariants;

  const productLink = generateProductLink(updatedItem);
  router.push(productLink);
};

const navigateToOrderDetails = (order) => {
  router.push({
    name: "orderDetailsView",
    params: { userId: authStore.user._id, orderId: order._id },
  });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

onMounted(() => {
  if (authStore.user && authStore.user._id) {
    ordersStore.fetchOrders(authStore.user._id);
  } else {
    console.error("User ID is not available for fetching orders.");
  }
});
</script>

<style scoped>
.usersOrdersContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.usersOrdersWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.userOrder {
  width: 100%;
  display: flex;
  gap: 30px;
  padding: 20px;
  align-items: center;
  border-top: 1px solid rgb(80, 75, 75);
}

.itemInfoContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
}

.orderTop {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.orderId {
  font-size: 18px;
  font-weight: 600;
}

.orderInfo {
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  text-decoration: none;
}

.orderInfo:hover::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: currentColor;
}

.orderMidInfo {
  display: flex;
  align-items: center;
  gap: 50px;
}

.orderMidInfoItem {
  display: flex;
  flex-direction: column;
}

.bold {
  font-weight: 600;
}

.normalSpan {
  font-size: 14px;
}

.orderBottomInfo {
  display: flex;
  gap: 30px;
}

.orderBottomInfoLeft {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.orderBottomInfoLeft span {
  font-size: 14px;
}

.sendStatus {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.statusShipping {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: var(--primary);
}

.statusShipping:hover::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: currentColor;
}

.orderBottomInfoRight {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.itemInfo {
  display: flex;
  flex-direction: column;
}

.sideInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

img {
  width: 200px;
  height: 300px;
  object-fit: contain;
  cursor: pointer;
  background-color: rgb(37, 32, 32);
}

.rightSide {
  display: flex;
  gap: 20px;
}

.shippingAddress {
  display: flex;
  flex-direction: column;
}

.priceContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.addressRow {
  display: flex;
  gap: 5px;
}

.red {
  color: var(--primary);
}

@media (max-width: 800px) {
  .usersOrdersContainer {
    width: 100%;
  }

  .usersOrdersWrapper{
    width: 100%;
  }
  
  .usersOrdersItems{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
  }

  .itemInfoContainer{
    width: 100%;
    align-items: center;
  }

  .orderTop{
    flex-direction: column;
  }

  .orderMidInfo{
    gap: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .orderMidInfoItem{
    flex-direction: row;
    gap: 5px;
    align-items: center;
  }

  .orderBottomInfo{
    flex-direction: column;
  }
}
</style>
