<template>
  <div class="cartSliderContainer">
    <div class="cartOverlay"></div>
    <div
      class="cartRight"
      ref="searchBannerRef"
      :class="{ visible: isCartOpen }"
    >
      <div class="cartContainer">
        <i @click="closeBasket" class="bi bi-x-lg"></i>
        <div class="topCartItem">
          <div class="topCartItemTitle">
            <span class="biggerSpan borderRight" @click="searchNavigation"
              >2024 NEW PRODUCTS</span
            >
            <i
              class="bi bi-chevron-down"
              v-if="!openNewProducts"
              @click.stop="toggleNewProducts"
            ></i>
            <i
              class="bi bi-chevron-up borderBottom"
              v-else
              @click.stop="toggleNewProducts"
            ></i>
          </div>
          <transition
            name="slide-from-bottom"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <div class="newProductDropdown" v-if="openNewProducts">
              <router-link
                class="text-white"
                to="/pages/okayama"
                @click="closeBasket"
                >Premium Okayama</router-link
              >
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
          </transition>
        </div>
        <div class="itemColumn">
          <div class="itemRowTop" @click.stop="toggleProducts">
            <span class="biggerSpan">Products</span>
            <i class="bi bi-chevron-down" v-if="!openProduct"></i>
            <i class="bi bi-chevron-up" v-else></i>
          </div>
          <transition
            name="slide-from-bottom"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <div class="itemRowBottom" v-if="openProduct">
              <div
                class="navMidProdItems"
                v-for="(category, index) in categories"
                :key="index"
                @click.stop="toggleCategory(category.path)"
              >
                <div class="itemTop">
                  <span>{{ category.name }}</span>
                  <i
                    class="bi bi-chevron-down"
                    v-if="!categoryState[category.path]"
                  ></i>
                  <i class="bi bi-chevron-up" v-else></i>
                </div>
                <transition
                  name="slide-from-bottom"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @leave="leave"
                >
                  <div v-if="categoryState[category.path]" class="itemBottom">
                    <div
                      class="routerLinkContainer"
                      v-for="item in filteredItems(category.path)"
                      :key="item.id"
                    >
                      <div
                        class="text-white"
                        @click="() => navigateToItem(item)"
                      >
                        {{ getItemDisplayName(item, category) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </transition>
        </div>
        <div class="item">
          <router-link
            @click="closeBasket"
            class="biggerSpan"
            to="/pages/register-affiliate-account"
            >Community</router-link
          >
        </div>
        <div class="itemColumn special" @click.stop="toggleSupport">
          <div class="itemRowTop">
            <span class="biggerSpan">Support</span>
            <i class="bi bi-chevron-down" v-if="!openSupport"></i>
            <i class="bi bi-chevron-up" v-else></i>
          </div>
          <transition
            name="slide-from-bottom"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <div class="itemRowBottom" v-if="openSupport">
              <div class="navMidProdItems">
                <div
                  class="itemTop supportLeft"
                  @click.stop="toggleSupportSection('productHelp')"
                >
                  <span>Product Help</span>
                  <i
                    class="bi bi-chevron-down"
                    v-if="!supportState.productHelp"
                  ></i>
                  <i class="bi bi-chevron-up" v-else></i>
                </div>
                <transition
                  name="slide-from-bottom"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @leave="leave"
                >
                  <div class="itemBottom" v-if="supportState.productHelp">
                    <router-link
                      class="text-white"
                      to="/pages/assembly-instructions"
                      @click="closeBasket"
                      >Assembly Instructions</router-link
                    >
                    <router-link
                      class="text-white"
                      to="/pages/product-registration"
                      @click="closeBasket"
                      >Product Registration</router-link
                    >
                  </div>
                </transition>
              </div>
              <div class="navMidProdItems">
                <div
                  class="itemTop"
                  @click.stop="toggleSupportSection('orderHelp')"
                >
                  <span>Order Help</span>
                  <i
                    class="bi bi-chevron-down"
                    v-if="!supportState.orderHelp"
                  ></i>
                  <i class="bi bi-chevron-up" v-else></i>
                </div>
                <transition
                  name="slide-from-bottom"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @leave="leave"
                >
                  <div class="itemBottom" v-if="supportState.orderHelp">
                    <span class="text-white">Track Order</span>
                    <router-link
                      @click="closeBasket"
                      class="text-white"
                      to="/pages/returns-exchanges-policy"
                      >Returns and Refunds</router-link
                    >
                    <router-link
                      @click="closeBasket"
                      class="text-white"
                      to="/pages/warranty-policy"
                      >Warranty Information</router-link
                    >
                  </div>
                </transition>
              </div>
            </div>
          </transition>
        </div>
        <div class="item">
          <router-link
            @click="closeBasket"
            to="/pages/about-us"
            class="biggerSpan"
            >About Us</router-link
          >
        </div>
        <div class="item">
          <router-link
            @click="closeBasket"
            to="/pages/contact-us"
            class="biggerSpan"
            >Contact</router-link
          >
        </div>
        <div class="itemRow special">
          <router-link
            @click="closeBasket"
            to="/pages/where-to-buy"
            class="biggerSpan"
            >Where to buy</router-link
          >
        </div>
        <div class="cartBottom">
          <div class="leftSide">
            <span class="contact"
              >Customer Support: +312222222 | M-F 9:00 - 17:00 CET</span
            >
            <router-link
            @click="closeBasket"
            to="/login"
            class="biggerSpan"
            >Log in</router-link
          >
          </div>
          <div class="rightSide">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-linkedin"></i>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-youtube"></i>
            </a>
            <a
              href="https://www.twitch.tv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-twitch"></i>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-discord"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { generateProductLink } from "@/data/generateProductLink";
import { addItemToRecentlyViewed } from "@/data/recentlyViewedUtils";
import {  onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import client from "../../api/client";

const router = useRouter();

const supportState = ref({
  productHelp: false,
  orderHelp: false,
});

const { sideMenuToggle, openSideMenu } = defineProps([
  "sideMenuToggle",
  "openSideMenu",
]);

const categories = ref([
  { path: "core-series", name: "Core Series" },
  { path: "masters-series", name: "Masters Series" },
  { path: "office-series", name: "Office Series" },
  { path: "limited-series", name: "Limited Series" },
  { path: "accessories", name: "Accessories" },
]);

const searchBannerRef = ref(null);
const isCartOpen = ref(false);
const openNewProducts = ref(false);
const openProduct = ref(false);
const openSupport = ref(false);
const items = ref([]);
const categoryState = ref({});

categories.value.forEach((category) => {
  categoryState.value[category.path] = false;
});

const toggleCategory = (path) => {
  categoryState.value[path] = !categoryState.value[path];
};

const toggleNewProducts = () => {
  openNewProducts.value = !openNewProducts.value;
};

const toggleProducts = () => {
  openProduct.value = !openProduct.value;
};

const toggleSupport = () => {
  openSupport.value = !openSupport.value;
};

const toggleSupportSection = (section) => {
  supportState.value[section] = !supportState.value[section];
};

const closeBasket = () => {
  openSideMenu(false);
};

const searchNavigation = () => {
  router.push({ name: "searchedProducts" });
  openSideMenu(false);
};

const beforeEnter = (el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
};

const enter = (el, done) => {
  el.offsetHeight;
  el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  el.style.opacity = 1;
  el.style.transform = "translateY(0)";
  done();
};

const leave = (el, done) => {
  el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.addEventListener("transitionend", done, { once: true });
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

const getProducts = async () => {
  try {
    const res = await client.get("products");
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
  closeBasket();
};

onMounted(() => {
  getProducts();
});

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

onMounted(() => {
  watch(
    () => sideMenuToggle,
    (newVal) => {
      if (newVal) {
        setTimeout(() => {
          document.addEventListener("click", handleClickOutside);
          document.addEventListener("keydown", handleEscapeKey);
        }, 0);
      } else {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
      }
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscapeKey);
});

onMounted(() => {
  if (sideMenuToggle) {
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
}

.cartOverlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(99, 98, 98, 0.9);
}

.cartRight {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -300px;
  padding: 20px 0px;
  background: black;
  transition: all 1s ease-in-out;
  color: #fff;
  overflow-y: scroll;
}

.cartRight.visible {
  right: 0px;
}

.cartContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.topCartItem {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(80, 75, 75);
  border-bottom: 1px solid rgb(80, 75, 75);
}

.topCartItemTitle {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.bi-x-lg {
  padding: 0px 20px;
  align-self: flex-end;
  font-size: 24px;
  cursor: pointer;
}

.biggerSpan {
  width: 80%;
  font-size: 20px;
  padding: 15px;
  text-decoration: none;
  color: #fff;
}

.borderRight {
  border-right: 1px solid rgb(80, 75, 75);
}

.borderBottom {
  border-bottom: 1px solid rgb(80, 75, 75);
  margin-bottom: -5px;
}

.bi-chevron-up,
.bi-chevron-down {
  width: 20%;
  padding: 15px;
  text-align: center;
}

.newProductDropdown {
  display: flex;
  flex-direction: column;
  padding: 5px 15px 15px;
  gap: 10px;
  opacity: 1;
  overflow: hidden;
}

.slide-from-bottom-enter-active,
.slide-from-bottom-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-from-bottom-enter,
.slide-from-bottom-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.slide-from-bottom-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.itemRow {
  width: 100%;
  display: flex;
}

.itemColumn {
  display: flex;
  flex-direction: column;
}

.itemRowTop {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.itemRowBottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px 5px;
  cursor: pointer;
  gap: 5px;
}

.navMidProdItems {
  display: flex;
  flex-direction: column;
}

.navMidProdItems .bi {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(80, 75, 75);
  width: 30px;
  height: 30px;
}

.itemTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.newProdActive {
  cursor: pointer;
}

.special {
  border-top: 1px solid rgb(80, 75, 75);
  border-bottom: 1px solid rgb(80, 75, 75);
  cursor: pointer;
}

.cartBottom {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}

.leftSide {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.contact {
  width: 60%;
  font-size: 14px;
}

.rightSide {
  display: flex;
  flex-wrap: wrap;
}

.route,
.item {
  cursor: pointer;
}

.rightSide a {
  padding: 10px 30px;
  border: 1px solid rgb(80, 75, 75);
  font-size: 24px;
  cursor: pointer;
  color: #fff;
}

.itemBottom {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0 10px 15px;
}

.text-white {
  font-weight: 300;
}
</style>
