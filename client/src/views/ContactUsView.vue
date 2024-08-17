<template>
  <div class="contactUs">
    <h2>Contact Us</h2>
    <div class="contactUsForm">
      <div class="contactUsFormTop">
        <div class="contactUsFormContainer">
          <span>Name</span>
          <input type="text" />
        </div>
        <div class="contactUsFormContainer">
          <span>Email</span>
          <input type="text" />
        </div>
      </div>
      <div class="contactUsFormMessage">
        <span>Message</span>
        <textarea type="text" name="" id="" rows="6" />
      </div>
      <div class="button">Send</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.contactUs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 70px 0px;
}

.contactUsForm {
  width: 60%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.contactUsFormTop {
  width: 100%;
  display: flex;
  gap: 10px;
}

.contactUsFormContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #fff;
}

.contactUsFormMessage {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #fff;
}

.contactUsFormContainer input {
  height: 40px;
  background-color: transparent;
  padding: 0 10px;
  border: 1px solid rgb(68, 67, 67);
  color: #fff;
}

.contactUsFormMessage textarea {
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid rgb(68, 67, 67);
  color: #fff;
}

.button {
  background-color: var(--primary);
  padding: 10px 30px;
  width: 100px;
  border: none;
  color: #fff;
  clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
  cursor: pointer;
}

@media (max-width: 800px) {
  .contactUs{
    padding: 30px 20px;
  }

  .contactUsForm{
    width: 100%;
    margin-top: 0px;
    gap: 20px
  }

  .contactUsFormTop{
    flex-direction: column;
  }

  .button{
    width: 100%;
    text-align: center;
  }
}
</style>
