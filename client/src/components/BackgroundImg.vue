<template>
  <div class="bgcContainer">
    <div
      class="bgcImg"
      v-lazy-load="loadComponent"
      :class="{ visible: componentLoaded }"
    >
      <div class="squareContainer" :class="{ visible: componentLoaded }">
        <div class="square">
          <div class="squareTop">
            <span>The AKRacing Difference</span>
            <h4>Artisanal design with comfort and quality in mind</h4>
            <span>
              First in automotive sports, and then expanding to gaming and
              office furniture, AKRacing has been in business since 2001.
            </span>
          </div>
          <button>Learn more</button>
        </div>
      </div>
      <img
        src="/images/teamImg.jpg"
        alt=""
        :class="{ visible: componentLoaded }"
      />
      <div class="line"></div>
    </div>
    <div
      class="majorRetailersContainer"
      v-lazy-load="loadComponent"
      :class="{ visible: componentLoaded }"
    >
      <h4>Trusted by major retailers</h4>
      <div class="majorRetailers">
        <a href="https://www.amazon.com/akracing">
          <img class="majorLogo" src="/images/amazonLogo1.png" alt="" />
        </a>
        <a
          href="https://www.bestbuy.com/site/searchpage.jsp?st=akracing&_dyncharset=UTF-8&_dynSessConf=&id=pcat17071&type=page&sc=Global&cp=1&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All+Categories&ks=960&keys=keys"
        >
          <img class="majorLogo" src="/images/bestBuy.png" alt="" />
        </a>
        <a href="https://www.dell.com/en-us/search/racing">
          <img class="majorLogo" src="/images/dellLogo1.jpg" alt="" />
        </a>
        <a href="https://www.newegg.com/AKRACING/BrandStore/ID-125872">
          <img class="majorLogo" src="/images/newEggLogo1.png" alt="" />
        </a>
        <a href="https://www.gamestop.com/search/?q=akracing&lang=default">
          <img class="majorLogo" src="/images/gamestopLogo1.png" alt="" />
        </a>
        <a
          href="https://www.officedepot.com/a/browse/akracing/N=5&cbxRefine=1226094/"
        >
          <img class="majorLogo" src="/images/officedepotLogo.png" alt="" />
        </a>
        <a
          href="https://www.samsclub.com/b/gaming-chairs/18590185?rootDimension=pcs_availability%253AOnlinepipsymbBrand%253AAKRacing"
        >
          <img class="majorLogo" src="/images/samsclubLogo.png" alt="" />
        </a>
        <a href="">
          <img class="majorLogo" src="/images/staplesLogo.png" alt="" />
        </a>
        <a href="https://www.walmart.com/browse/akracing/YnJhbmQ6QUtSYWNpbmcie">
          <img class="majorLogo" src="/images/walmartLogo.png" alt="" />
        </a>
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
.bgcContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
}

.bgcImg {
  width: 100%;
  position: relative;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  overflow: hidden;
}

.bgcImg.visible {
  opacity: 1;
}

.squareContainer {
  position: absolute;
  top: 150px;
  left: 60px;
  width: 400px;
  padding: 10px;
  background-color: var(--bgColor);
  z-index: 10;
  color: #fff;
  transition: top 1s ease-in-out;
  transition-delay: 0.2s;
}

.squareContainer.visible {
  top: 60px;
}

.square {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 35px;
  border: 2px solid #fff;
}

.squareTop {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bgcImg img {
  width: 100%;
  object-fit: cover;
  scale: 1.6;
  transition: scale 1.4s ease-in-out;
}

.bgcImg img.visible {
  scale: 1;
}

button {
  background-color: var(--primary);
  padding: 10px 30px;
  width: 150px;
  border: none;
  color: #fff;
  clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
  cursor: pointer;
}

.line {
  margin-top: 70px;
  height: 1px;
  content: "";
  display: flex;
  width: 100%;
  background: rgb(68, 67, 67);
}

.majorRetailersContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: opacity 1s ease-in-out;
}

.majorRetailersContainer.visible {
  opacity: 1;
}

.majorRetailers {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 50px;
}

.majorRetailers a {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.majorRetailers a:nth-child(1) {
  transition-delay: 0.2s;
}

.majorRetailers a:nth-child(2) {
  transition-delay: 0.4s;
}

.majorRetailers a:nth-child(3) {
  transition-delay: 0.6s;
}

.majorRetailers a:nth-child(4) {
  transition-delay: 0.8s;
}

.majorRetailers a:nth-child(5) {
  transition-delay: 1s;
}

.majorRetailers a:nth-child(6) {
  transition-delay: 1.2s;
}

.majorRetailers a:nth-child(7) {
  transition-delay: 1.4s;
}

.majorRetailers a:nth-child(8) {
  transition-delay: 1.6s;
}

.majorRetailers a:nth-child(9) {
  transition-delay: 1.8s;
}

.majorRetailersContainer.visible .majorRetailers a {
  opacity: 1;
}

.majorLogo {
  width: 150px;
  object-fit: contain;
}

@media (max-width: 800px) {
 .squareContainer{
  display: none;
 }

 .majorRetailers{
  gap: 40px;
 }

 .majorLogo {
  width: 100px;
}
}

</style>
