<template>
  <div class="registerAccount">
    <h2>Create Account</h2>
    <div class="formContainer">
      <div class="warnings" v-if="validationErrors.length > 0">
        <ul>
          <li v-for="(error, index) in validationErrors" :key="index">
            {{ error.message }}
          </li>
        </ul>
      </div>
      <div class="inputsContainer">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="userInfo.firstName" />
      </div>
      <div class="inputsContainer">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="userInfo.lastName" />
      </div>
      <div class="inputsContainer">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="userInfo.email" />
      </div>
      <div class="inputsContainer">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="userInfo.password" />
        <router-link class="loginRoute" to="/login">Login</router-link>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
      <button class="createButton" @click="handleSubmit" :disabled="busy">
        Create
      </button>
    </div>
  </div>
</template>

<script setup>
import { newUserSchema, yupValidate } from "../utils/validator.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import client from "../../api/client.js";

const validationErrors = ref([]);
const busy = ref(false);
const userInfo = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});
const errorMessage = ref("");

const router = useRouter();

const handleSubmit = async () => {
  busy.value = true;
  validationErrors.value = [];

  try {
    await yupValidate(newUserSchema, userInfo.value);

    await client.post("user/register", userInfo.value);
    userInfo.value = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    router.push("/login");
  } catch (error) {
    if (error.response && error.response.status === 400) {
      errorMessage.value =
        error.response.data.message || "User with this email already exists.";
    } else {
      errorMessage.value = "An unexpected error occurred.";
    }
  } finally {
    busy.value = false;
  }
};
</script>

<style scoped>
.registerAccount {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 80px 0px;
  border-bottom: solid 0.5px rgb(78, 77, 77);
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

h2 {
  letter-spacing: 2px;
}

.formContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.inputsContainer {
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  color: #fff;
  font-size: 13px;
}

input {
  height: 40px;
  border: solid 0.5px rgb(78, 77, 77);
  background-color: transparent;
  color: #fff;
  padding: 0 10px;
  border-radius: 2px;
  outline: none;
}

input:focus {
  border: solid 0.5px #fff;
}

.error {
  color: var(--primary);
  margin-bottom: 0;
}

.loginRoute {
  align-self: flex-end;
  color: #fff;
  font-size: 14px;
}

.createButton {
  width: 100%;
  background-color: var(--primary);
  padding: 10px 30px;
  border: none;
  color: #fff;
  clip-path: polygon(2% 0%, 100% 0, 98% 100%, 0% 100%);
  margin: 10px 0;
  cursor: pointer;
}

@media (max-width: 800px) {
  .registerAccount {
    padding: 50px 0;
    gap: 20px;
  }

  .inputsContainer {
    width: 300px;
  }

  .createButton {
    margin: 0;
  }
}
</style>
