<template>
  <div class="productPanel">
    <h2>Add Product</h2>
    <div class="productPanelContainer">
      <div class="leftSide">
        <div class="itemInput">
          <div class="itemInputContainer">
            <span>Name: </span>
            <span v-if="itemInfo.name">{{ itemInfo.name }}</span>
          </div>
          <input type="text" v-model="itemInfo.name" />
        </div>
        <div class="itemInput">
          <div class="itemInputContainer">
            <span>Type:</span>
            <span v-if="itemInfo.type">{{ itemInfo.type }}</span>
          </div>
          <input type="text" v-model="itemInfo.type" />
        </div>
        <div class="itemInput">
          <div class="itemInputContainer">
            <span>Price:</span>
            <span v-if="itemInfo.price">{{ itemInfo.price }} $</span>
          </div>
          <input type="text" v-model="itemInfo.price" />
        </div>
        <div class="itemInput">
          <div class="itemInputContainer">
            <span>Discount (10% = 0.1 input value):</span>
            <span v-if="itemInfo.discount"
              >{{ itemInfo.discount * 100 }} %</span
            >
          </div>
          <input type="text" v-model="itemInfo.discount" />
        </div>
        <div class="itemInput">
          <div class="itemInputContainer array">
            <span class="brief">Brief: </span>
            <div
              class="editableItem"
              v-for="(item, index) in itemInfo.brief"
              :key="index"
            >
              <span class="arrayText">
                {{ item.length > 20 ? item.slice(0, 20) + "..." : item }}
              </span>
              <i class="bi bi-x-circle" @click="deleteBrief(index)"></i>
            </div>
          </div>
          <input type="text" v-model="briefInput" />
          <button @click="addBrief">Add brief</button>
        </div>
        <div class="itemInput">
          <div class="itemInputContainer category">
            <span class="brief">Category:</span>
            <div
              class="editableItem"
              v-for="(item, index) in itemInfo.category"
              :key="index"
            >
              <span class="arrayText">{{ item }} </span>
              <i class="bi bi-x-circle" @click="deleteCategory(index)"></i>
            </div>
          </div>
          <select name="" id="" v-model="selectedCategory">
            <option value=""></option>
            <option value="New Product">New Product</option>
            <option value="CORE Series">CORE Series</option>
            <option value="MASTERS Series">MASTERS Series</option>
            <option value="OFFICE Series">OFFICE Series</option>
            <option value="LIMITED Series">LIMITED Series</option>
            <option value="Accessories">Accessories</option>
          </select>
          <button @click="addCategory">Add category</button>
        </div>
        <div class="itemInput">
          <div class="itemInputContainer">
            <span class="brief">Shortcut:</span>
            <span v-if="itemInfo.shortcut">{{ itemInfo.shortcut }}</span>
          </div>
          <input type="text" v-model="itemInfo.shortcut" />
        </div>
      </div>
      <div class="rightSide">
        <div class="specificationContainer">
          <div class="itemInputSpec">
            <div class="itemInput array">
              <div class="specification">
                <span class="brief">General Specifications: </span>
              </div>
              <input type="text" v-model="generalSpecificationInput" />
              <button click="addSpecification" @click="addGeneralSpecification">
                Add General Specification
              </button>
            </div>
            <div
              class="arrayTextContainer"
              v-for="(item, index) in itemInfo.specifications.general"
              :key="index"
            >
              <span class="arrayText">{{ item }}</span>
              <i
                class="bi bi-x-circle"
                @click="deleteSpecification(index, 'general')"
              ></i>
            </div>
          </div>
          <div class="itemInputSpec">
            <div class="itemInput array">
              <div class="specification">
                <span class="brief">Material Specifications: </span>
              </div>
              <input type="text" v-model="materialSpecificationInput" />
              <button
                click="addSpecification"
                @click="addMaterialSpecification"
              >
                Add Material Specification
              </button>
            </div>
            <div
              class="arrayTextContainer"
              v-for="(item, index) in itemInfo.specifications.material"
              :key="index"
            >
              <span class="arrayText">{{ item }}</span>
              <i
                class="bi bi-x-circle"
                @click="deleteSpecification(index, 'material')"
              ></i>
            </div>
          </div>
          <div class="itemInputSpec">
            <div class="itemInput array">
              <div class="specification">
                <span class="brief">Features Specifications: </span>
              </div>
              <input type="text" v-model="featuresSpecificationInput" />
              <button
                click="addSpecification"
                @click="addFeaturesSpecification"
              >
                Add Features Specification
              </button>
            </div>
            <div
              class="arrayTextContainer"
              v-for="(item, index) in itemInfo.specifications.features"
              :key="index"
            >
              <span class="arrayText">{{ item }}</span>
              <i
                class="bi bi-x-circle"
                @click="deleteSpecification(index, 'features')"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="itemInputVariantContainer">
      <div class="itemInputVariantWrapper">
        <div class="itemInputVariant">
          <div class="itemInput array">
            <div class="itemInputFlex">
              <span class="brief">Colors: </span>
              <span class="arrayText">{{ colorInput }}</span>
            </div>
            <input type="text" v-model="colorInput" />
          </div>
          <div class="itemInput array">
            <div class="itemInputFlex">
              <span class="brief">Material: </span>
              <span class="arrayText">{{ materialInput }}</span>
            </div>
            <input type="text" v-model="materialInput" />
          </div>
          <div class="itemInput array">
            <div class="itemInputFlex">
              <span class="brief">Stock: </span>
              <span class="arrayText">{{ stockInput }}</span>
            </div>
            <input type="number" v-model="stockInput" min="0" />
          </div>
          <input
            type="file"
            class="filePicker"
            multiple
            @change="handleImageSelection($event)"
          />
          <span v-if="errorMessage.length > 0" class="error">{{
            errorMessage
          }}</span>
          <button @click="addVariant">Add Variant</button>
        </div>
        <div class="itemInputContainer">
          <div
            class="variantContainer"
            v-for="(variant, index) in itemInfo.variants"
            :key="index"
          >
            <i class="bi bi-x-circle" @click="deleteVariant(index)"></i>
            <span
              >{{ variant.color || "No Color" }} /
              {{ variant.material || "No Material" }}</span
            >
            <span>Stock: {{ variant.stock }}</span>
            <div class="imgContainer">
              <img
                v-for="(image, imgIndex) in variant.imageUrls"
                :key="imgIndex"
                :src="image"
                alt="Variant Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="submit" @click="EditProduct">Update Product</button>
    <div class="lottieContainer" v-if="loading">
      <LoadingAnimation />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LoadingAnimation from "./LoadingAnimation.vue";
import { useRoute, useRouter } from "vue-router";
import client from "../../api/client";

const router = useRouter();
const route = useRoute();

const { id } = route.params;

const loading = ref(false);
const product = ref(null);
const itemInfo = ref({
  name: "",
  type: "",
  price: "",
  discount: "",
  stock: 1,
  brief: [],
  specifications: {
    general: [],
    material: [],
    features: [],
  },
  variants: [],
  category: [],
  shortcut: "",
});

const generalSpecificationInput = ref("");
const materialSpecificationInput = ref("");
const featuresSpecificationInput = ref("");

const errorMessage = ref("");
const briefInput = ref("");
const selectedCategory = ref("");
const colorInput = ref("");
const materialInput = ref("");
const stockInput = ref(0);
const tempImages = ref([]);

const getProduct = async () => {
  loading.value = true;
  try {
    const response = await client.get(`products/${id}`);

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }
    product.value = response.data.product;
    itemInfo.value = {
      name: product?.value?.name,
      type: product?.value?.type,
      price: product?.value?.price,
      discount: product?.value?.discount,
      brief: product?.value?.brief,
      specifications: {
        material: [...product?.value?.specifications?.material],
        features: [...product?.value?.specifications?.features],
        general: [...product?.value?.specifications?.general],
      },
      variants: product?.value?.variants?.map((variant) => ({
        color: variant?.color,
        imageUrls: [...variant?.imageUrls],
        material: variant?.material,
        stock: variant?.stock,
        _id: variant?._id,
      })),
      category: [...product?.value?.category],
      shortcut: product?.value?.shortcut,
    };
  } catch (error) {
    console.error("Error fetching item:", error);
  } finally {
    loading.value = false;
  }
};

const addBrief = () => {
  if (briefInput.value.trim() !== "") {
    itemInfo.value.brief.push(briefInput.value);
    briefInput.value = "";
  }
};

const deleteBrief = (index) => {
  itemInfo.value.brief.splice(index, 1);
};

const addCategory = () => {
  if (
    selectedCategory.value &&
    !itemInfo.value.category.includes(selectedCategory.value)
  ) {
    itemInfo.value.category.push(selectedCategory.value);
    selectedCategory.value = "";
  }
};

const deleteCategory = (index) => {
  itemInfo.value.category.splice(index, 1);
};

const addGeneralSpecification = () => {
  if (generalSpecificationInput.value.trim() !== "") {
    itemInfo.value.specifications.general.push(generalSpecificationInput.value);
    generalSpecificationInput.value = "";
  }
};

const addMaterialSpecification = () => {
  if (materialSpecificationInput.value.trim() !== "") {
    itemInfo.value.specifications.material.push(
      materialSpecificationInput.value
    );
    materialSpecificationInput.value = "";
  }
};

const addFeaturesSpecification = () => {
  if (featuresSpecificationInput.value.trim() !== "") {
    itemInfo.value.specifications.features.push(
      featuresSpecificationInput.value
    );
    featuresSpecificationInput.value = "";
  }
};

const deleteSpecification = (index, key) => {
  if (
    itemInfo.value.specifications[key] &&
    Array.isArray(itemInfo.value.specifications[key])
  ) {
    itemInfo.value.specifications[key].splice(index, 1);
  }
};

const handleImageSelection = (event) => {
  const files = event.target.files;
  tempImages.value = [];
  for (let i = 0; i < files.length; i++) {
    tempImages.value.push(files[i]);
  }
};

const addVariant = async () => {
  if (!colorInput.value.trim() && !materialInput.value.trim()) {
    errorMessage.value = "Please provide at least a color or material.";
    return;
  }

  let imageUrls = [];
  if (tempImages.value.length > 0) {
    try {
      imageUrls = await convertFilesToDataURLs(tempImages.value);
    } catch (error) {
      console.error("Error converting files to Data URLs:", error);
      errorMessage.value = "Error processing images. Please try again.";
      return;
    }
  }

  itemInfo.value.variants.push({
    color: colorInput.value.trim() || "No Color",
    material: materialInput.value.trim() || "No Material",
    imageUrls,
    stock: stockInput.value,
    images: tempImages.value,
  });

  console.log(itemInfo.value.variants);
  colorInput.value = "";
  materialInput.value = "";
  stockInput.value = 0;
  tempImages.value = [];
};

const deleteVariant = (index) => {
  itemInfo.value.variants.splice(index, 1);
};

const convertFilesToDataURLs = (files) => {
  return Promise.all(
    [...files].map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    })
  );
};

const uploadChunk = async (chunk, uploadPreset, folder) => {
  const cloudinaryUrl = import.meta.env.CLOUDINARY_URL;
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    console.log("Chunk upload response:", response);

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading chunk:", error);
    throw error;
  }
};

const uploadImages = async (images, chunkSize = 5000000) => {
  const uploadedImages = [];
  const uploadPreset = import.meta.env.UPLOADPRESET;
  const folder = import.meta.env.UPLOADPRESET;

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    if (!file) {
      console.error(`File at index ${i} is undefined`);
      continue;
    }

    let start = 0;
    while (start < file.size) {
      const chunk = file.slice(start, start + chunkSize);
      try {
        const secureUrl = await uploadChunk(chunk, uploadPreset, folder);
        uploadedImages.push(secureUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      start += chunkSize;
    }
  }

  return uploadedImages;
};

const EditProduct = async () => {
  loading.value = true;

  try {
    const imagesToUpload = itemInfo.value.variants
      .filter((variant) => variant.images && variant.images.length > 0)
      .flatMap((variant) => variant.images);

    let uploadedImages = [];
    if (imagesToUpload.length > 0) {
      uploadedImages = await uploadImages(imagesToUpload);
    }

    let imageIndex = 0;
    itemInfo.value.variants.forEach((variant) => {
      let newImageUrls = [...(variant.imageUrls || [])];

      if (variant.images && variant.images.length > 0) {
        variant.images.forEach(() => {
          if (imageIndex < uploadedImages.length) {
            newImageUrls.push(uploadedImages[imageIndex]);
            imageIndex++;
          }
        });
      }
      newImageUrls = newImageUrls.filter((url) =>
        url.includes("https://res.cloudinary.com")
      );

      variant.imageUrls = newImageUrls;
      delete variant.images;
    });

    const payload = JSON.stringify(itemInfo.value);
    const payloadSize = new Blob([payload]).size;
    console.log(`Payload size: ${payloadSize} bytes`);

    const res = await client.patch(
      `products/${id}`,
      itemInfo.value,
      {
        headers: { "Content-Type": "application/json" },
      },
      { withCredentials: true }
    );
    console.log("Product updated:", res);
    router.push({ name: "adminPanel" });
  } catch (error) {
    console.error("Error submitting product:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getProduct();
});
</script>

<style scoped>
.productPanel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 50px 0px;
}

.productPanelContainer {
  width: 80%;
  display: flex;
  gap: 100px;
  color: #fff;
}

.leftSide {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.itemInputVariantContainer {
  width: 80%;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
}

.variantContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.itemInputVariantWrapper {
  display: flex;
  align-items: center;
}

.itemInputVariant {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.itemInputContainer {
  display: flex;
  gap: 20px;
}

.category {
  height: auto;
  flex-direction: column;
}

.itemInputSpec {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.itemInput {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.itemInputFlex {
  display: flex;
  gap: 10px;
}

.rightSide {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.specificationContainer {
  display: flex;
  gap: 10px;
}

.arrayTextContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.arrayText {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 5px;
}

.array {
  min-width: 300px;
  flex-direction: column;
  gap: 5px;
}

.filePicker {
  height: 100%;
  padding: 5px;
}

input[type="file"]::file-selector-button {
  padding: 5px;
  border: none;
  outline: none;
  background-color: var(--primary);
  color: #fff;
  cursor: pointer;
}

select {
  height: 50px;
  padding: 0px 10px;
  border: 1px solid #fff;
  border-radius: 0;
  color: #fff;
  background-color: transparent;
  cursor: pointer;
}

option {
  color: black;
  cursor: pointer;
}

.specification {
  display: flex;
  gap: 10px;
}

.brief {
  align-self: flex-start;
}

.editableItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.bi-x-circle {
  color: var(--primary);
  cursor: pointer;
}

input {
  height: 40px;
  background-color: transparent;
  border: solid 1px rgb(80, 75, 75);
  padding: 0 5px;
  color: #fff;
  outline: none;
}

.imgContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.error {
  color: var(--primary);
}

.imgContainer img {
  width: 100px;
  height: 100px;
  margin: 5px;
  object-fit: contain;
}

button {
  padding: 10px 10px;
  background-color: var(--primary);
  color: #fff;
  border: none;
  outline: none;
}

.submit {
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 30px;
  margin-top: 50px;
  font-size: 16px;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  background: var(--primary);
  color: #fff;
  cursor: pointer;
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
  .productPanelContainer {
    flex-direction: column;
    gap: 20px;
  }

  .itemInputVariantContainer {
    width: 100%;
  }

  .rightSide {
    flex-direction: column;
  }

  .specificationContainer {
    flex-direction: column;
  }

  .itemInputVariantWrapper {
    width: 100%;
    flex-direction: column;
  }

  .itemInputContainer {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .variantContainer {
    width: 45%;
    text-align: center;
  }
}
</style>
