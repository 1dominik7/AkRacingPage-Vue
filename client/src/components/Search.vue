<template>
  <div class="searchBg">
    <div class="searchBanner" ref="searchBannerRef">
      <div class="searchLeft">
        <i class="bi bi-search right" @click="searchHandler"></i>
        <input
          type="text"
          placeholder="Search our store"
          v-model="searchQuery"
          @keydown.enter="searchHandler" 
        />
      </div>
      <i @click="closeSearch" class="bi bi-x-lg"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, watch } from "vue";
import { useRouter } from "vue-router";

const searchBannerRef = ref(null);
const searchQuery = ref("");

const props = defineProps({
  toggleState: {
    type: Function,
    required: true,
  },
  searchToggle: {
    type: Boolean,
    required: true,
  },
});

const router = useRouter();

const searchHandler = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "searchedProducts", query: { q: searchQuery.value } });
  } else {
    router.push({ name: "searchedProducts", query: { q: "" } });
  }
  closeSearch();
};
const closeSearch = () => {
  props.toggleState();
};

const handleClickOutside = (event) => {
  if (searchBannerRef.value && !searchBannerRef.value.contains(event.target)) {
    closeSearch();
  }
};

const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    closeSearch();
  }
};

onMounted(() => {
  watch(
    () => props.searchToggle,
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
</script>

<style scoped>
.searchBg {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.9;
  background-color: rgb(99, 98, 98);
  z-index: 999;
}

.searchBanner {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  background: black;
  padding: 0 150px;
}

.searchLeft {
  width: 95%;
  display: flex;
  align-items: center;
  gap: 50px;
}

.bi {
  font-size: 26px;
  color: #fff;
  cursor: pointer;
}

input {
  height: 70px;
  width: 100%;
  padding: 0 10px;
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
}

@media (max-width: 800px) {
.searchBanner{
  height: 80px;
  padding: 0 50px;
}

.searchLeft{
  gap: 10px;
}
}
</style>
