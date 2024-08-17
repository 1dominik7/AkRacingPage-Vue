<template>
  <div class="notFound">
    <img src="/images/logo.jpg" alt="" />
    <h1>Page not Found</h1>
  </div>
</template>

<script setup></script>

<style scoped>
.notFound {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

img {
  width: 500px;
  object-fit: contain;
}

@media (max-width: 800px) {
  img {
    width: 70%;
    gap: 20px;
  }
}
</style>
