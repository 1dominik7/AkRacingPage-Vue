<template>
  <div class="communityContainer">
    <button class="loginBtn">Login</button>
    <img class="logoImg" src="/images/logo.jpg" alt="" />
    <h3>ENVOY PROGRAM</h3>
    <div class="communityBenefits">
      <span class="benefitsTitle">Benefits</span>
      <div class="communityBenefitsContainer">
        <div class="benefitsItem">
          <span>Commission amount</span>
          <div class="benefitsItemRight">
            <i class="bi bi-check-circle-fill"></i>
            <span>5%</span>
          </div>
        </div>
        <div class="benefitsItem">
          <span>Payments</span>
          <div class="benefitsItemRight">
            <i class="bi bi-check-circle-fill"></i>
            <span>Timely monthly payments</span>
          </div>
        </div>
        <div class="benefitsItem">
          <span>Real-life monitoring</span>
          <div class="benefitsItemRight">
            <i class="bi bi-check-circle-fill"></i>
            <span>Personalized dashboard </span>
          </div>
        </div>
        <div class="benefitsItem">
          <span>Cookie days</span>
          <div class="benefitsItemRight">
            <i class="bi bi-check-circle-fill"></i>
            <span>30</span>
          </div>
        </div>
      </div>
    </div>
    <div class="benefitsItemsInputs">
      <div class="benefitsItemsInput">
        <span>FIRST NAME<b class="star">*</b></span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>LAST NAME<b class="star">*</b></span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>EMAIL<b class="star">*</b></span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>PASSWORD<b class="star">*</b></span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>CONFIRM PASSWORD<b class="star">*</b></span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>ADDRESS<b class="star">*</b></span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>CITY<b class="star">*</b></span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>ZIP CODE<b class="star">*</b></span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>STATE</span>
        <input type="text" />
      </div>
      <div class="benefitsItemsSelector">
        <span>COUNTRY<b class="star">*</b></span>
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
      </div>
      <div class="benefitsItemsInput">
        <span>INSTAGRAM</span>
        <div class="inputContainer">
          <div class="at">@</div>
          <input type="text" />
        </div>
      </div>
      <div class="benefitsItemsInput">
        <span>FACEBOOK</span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>TWITTER</span>
        <div class="inputContainer">
          <div class="at">@</div>
          <input type="text" />
        </div>
      </div>
      <div class="benefitsItemsInput">
        <span>YOUTUBE</span>
        <div class="inputContainerYoutube">
          <div class="at">https://youtube.com/</div>
          <input type="text" />
        </div>
      </div>
      <div class="benefitsItemsInput">
        <span>TWITCH</span>
        <input type="text" />
      </div>
      <div class="benefitsItemsInput">
        <span>MIXER</span>
        <input type="text" />
      </div>
    </div>
    <div class="bottomArea">
      <div class="joinButton">JOIN</div>
      <div class="greyText">
        By joining, you agree to the <span>Terms</span> and
        <span>Privacy Policy</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.communityContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding-top: 20px;
  margin: 0 100px 100px;
}

.loginBtn {
  width: 90px;
  align-self: end;
  border-radius: 20px;
  border: 1px solid var(--primary);
  padding: 5px;
  background-color: black;
  color: #fff;
  cursor: pointer;
}

.logoImg {
  width: 500px;
}

h3 {
  color: #fff;
  font-size: 32px;
  font-weight: 600;
}

.communityBenefits {
  width: 800px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
}

.benefitsTitle {
  font-size: 26px;
}

.communityBenefitsContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.benefitsItem {
  display: flex;
  align-items: center;
  gap: 100px;
}

.benefitsItem span {
  width: 200px;
}

.benefitsItemRight {
  display: flex;
  gap: 10px;
}

.benefitsItemRight i {
  color: var(--primary);
}

.benefitsItemsInputs {
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.benefitsItemsInput {
  width: 800px;
  display: flex;
  flex-direction: column;
}

.benefitsItemsInput span {
  color: #fff;
}

.benefitsItemsInput input {
  height: 40px;
  border-radius: 5px;
  outline: none;
  padding: 0px 10px;
}

.star {
  color: var(--primary);
}

.benefitsItemsSelector {
  width: 800px;
  display: flex;
  flex-direction: column;
}

.benefitsItemsSelector span {
  color: #fff;
}

.benefitsItemsSelector select {
  height: 40px;
  border-radius: 5px;
  outline: none;
  padding: 0px 10px;
}

.inputContainer {
  display: flex;
  background-color: rgb(243, 238, 238);
  border-radius: 5px;
}

.inputContainer input {
  width: 100%;
  border: none;
  border-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.inputContainer .at {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  border: none;
}

.inputContainerYoutube {
  width: 100%;
  display: flex;
  border: none;
  border-radius: 5px;
  background-color: rgb(243, 238, 238);
}

.inputContainerYoutube input {
  width: 100%;
  border: none;
  border-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.inputContainerYoutube .at {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.bottomArea {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.joinButton {
  padding: 10px 30px;
  width: 800px;
  font-size: 18px;
  letter-spacing: 2px;
  text-align: center;
  border: none;
  color: #fff;
  clip-path: polygon(2% 0%, 100% 0, 98% 100%, 0% 100%);
  background-color: var(--primary);
  cursor: pointer;
}

.greyText {
  text-align: center;
  color: lightslategrey;
}

.greyText span {
  text-decoration: underline;
  cursor: pointer;
}

.greyText span:hover {
  color: rgb(22, 108, 161);
}

@media (max-width: 800px) {
  .communityContainer {
    margin: 0px;
  }

  .loginBtn {
    margin-right: 20px;
  }

  .logoImg {
    width: 200px;
  }

  h3 {
    font-size: 26px;
  }

  .communityBenefits {
    width: 100%;
  }

  .benefitsItem {
    justify-content: center;
    gap: 20px;
  }

  .benefitsItem span {
    width: 100%;
  }

  .benefitsItemsInputs {
    width: 100%;
    align-items: center;
    padding: 0 20px;
  }

  .benefitsItemsInput {
    width: 100%;
  }

  .benefitsItemsSelector {
    width: 100%;
  }

  .bottomArea {
    align-items: center;
    margin-bottom: 20px;
  }

  .joinButton {
    width: 300px;
  }
}
</style>
