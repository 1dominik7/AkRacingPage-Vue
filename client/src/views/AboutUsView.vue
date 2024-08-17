<template>
  <div class="aboutUs">
    <div class="bgcImageContainer">
      <img
        v-lazy-load="loadComponent"
        :class="{ visible: componentLoaded }"
        class="bgcImage"
        src="/images/aboutUs/imgMain.jpg"
        alt=""
      />
      <div
        class="popup"
        v-lazy-load="loadComponent"
        :class="{ visible: componentLoaded }"
      >
        <span
          >First in automotive sports, and then expanding to gaming and office
          furniture, AKRacing has been in business since 2001.</span
        >
        <span
          >Since the very beginning, AKRacing operated its own factory for
          manufacturing and the AKD sub-division for design of products and
          parts, never engaging in OEM.</span
        >
        <span
          >AKRacing does 100% of its own design, product development, testing
          and quality control in-house, controlling the full user experience to
          a degree most other brands can’t or just don’t.</span
        >
      </div>
    </div>
    <div class="majorRetailers">
      <span class="majorTitle">Trusted by Major Retailers</span>
      <div
        class="majorRetailersLogos"
        v-lazy-load="loadComponent"
        :class="{ visible: componentLoaded }"
      >
        <img
          class="majorRetailersLogo"
          src="/images/aboutUs/amazon.jpg"
          alt=""
        />
        <img class="majorRetailersLogo" src="/images/aboutUs/ldlc.jpg" alt="" />
        <img class="majorRetailersLogo" src="/images/aboutUs/otto.jpg" alt="" />
        <img class="majorRetailersLogo" src="/images/aboutUs/scan.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const componentLoaded = ref(false);

const loadComponent = () => {
  componentLoaded.value = true;
};
</script>

<style scoped>
.aboutUs {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.bgcImageContainer {
  display: flex;
  position: relative;
  padding-bottom: 70px;
  border-bottom: solid 1px rgb(80, 75, 75);
}

.bgcImage {
  width: 100%;
  height: 600px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  overflow: hidden;
}

.bgcImage.visible {
  opacity: 1;
}

.popup {
  position: absolute;
  top: 200px;
  left: 50px;
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: black;
  color: #fff;
  transition: all 1s ease-in-out;
  transition-delay: 0.2s;
  opacity: 0;
}

.popup.visible {
  opacity: 1;
  top: 50px;
}

.majorRetailers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
  padding-bottom: 70px;
  border-bottom: solid 1px rgb(80, 75, 75);
}

.majorTitle {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #fff;
}

.majorRetailersLogos {
  display: flex;
  gap: 50px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.majorRetailersLogos.visible {
  opacity: 1;
}

.majorRetailersLogo {
  width: 150px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.majorRetailersLogo:nth-child(1) {
  transition-delay: 0.5s;
}

.majorRetailersLogo:nth-child(2) {
  transition-delay: 0.7s;
}

.majorRetailersLogo:nth-child(3) {
  transition-delay: 0.9s;
}

.majorRetailersLogo:nth-child(4) {
  transition-delay: 1.1s;
}

.majorRetailersLogos.visible .majorRetailersLogo {
  opacity: 1;
}

@media (max-width: 800px) {
  .aboutUs {
  gap: 20px;
}

.bgcImageContainer{
  padding-bottom: 30px;
}

.bgcImage{
  height: 400px;
}

.popup {
  position: absolute;
  top: 200px;
  left: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  font-size: 12px;
}

.popup.visible {
  opacity: 0.8;
  top: 50px;
}

.majorRetailersLogos{
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
}
</style>
