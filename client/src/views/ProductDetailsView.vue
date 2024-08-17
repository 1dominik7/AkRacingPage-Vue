<template>
  <div class="productDetailsContainer" v-if="item">
    <div class="productDetailsTop">
      <div class="dpLeft">
        <div class="dpLeftTitle">
          <h4>{{ item?.name }}</h4>
          <div class="dpLeftReview">
            <div class="dpLeftStarContainer" v-if="reviews?.length > 0">
              <div class="dpLeftReviewStars">
                <i
                  v-for="star in 5"
                  :key="star"
                  :class="getStarClass(averageRating, star)"
                ></i>
              </div>
            </div>
            <div class="dpLeftStarContainer" v-else>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star"></i>
            </div>
            <span
              >({{
                reviews?.length > 1
                  ? reviews?.length + " Reviews"
                  : reviews?.length + " Review"
              }})</span
            >
          </div>
          <span class="dpLeftType">{{ variantType }}</span>
          <div class="dpLeftPriceContainer">
            <span class="dpLeftPrice lineThrough" v-if="item.discount > 0"
              >{{ item?.price }},00 $</span
            >
            <span class="dpLeftPrice" v-if="item.discount > 0"
              >{{
                (item?.price * (1 - item?.discount))
                  .toFixed(2)
                  .replace(".", ",")
              }}
              $</span
            >
            <span class="dpLeftDiscount" v-if="item.discount > 0"
              >Save {{ item?.discount * 100 }}%</span
            >
            <span class="dpLeftPrice" v-else>{{ item?.price }},00 $</span>
          </div>
        </div>
        <div class="dpLeftButtons">
          <div class="dpLeftColour">
            <div class="dpLeftVariants">
              <div class="dpLeftVariantsCM" v-if="hasColour">
                <span>Colour</span>
                <select v-model="selectedColor" @change="handleColorChange">
                  <option
                    v-for="(colorObj, index) in filteredColors"
                    :key="index"
                    :value="colorObj.color"
                    :disabled="colorObj.disabled"
                  >
                    {{ colorObj.color }}
                  </option>
                </select>
              </div>
              <div class="dpLeftVariantsCM" v-if="hasMaterials">
                <span>Material</span>
                <select
                  v-model="selectedMaterial"
                  @change="handleMaterialChange"
                >
                  <option
                    v-for="(materialObj, index) in filteredMaterials"
                    :key="index"
                    :value="materialObj.material"
                    :disabled="materialObj.disabled"
                  >
                    {{ materialObj.material }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="dpLeftBuyButton" v-if="checkStock === 0">
            <i class="bi bi-cart-fill"></i>
            <span>Sold Out</span>
          </div>
          <div class="dpLeftBuyButtonStock" v-else @click="addToCart(item)">
            <i class="bi bi-cart-fill"></i>
            <span>Add To Cart</span>
          </div>
          <div
            class="dpLeftBuyButtonStock"
            v-if="user?.isAdmin"
            @click="editProductNavigator(item._id)"
          >
            <i class="bi bi-pencil-square"></i>
            <span>Edit Product</span>
          </div>
          <div
            class="dpLeftBuyButtonStock"
            v-if="user?.isAdmin"
            @click="handleDelete(item._id)"
          >
            <i class="bi bi-trash3"></i>
            <span>Delete Item</span>
          </div>
        </div>
        <div class="dpLeftDesc">
          <span
            v-for="(brief, index) in item.brief"
            :key="index"
            class="dpLeftDescInfo"
            >{{ brief }}</span
          >
        </div>
        <div class="dpLeftDetailsContainer">
          <div class="dpLeftDetail">
            <div class="dpLeftDetailDisactive">
              <div class="dpLeftDetailDisactiveTop" @click="toggleDiv(1)">
                <span>Specifications</span>
                <i
                  :class="isOpen1 ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
                ></i>
              </div>
              <transition name="fade">
                <div
                  v-show="isOpen1 || !isFirstLoad1"
                  :class="['dpLeftDetailActive', { 'margin-top': isOpen1 }]"
                  :style="contentStyle1"
                >
                  <div
                    :class="[
                      'dpLeftDetailContent',
                      { open: isOpen1 },
                      { 'margin-top': isOpen1 },
                    ]"
                  >
                    <div
                      class="dpLeftDetailContentText"
                      v-if="
                        item?.specifications?.material?.length > 0 &&
                        item?.specifications?.general.length == 0
                      "
                    >
                      <span class="detailTitle">Material</span>
                      <span
                        class="dottedText"
                        v-for="(sentence, index) in item?.specifications
                          ?.material"
                        :key="index"
                        >{{ sentence }}</span
                      >
                    </div>
                    <div
                      class="dpLeftDetailContentText"
                      v-if="
                        item?.specifications?.features?.length > 0 &&
                        item?.specifications?.general.length == 0
                      "
                    >
                      <span class="detailTitle">Features</span>
                      <span
                        class="dottedText"
                        v-for="(sentence, index) in item?.specifications
                          ?.features"
                        :key="index"
                        >{{ sentence }}</span
                      >
                    </div>
                    <div
                      class="dpLeftDetailContentText"
                      v-if="item?.specifications?.general?.length > 0"
                    >
                      <span
                        class="dottedText"
                        v-for="(sentence, index) in item?.specifications
                          ?.general"
                        :key="index"
                        >{{ sentence }}</span
                      >
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div
            class="dpLeftDetail"
            v-if="!item?.category?.includes('Accessories')"
          >
            <div class="dpLeftDetailDisactive">
              <div class="dpLeftDetailDisactiveTop" @click="toggleDiv(2)">
                <span>Measurements</span>
                <i
                  :class="isOpen2 ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
                ></i>
              </div>
              <transition name="fade">
                <div
                  v-show="isOpen2 || !isFirstLoad2"
                  :class="['dpLeftDetailActive', { 'margin-top': isOpen2 }]"
                  :style="contentStyle2"
                >
                  <div
                    :class="[
                      'dpLeftDetailContent',
                      { open: isOpen2 },
                      { 'margin-top': isOpen2 },
                    ]"
                  >
                    <img src="/images/chairStats.jpg" alt="" />
                    <div class="dpLeftDetailStats">
                      <h5>Size Recommendation</h5>
                      <span>For maximum comfort:</span>
                      <div class="dpLeftDetailStats1">
                        <span>Height: 170-200 cm</span>
                        <span>Weight: 75-175 kg</span>
                        <span>BMI: Not to exceed 45 </span>
                      </div>
                      <div class="dpLeftDetailStats2">
                        <span>Caster Size: 6 cm</span>
                        <span>Weight Capacity: 180 kg</span>
                        <span>Net Weight: 26 kg</span>
                        <span>Gross Weight: 31 kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div class="dpLeftDetail">
            <div class="dpLeftDetailDisactive">
              <div class="dpLeftDetailDisactiveTop" @click="toggleDiv(3)">
                <span>Reviews</span>
                <i
                  :class="isOpen3 ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
                ></i>
              </div>
              <transition name="fade">
                <div
                  v-show="isOpen3 || !isFirstLoad3"
                  :class="['dpLeftDetailActive', { 'margin-top': isOpen3 }]"
                  :style="contentStyle3"
                >
                  <div
                    :class="[
                      'dpLeftDetailContent',
                      { open: isOpen3 },
                      { 'margin-top': isOpen3 },
                    ]"
                  >
                    <div
                      class="dpLeftDetailReviewStatsStars"
                      v-if="reviews?.length > 0"
                    >
                      <div class="dpLeftDetailReviewDescCNameStars">
                        <i
                          v-for="star in 5"
                          :key="star"
                          :class="getStarClass(averageRating, star)"
                        ></i>
                      </div>
                      <span>{{ averageRating }} Average</span>
                      <span>{{ totalComments }} Reviews</span>
                    </div>
                    <div class="dpLeftDetailReviewTop">
                      <div class="dpLeftDetailReviewStatsStars">
                        <i
                          v-for="n in 5"
                          :key="n"
                          :class="{
                            'bi bi-star-fill': n <= newReview.rate,
                            'bi bi-star': n > newReview.rate,
                          }"
                          @click="setRating(n)"
                        ></i>
                      </div>
                      <div
                        class="dpLeftDetailReviewStatsButton"
                        @click="addReview"
                      >
                        Add Review
                      </div>
                    </div>
                    <textarea
                      placeholder="Type your review"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      v-model="newReview.description"
                    ></textarea>
                    <div class="dpLeftDetailReviewDesc">
                      <div
                        class="dpLeftDetailReviewDescC"
                        v-for="review in reviews"
                        :key="review._id"
                      >
                        <div class="dpLeftDetailReviewDescCName">
                          <span>{{ review.user.firstName }}</span>
                          <span>{{ review.user.lastName }}</span>
                          <div class="dpLeftDetailReviewDescCNameStars">
                            <i
                              v-for="n in 5"
                              :key="n"
                              :class="{
                                'bi bi-star-fill': n <= review.rating,
                                'bi bi-star': n > review.rating,
                              }"
                            ></i>
                          </div>
                        </div>
                        <div class="dpLeftDetailReviewDescCtext">
                          {{ review.comment }}
                        </div>
                        <div class="dpLeftDetailReviewDescCTime">
                          {{ timeAgo(review.createdAt) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="dpLeftMedia">
          <div class="dpLeftMediaContainer">
            <i class="bi bi-facebook"></i>
            <span>Share</span>
          </div>
          <div class="dpLeftMediaContainer">
            <i class="bi bi-twitter"></i>
            <span>Tweet</span>
          </div>
          <div class="dpLeftMediaContainer">
            <i class="bi bi-pinterest"></i>
            <span>Pin it</span>
          </div>
        </div>
      </div>
      <div class="dpRight">
        <div class="dpRightBigImage">
          <transition name="fade" mode="out-in">
            <img :src="activeImage" alt="" :key="activeImageKey" />
          </transition>
        </div>
        <div class="dpRightSmallImages">
          <img
            v-for="(image, index) in filteredImages"
            :key="index"
            :src="image"
            :class="{ active: image === activeImage }"
            @click="setActiveImage(image)"
            alt="Thumbnail view of the chair"
          />
        </div>
      </div>
    </div>
    <div class="dpRecentlyViewed" v-if="recentlyViewed.length > 0">
      <h5>Recently viewed</h5>
      <div class="dpRecentlyViewedC">
        <RecentlyViewedItems />
      </div>
    </div>
    <ConfirmationWindow
      :visible="isDialogVisible"
      message="Are you sure you want to delete this product?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import RecentlyViewedItems from "../components/RecentlyViewedItems.vue";
import {
  recentlyViewed,
  useRecentlyViewedHooks,
} from "../data/recentlyViewedUtils";
import { useAuthStore } from "@/stores/auth";
import ConfirmationWindow from "@/components/ConfirmationWindow.vue";
import { useCartStore } from "@/stores/cartStore";
import client from "../../api/client";

useRecentlyViewedHooks();

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const { user } = authStore;
const cartStore = useCartStore();

const isDialogVisible = ref(false);
const productIdToDelete = ref(null);

const isOpen1 = ref(false);
const isOpen2 = ref(false);
const isOpen3 = ref(false);

const item = ref({});
const reviews = ref();
const newReview = ref({
  description: "",
  rate: null,
});
const averageRating = ref(0);
const totalComments = ref(0);

const isFirstLoad1 = ref(true);
const isFirstLoad2 = ref(true);
const isFirstLoad3 = ref(true);

const selectedColor = ref("No Color");
const selectedMaterial = ref("No Material");
const selectedVariantId = ref(null);
const variantType = ref("");
const activeImage = ref("");
const activeImageKey = ref("");
const filteredImages = ref([]);

const timeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMs = now - past;

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }
};

const addToCart = (item) => {
  const variant = item.variants.find(
    (variant) =>
      variant.color === selectedColor.value &&
      variant.material === selectedMaterial.value
  );

  if (variant && variant.stock > 0) {
    const cartItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      color: selectedColor.value,
      material: selectedMaterial.value,
      images: filteredImages.value,
      variantId: selectedVariantId.value,
    };
    cartStore.addToCart(cartItem);
  } else {
    console.error("Selected variant is out of stock or not found.");
  }
};

const fetchItemData = async (id) => {
  try {
    const response = await client.get(`products/${id}`);

    item.value = response.data.product;
    selectedColor.value = item.value.variants[0].color;
    selectedMaterial.value = item.value.variants[0].material;
    selectedVariantId.value = item.value.variants[0]._id;
    updateImages();
  } catch (error) {
    console.error("Error fetching item:", error);
  }
};

const fetchReviews = async (id) => {
  try {
    const response = await client.get(
      `http://localhost:8800/api/reviews/${id}`
    );

    reviews.value = response.data;
    calculateAverageRating();
  } catch (error) {
    console.error("Error fetching item:", error);
  }
};

const toggleDiv = (divNumber) => {
  if (divNumber === 1) {
    isOpen1.value = !isOpen1.value;
    isFirstLoad1.value = false;
  } else if (divNumber === 2) {
    isOpen2.value = !isOpen2.value;
    isFirstLoad2.value = false;
  } else if (divNumber === 3) {
    isOpen3.value = !isOpen3.value;
    isFirstLoad3.value = false;
  }
};

const updateImages = () => {
  const variantObj = item?.value?.variants?.find(
    (variant) => variant._id === selectedVariantId.value
  );
  if (variantObj) {
    activeImage.value = variantObj.imageUrls[0];
    filteredImages.value = variantObj.imageUrls;
    variantType.value = variantObj.type || "";
  }
};

const updateURLWithVariantId = () => {
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      variantId: selectedVariantId.value,
    },
  });
};

const setActiveImage = (image) => {
  activeImage.value = image;
  activeImageKey.value = image;
};

const handleColorChange = () => {
  const variant = item.value.variants.find(
    (variant) =>
      variant.color === selectedColor.value &&
      variant.material === selectedMaterial.value
  );
  if (variant) {
    selectedVariantId.value = variant._id;
    updateImages();
    updateURLWithVariantId();
  }
};

const handleMaterialChange = () => {
  const variant = item.value.variants.find(
    (variant) =>
      variant.color === selectedColor.value &&
      variant.material === selectedMaterial.value
  );
  if (variant) {
    selectedVariantId.value = variant._id;
    updateImages();
    updateURLWithVariantId();
  }
};

const setRating = (rating) => {
  newReview.value.rate = rating;
};

const addReview = async () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: "login" });
    return;
  }

  if (!newReview.value.description || !newReview.value.rate) {
    alert("Please provide a rating and a description for your review.");
    return;
  }

  try {
    await client.post(
      `reviews/${item.value._id}`,
      newReview.value
    );

    newReview.value.description = "";
    newReview.value.rate = null;

    await fetchReviews();
  } catch (error) {
    console.error("Failed to add review:", error);
    alert("There was an error submitting your review. Please try again.");
  }
};

const editProductNavigator = (id) => {
  router.push({ name: "editProduct", params: { id } });
};

const handleDelete = (id) => {
  productIdToDelete.value = id;
  isDialogVisible.value = true;
};

const confirmDelete = async () => {
  isDialogVisible.value = false;
  await deleteProduct(productIdToDelete.value);
};

const cancelDelete = () => {
  isDialogVisible.value = false;
};

const deleteProduct = async (id) => {
  try {
    await client.delete(
      `products/${id}`
    );

    router.push({ name: "adminPanel" });
  } catch (error) {
    console.error("Error fetching item:", error);
  }
};

const contentStyle1 = computed(() => ({
  maxHeight: isOpen1.value ? "1000px" : "0px",
}));
const contentStyle2 = computed(() => ({
  maxHeight: isOpen2.value ? "1000px" : "0px",
}));
const contentStyle3 = computed(() => ({
  maxHeight: isOpen3.value ? "1000px" : "0px",
}));

const checkStock = computed(() => {
  const variantObj = item?.value?.variants?.find(
    (variant) =>
      variant?.color === selectedColor.value &&
      variant?.material === selectedMaterial.value
  );
  return variantObj?.stock;
});

const uniqueColors = computed(() => [
  ...new Set(item.value?.variants?.map((variant) => variant.color)),
]);
const uniqueMaterials = computed(() => [
  ...new Set(item.value?.variants?.map((variant) => variant.material)),
]);

const filteredColors = computed(() => {
  const materialsForColor = new Set(
    item?.value?.variants
      ?.filter((variant) => variant?.material === selectedMaterial.value)
      .map((variant) => variant.color)
  );
  return uniqueColors.value.map((color) => ({
    color,
    disabled: !materialsForColor.has(color),
  }));
});

const hasMaterials = computed(() => {
  return (
    Array.isArray(item.value.variants) &&
    item.value.variants.length > 0 &&
    item.value.variants.some((variant) => variant.material !== "No Material")
  );
});

const hasColour = computed(() => {
  return (
    Array.isArray(item.value.variants) &&
    item.value.variants.length > 0 &&
    item.value.variants.some((variant) => variant.color !== "No Color")
  );
});

const filteredMaterials = computed(() => {
  const colorsForMaterial = new Set(
    item?.value?.variants
      ?.filter((variant) => variant?.color === selectedColor.value)
      .map((variant) => variant.material)
  );
  return uniqueMaterials.value.map((material) => ({
    material,
    disabled: !colorsForMaterial.has(material),
  }));
});

const calculateAverageRating = () => {
  const totalReviews = reviews.value.length;
  const totalRating = reviews.value.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  averageRating.value = totalReviews
    ? (totalRating / totalReviews).toFixed(1)
    : 0;
  totalComments.value = totalReviews;
};

const getStarClass = (rating, index) => {
  if (index <= Math.floor(rating)) {
    return "bi bi-star-fill";
  } else if (index === Math.ceil(rating) && !Number.isInteger(rating)) {
    return "bi bi-star-half";
  } else {
    return "bi bi-star";
  }
};

onMounted(() => {
  isFirstLoad1.value = false;
  isFirstLoad2.value = false;
  isFirstLoad3.value = false;
});

onMounted(() => {
  const id = route.params.id;
  if (id) {
    fetchItemData(id);
    fetchReviews(id);
  } else {
    console.error("ID parameter is missing or invalid");
  }

  selectedVariantId.value =
    route.query.variantId || item.value.variants?.[0]?._id || null;
  updateImages();

  isFirstLoad1.value = false;
  isFirstLoad2.value = false;
  isFirstLoad3.value = false;
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchItemData(newId);
      fetchReviews(newId);
    }
  }
);

watch(
  () => route.query.variantId,
  (newVariantId) => {
    if (newVariantId && newVariantId !== selectedVariantId.value) {
      selectedVariantId.value = newVariantId;
      updateImages();
    }
  }
);

watch([selectedColor, selectedMaterial], updateImages);

watch(selectedColor, handleColorChange);
watch(selectedMaterial, handleMaterialChange);
</script>

<style scoped>
.productDetailsContainer {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.productDetailsTop {
  display: flex;
  padding: 50px 100px;
}

.dpLeft {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dpLeftTitle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #fff;
}

.dpLeftReview {
  display: flex;
  flex-direction: column;
}

.dpLeftStarContainer {
  display: flex;
  gap: 5px;
}

.dpLeftReviewStars {
  display: flex;
  gap: 5px;
}

.dpLeftReviewStars i {
  font-size: 16px;
  color: var(--primary);
}

.bi-star {
  color: var(--primary);
}

.bi-star-fill {
  color: var(--primary);
}

.dpLeftReview span {
  font-size: 12px;
}

.dpLeftPriceContainer {
  display: flex;
  gap: 15px;
  font-size: 18px;
  padding-bottom: 30px;
  border-bottom: solid 1px rgb(80, 75, 75);
}

.dpLeftPrice {
  color: var(--primary);
  letter-spacing: 1px;
}

.lineThrough {
  text-decoration: line-through;
}

.dpLeftDiscount {
  color: rgb(214, 117, 117);
}

.dpLeftButtons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;
  padding-bottom: 80px;
  color: #fff;
}

.dpLeftColour {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dpLeftColour select {
  min-width: 100px;
  padding: 10px;
  background-color: black;
  border: solid 1px var(--primary);
  color: #fff;
  cursor: pointer;
}

.dpLeftVariants {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.dpLeftVariantsCM {
  display: flex;
  gap: 10px;
  align-items: center;
}

.styled-select select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

.dpLeftBuyButton {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 30px;
  font-size: 13px;
  clip-path: polygon(2% 0%, 100% 0, 98% 100%, 0% 100%);
  background: #fff;
  cursor: pointer;
}

.bi-cart-fill,
.bi-pencil-square,
.bi-trash3 {
  color: black;
  font-size: 16px;
}

.dpLeftBuyButton span {
  color: darkgrey;
  font-size: 16px;
}

.dpLeftBuyButtonStock {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 30px;
  font-size: 13px;
  clip-path: polygon(2% 0%, 100% 0, 98% 100%, 0% 100%);
  background: var(--primary);
  cursor: pointer;
}

.dpLeftBuyButtonStock span {
  font-size: 16px;
  color: black;
}

.dpLeftDesc {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
  color: #fff;
}

.dpLeftDetailsContainer {
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 15px;
  margin-top: 30px;
}

.dpLeftDetail {
  align-items: center;
  padding-bottom: 10px;
  border-bottom: solid 1px rgb(80, 75, 75);
}

.dpLeftDetailDisactive {
  display: flex;
  flex-direction: column;
}

.dpLeftDetailDisactiveTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}

.dpLeftDetailDisactive .bi {
  color: var(--primary);
}

.dpLeftDetailDisactive span {
  font-size: 13px;
}

.dpLeftDetailActive {
  display: flex;
  flex-direction: column;
  transition: max-height 0.3s ease, margin-top 0.3s ease;
}

.dpLeftDetailActive.margin-top {
  margin-top: 10px;
}

.dpLeftDetailContent {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(50px);
  opacity: 0;
  border: solid 1px rgb(80, 75, 75);
  padding: 5px 10px;
}

.dpLeftDetailContent.open {
  transform: translateY(0);
  display: flex;
  flex-direction: column;
  gap: 20px;
  opacity: 1;
}

.dpLeftDetailContent.open > .dpLeftDetailActive {
  margin-top: 10px;
}

.dpLeftDetailContentText {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detailTitle {
  font-weight: 600;
}

.dottedText {
  display: list-item;
  list-style-type: square;
  list-style-position: inside;
}

.dpLeftDetailReviewTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}

.dpLeftDetailReviewStatsStars {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dpLeftDetailReviewStatsStars span {
  font-size: 24px;
  font-weight: normal;
  margin-left: 10px;
  color: grey;
}

.dpLeftDetailReviewStatsStars .bi-star-fill,
.dpLeftDetailReviewStatsStars .bi-star {
  color: rgb(117, 233, 117);
  font-size: 36px;
  cursor: pointer;
}

.dpLeftDetailReviewStatsButton {
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 20px 30px;
  font-size: 13px;
  clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
  background: var(--primary);
  cursor: pointer;
}

.dpLeftDetailReviewDesc {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 10px;
  background-color: rgb(242, 242, 242);
}

.dpLeftDetailReviewDescC {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background-color: #fff;
  color: black;
}

.dpLeftDetailReviewDescCName {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dpLeftDetailReviewDescCName span {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.dpLeftDetailReviewDescCNameStars {
  display: flex;
  margin-left: 10px;
}

.dpLeftDetailReviewDescCNameStars .bi {
  align-items: center;
  color: rgb(117, 233, 117);
  font-size: 24px;
}

.dpLeftDetailReviewDescCtext {
  font-size: 14px;
  font-weight: 300;
}

.dpLeftDetailReviewDescCTime {
  display: flex;
  align-self: flex-end;
  margin-top: 20px;
  padding-right: 10px;
  font-size: 13px;
  font-weight: 300;
  color: darkgrey;
}

textarea {
  padding: 10px;
}

.dpLeftMedia {
  display: flex;
  gap: 25px;
  margin-top: 50px;
  color: #fff;
}

.dpLeftMediaContainer {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dpRight {
  width: 40%;
  display: flex;
  padding: 50px;
}

.dpRightBigImage img {
  width: 100%;
}

.dpRightSmallImages {
  width: 16%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dpRightSmallImages img {
  padding: 5px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border 0.5s ease;
}

.dpRightSmallImages img.active {
  border: 2px solid #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dpRecentlyViewed {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  color: #fff;
  border-top: solid 1px rgb(80, 75, 75);
  padding: 50px 100px;
  z-index: 100;
}

.dpRecentlyViewed h5 {
  align-self: center;
}

.dpRecentlyViewedC {
  display: flex;
}

@media (max-width: 800px) {
  .productDetailsTop {
    flex-direction: column-reverse;
    padding: 20px;
  }

  .dpLeft {
    width: 100%;
  }

  .dpLeftButtons {
    padding: 20px 0;
  }

  .dpLeftDetailContent.open {
    gap: 5px;
  }

  .dpLeftDetailReviewDescCName {
    flex-wrap: wrap;
  }

  .dpLeftDetailReviewStatsStars .bi-star-fill,
  .dpLeftDetailReviewStatsStars .bi-star {
    font-size: 24px;
  }

  .dpLeftDetailReviewStatsStars span {
    font-size: 14px;
  }

  .dpLeftDesc {
    margin-top: 5px;
  }

  .dpLeftDetailReviewStatsButton {
    padding: 10px;
  }

  .dpRight {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dpRightBigImage {
    max-width: 300px;
  }

  .dpRightSmallImages {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }

  .dpRightSmallImages img {
    width: 70px;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
  .dpLeftButtons {
    padding: 20px 0;
  }

  .dpLeftDetailContent.open {
    gap: 5px;
  }

  .dpLeftDetailReviewStatsStars .bi-star-fill,
  .dpLeftDetailReviewStatsStars .bi-star {
    font-size: 26px;
  }

  .dpLeftDetailReviewStatsButton {
    padding: 10px;
  }

  .dpRight {
    padding: 20px;
  }

  .dpRightBigImage img {
    width: 220px;
  }

  .dpRightSmallImages {
    width: 70px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
