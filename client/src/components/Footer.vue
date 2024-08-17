<template>
  <div class="line"></div>
  <div class="footerContainer">
    <div class="footer">
      <div class="leftSide">
        <span class="title">Sign up</span>
        <span
          >Join our mailing list for the latest updates, promotions & product
          releases!</span
        >
        <div class="bottomLeft">
          <div class="inputContainer">
            <input type="text" placeholder="Enter your email" />
            <i class="bi bi-envelope"></i>
          </div>
          <div class="socialMedia">
            <i class="bi bi-facebook"></i>
            <i class="bi bi-twitter"></i>
            <i class="bi bi-instagram"></i>
            <i class="bi bi-linkedin"></i>
            <i class="bi bi-youtube"></i>
            <i class="bi bi-twitch"></i>
            <i class="bi bi-discord"></i>
          </div>
        </div>
      </div>
      <div class="center">
        <span class="title">Policies</span>
        <div class="bottomCenter">
          <span>Warranty Policy</span>
          <span>Shipping Policy</span>
          <span>Returns & Refund Policy</span>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span>Do not sell or share my personal information</span>
        </div>
      </div>
      <div class="right">
        <span class="title">TAKE A TEST DRIVE</span>
        <div class="bottomRight">
          <span>5217 Verdugo Way, Ste C|Camarillo, CA</span>
          <span>M-F:8:30-5PM</span>
          <span>Tel: (805) 413-6973</span>
        </div>
      </div>
    </div>
    <span class="footerDesc"
      >© 2024 Powerder by
      <a href="https://dominikwicek-portfolio.com/" target="_blank"
        >Dominik Wicek🧑🏻‍💻</a
      ></span
    >
  </div>
</template>

<script setup></script>

<style scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: rgb(80, 75, 75);
}

.footerContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 0px 60px;
  padding: 50px 0;
}

.footer {
  display: flex;
  align-items: flex-start;
  gap: 100px;
}

.leftSide {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
}

.inputContainer {
  position: relative;
  width: 300px;
}

.bottomLeft {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.inputContainer .bi {
  position: absolute;
  bottom: -3px;
  right: 10px;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

input {
  width: 300px;
  background-color: var(--bgColor);
  color: #fff;
  border: none;
  border-bottom: solid 2px #fff;
  outline: none;
}

input::placeholder {
  color: #ffffff;
}

.socialMedia {
  display: flex;
  gap: 15px;
}

.socialMedia .bi {
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

span {
  color: #fff;
}

.title {
  color: var(--primary);
  font-size: 12px;
}

.center {
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
}

.bottomCenter {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bottomCenter span {
  cursor: pointer;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
}

.bottomRight {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footerDesc {
  align-self: center;
  font-size: 12px;
  z-index: 100;
}

.footerDesc a {
  cursor: pointer;
}

@media (max-width: 800px) {
  .footerContainer {
    gap: 10px;
  }

  .footer {
    flex-direction: column;
    gap: 20px;
  }

  .leftSide {
    max-width: none;
    width: 100%;
    gap: 10px;
  }

  .bottomCenter span,
  .bottomRight span,
  .leftSide span {
    font-size: 14px;
  }

  .bottomRight {
    gap: 0px;
  }

  
.socialMedia .bi {
  font-size: 20px;
}

  .bottomLeft,
  .center,
  .right {
    gap: 10px;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
}
</style>
