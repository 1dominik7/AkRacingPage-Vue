<template>
 <div ref="lottieContainer" class="lottie-animation"></div>
</template>

<script setup>
import AnimationLoading from '../animation/AnimationLoading.json'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import lottie from 'lottie-web';

const lottieContainer = ref(null);
let lottieInstance = null;

onMounted(() => {
  lottieInstance = lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: AnimationLoading,
  });

  lottieInstance.setSpeed(1);
});

onBeforeUnmount(() => {
  if (lottieInstance) {
    lottieInstance.destroy();
  }
});

</script>

<style scoped>
    .lottie-animation{
        width: 300px;
        height: 300px;
    }
</style>
