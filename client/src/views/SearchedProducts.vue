<template>
  <div class="searchContainer">
    <div class="searchWrapper">
      <h2>Search</h2>
      <div class="searchInputContainer">
        <input
          type="text"
          placeholder="Search our store"
          v-model="search"
          @keydown.enter="handleSearch"
        />
        <i class="bi bi-search" @click="handleSearch"></i>
      </div>
      <div class="productsContainer">
        <div v-if="data.length > 0" class="searchedProducts">
          <span class="result">{{ data.length }} results</span>
          <div class="products">
            <div
              class="product"
              v-for="product in data"
              :key="product._id"
              @click="navigateToItem(product)"
            >
              <img :src="product.variants[0].imageUrls[0]" alt="" />
              <span class="white">{{ product.name }}</span>
              <div class="price" v-if="product.discount !== null">
                <span class="lineThrough red"
                  >{{ product.price.toFixed(2) }} $</span
                >
                <span class="red">from</span>
                <span class="normalPrice red"
                  >{{
                    (product.price - product.price * product.discount).toFixed(
                      2
                    )
                  }}
                  $</span
                >
                <span class="percent">Save {{ product.discount * 100 }}%</span>
              </div>
              <span class="red" v-else>from {{ product.price }} $</span>
              <span class="sale" v-if="product.discount !== null">Sale</span>
            </div>
          </div>
          <div class="lottieContainer" v-if="loading">
            <LoadingAnimation />
          </div>
        </div>
        <div v-else-if="searchPerformed && data.length === 0">
          <div class="noProductResult">
            <span class="result">{{ data.length }} results</span>
            <span class="noResults"
              >Your search for "{{ searchQuery }}" did not yield any results.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingAnimation from "./LoadingAnimation.vue";
import { generateProductLink } from "@/data/generateProductLink";
import client from "../../api/client";

const route = useRoute();
const router = useRouter();

const search = ref(route.query.q || "");
const searchQuery = ref("");
const data = ref([]);
const loading = ref(true);
const searchPerformed = ref(false);

const fetchSearchProduct = async () => {
  loading.value = true;
  try {
    const res = await client.get(
      `products/search/product/${search.value}`,
      { params: { name: search.value } }
    );
    data.value = res.data;
  } catch (error) {
    console.error("Error during search:", error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  searchPerformed.value = true;
  searchQuery.value = search.value;
  router.push({ query: { q: search.value } });
  fetchSearchProduct();
};

const navigateToItem = (item) => {
  const productLink = generateProductLink(item);
  router.push(productLink);
};

onMounted(() => {
  fetchSearchProduct();
});

watch(
  () => route.query.q,
  (newQuery) => {
    search.value = newQuery;
    searchQuery.value = newQuery
    fetchSearchProduct();
  }
);
</script>

<style scoped>
.searchContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.searchWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 100px;
}

.searchInputContainer {
  position: relative;
  display: flex;
  clip-path: polygon(0% 0%, 100% 0, 95% 100%, 0% 100%);
  padding: 10px 35px;
}

input {
  height: 50px;
  width: 300px;
  outline: none;
  border: solid 1px rgb(75, 73, 73);
  background-color: transparent;
  padding: 10px;
  color: #fff;
}

.bi-search {
  position: absolute;
  height: 50px;
  top: 10px;
  right: 0;
  padding: 10px 35px;
  font-size: 20px;
  color: #fff;
  clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
  background-color: var(--primary);
  cursor: pointer;
}

.productsContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.searchedProducts {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  gap: 50px;
  border-top: 1px solid rgb(80, 75, 75);
}

.products {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 70px;
}

.product {
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  text-align: center;
  cursor: pointer;
}

.result {
  font-size: 24px;
  color: #fff;
}

img {
  width: 300px;
  height: 350px;
  object-fit: contain;
}

.price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.white {
  color: #fff;
}

.lineThrough {
  text-decoration: line-through;
}

.red {
  font-size: 15px;
  color: var(--primary);
}

.percent {
  color: rgb(214, 117, 117);
  font-size: 15px;
}

.sale {
  position: absolute;
  right: 0;
  background-color: var(--primary);
  color: #fff;
  padding: 5px 10px;
  font-size: 14px;
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

.noProductResult {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.noResults {
  color: #fff;
}

@media (max-width: 800px) {
  .searchContainer {
    min-height: 70vh;
    align-items: flex-start;
  }

  .searchWrapper {
    margin-top: 20px;
    padding: 20px;
    gap: 10px;
  }

  input {
    width: 250px;
  }

  .products {
    gap: 20px;
  }

  .product {
    align-items: center;
  }

  img {
    width: 150px;
    height: 250px;
  }
}
</style>
