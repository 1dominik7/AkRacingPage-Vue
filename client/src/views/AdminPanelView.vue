<template>
  <div class="adminPanel">
    <h1>Admin Panel</h1>
    <div class="adminPanelWrapper">
      <button @click="addProductNavigation()">Add Product</button>
      <div class="adminPanelItems">
        <div
          class="adminPanelItem"
          v-for="item in items"
          :key="item._id"
          @click="() => navigateToItem(item)"
        >
          <img :src="item?.variants[0]?.imageUrls[0]" alt="" />
          <div class="details">
            <span>{{ item.shortcut }}</span>
            <span class="lineThrough" v-if="item.discount > 0"
              >{{ item.price }} $</span
            >
            <span class="red" v-if="item.discount > 0"
              >{{
                (item.price - item.price * item.discount).toFixed(2)
              }}
              $</span
            >
            <span v-else class="red">{{ item.price }} $</span>
            <span>{{ item?.category?.join(", ") }}</span>
          </div>
          <div class="details">
            <div
              class="variantInfo"
              v-for="variant in item.variants"
              :key="variant._id"
            >
              <span v-if="variant.color !== 'No Color'"
                >Color: {{ variant.color }}</span
              >
              <span v-if="variant.material !== 'No Material'"
                >Material: {{ variant.material }}</span
              >
              <span class="red">Stock: {{ variant.stock }}</span>
            </div>
          </div>
          <div class="details">
            <button @click="(e) => handleEdit(item._id, e)">Edit</button>
            <button @click="(e) => handleDelete(item._id, e)">Delete</button>
          </div>
        </div>
        <div class="lottieContainer" v-if="loading">
          <LoadingAnimation />
        </div>
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
import { onMounted, ref } from "vue";
import LoadingAnimation from "./LoadingAnimation.vue";
import { addItemToRecentlyViewed } from "@/data/recentlyViewedUtils";
import { useRouter } from "vue-router";
import ConfirmationWindow from "@/components/ConfirmationWindow.vue";
import client from "../../api/client";

const items = ref([]);
const loading = ref(false);
const router = useRouter();

const isDialogVisible = ref(false);
const productIdToDelete = ref(null);


const getProducts = async () => {
  loading.value = true;
  try {
    const response = await client.get(`products`);

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }
    items.value = response.data.products;
  } catch (error) {
    console.error("Error fetching item:", error);
  } finally {
    loading.value = false;
  }
};

const addProductNavigation = () => {
  router.push({ name: "addProduct" });
};

const transformNameToUrl = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const generateProductLink = (item) => {
  const defaultVariant = item?.variants?.find(
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

const handleEdit = (id, e) => {
  e.stopPropagation();
  router.push({ name: "editProduct", params: { id } });
};

const handleDelete = (id, e) => {
  e.stopPropagation();
  productIdToDelete.value = id;
  isDialogVisible.value = true;
};

const confirmDelete = async () => {
  isDialogVisible.value = false;
  await deleteProduct(productIdToDelete.value);
  await getProducts();
};

const cancelDelete = () => {
  isDialogVisible.value = false;
};

const deleteProduct = async (id) => {
  loading.value = true;
  try {
    const response = await client.delete(
      `products/${id}`
    );

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }
    console.log("Product Deleted");
  } catch (error) {
    console.error("Error fetching item:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getProducts();
});
</script>

<style scoped>
.adminPanel {
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding-bottom: 80px;
  border-bottom: solid 1px rgb(80, 75, 75);
}

.adminPanelWrapper {
  width: 80%;
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.adminPanelItems {
  position: relative;
  min-height: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.adminPanelItem {
  width: 620px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #fff;
  border: 1px solid rgb(80, 75, 75);
}

.details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

img {
  width: 100px;
  height: 150px;
  object-fit: contain;
}

.variantInfo {
  display: flex;
  gap: 10px;
}

.red {
  color: var(--primary);
}

button {
  border: none;
  outline: none;
  padding: 10px;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  background-color: var(--primary);
}

.lineThrough {
  text-decoration: line-through;
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
  .adminPanelItem {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .adminPanelWrapper{
    width: 90%;
  }

  .details {
    align-items: center;
    text-align: center;
  }

  button {
    width: 150px;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
}
</style>
