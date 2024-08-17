<template>
  <div class="ppBottom">
    <div
      class="premiumVideoContainer"
      v-lazy-load="loadComponent"
      :class="{ visible: componentLoaded }"
    >
      <video
        ref="videoPlayer"
        class="video"
        @play="onPlay"
        @pause="onPause"
        muted
        controls
      >
        <source src="/videoOkayama.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <i
        v-if="!isPlaying"
        @click="startVideo"
        class="bi bi-play-circle-fill"
      ></i>
    </div>
    <div class="ppBigImagesContainer">
      <img class="bgImage" src="/images/PremiumPage7.jpg" alt="" />
      <div class="ppTitle">
        <span class="brandNew">Brand New</span>
        <span class="machineTitle">
          PREMIUM
          <span class="red machineTitle">Okayama</span>
        </span>
      </div>
      <button @click="handleProductClick()">Shop now</button>
    </div>
    <div class="ppImageBottom">
      <img src="/images/PremiumPage8.jpg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { addItemToRecentlyViewed } from "@/data/recentlyViewedUtils";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import client from "../../api/client";

const router = useRouter();

const videoPlayer = ref(null);
const isPlaying = ref(false);
const componentLoaded = ref(false);
const item = ref();

const premiumId = "669bb6bf48b9e474e74436b1";

const onPlay = () => {
  isPlaying.value = true;
};

const onPause = () => {
  isPlaying.value = false;
};

const startVideo = () => {
  const video = videoPlayer.value;
  video.play();
};

const fetchItemData = async () => {
  try {
    const response = await client.get(`products/${premiumId}`);
    item.value = response.data.product;
  } catch (error) {
    console.error("Error fetching item:", error);
  }
};

const addToRecentlyViewed = (item) => {
  addItemToRecentlyViewed(item);
};

const transformNameToUrl = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const generateProductLink = () => {
  const defaultVariant = item?.value.variants?.find(
    (variant) =>
      variant.material === item.value.variants[0].material &&
      variant.color === item.value.variants[0].color
  );
  addToRecentlyViewed(item.value);
  return {
    name: "product",
    params: {
      id: item.value._id,
      name: transformNameToUrl(item.value.name),
    },
    query: {
      variantId: defaultVariant._id,
    },
  };
};

const handleProductClick = () => {
  const productLink = generateProductLink(item);
  router.push(productLink);
};

const loadComponent = () => {
  componentLoaded.value = true;
};

onMounted(() => {
  fetchItemData();
});
</script>

<style scoped>
.ppBottom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow: hidden;
  padding-bottom: 50px;
}

.premiumVideoContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  scale: 1.2;
  transition: scale 1.4s ease-in-out;
}

.premiumVideoContainer.visible {
  scale: 1;
}

.video {
  width: 100%;
  cursor: pointer;
  object-fit: cover;
}

i {
  position: absolute;
  color: var(--primary);
  cursor: pointer;
  font-size: 42px;
}

.ppBigImagesContainer {
  position: relative;
  height: 100%;
  margin-top: 50px;
}

.bgImage {
  width: 100%;
  max-height: 200vh;
  top: 0;
  left: 0;
  object-fit: contain;
  z-index: -1;
}

.ppTitle {
  position: absolute;
  top: 5%;
  left: 5%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.ppTitle .brandNew {
  font-size: 66px;
  color: grey;
}

.ppTitle .machineTitle {
  display: flex;
  flex-direction: column;
  font-size: 160px;
  color: #fff;
  letter-spacing: 4px;
  line-height: 160px;
}

.red {
  color: var(--primary) !important;
}

button {
  position: absolute;
  bottom: 9%;
  left: 6%;
  padding: 10px 30px;
  width: 200px;
  font-size: 28px;
  border: none;
  color: #fff;
  clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
  background-color: var(--primary);
}

.ppImageBottom {
  padding-left: 120px;
}

.ppImageBottom img {
  width: 50%;
}

@media (max-width: 800px) {
  .ppTitle {
    gap: 0px;
  }

  .ppTitle .brandNew {
    font-size: 30px;
  }

  .ppTitle .machineTitle {
    letter-spacing: 1px;
    font-size: 30px;
    line-height: 35px;
  }

  button {
    bottom: 2%;
    padding: 5px 10px;
    width: 120px;
    font-size: 16px;
  }

  .ppImageBottom {
    padding: 20px;
  }

  .ppImageBottom img {
    width: 100%;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
  .ppTitle {
    gap: 20px;
  }

  .ppTitle .brandNew {
    font-size: 40px;
  }

  .ppTitle .machineTitle {
    font-size: 60px;
    line-height: 60px;
  }

  button {
    bottom: 5%;
  }
}
</style>
