<template>
  <div
    v-lazy-load="loadComponent"
    class="bannerSlide"
    :class="{ visible: componentLoaded }"
  >
    <h4>In the press</h4>
    <swiper
      v-if="componentLoaded"
      style="
        --swiper-pagination-color: lightgray;
        --swiper-pagination-bullet-inactive-color: gray;
        --swiper-pagination-bullet-size: 14px;
      "
      :space-between="50"
      :modules="[Navigation, Pagination, Scrollbar, A11y, Autoplay]"
      :slides-per-view="2"
      :slides-per-group="2"
      :loop="false"
      class="mySwiper"
      pagination
      :breakpoints="{
        800: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      }"
    >
      <swiper-slide>
        <div class="sliderItem">
          <i class="bi bi-quote"></i>
          <span>It's all in the name... The quality just does not stop...</span>
          <img src="/images/reviewedLogo.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sliderItem">
          <i class="bi bi-quote"></i>
          <span
            >They feature breathable PU leather upholstery that's guaranteed to
            last at least 5 years.</span
          >
          <img src="/images/IGNlogo.jpg" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sliderItem">
          <i class="bi bi-quote"></i>
          <span
            >These chairs are built to deliver comfort over long, hard gaming
            sessions.</span
          >
          <img src="/images/pcmaglogo.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sliderItem">
          <i class="bi bi-quote"></i>
          <span
            >The chair with the best warranty, AKRacing Core Series is also one
            of the best gaming chair for eSports players.</span
          >
          <img src="/images/digitalTrendslogo.jpg" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sliderItem">
          <i class="bi bi-quote" color="white"></i>
          <span
            >AKRacing is a well-respected brand with many great chairs under
            their belt... Because your butt deserves better.</span
          >
          <img src="/images/gamesradarlogo.jpg" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sliderItem">
          <i class="bi bi-quote"></i>
          <span
            >This high-end piece of furniture provided hours of comfort and
            looked good doing it.</span
          >
          <img src="/images/tomsguidelogo.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sliderItem">
          <i class="bi bi-quote" color="white"></i>
          <span
            >Its weighty metal frames lets you know that this is a hight-end
            chair costing hundreds of dollars. The stitching is top
            quality.</span
          >
          <img src="/images/techsportlogo.png" alt="" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

const components = {
  Swiper,
  SwiperSlide,
};

const componentLoaded = ref(false);

const loadComponent = () => {
  componentLoaded.value = true;
};
</script>

<style scoped>
.bannerSlide {
  height: 100%;
  width: 100%;
  padding: 100px 50px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.bannerSlide.visible {
  opacity: 1;
}

h4 {
  text-align: center;
  margin-bottom: 50px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.swiper-pagination-bullet-active {
  width: 30px;
  height: 30px;
}

.sliderItem {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

img {
  width: 150px;
  object-fit: contain;
  background: transparent;
}

.bi {
  font-size: 36px;
  color: #fff;
}

span {
  color: #fff;
}

@media (max-width: 800px) {
  .bannerSlide {
    padding: 20px 30px;
    margin-bottom: 20px;
  }

  .mySwiper{
    padding-bottom: 30px;
  }

  h4 {
    margin-bottom: 20px;
  }

  .sliderItem {
    font-size: 12px;
  }

  img {
    width: 100px;
  }

  .bi {
    font-size: 24px;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
  .bannerSlide {
    padding: 20px 50px;
  }
}
</style>
