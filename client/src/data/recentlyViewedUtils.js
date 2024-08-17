import { ref, onMounted, watch, onUnmounted, computed } from "vue";

const loadRecentlyViewedFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem("recentlyViewedItems");
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Failed to load data from localStorage:", error);
    return [];
  }
};

const saveRecentlyViewedToLocalStorage = (data) => {
  try {
    localStorage.setItem("recentlyViewedItems", JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save data to localStorage:", error);
  }
};

const MAX_RECENT_ITEMS = 5;
const recentlyViewed = ref(loadRecentlyViewedFromLocalStorage());

const screenWidth = ref(window.innerWidth);

const itemsToShow = computed(() => {
  if (screenWidth.value >= 801 && screenWidth.value <= 1424) {
    return recentlyViewed.value.slice(0, 3);
  }
  return recentlyViewed.value.slice(0, MAX_RECENT_ITEMS);
});

watch(
  recentlyViewed,
  (newValue) => {
    saveRecentlyViewedToLocalStorage(newValue.slice(0, MAX_RECENT_ITEMS));
  },
  { deep: true }
);

const addItemToRecentlyViewed = (item) => {
  if (!item || !item._id) {
    console.error("Invalid item:", item);
    return;
  }

  const modifiedItem = {
    ...item,
    imageUrls: item.variants[0]?.imageUrls[0] || "",
  };

  recentlyViewed.value = recentlyViewed.value.filter((i) => i._id !== item._id);
  recentlyViewed.value.unshift(modifiedItem);

  if (recentlyViewed.value.length > MAX_RECENT_ITEMS) {
    recentlyViewed.value = recentlyViewed.value.slice(0, MAX_RECENT_ITEMS);
  }

  saveRecentlyViewedToLocalStorage(recentlyViewed.value);
};

const useRecentlyViewedHooks = () => {
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    recentlyViewed.value = loadRecentlyViewedFromLocalStorage();
    window.addEventListener("resize", updateScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateScreenWidth);
  });
};

export { recentlyViewed, addItemToRecentlyViewed, useRecentlyViewedHooks,itemsToShow  };
