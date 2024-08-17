<template>
  <div class="productsCollection">
    <div class="top">
      <span>{{ items.length }} products</span>
      <div class="filter">
        <div class="filterContainer" @click="toggleDropdown">
          <span> {{ selectedSort }}</span>
          <i class="bi bi-chevron-up" v-if="openDropdown"></i>
          <i class="bi bi-chevron-down" v-else></i>
        </div>
        <div class="dropdown" v-if="openDropdown">
          <span
            class="sort"
            v-for="(option, index) in sortOption"
            :key="index"
            @click="selectSort(option)"
            >{{ option }}</span
          >
        </div>
      </div>
    </div>
    <div class="itemsContainer">
      <div
        class="item"
        v-for="product in items"
        :key="product._id"
        @click="productNavigate(product._id)"
      >
        <span class="sale" v-if="product.discount !== null">Sale</span>
        <div
          class="noImage"
          v-if="product.variants[0].imageUrls.length === 0"
        ></div>
        <img v-else :src="product.variants[0].imageUrls[0]" alt="" />
        <span class="name">{{ product.name }}</span>
        <div class="discountPrice" v-if="product.discount !== null">
          <span class="lineThrough">{{ product.price.toFixed(2) }} $</span>
          <span>from</span>
          <span
            >{{
              (product.price - product.price * product.discount).toFixed(2)
            }}
            $</span
          >
          <span class="percent">Save {{ product.discount * 100 }}%</span>
        </div>
        <div class="price" v-else>
          <span>{{ product.price.toFixed(2) }} $</span>
        </div>
      </div>
    </div>
    <div class="lottieContainer" v-if="loading">
      <LoadingAnimation />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingAnimation from "./LoadingAnimation.vue";
import client from "../../api/client";

const route = useRoute();
const router = useRouter();

const sortOption = [
  "Sort",
  "Featured",
  "Best Selling",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];

const { name } = route.params;

const items = ref([]);
const loading = ref(false);
const openDropdown = ref(false);
const selectedSort = ref(sortOption[0]);

const toggleDropdown = () => {
  openDropdown.value = !openDropdown.value;
};

const selectSort = (item) => {
  selectedSort.value = item;
  openDropdown.value = false;
};

const productNavigate = (id) => {
  router.push({ name: "productCollection", params: {id} });
};

const fetchItemData = async () => {
  loading.value = true;
  try {
    const response = await client.get(
      `products/collection/${name}`
    );
    items.value = response.data.filteredProducts;
  } catch (error) {
    console.error("Error fetching item:", error);
  } finally {
    loading.value = false;
  }
};

watch(selectedSort, (newSort) => {
  switch (newSort) {
    case "Alphabetically, A-Z":
      items.value.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Alphabetically, Z-A":
      items.value.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "Price, low to high":
      items.value.sort((a, b) => a.price - b.price);
      break;
    case "Price, high to low":
      items.value.sort((a, b) => b.price - a.price);
      break;
    case "Date, old to new":
      items.value.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case "Date, new to old":
      items.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      break;
  }
});


onMounted(fetchItemData);
</script>

<style scoped>
.productsCollection {
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #fff;
}

.top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.filter {
  position: relative;
  min-width: 300px;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
}

.filterContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown {
  width: 100%;
  position: absolute;
  top: 50px;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 5px;
  background-color: lightgrey;
}

.sort {
  width: 100%;
  padding: 5px;
  background-color: #fff;
  color: black;
}

.sort:hover {
  background-color: grey;
  color: #fff;
}

.sort:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.sort:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.itemsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  align-items: center;
  justify-content: center;
}

.item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.sale {
  position: absolute;
  top: 0;
  right: 20px;
  background-color: var(--primary);
  padding: 5px 10px;
}

img {
  width: 300px;
  height: 350px;
  object-fit: contain;
}

.noImage {
  width: 300px;
  height: 350px;
  background-color: transparent;
}

.name {
  width: 200px;
  text-align: center;
}

.discountPrice {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--primary);
}

.percent {
  color: #ff6666;
  font-size: 15px;
}

.lineThrough {
  text-decoration: line-through;
}

.price {
  color: var(--primary);
}

.lottieContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0.8;
  background-color: black;
}

@media (max-width: 800px) {
  .productsCollection{
    padding: 20px;
  }

  .top{
    flex-direction: column-reverse;
    gap: 10px;
  }
}
</style>
