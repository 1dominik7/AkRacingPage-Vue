<template>
  <div class="ppTop">
    <img class="bgImg1" src="/images/PremiumPage1bg.jpg" alt="" />
    <div class="ppHistoryContainer">
      <img class="logoImg" src="/images/logo.jpg" alt="" />
      <div class="ppDenim">
        <div class="ppDenimLeft">
          <h1>Okayama</h1>
          <h1>Denim</h1>
        </div>
        <img src="/images/logoAk.jpg" alt="" />
      </div>
      <div class="ppMachinesContainer">
        <div class="ppMachinesContainerTop">
          <div class="ppMachinesContainerTopText">
            <span class="machineTitle">
              <span class="red machineTitle">Why</span>
              Japanese Denim?
            </span>
            <span class="machineText"
              >Japanese denim is renowned for high quality and craftsmanship,
              with skilled artisans using traditional production techniques.
              Starting in the 1960s, Japan crafted the finest denim.</span
            >
          </div>
          <div class="ppMachinesContainerImg">
            <img
              class="ImgMachine1"
              src="/images/PremiumPage2.jpg"
              v-lazy-load="loadComponent"
              :class="{ visible: componentLoaded }"
              alt=""
            />
            <img class="logo1" src="/images/logoAk1.jpg" alt="" />
          </div>
        </div>
        <div class="ppMachinesContainerBottom">
          <div class="ppMachinesContainerImg">
            <img
              class="ImgMachine1"
              src="/images/PremiumPage3.jpg"
              :class="{ visible: componentLoaded1 }"
              alt=""
            />
            <img
              class="logo2"
              src="/images/logoAk1.jpg"
              alt=""
            />
          </div>
          <div class="ppMachinesContainerBottomText">
            <span class="machineTitle">
              <span               v-lazy-load="loadComponent1" class="red machineTitle">Superior Quality</span>
              With Its Signature And Tradition
            </span>
            <span class="machineText"
              >In a bid to stay true to traditional methods, Japanese craftsmen
              went above and beyond to produce superior quality denim that the
              world had not seen before. Today, Japanese denim is recognized as
              the highest quality, with its signature denser weave, superior
              yarn quality, unique dyeing techniques, and unparalleled Japanese
              quality control.</span
            >
          </div>
        </div>
      </div>
      <div class="ppSecretContainer">
        <img class="secretBgImage" src="/images/PremiumPage5bg.jpg" alt="" />
        <div class="ppSecret">
          <div class="ppSecretTop">
            <img
              class="secretSmallImg"
              src="/images/PremiumPage4.jpg"
              v-lazy-load="loadComponent2"
              :class="{ visible: componentLoaded2 }"
              alt=""
            />
            <div class="ppMachinesContainerBottomText">
              <span class="machineTitle">
                <span class="red machineTitle">Secret Formula</span>
                Of Okayama Denim Fabric
              </span>
              <span class="machineText"
                >Out of multiple options, AKRacing chose denim from Okayama
                Prefecture, which is known for its world-class quality and has
                been used in apparel products by European luxury Maison brands.
                Several factors explain why Okayama denim is considered by many
                to be the finest denim produced in Japan.
              </span>
            </div>
          </div>
          <div class="ppSecretBottom">
            <div class="ppSecretBottomText">
              <div class="secretText">
                First, most factories in Okayama use vintage shuttle looms to
                produce their denim fabric. Although the production of denim on
                shuttle looms yields much less fabric (about 40m a day) than the
                mass production of projectile looms, the quality of the selvedge
                fabric which the shuttle looms output is far superior to the
                modern projectile looms.
                <span>
                  Second, the water in Okayama has a high mineral content
                  coupled with favorable pH levels. This combination helps to
                  produce high quality denim fabric, which also assists in the
                  depth of color and resilience of the indigo dye. Indigo dying
                  has been a traditional dying technique in textile production
                  in Okayama for centuries.
                </span>
                <span>
                  Finally, Japanese attention to detail during the production
                  process is unrivaled. Our Okayama denim supplier has very
                  small scales of production, ensuring that each product is
                  developed with tedious attention to detail.
                </span>
              </div>
            </div>
            <div class="ppMachinesContainerImg">
              <img
                class="ImgMachine1"
                src="/images/PremiumPage6.jpg"
                v-lazy-load="loadComponent3"
                :class="{ visible: componentLoaded3 }"
                alt=""
              />
              <img class="logo1" src="/images/logoAk1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const componentLoaded = ref(false);
const componentLoaded1 = ref(false);
const componentLoaded2 = ref(false);
const componentLoaded3 = ref(false);

const loadComponent = () => {
  componentLoaded.value = true;
};

const loadComponent1 = () => {
  componentLoaded1.value = true;
};

const loadComponent2 = () => {
  componentLoaded2.value = true;
};

const loadComponent3 = () => {
  componentLoaded3.value = true;
};
</script>

<style scoped>
.ppTop {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow: hidden;
}

.bgImg1 {
  width: 100%;
  max-height: 80vh;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -1;
}

.ppHistoryContainer {
  display: flex;
  flex-direction: column;
  gap: 120px;
  padding: 40px 120px;
}

.logoImg {
  height: 60px;
  width: 350px;
}

.ppDenim {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ppDenim h1 {
  font-size: 190px;
}

.ppDenim h1:nth-child(2) {
  color: var(--primary);
}

.ppDenim img {
  height: 380px;
}

.ppDenimLeft {
  display: flex;
  flex-direction: column;
}

.ppDenimLeft h1 {
  line-height: 180px;
}

.ppMachinesContainer {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.ppMachinesContainerTop {
  width: 100%;
  display: flex;
}

.ppMachinesContainerTopText {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  padding-right: 120px;
}

.ppMachinesContainerTopText .machineTitle {
  font-size: 62px;
  color: #fff;
  letter-spacing: 4px;
  line-height: 80px;
}

.red {
  color: var(--primary) !important;
}

.machineText {
  font-size: 18px;
  color: #fff;
}

.ppMachinesContainerImg {
  position: relative;
  width: 50%;
}

.ImgMachine1 {
  width: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.ImgMachine1.visible {
  opacity: 1;
}

.logo1 {
  position: absolute;
  height: 100px;
  left: -7%;
  top: 10%;
  border-radius: 50%;
}

.logo2 {
  position: absolute;
  height: 100px;
  right: -7%;
  top: 10%;
  border-radius: 50%;
}

.ppMachinesContainerBottom {
  width: 100%;
  display: flex;
}

.ppMachinesContainerBottomText {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  padding-left: 120px;
  padding-top: 40px;
}

.ppMachinesContainerBottomText .machineTitle {
  font-size: 62px;
  color: #fff;
  letter-spacing: 4px;
  line-height: 80px;
}

.ppSecret {
  position: relative;
  width: 100%;
  margin-bottom: 100px;
}

.ppSecretTop {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 100px;
  width: 100%;
  padding: 50px;
}

.secretBgImage {
  position: absolute;
  left: 0;
}

.secretSmallImg {
  width: 300px;
  display: flex;
  align-items: center;
  justify-self: start;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.secretSmallImg.visible {
  opacity: 1;
}

.ppSecretBottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 100px;
}

.ppSecretBottomText {
  width: 50%;
  color: #fff;
}

.secretText {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
}

@media (max-width: 800px) {
  .ppTop {
    gap: 20px;
  }

  .bgImg1 {
    min-height: 70vh;
  }

  .ppHistoryContainer {
    gap: 50px;
    padding: 20px 40px;
  }

  .logoImg {
    width: 200px;
    object-fit: contain;
  }

  .ppDenim h1 {
    font-size: 40px;
  }

  .ppDenim img {
    height: 100px;
  }

  .ppDenimLeft h1 {
    line-height: 40px;
  }

  .ppMachinesContainer {
    margin-top: 80px;
    gap: 20px;
  }

  .ppMachinesContainerTop {
    flex-direction: column;
    gap: 20px;
  }

  .ppMachinesContainerTopText {
    width: 100%;
    gap: 20px;
    padding-right: 20px;
  }

  .ppMachinesContainerTopText .machineTitle {
    font-size: 40px;
    line-height: 45px;
  }

  .ppMachinesContainerImg {
    width: 100%;
  }

  .logo1 {
    display: none;
  }

  .logo2 {
    display: none;
  }

  .ppMachinesContainerBottom {
    flex-direction: column;
  }

  .ppMachinesContainerBottomText {
    width: 100%;
    gap: 20px;
    padding-left: 0;
    padding-top: 20px;
  }

  .ppMachinesContainerBottomText .machineTitle {
    font-size: 40px;
    line-height: 45px;
  }

  .ppSecret {
    margin-bottom: 50px;
  }

  .ppSecretTop {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    gap: 100px;
    width: 100%;
    padding: 20px;
  }

  .secretBgImage {
    position: absolute;
    object-fit: contain;
    left: 0;
  }

  .ppSecretBottom {
    width: 100%;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .ppSecretBottomText {
    width: 100%;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
  .ppHistoryContainer {
    gap: 100px;
    padding: 40px 60px;
  }

  .ppDenim h1 {
    font-size: 70px;
  }

  .ppDenim img {
    height: 250px;
  }

  .ppDenimLeft h1 {
    line-height: 70px;
  }

  .ppMachinesContainerImg {
    align-self: center;
  }

  .logo1 {
    left: -12%;
  }

  .logo2 {
    right: -12%;
  }

  .ppMachinesContainerTopText {
    gap: 20px;
  }

  .ppMachinesContainerTopText .machineTitle {
    font-size: 50px;
    line-height: 60px;
  }

  .ppMachinesContainerBottomText {
    padding: 0px 60px;
    gap: 20px;
  }

  .ppMachinesContainerBottomText .machineTitle {
    font-size: 40px;
    line-height: 50px;
  }
}
</style>
