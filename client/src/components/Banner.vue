<template>
  <div class="banner">
    <video class="video" autoplay loop muted>
      <source src="/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <BannerSlide />
    <BackgroundImg />
    <VideoBottom />
  </div>
</template>

<script setup>
import BannerSlide from "./BannerSlide.vue";
import BackgroundImg from "./BackgroundImg.vue";
import VideoBottom from "./VideoBottom.vue";
</script>

<style scoped>
.banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: 100%;
  margin-top: 200px;
}

.video {
  width: 100%;
}

@media (max-width: 800px) {
  .banner {
    margin-top: 100px;
    gap:30px;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
  .banner {
    margin-top: 100px; 
  }
}
</style>
