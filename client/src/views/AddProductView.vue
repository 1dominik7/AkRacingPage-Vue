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
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
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
            <span v-if="errors.price" class="error">{{ errors.price }}</span>
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
            <span
              class="arrayText"
              v-for="(item, index) in itemInfo.brief"
              :key="index"
            >
              {{ item.length > 20 ? item.slice(0, 20) + "..." : item }}
            </span>
          </div>
          <input type="text" v-model="briefInput" />
          <button @click="addBrief">Add brief</button>
        </div>
        <div class="itemInput">
          <div class="itemInputContainer category">
            <span class="brief">Category:</span>
            <span
              class="arrayText"
              v-for="(item, index) in itemInfo.category"
              :key="index"
              >{{ item }}
            </span>
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
            <div class="arrayTextContainer">
              <span v-if="generalSpecCount > 1">
                {{ lastGeneralSpec }} and {{ generalSpecCount - 1 }} more
              </span>
              <span
                v-else
                class="arrayText"
                v-for="(item, index) in itemInfo.specifications.general"
                :key="index"
                >{{ item }}</span
              >
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
            <div class="arrayTextContainer">
              <span v-if="materialSpecCount > 1">
                {{ lastMaterialSpec }} and {{ materialSpecCount - 1 }} more
              </span>
              <span
                v-else
                class="arrayText"
                v-for="(item, index) in itemInfo.specifications.material"
                :key="index"
                >{{ item }}</span
              >
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
            <div class="arrayTextContainer">
              <span v-if="featuresSpecCount > 1">
                {{ lastFeaturesSpec }} and {{ featuresSpecCount - 1 }} more
              </span>
              <span
                v-else
                class="arrayText"
                v-for="(item, index) in itemInfo.specifications.features"
                :key="index"
                >{{ item }}</span
              >
            </div>
          </div>
        </div>
        <div class="itemInputVariantContainer">
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
              <span
                >{{ variant.color || "No Color" }}
                {{ variant.material || "No Material" }} - Stock:
                {{ variant.stock }}</span
              >
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
    </div>
    <button class="submit" @click="submitProduct">Add Product</button>
    <div class="lottieContainer" v-if="loading">
      <LoadingAnimation />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import LoadingAnimation from "./LoadingAnimation.vue";
import client from "../../api/client";

const loading = ref(false);
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

const errors = ref({
  name: "",
  price: "",
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

const addBrief = () => {
  if (briefInput.value.trim() !== "") {
    itemInfo.value.brief.push(briefInput.value);
    briefInput.value = "";
  }
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

const handleImageSelection = (event, type) => {
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

  const imageUrls = await convertFilesToDataURLs(tempImages.value);
  itemInfo.value.variants.push({
    color: colorInput.value || "No Color",
    material: materialInput.value || "No Material",
    images: [...tempImages.value],
    imageUrls,
    stock: stockInput.value,
  });
  console.log(itemInfo.value.variants);
  colorInput.value = "";
  materialInput.value = "";
  stockInput.value = 0;
  tempImages.value = [];
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

const uploadImages = async (images) => {
  const uploadedImages = [];
  const chunkSize = 5000000;
  const cloudinaryUrl = import.meta.env.CLOUDINARY_URL;
  const uploadPreset = import.meta.env.UPLOADPRESET;

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    let start = 0;

    while (start < file.size) {
      const chunk = file.slice(start, start + chunkSize);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", import.meta.env.UPLOADPRESET);

      try {
        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        uploadedImages.push(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      start += chunkSize;
    }
  }

  return uploadedImages;
};

const clearItemInfo = () => {
  itemInfo.value.name = "";
  itemInfo.value.type = "";
  itemInfo.value.price = "";
  itemInfo.value.discount = "";
  itemInfo.value.stock = 1;
  itemInfo.value.brief = [];
  itemInfo.value.specifications.general = [];
  itemInfo.value.specifications.material = [];
  itemInfo.value.specifications.features = [];
  itemInfo.value.variants = [];
  (itemInfo.value.category = []), (itemInfo.value.shortcut = "");
};

const validateFields = () => {
  errors.value.name = itemInfo.value.name.trim() ? "" : "Name is required.";
  errors.value.price = itemInfo.value.price.trim() ? "" : "Price is required.";

  return !errors.value.name && !errors.value.price;
};

const submitProduct = async (e) => {
  e.preventDefault()
  if (!validateFields()) {
    console.log("Form contains errors:", errors.value);
    return;
  }

  loading.value = true;
  try {
    const allImages = [
      ...itemInfo.value.variants.flatMap((variant) => variant.images),
    ];

    const uploadedImages = await uploadImages(allImages);

    let imageIndex = 0;
    itemInfo.value.variants.forEach((variant) => {
      const imageCount = variant.images.length;
      variant.imageUrls = uploadedImages.slice(
        imageIndex,
        imageIndex + imageCount
      );
      imageIndex += imageCount;
    });

    const res = await client.post("products", itemInfo.value, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Product added:", res);
    clearItemInfo();
  } catch (error) {
    console.error("Error submitting product:", error);
  } finally {
    loading.value = false;
  }
};

const generalSpecCount = computed(
  () => itemInfo.value.specifications.general.length
);
const lastGeneralSpec = computed(
  () => itemInfo.value.specifications.general.slice(-1)[0]
);

const materialSpecCount = computed(
  () => itemInfo.value.specifications.material.length
);
const lastMaterialSpec = computed(
  () => itemInfo.value.specifications.material.slice(-1)[0]
);

const featuresSpecCount = computed(
  () => itemInfo.value.specifications.features.length
);
const lastFeaturesSpec = computed(
  () => itemInfo.value.specifications.features.slice(-1)[0]
);
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
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 5px;
}

.itemInputVariant {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.itemInputContainer {
  display: flex;
  gap: 10px;
}

.category {
  height: auto;
  flex-direction: column;
}

.itemInputSpec {
  display: flex;
  align-items: center;
  gap: 5px;
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
  flex-direction: column;
  gap: 10px;
}

.arrayTextContainer {
  display: flex;
  flex-direction: column;
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
  .productPanel {
    padding: 20px 20px;
  }

  .productPanelContainer {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .itemInputSpec {
    flex-direction: column;
  }

  .itemInputVariantContainer,
  .itemInputContainer {
    flex-direction: column;
  }
}
</style>
