<template>
  <div class="productRegistration">
    <div class="productRegistrationTitle">
      <h2>Product Registration</h2>
      <span
        >Please complete the form below to register your AKRacing product
        purchase. All information will be kept confidential and will help us in
        better serving you, should you ever need assistance with an AKRacing
        product.</span
      >
    </div>
    <div class="productRegistrationFormContainer">
      <h4>Register Your Warranty</h4>
      <div class="productRegistrationForm">
        <div class="productRegistrationFormName">
          <input type="text" placeholder="First Name*" />
          <input type="text" placeholder="Last Name*" />
        </div>
        <input class="productRegistrationFormEmail" placeholder="Email*" />
        <select name="" id="">
          <option value="">--Select country</option>
          <option value="">Poland</option>
          <option value="">Germany</option>
          <option value="">England</option>
          <option value="">United States</option>
          <option value="">Spain</option>
          <option value="">Italy</option>
          <option value="">The Czech Republic</option>
        </select>
        <input type="text" placeholder="Where Purchase*" />
        <div class="productRegistrationFormWhen">
          <input type="text" placeholder="Date of Purchase*" />
          <div class="proofButton">Proof of Purchase (receipt)</div>
        </div>
        <select name="" id="">
          <option value="">Product Line*</option>
          <option value="">Gaming chairs</option>
          <option value="">Gaming desks</option>
          <option value="">Other</option>
        </select>
        <div class="submitButton">Submit</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.productRegistration {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 100px;
  margin-right: 100px;
  padding: 100px 0;
  gap: 80px;
}

.productRegistrationTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.productRegistrationTitle span {
  width: 80%;
  color: #fff;
  margin-top: 20px;
}

.productRegistrationFormContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.productRegistrationForm {
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.productRegistrationFormName {
  display: flex;
  gap: 20px;
}

.productRegistrationFormName input {
  width: 100%;
}

input {
  height: 40px;
  padding: 0 10px;
  background-color: black;
  outline: none;
  border: 1px solid #fff;
  border-radius: 2px;
  color: lightgrey;
}

select {
  height: 40px;
  padding: 0 10px;
  background-color: black;
  outline: none;
  border: 1px solid #fff;
  border-radius: 2px;
  color: lightgrey;
}

.productRegistrationFormWhen {
  display: flex;
  gap: 20px;
  cursor: pointer;
}

.proofButton {
  width: 100%;
  padding: 7px;
  border: 1px solid #fff;
  color: #fff;
  font-weight: 300;
}

.submitButton {
  width: 100%;
  text-align: center;
  padding: 10px;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  background-color: var(--primary);
  letter-spacing: 1px;
}

@media (max-width: 800px) {
  .productRegistration {
    margin: 0 20px;
    padding: 40px 0;
    gap: 30px;
  }

  .productRegistrationTitle span {
    width: 100%;
    margin-top: 0;
  }

  .productRegistrationFormContainer {
    width: 100%;
  }

  .productRegistrationForm {
    width: 100%;
  }
  
  .productRegistrationFormName {
    flex-direction: column;
  }

  .productRegistrationFormWhen {
    flex-direction: column;
  }
}
</style>
