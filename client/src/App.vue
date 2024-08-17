<script setup>
import Header from "./components/Header.vue";
import SupportButton from "./components/SupportButton.vue";
import HomeView from "./views/HomeView.vue";
import Footer from "./components/Footer.vue";

</script>

<template>
  <Header />
  <main id="main">
    <RouterView />
  </main>
  <support-button />
  <Footer />
</template>

<style scoped>
</style>
