<template>
  <div class="orderDetailsContainer">
    <div v-if="order" class="orderDetailsView">
      <div class="orderDetailsTop">
        <h3>Order number:</h3>
        <h3>{{ order._id }}</h3>
        <div class="orderDetailsTopB">
          <div class="orderDetailsTopRow">
            <span class="bold">Order date</span>
            <span class="normalSpan">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="orderDetailsTopRow">
            <span class="bold">Payment method</span>
            <span class="normalSpan">Fast transfer</span>
          </div>
        </div>
      </div>
      <h3 class="shippingTitle">
        Shipment on {{ formatDate(order.createdAt) }}
      </h3>
      <div
        class="orderItems"
        v-for="item in order.products"
        :key="item._id"
        @click="navigateToItem(item.productDetails)"
      >
        <div class="leftSide">
          <img
            :src="item.productDetails.filteredVariants[0].imageUrls[0]"
            alt=""
          />
          <div class="leftSideDesc">
            <span>{{ item.productDetails.name }}</span>
            <span>{{ item.productDetails.filteredVariants[0].type }}</span>
            <span
              v-if="
                item.productDetails.filteredVariants[0].color !== 'No Color'
              "
              >Color: {{ item.productDetails.filteredVariants[0].color }}</span
            >
            <span
              v-if="
                item.productDetails.filteredVariants[0].material !==
                'No Material'
              "
              >Material:
              {{ item.productDetails.filteredVariants[0].material }}</span
            >
          </div>
        </div>
        <div class="rightSide">{{ item.productDetails.price }} $</div>
      </div>
      <div class="orderDetailsBottom">
        <h2>Total price</h2>
        <div class="totalPriceDetails">
          <div class="totalPriceDetailsRow">
            <span class="normalSpan">Value of products:</span>
            <span class="normalSpan"
              >{{
                (order.totalPrice / (1 - order.discount / 100)).toFixed(2)
              }}
              $</span
            >
          </div>
          <div class="totalPriceDetailsRow" v-if="order.discount !== ''">
            <span class="normalSpan">Discount code:</span>
            <span class="normalSpan"
              >- {{ (order.discount / 100) * order.totalPrice }} $</span
            >
          </div>
          <div class="totalPriceDetailsRow" v-if="order.discount !== ''">
            <span class="bold">Total price:</span>
            <span class="bold">
              {{ order.totalPrice.toFixed(2) }}
              $</span
            >
          </div>
          <div class="totalPriceDetailsRow" v-else>
            <span class="bold">Total price:</span>
            <span class="bold"> {{ order.totalPrice.toFixed(2) }} $</span>
          </div>
          <div class="totalPriceDetailsRow">
            <span class="normalSpan">(Total cost includes VAT)</span>
          </div>
        </div>
      </div>
      <div class="addressDetails">
        <h2>Delivery address</h2>
        <div class="addressDetailsInfo">
          <div class="addressRow">
            <span>{{ order.shippingAddress.firstName }}</span>
            <span>{{ order.shippingAddress.lastName }}</span>
          </div>
          <div class="addressRow">
            <span>{{ order.shippingAddress.address }},</span>
            <span>{{ order?.shippingAddress?.optional }}</span>
          </div>
          <div class="addressRow">
            <span>{{ order.shippingAddress.postalCode }},</span>
            <span>{{ order.shippingAddress.city }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { generateProductLink } from "@/data/generateProductLink";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import client from "../../api/client";

const route = useRoute();
const router = useRouter();
const { orderId } = route.params;
const { userId } = route.params;

const order = ref(null);

const navigateToItem = (item) => {
  const updatedItem = {
    ...item,
    variants: item.filteredVariants,
  };

  delete updatedItem.filteredVariants;

  const productLink = generateProductLink(updatedItem);
  router.push(productLink);
};

const fetchData = async () => {
  try {
    const res = await client.get(
      `orders/order/${userId}/${orderId}`
    );
    order.value = res.data.order;
  } catch (error) {
    console.error("Error getting order by id:", error);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.orderDetailsContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.orderDetailsView {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 50px 100px;
}

.orderDetailsTop {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding-bottom: 30px;
  border-bottom: 1px solid rgb(80, 75, 75);
}

.orderDetailsTopRow {
  display: flex;
  flex-direction: column;
}

.orderDetailsTopB {
  display: flex;
  gap: 100px;
  margin-top: 50px;
}

.shippingTitle {
  align-self: flex-start;
}

.orderItems {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
  cursor: pointer;
}

h3 {
  padding: 0;
  margin: 0;
}

.normalSpan {
  font-weight: 300;
  font-size: 15px;
}

.leftSide {
  display: flex;
  gap: 30px;
}

.leftSideDesc {
  display: flex;
  flex-direction: column;
}

.bold {
  font-weight: 600;
  font-size: 20px;
}

img {
  width: 150px;
  height: 200px;
  object-fit: contain;
}

.orderDetailsBottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
  border-top: 1px solid rgb(80, 75, 75);
  border-bottom: 1px solid rgb(80, 75, 75);
}

.totalPriceDetails {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.totalPriceDetailsRow {
  display: flex;
  gap: 5px;
}

.addressDetails {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

.addressDetailsInfo {
  display: flex;
  flex-direction: column;
}

.addressRow {
  display: flex;
  gap: 5px;
}
</style>
