<template>
  <header id="home">
    <div class="top">
      <div class="leftSide">
        <span>Customer Support: +312222222 | M-F 9:00 - 17:00 CET</span>
      </div>
      <div class="rightSide">
        <i class="bi bi-facebook"></i>
        <i class="bi bi-twitter"></i>
        <i class="bi bi-instagram"></i>
        <i class="bi bi-linkedin"></i>
        <i class="bi bi-youtube"></i>
        <i class="bi bi-twitch"></i>
        <i class="bi bi-discord"></i>
      </div>
    </div>
    <div class="nav">
      <RouterLink to="/">
        <img src="/images/logo.jpg" alt="" />
      </RouterLink>
      <div class="navMid">
        <div class="navMidSpan newProd">
          <span class="newProdSpan">2024 NEW PRODUCTS</span>
          <div class="dropdown">
            <div class="newProdActive">
              <router-link class="text-white" to="/pages/okayama"
                >Premium Okayama</router-link
              >
            </div>
            <div
              class="newProdActive"
              v-for="item in items.slice(0, 1)"
              :key="item.id"
            >
              <div
                v-if="item.category.includes('new-product')"
                class="text-white"
                @click="() => navigateToItem(item)"
              >
                {{ item.shortcut }}
              </div>
            </div>
          </div>
        </div>
        <div class="products">
          <span class="productsSpan">Products</span>
          <div class="dropdownProducts">
            <div class="productsItems">
              <div
                class="navMidProdItems"
                v-for="(category, index) in categories"
                :key="index"
              >
                <div class="itemTop">{{ category.name }}</div>
                <div
                  class="routerLinkContainer"
                  v-for="item in filteredItems(category.path)"
                  :key="item.id"
                >
                  <div class="text-white" @click="() => navigateToItem(item)">
                    {{ getItemDisplayName(item, category) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-link
          class="spanAlone text-white"
          to="/pages/register-affiliate-account"
          >Community</router-link
        >
        <div class="products">
          <span class="productsSpan">Support</span>
          <div class="dropdownProducts supportContainer">
            <div class="support">
              <div class="navMidProdItems">
                <div class="itemTop supportLeft">Product Help</div>
                <router-link
                  class="text-white"
                  to="/pages/assembly-instructions"
                  >Assembly Instructions</router-link
                >
                <router-link class="text-white" to="/pages/product-registration"
                  >Product Registration</router-link
                >
              </div>
              <div class="navMidProdItems">
                <div class="itemTop">Order Help</div>
                <span>Track Order</span>
                <router-link
                  class="text-white"
                  to="/pages/returns-exchanges-policy"
                  >Returns and Refunds</router-link
                >
                <router-link class="text-white" to="/pages/warranty-policy"
                  >Warranty Information</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <router-link to="/pages/about-us" class="spanAlone text-white"
          >About Us</router-link
        >
        <router-link to="/pages/contact-us" class="spanAlone text-white"
          >Contact</router-link
        >
        <router-link to="/pages/where-to-buy" class="spanAlone text-white"
          >Where to buy</router-link
        >
      </div>
      <div class="navRight">
        <i @click="loginNavigation" class="bi bi-person right"></i>
        <i class="bi bi-list right" @click="openSideMenu"></i>
        <i @click="toggleState" class="bi bi-search right"></i>
        <i
          @click="toggleCartState"
          class="bi bi-bag right"
          v-if="cartItemCount === 0"
        ></i>
        <div class="cartContainer" @click="toggleCartState" v-else>
          <i class="bi bi-bag-fill right"></i>
          <div class="cartQuantity"></div>
        </div>
      </div>
    </div>
    <div class="redLine">
      <swiper
        :modules="[Navigation, Pagination, Scrollbar, A11y, Autoplay]"
        :slides-per-view="1"
        class="mySwiper"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
      >
        <swiper-slide>
          <span
            >ULTIMATE CLEARANCE | Up to 60% Off Select Models
            <a href="" class="link"
              >| Click Here to Shop Sale Collection</a
            ></span
          >
        </swiper-slide>
        <swiper-slide>
          <span
            >Lowest Price On Our Classic Best-Seller, EX Black
            <a href="" class="link">| LIMITED TO STOCK ON HAND! $179!!</a></span
          >
        </swiper-slide>
        <swiper-slide>
          <span
            >One Size Doesn't Fit All.
            <a href="" class="link"
              >Find the perfect fit in our Size Chart.</a
            ></span
          >
        </swiper-slide>
      </swiper>
    </div>
    <search
      v-if="searchToggle"
      :toggle-state="toggleState"
      :search-toggle="searchToggle"
    />
    <CartSlider
      v-if="cartToggle"
      :cartToggle="cartToggle"
      :toggleCartState="toggleCartState"
    />
    <SideMenu
      v-if="sideMenuToggle"
      :sideMenuToggle="sideMenuToggle"
      :openSideMenu="openSideMenu"
    />
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { addItemToRecentlyViewed } from "@/data/recentlyViewedUtils";
import { useRouter } from "vue-router";
import Search from "./Search.vue";
import CartSlider from "./CartSlider.vue";
import { useCartStore } from "@/stores/cartStore";
import { generateProductLink } from "@/data/generateProductLink";
import SideMenu from "./SideMenu.vue";
import client from "../../api/client";

const components = {
  Swiper,
  SwiperSlide,
};
const router = useRouter();

const items = ref([]);
const searchToggle = ref(false);
const cartToggle = ref(false);
const sideMenuToggle = ref(false);
const categories = ref([
  { path: "core-series", name: "Core Series" },
  { path: "masters-series", name: "Masters Series" },
  { path: "office-series", name: "Office Series" },
  { path: "limited-series", name: "Limited Series" },
  { path: "accessories", name: "Accessories" },
]);

const cartStore = useCartStore();

const toggleState = () => {
  searchToggle.value = !searchToggle.value;
};

const toggleCartState = () => {
  cartToggle.value = !cartToggle.value;
};

const openSideMenu = () => {
  sideMenuToggle.value = !sideMenuToggle.value;
};

const filteredItems = (category) => {
  return items.value
    .filter((item) => item.category.includes(category))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
};

const loginNavigation = () => {
  router.push({ name: "login" });
};

const getProducts = async () => {
  try {
    const res = await client.get("products");
    if (res.status !== 201) {
      throw new Error("Network response was not ok");
    }
    items.value = res.data.products;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

const getItemDisplayName = (item, category) => {
  if (item.shortcut === "California" && category.path === "office-series") {
    return "Ojai";
  }
  return item.shortcut;
};

const navigateToItem = (item) => {
  addItemToRecentlyViewed(item);
  const productLink = generateProductLink(item);
  router.push(productLink);
};

const cartItemCount = computed(() => cartStore.cartItemCount);

onMounted(() => {
  getProducts();
});
</script>

<style scoped>
header {
  width: 100%;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 120px;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  border-bottom: solid 0.5px rgb(78, 77, 77);
}

.rightSide {
  display: flex;
  gap: 15px;
}

.bi {
  cursor: pointer;
}

.nav {
  position: relative;
  display: flex;
  padding: 30px 120px;
  align-items: center;
  justify-content: space-between;
}

img {
  cursor: pointer;
  z-index: 10;
}

.newProdSpan {
  padding: 0px 15px;
}

.navMid {
  display: flex;
  align-items: center;
  gap: 30px;
  color: #fff;
  z-index: 25;
}

.navMidSpan {
  cursor: pointer;
  transition: all 0.5s ease;
}

.navMidSpan:after {
  transition: all ease-in-out 0.5s;
  background: none repeat scroll 0 0 #ffffff;
  content: "";
  display: block;
  position: absolute;
  left: 11%;
  height: 2px;
  width: 0px;
}

.navMidSpan:hover:after {
  width: 78%;
  background: #fff;
}

.newProd {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 19px;
  visibility: hidden;
  padding: 5px 0px;
  background: transparent;
  width: 200px;
  z-index: 999;
}

.newProd:hover .dropdown {
  top: 25px;
  visibility: visible;
  background: transparent;
  transition: all 0.5s ease;
}

.products {
  position: static;
  cursor: pointer;
}

.productsSpan {
  position: relative;
  cursor: pointer;
}

.productsSpan::before,
.productsSpan::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: -4px;
  background: #fff;
  transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.productsSpan::before {
  left: 11%;
}

.products:hover .productsSpan::before {
  background: #fff;
  width: 78%;
  transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.dropdownProducts {
  position: absolute;
  display: block;
  top: 70px;
  left: 0;
  visibility: hidden;
  padding: 5px 0px;
  min-width: 100%;
  transition: all 0.6s ease-in-out;
  z-index: 10000;
}

.products:hover .dropdownProducts {
  height: 100%;
  top: 50px;
  visibility: visible;
  padding: 20px 0px;
}

.products:hover .dropdownProducts::after {
  padding: 20px 0px;
}

.newProdActive {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--bgColor);
  z-index: 99;
  padding: 10px 10px;
}

.navRight {
  display: flex;
  align-items: center;
  gap: 30px;
  color: #fff;
}

.cartContainer {
  position: relative;
}

.bi-list {
  display: none;
}

.cartQuantity {
  position: absolute;
  bottom: 0px;
  right: -5px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  border-radius: 50%;
}

.right {
  font-size: 26px;
}

.bi-person {
  font-size: 32px;
}

.productsItems {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  background: var(--bgColor);
  z-index: 99;
  padding: 30px;
}

.products:hover .navMidProdItems:nth-child(1) {
  animation: opacityOn 0.1s ease;
  transform: translateY(0px);
}

.products:hover .navMidProdItems:nth-child(2) {
  animation: opacityOn 0.2s ease;
  transform: translateY(0px);
}

.products:hover .navMidProdItems:nth-child(3) {
  animation: opacityOn 0.2s ease;
  transform: translateY(0px);
}

.products:hover .navMidProdItems:nth-child(4) {
  animation: opacityOn 0.2s ease;
  transform: translateY(0px);
}

.products:hover .navMidProdItems:nth-child(5) {
  animation: opacityOn 0.2s ease;
  transform: translateY(0px);
}

.navMidProdItems {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-weight: 500;
  transform: translateY(50px);
}

.navMidProdItems:nth-child(1) {
  transition: all 0.2s ease;
}

.navMidProdItems:nth-child(2) {
  transition: all 0.3s ease;
}

.navMidProdItems:nth-child(3) {
  transition: all 0.4s ease;
}

.navMidProdItems:nth-child(4) {
  transition: all 0.5s ease;
}

.navMidProdItems:nth-child(5) {
  transition: all .6s ease;
}

.itemTop {
  font-size: 12px;
}

.text-white {
  font-size: 15px;
}

.redLine {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  background: var(--primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.link {
  text-decoration: underline;
  color: #fff;
}

.spanAlone {
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease;
}

.spanAlone:after {
  transition: all ease-in-out 0.5s;
  background: none repeat scroll 0 0 #ffffff;
  content: "";
  display: block;
  position: absolute;
  left: 11%;
  height: 2px;
  width: 0px;
}

.spanAlone:hover:after {
  width: 76%;
  background: #fff;
}

.newProd {
  position: relative;
}

.support {
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: center;
  background: var(--bgColor);
  z-index: 99;
  padding: 30px;
}

.supportLeft {
  padding-right: 200px;
}

.swiper {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 10;
  cursor: pointer;
}

.swiper-slide {
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

@keyframes opacityOn {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 800px) {
  .top {
    display: none;
  }

  .nav {
    padding: 10px 20px;
  }

  img {
    width: 150px;
  }

  .navMid {
    display: none;
  }

  .navRight {
    gap: 15px;
  }

  .bi-list,
  .bi-person {
    display: block;
    font-size: 26px;
  }

  .bi-search,
  .bi-bag {
    font-size: 20px;
  }

  .redLine {
    display: none;
  }
}

@media (min-width: 801px) and (max-width: 1024px) {
  .top {
    padding: 5px 60px;
  }

  .rightSide {
    gap: 10px;
  }

  .nav {
    padding: 30px 40px;
  }

  img {
    width: 150px;
  }

  .navMid {
    display: none;
  }

  .bi-list,
  .bi-person {
    display: block;
    font-size: 26px;
  }

  .mySwiper span {
    font-size: 12px;
  }
}

@media (min-width: 1025px) and (max-width: 1424px) {
  .top {
    padding: 5px 60px;
  }

  .rightSide {
    gap: 10px;
  }

  .nav {
    padding: 20px 30px;
  }

  .navMid {
  gap: 15px;
}

.navRight {
  gap: 20px;
}

  img {
    width: 150px;
  }

  .mySwiper span {
    font-size: 12px;
  }
}
</style>
