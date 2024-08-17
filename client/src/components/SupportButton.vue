<template>
  <div class="supportButton" v-if="!state" @click=toggle>
    <i class="bi bi-question-circle"></i>
    <button class="supportPress">Support</button>
  </div>
  <div class="supportForm" v-else>
    <div class="top">
      <h5>Contact with us</h5>
      <i class="bi bi-dash" @click="toggle"></i>
    </div>
    <div class="formContainer">
      <div class="form">
        <label for="">Name and surname</label>
        <input type="text" />
      </div>
      <div class="form">
        <label for="">E-mail</label>
        <input type="text" />
      </div>
      <div class="form">
        <label for=""> How can we help?</label>
        <textarea name="" id="" cols="15" rows="6"></textarea>
      </div>
      <div class="form">
        <label for="">Attachments</label>
        <div class="attachmentsContainer">
          <i class="bi bi-paperclip"></i>
          <span>Add to 5 files</span>
        </div>
      </div>
    </div>
    <div class="buttonContainer">
      <button class="sendButton">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const state = ref(false);

const toggle = () => {
    state.value = !state.value
}

const form = ref({
  name: "",
  email: "",
  desc: "",
  attachment: [],
});


</script>

<style scoped>
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes clickAnimation {
  0% {
    transform: opacity(1);
  }
  50% {
    transform: opacity(0.5);
  }
  100% {
    transform: scale(0);
  }
}

.clickAnimation {
  animation: clickAnimation 1s ease;
}

.supportButton {
  position: fixed;
  bottom: 1%;
  right: 25px;
  width: 140px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  background: var(--primary);
  color: #fff;
  opacity: 0;
  animation: 3s ease 1s normal forwards 1 fadein;
  cursor: pointer;
  z-index: 99999;
}

.bi {
  font-size: 20px;
}

.supportPress {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
}

.supportForm {
  position: fixed;
  bottom: 1%;
  right: 25px;
  width: 400px;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  z-index: 99999;
}

.top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: var(--primary);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.top h5 {
  margin-bottom: 0;
  color: white;
}

.top .bi {
  position: absolute;
  right: 10px;
  color: white;
  font-size: 32px;
  cursor: pointer;
}

.formContainer {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form input {
  height: 50px;
  border-radius: 5px;
  padding: 0px 10px;
  border: 1px solid lightgray;
}

.form textarea {
  padding: 0px 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  overflow: hidden;
  resize: none;
}

.attachmentsContainer {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 2px dashed lightgrey;
}

.attachmentsContainer .bi {
  color: var(--primary);
}

.attachmentsContainer span {
  font-weight: 300;
  color: grey;
}

.buttonContainer {
  height: 100px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  border-top: solid 1px lightgrey;
}

.sendButton {
    position: absolute;
    right: 20px;
    padding: 10px 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: var(--primary);
    color: #fff;
}

@media (max-width: 800px) {
.supportButton{
  bottom: 3%;
  width: 100px;
  height: 30px;
}

.bi{
  font-size: 16px;
}

.supportPress{
  font-size: 14px;
}

.supportForm{
  width: 300px;
  height: 400px;
  bottom: 3%;
}

.form input {
  height: 40px;
}

}
</style>
