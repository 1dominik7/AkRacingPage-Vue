<template>
  <div class="dpRecentlyViewedContainer">
    <swiper
      v-if="isMobile"
      :modules="[Navigation, Pagination, Scrollbar, A11y, Autoplay]"
      style="
        --swiper-pagination-color: lightgray;
        --swiper-pagination-bullet-inactive-color: gray;
        --swiper-pagination-bullet-size: 14px;
      "
      :spaceBetween="100"
      :slidesPerView="1"
      :slidesPerGroup="1"
      pagination
      :loop="false"
      class="mySwiper"
    >
      <swiper-slide v-for="item in itemsToShow" :key="item._id">
        <div class="dpRecentlyViewedItem" @click="() => navigateToItem(item)">
          <img :src="item.imageUrls" alt="" v-if="item.imageUrls" />
          <span class="dpRecentlyViewedName">{{ item.name }}</span>
          <div class="dpRecentlyViewedPrice">
            <span v-if="item.discount > 0" class="lineThrough">
              {{ item.price }} $
            </span>
            <span v-if="item.discount > 0">
              from
              {{
                (item?.price * (1 - item?.discount))
                  .toFixed(2)
                  .replace(".", ",")
              }}
              $
            </span>
          </div>
          <span class="dpRecentlyViewedTag" v-if="item.stock == 0"
            >Sold Out</span
          >
          <span class="dpRecentlyViewedTag" v-if="item.discount > 0">
            Save
            {{ (item.price - item?.price * (1 - item?.discount)).toFixed(2) }} $
          </span>
          <span v-else class="redColor"> {{ item.price }} $</span>
        </div>
      </swiper-slide>
    </swiper>
    <div
      v-else
      v-for="item in itemsToShow"
      :key="item._id"
      class="dpRecentlyViewedItem"
      @click="() => navigateToItem(item)"
    >
      <img :src="item.imageUrls" alt="" v-if="item.imageUrls" />
      <span class="dpRecentlyViewedName">{{ item.name }}</span>
      <div class="dpRecentlyViewedPrice">
        <span v-if="item.discount > 0" class="lineThrough">
          {{ item.price }} $</span
        >
        <span v-if="item.discount > 0"
          >from
          {{
            (item?.price * (1 - item?.discount)).toFixed(2).replace(".", ",")
          }}
          $</span
        >
      </div>
      <span class="dpRecentlyViewedTag" v-if="item.stock == 0">Sold Out</span>
      <span class="dpRecentlyViewedTag" v-if="item.discount > 0"
        >Save
        {{ (item.price - item?.price * (1 - item?.discount)).toFixed(2) }}
        $</span
      >
      <span v-else class="redColor"> {{ item.price }} $</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
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
import {
  itemsToShow,
  useRecentlyViewedHooks,
  recentlyViewed,
  addItemToRecentlyViewed,
} from "../data/recentlyViewedUtils";
import { useRouter } from "vue-router";

useRecentlyViewedHooks();

const router = useRouter();
const isMobile = ref(window.innerWidth <= 800);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 800;
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

const transformNameToUrl = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const generateProductLink = (item) => {
  const defaultVariant = item.variants?.find(
    (variant) =>
      variant.material === item.variants[0].material &&
      variant.color === item.variants[0].color
  );

  return {
    name: "product",
    params: {
      id: item._id,
      name: transformNameToUrl(item.name),
    },
    query: {
      variantId: defaultVariant._id,
    },
  };
};

const navigateToItem = (item) => {
  addItemToRecentlyViewed(item);
  const productLink = generateProductLink(item);
  router.push(productLink);
};

onMounted(() => {
  if (!recentlyViewed.value.length) {
    console.error("No items in recently viewed.");
  }
});
</script>

<style scoped>
.dpRecentlyViewedContainer {
  max-width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: scroll;
}

.dpRecentlyViewedItem {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;
  z-index: 999;
}

.dpRecentlyViewedItem img {
  width: 250px;
}

.dpRecentlyViewedName {
  width: 250px;
  text-align: center;
}

.dpRecentlyViewedPrice {
  display: flex;
  gap: 20px;
  color: var(--primary);
}

.lineThrough {
  text-decoration: line-through;
}

.redColor {
  color: var(--primary);
}

.dpRecentlyViewedTag {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  background-color: var(--primary);
}

@media (max-width: 800px) {
  .dpRecentlyViewedContainer {
    max-width: 100%;
  }
  .mySwiper {
    width: 300px;
    padding: 25px 0;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
}
</style>
