<template>
  <div class="video">
    <div
      class="text"
      v-lazy-load="loadComponent"
      :class="{ visible: componentLoaded }"
    >
      <span class="title">GAME LIKE A PRO™</span>
      <h4>The choice of eSports pros</h4>
      <button>Up your game</button>
    </div>
    <video class="video" autoplay loop muted>
      <source src="/videoBottom.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
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
.video {
  width: 100%;
  position: relative;
  filter: brightness(80%);
}

.text {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 400px;
  align-items: center;
  gap: 5px;
  z-index: 100;
  opacity: 1;
  transform: all 5s ease-in-out;
  text-shadow: white 0px 0px 10px;
}

.title {
  font-size: 62px;
}

span {
  color: #fff;
}

button {
  background: var(--primary);
  border: none;
  padding: 10px 30px;
  font-size: 13px;
  clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
}

.text span.title,
.text h4,
.text button {
  transform: translateY(100%);
  opacity: 0;
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
}

.text span.title {
  transition-delay: .2s;
}

.text h4 {
  transition-delay: 0.6s;
}

.text button {
  transition-delay: 1s;
}

.text.visible span.title,
.text.visible h4,
.text.visible button {
  transform: translateY(0);
  opacity: 1;
}

@media (max-width: 800px) {
 .text{
  display: none;
 }
}

@media (min-width: 801px) and (max-width: 1424px) {
 .text{
  top:200px
 }
}
</style>
