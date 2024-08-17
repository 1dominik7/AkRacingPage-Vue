<template>
  <div v-if="visible" class="confirmationWindow">
    <div class="cwBox">
      <p>{{ message }}</p>
      <div class="buttonContainer">
        <button @click="confirmAction">Delete</button>
        <button @click="cancelAction">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  message: String,
});

const emit = defineEmits(["confirm", "cancel"]);

const confirmAction = () => {
  emit("confirm");
};

const cancelAction = () => {
  emit("cancel");
};
</script>

<style scoped>
.confirmationWindow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.cwBox {
  background: var(--bgColor);
  border: 1px solid var(--primary);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  color: var(--primary);
  font-weight: 600;
}

.buttonContainer {
  display: flex;
  gap: 30px;
}

button{
    padding: 5px 15px;
    border: none;
    outline: none;
    background-color: var(--primary);
}

@media (max-width: 800px) {
  .confirmationWindow{
    width: 100%;
  }

  .cwBox{
    width: 90%;
    text-align: center;
    padding: 10px;
  }
}
</style>
