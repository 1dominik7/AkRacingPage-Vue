<template>
  <div class="login">
    <h2>Login</h2>
    <div class="loginForm">
      <div class="formContainer">
        <div class="warnings" v-if="validationErrors.length > 0">
          <ul>
            <li v-for="(error, index) in validationErrors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </div>
        <div class="formInputContainer">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="userInfo.email" />
        </div>
        <div class="formInputContainer">
          <div class="formLabelContainer">
            <label for="password">Password</label>
            <span class="forgotPass">Forgot password ?</span>
          </div>
          <input type="password" id="password" v-model="userInfo.password" />
        </div>
      </div>
      <button @click="handleSubmit" class="submit" :disabled="busy">
        Sign In
      </button>
      <router-link to="/register" class="createAccountNav"
        >Create account</router-link
      >
    </div>
    <div class="lottieContainer" v-if="busy">
      <LoadingAnimation />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { signInSchema, yupValidate } from "@/utils/validator";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadingAnimation from "./LoadingAnimation.vue";
import client from "../../api/client";

const validationErrors = ref([]);
const busy = ref(false);
const userInfo = ref({
  email: "",
  password: "",
});

const router = useRouter();

const authStore = useAuthStore();

const handleSubmit = async () => {
  busy.value = true;
  validationErrors.value = [];

  try {
    await yupValidate(signInSchema, userInfo.value);
    authStore.loginStart();
    const res = await client.post(
      "user/login",
      userInfo.value
    );

    if (res.status === 200) {
      authStore.loginSuccess(res.data);
      router.push("/profile");
    } else {
      authStore.loginFailure(error.message);
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      validationErrors.value = error.errors;
    } else if (error.response) {
      if (error.response.status === 422) {
        const { message, errors } = error.response.data;
        validationErrors.value = errors
          ? errors.map((err) => ({
              path: err.field,
              message: err.message,
            }))
          : [{ path: "", message }];
      } else {
        validationErrors.value = [
          { path: "", message: error.response.data.message },
        ];
      }
    } else {
      console.error("Error during login", error);
    }
  } finally {
    busy.value = false;
  }
};
</script>

<style scoped>
.login {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 100px 0px;
  border-bottom: solid 0.5px rgb(78, 77, 77);
}

h2 {
  letter-spacing: 2px;
}

.loginForm {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.formContainer {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.warnings {
  width: 100%;
  height: 100%;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 25px;
  background-color: #fff;
  border: 1px solid var(--primary);
}

li {
  list-style-type: disc;
  color: var(--primary);
}

.formInputContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label,
.forgotPass {
  color: #fff;
  font-size: 13px;
}

.formLabelContainer {
  display: flex;
  justify-content: space-between;
}

input {
  height: 40px;
  width: 450px;
  padding: 0 10px;
  border-radius: 2px;
  border: solid 0.5px rgb(78, 77, 77);
  background-color: transparent;
  color: #fff;
  outline: none;
}

input:focus {
  border: solid 0.5px #fff;
}

.forgotPass,
.createAccountNav {
  cursor: pointer;
}

.submit {
  width: 100%;
  background-color: var(--primary);
  padding: 10px 30px;
  border: none;
  color: #fff;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  cursor: pointer;
}

.createAccountNav {
  display: flex;
  align-self: center;
  color: #fff;
}

.lottieContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0.8;
  background-color: black;
}

@media (max-width: 800px) {
  .login {
    padding: 50px 0;
    gap: 20px
  }

  input{
    width: 300px;
  }
}
</style>
