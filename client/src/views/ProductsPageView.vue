<template>
  <div class="productsView">
    <h2>Catalog</h2>
    <div class="productsViewContainer">
      <div class="productsViewItem" @click="navigateRouter('33-sale')">
        <img src="/images/productsPage/img1.jpg" alt="" />
        <span>33% Sale</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('all')">
        <img src="/images/productsPage/img1.jpg" alt="" />
        <span>All</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('armrests')">
        <img src="/images/productsPage/img2.jpg" alt="" />
        <span>Armrests</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('backrests')">
        <img src="/images/productsPage/img1.jpg" alt="" />
        <span>Backrests</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('base')">
        <img src="/images/productsPage/img3.jpg" alt="" />
        <span>Bases</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('chairs-desks')">
        <img src="/images/productsPage/img1.jpg" alt="" />
        <span>Chairs & Desks</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('core-series')">
        <img src="/images/productsPage/imgCoreSeries.jpg" alt="" />
        <span>Core & Series</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('frontpage')">
        <img src="/images/productsPage/img4.jpg" alt="" />
        <span>Home page</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('l')">
        <img src="/images/productsPage/img5.jpg" alt="" />
        <span>L</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('m')">
        <img src="/images/productsPage/img6.jpg" alt="" />
        <span>M</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('masters-series')">
        <img src="/images/productsPage/imgMastersseries.jpg" alt="" />
        <span>Master Series</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('mechanisms')">
        <img src="/images/productsPage/img7.jpg" alt="" />
        <span>Mechanisms</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('new-2024')">
        <img src="/images/productsPage/img8.jpg" alt="" />
        <span>New 2024</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('office-series')">
        <img src="/images/productsPage/imgOfficeSeries.jpg" alt="" />
        <span>Office Series</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('other')">
        <img src="/images/productsPage/img9.jpg" alt="" />
        <span>Other</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('s')">
        <img src="/images/productsPage/img1.jpg" alt="" />
        <span>S</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('fall-sale')">
        <img src="/images/productsPage/img10.jpg" alt="" />
        <span>Sale Page</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('seats')">
        <img src="/images/productsPage/img1.jpg" alt="" />
        <span>Seats</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('august-sale')">
        <img src="/images/productsPage/img1.jpg" alt="" />
        <span>Simple Summer Sale</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('spare-parts')">
        <img src="/images/productsPage/img9.jpg" alt="" />
        <span>Spare Parts</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('spring-sale')">
        <img src="/images/productsPage/img1.jpg" alt="" />
        <span>Spring Sale</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('wheels')">
        <img src="/images/productsPage/img11.jpg" alt="" />
        <span>Wheels</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('xl')">
        <img src="/images/productsPage/img12.jpg" alt="" />
        <span>XL</span>
      </div>
      <div class="productsViewItem" @click="navigateRouter('xs')">
        <img src="/images/productsPage/img10.jpg" alt="" />
        <span>XS</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateRouter = (name) => {
  router.push({ name: "productsCollection", params: { name } });
};
</script>

<style scoped>
.productsView {
  padding: 70px 100px;
}

h2 {
  text-align: center;
  padding-bottom: 30px;
}

.productsViewContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.productsViewItem {
  width: 30%;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.productsViewItem:hover {
  opacity: 0.8;
  overflow: hidden;
}

.productsViewItem img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  transition: all 0.5s ease-in-out;
}

.productsViewItem:hover img {
  scale: 1.05;
}

.productsViewItem span {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  padding: 10px;
  background-color: black;
  font-size: 26px;
  text-align: center;
}

@media (max-width: 800px) {
  .productsView {
  padding: 40px 20px;
}

h2 {
  padding-bottom: 20px;
}

.productsViewItem {
  width: 40%;
  height: 200px;
}

.productsViewItem span {
  width: 100%;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
}
}
</style>
