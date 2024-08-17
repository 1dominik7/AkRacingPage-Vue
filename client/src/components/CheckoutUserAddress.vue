<template>
  <div class="noUserContainer" v-if="!user">
    <div class="lTop">
      <div class="lTopTitle">
        <h4>Contact</h4>
        <span class="login" @click="loginNavigation">Log in</span>
      </div>
      <div
        :class="[
          'inputContainer',
          { active: activeInput === 'email', 'has-error': errors.email },
        ]"
        @click="setActiveInput('email')"
        data-input="email"
      >
        <span
          class="inputText"
          v-if="activeInput !== 'email' && !formInfo.email"
          @click.stop="setActiveInput('email')"
          >Email</span
        >
        <div
          class="inputActive"
          v-if="activeInput === 'email' || formInfo.email.length > 0"
        >
          <span class="inputActiveTop">Email</span>
          <input
            class="inputActiveBottom"
            type="text"
            v-model="formInfo.email"
            @focus="handleInputFocus('email')"
            @blur="validateEmail(formInfo.email)"
            @input="handleInputChange"
          />
        </div>
      </div>
      <div v-if="errors.email" class="error">{{ errors.email }}</div>
      <div class="checkInput" @click="toggleCheck">
        <input type="checkbox" v-model="checked" class="hidden-checkbox" />
        <span :class="['custom-checkbox', { checked }]"></span>
        <span class="emailCheckboxSpan">Email me with news and offers</span>
      </div>
    </div>
    <div class="delivery">
      <h4>Delivery</h4>
      <div class="inputErrorContainer">
        <div
          :class="['inputContainerBox', { 'has-error': errors.country }]"
          @click="toggleCountry"
          ref="countryContainer"
        >
          <div class="inputLeft">
            <span class="inputSpanTop">Country/Region</span>
            <span class="inputSpanBottom">{{ formInfoProps.country }}</span>
          </div>
          <i class="bi bi-chevron-down"></i>
          <div class="countries" v-if="openCountrySelector">
            <span
              v-for="country in countries"
              :key="country"
              @click.stop="selectCountry(country)"
              @blur="validateCountry(formInfo.country)"
              >{{ country }}</span
            >
          </div>
        </div>
        <div v-if="errors.country" class="error">{{ errors.country }}</div>
      </div>
      <div class="inputRow">
        <div class="inputErrorContainerRow">
          <div
            :class="[
              'inputContainer',
              {
                active: activeInput === 'firstName',
                'has-error': errors.firstName,
              },
            ]"
            @click="setActiveInput('firstName')"
            data-input="firstName"
          >
            <span
              class="inputText"
              v-if="activeInput !== 'firstName' && !formInfo.firstName"
              @click.stop="setActiveInput('firstName')"
              >First Name</span
            >
            <div
              class="inputActive"
              v-if="
                activeInput === 'firstName' || formInfo.firstName.length > 0
              "
            >
              <span class="inputActiveTop">First Name</span>
              <input
                class="inputActiveBottom"
                type="text"
                v-model="formInfo.firstName"
                @focus="handleInputFocus('firstName')"
                @blur="validateFirstName(formInfo.firstName)"
                @input="handleInputChange"
              />
            </div>
          </div>
          <div v-if="errors.firstName" class="error">
            {{ errors.firstName }}
          </div>
        </div>
        <div class="inputErrorContainerRow">
          <div
            :class="[
              'inputContainer',
              {
                active: activeInput === 'lastName',
                'has-error': errors.lastName,
              },
            ]"
            @click="setActiveInput('lastName')"
            data-input="lastName"
          >
            <span
              class="inputText"
              v-if="activeInput !== 'lastName' && !formInfo.lastName"
              @click.stop="setActiveInput('lastName')"
              >Last Name</span
            >
            <div
              class="inputActive"
              v-if="activeInput === 'lastName' || formInfo.lastName.length > 0"
            >
              <span class="inputActiveTop">Last Name</span>
              <input
                class="inputActiveBottom"
                type="text"
                v-model="formInfo.lastName"
                @focus="handleInputFocus('lastName')"
                @blur="validateLastName(formInfo.lastName)"
              />
            </div>
          </div>
          <div v-if="errors.lastName" class="error">
            {{ errors.lastName }}
          </div>
        </div>
      </div>
      <div class="inputErrorContainer">
        <div
          :class="[
            'inputContainer',
            {
              active: activeInput === 'address',
              'has-error': errors.address,
            },
          ]"
          @click="setActiveInput('address')"
          data-input="address"
        >
          <span
            class="inputText"
            v-if="activeInput !== 'address' && !formInfo.address"
            @click.stop="setActiveInput('address')"
            >Address</span
          >
          <div
            class="inputActive"
            v-if="activeInput === 'address' || formInfo.address.length > 0"
          >
            <span class="inputActiveTop">Address</span>
            <input
              class="inputActiveBottom"
              type="text"
              v-model="formInfo.address"
              @focus="handleInputFocus('address')"
              @blur="validateAddress(formInfo.address)"
              @input="handleInputChange"
            />
          </div>
        </div>
        <div v-if="errors.address" class="error">
          {{ errors.address }}
        </div>
      </div>
      <div
        :class="['inputContainer', { active: activeInput === 'optional' }]"
        @click="setActiveInput('optional')"
        data-input="optional"
      >
        <span
          class="inputText optional"
          v-if="activeInput !== 'optional' && !formInfo.optional"
          @click.stop="setActiveInput('optional')"
          >Apartment, suite, etc. (optional)</span
        >
        <div
          class="inputActive"
          v-if="activeInput === 'optional' || formInfo.optional.length > 0"
        >
          <span class="inputActiveTop">Apartment, suite, etc. (optional)</span>
          <input
            class="inputActiveBottom"
            type="text"
            v-model="formInfo.optional"
            @focus="handleInputFocus('optional')"
            @blur="handleInputBlur('optional')"
            @input="handleInputChange"
          />
        </div>
      </div>
      <div class="inputRow">
        <div class="inputErrorContainerRow">
          <div
            :class="[
              'inputContainer',
              {
                active: activeInput === 'postalCode',
                'has-error': errors.postalCode,
              },
            ]"
            @click="setActiveInput('postalCode')"
            data-input="postalCode"
          >
            <span
              class="inputText"
              v-if="activeInput !== 'postalCode' && !formInfo.postalCode"
              @click.stop="setActiveInput('postalCode')"
              >Postal code</span
            >
            <div
              class="inputActive"
              v-if="
                activeInput === 'postalCode' || formInfo.postalCode.length > 0
              "
            >
              <span class="inputActiveTop">Postal code</span>
              <input
                class="inputActiveBottom"
                type="text"
                v-model="formInfo.postalCode"
                @focus="handleInputFocus('postalCode')"
                @input="handleInputChange"
                @blur="validatePostalCode(formInfo.postalCode)"
              />
            </div>
          </div>
          <div v-if="errors.postalCode" class="error">
            {{ errors.postalCode }}
          </div>
        </div>
        <div class="inputErrorContainerRow">
          <div
            :class="[
              'inputContainer',
              { active: activeInput === 'city', 'has-error': errors.city },
            ]"
            @click="setActiveInput('city')"
            data-input="city"
          >
            <span
              class="inputText"
              v-if="activeInput !== 'city' && !formInfo.city"
              @click.stop="setActiveInput('city')"
              >City</span
            >
            <div
              class="inputActive"
              v-if="activeInput === 'city' || formInfo.city.length > 0"
            >
              <span class="inputActiveTop">City</span>
              <input
                class="inputActiveBottom"
                type="text"
                v-model="formInfo.city"
                @focus="handleInputFocus('city')"
                @blur="validateCity(formInfo.city)"
                @input="handleInputChange"
              />
            </div>
          </div>
          <div v-if="errors.city" class="error">
            {{ errors.city }}
          </div>
        </div>
      </div>
      <div class="phoneInput">
        <div
          :class="[
            'inputContainer',
            { active: activeInput === 'phone', 'has-error': errors.phone },
          ]"
          @click="setActiveInput('phone')"
          data-input="phone"
        >
          <span
            class="inputText"
            v-if="activeInput !== 'phone' && !formInfo.phone"
            @click.stop="setActiveInput('phone')"
            >Phone</span
          >
          <div
            class="inputActive"
            v-if="activeInput === 'phone' || formInfo.phone.length > 0"
          >
            <span class="inputActiveTop">Phone</span>
            <input
              class="inputActiveBottom"
              type="text"
              v-model="formInfo.phone"
              @focus="handleInputFocus('phone')"
              @blur="validatePhone(formInfo.phone)"
              @input="handlePhoneInput"
            />
          </div>
        </div>
        <div class="inputPhoneRightSide">
          <i class="bi bi-question-circle"></i>
          <div class="flagContainer" @click="togglePhone">
            <span class="inputSpanBottom"
              ><country-flag :country="phoneCountry.flag" size="normal"
            /></span>
            <i class="bi bi-chevron-up"></i>
            <div class="flags" v-if="openPhoneSelector">
              <span
                v-for="phone in phoneNumbers"
                :key="phone"
                @click.stop="selectPhone(phone)"
                >{{ phone.name }}</span
              >
            </div>
          </div>
        </div>
        <div v-if="errors.phone" class="error">
          {{ errors.phone }}
        </div>
      </div>
    </div>
  </div>
  <div class="userOnContainer" v-else>
    <div class="userOnTop">
      <span class="account">Account</span>
      <span class="userInfo">{{ user.email }}</span>
    </div>
    <div class="userShippingAddress">
      <span class="account">Ship to</span>
      <div class="userAddressesContainer">
        <div
          class="warningInfo"
          v-if="selectedAddress && Object.keys(errors).length > 0"
        >
          <i class="bi bi-exclamation-circle"></i>
          <span>Selected address is incomplete.</span>
          <span class="updateAddressSpan" @click.stop="toggleAddressValidator"
            >Update address</span
          >
          <span>or select a different address.</span>
        </div>
        <div class="userAddresses">
          <div
            class="userAddress"
            v-for="address in user.addresses"
            :key="address._id"
            @click="selectAddress(address)"
            :class="{
              userAddressActive: selectedAddress?._id === address._id,
            }"
          >
            <i
              class="bi bi-record-circle-fill"
              v-if="selectedAddress?._id === address._id"
            ></i>
            <i class="bi bi-circle" v-else></i>
            <div class="'userAddressesInfo',">
              <div
                class="userAddressesInfoTop"
                :class="{
                  userAddressesInfoTopActive:
                    selectedAddress?._id === address._id,
                }"
              >
                <span>{{ address?.firstName }} {{ address?.lastName }},</span>
                <span>{{ address?.address1 }} {{ address?.address2 }}</span>
              </div>
              <div class="userAddressesInfoBottom">
                <span>{{ address?.city }} {{ address?.postalCode }},</span>
                <span>{{ address?.country }}</span>
              </div>
            </div>
          </div>
          <div class="useOtherAddress" @click.stop="openNewAddress">
            <i class="bi bi-plus-lg"></i>
            <span class="diffAddress">Use a different address</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="shippingMethod">
    <h5>Shipping method</h5>
    <div v-if="isCountryValid" class="freeShippingMethod">
      <span>Free Shipping</span>
      <span>Free</span>
    </div>
    <input
      v-else
      class="inputTextMethod"
      type="text"
      disabled
      placeholder="Enter your shipping address to view available shipping methods"
    />
  </div>
  <UserAddressValidation
    v-if="openAddressValidator"
    :address="selectedAddress"
    :countries="countries"
    :phoneNumbers="phoneNumbers"
    :onToggleAddressValidator="toggleAddressValidator"
    @address-updated="handleAddressUpdated"
  />
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import CountryFlag from "vue-country-flag-next";
import UserAddressValidation from "./UserAddressValidation.vue";
import client from "../../api/client";

const phoneNumbers = [
  { name: "Poland(+48)", flag: "pl" },
  { name: "Germany(+49)", flag: "de" },
  { name: "England(+44)", flag: "gb" },
  { name: "United States(+1)", flag: "us" },
  { name: "Spain(+34)", flag: "es" },
  { name: "Italy(+39)", flag: "it" },
  { name: "The Czech Republic(+420)", flag: "cz" },
];

const props = defineProps({
  formInfoProps: {
    type: Object,
  },
  countries: {
    type: Array,
  },
  formInfo: { type: Object },
  errors: { type: Object },
  selectedAddress: { type: Object },
});

const emit = defineEmits(["update:selectAddress"]);

const router = useRouter();

const authStore = useAuthStore();
const user = authStore.user;

const activeInput = ref("");
const openCountrySelector = ref(false);
const openPhoneSelector = ref(false);
const checked = ref(false);
const isInputActive = ref(false);
const phoneCountry = ref(phoneNumbers[0]);
const openAddressValidator = ref(false);

const loginNavigation = () => {
  router.push("/login");
};

const toggleAddressValidator = () => {
  openAddressValidator.value = !openAddressValidator.value;
};

const openNewAddress = () => {
  emit("update:selectAddress", null);
  openAddressValidator.value = !openAddressValidator.value;
};

const setActiveInput = (inputName) => {
  activeInput.value = inputName;
  nextTick(() => {
    const activeInputField = document.querySelector(
      `.inputContainer[data-input="${inputName}"] .inputActiveBottom`
    );
    if (activeInputField) activeInputField.focus();
  });
};

const handleClickOutside = (event) => {
  if (
    !event.target.closest(".inputContainer") &&
    !event.target.closest(".inputContainerBox")
  ) {
    activeInput.value = "";
  }
  if (
    !event.target.closest(".countries") &&
    !event.target.closest(".inputContainerBox")
  ) {
    openCountrySelector.value = false;
  }
};

function handleInputFocus(inputName) {
  activeInput.value = inputName;
}

function handleInputBlur(inputName) {
  if (activeInput.value === inputName) {
    activeInput.value = "";
  }
}

function handleInputChange() {
  isInputActive.value = true;
}

const handlePhoneInput = (event) => {
  props.formInfo.phone = event.target.value.replace(/\D/g, "");
};

const toggleCheck = () => {
  checked.value = !checked.value;
};

const toggleCountry = () => {
  openCountrySelector.value = !openCountrySelector.value;
};

const togglePhone = () => {
  openPhoneSelector.value = !openPhoneSelector.value;
};

const selectCountry = (selectedCountry) => {
  props.formInfoProps.country = selectedCountry;
  openCountrySelector.value = false;
  validateCountry(selectedCountry);
};

const selectPhone = (selectedPhone) => {
  phoneCountry.value = selectedPhone;
  openPhoneSelector.value = false;
};

const selectAddress = (address) => {
  emit("update:selectAddress", address);
  validateFormUser(address);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    props.errors.email = "Email is required.";
  } else if (!email.match(emailRegex)) {
    props.errors.email = "Please enter a valid email address.";
  } else {
    delete props.errors.email;
  }
};

const validateCountry = (country) => {
  if (!country || country === "--Select country") {
    props.errors = "Select country.";
  } else {
    delete props.errors.country;
  }
};

const validateFirstName = (firstName) => {
  if (!firstName.trim()) {
    props.errors.firstName = "First name is required.";
  } else {
    delete props.errors.firstName;
  }
};

const validateLastName = (lastName) => {
  if (!lastName.trim()) {
    props.errors.lastName = "Last name is required.";
  } else {
    delete props.errors.lastName;
  }
};

const validateAddress = (address) => {
  if (!address.trim()) {
    props.errors.address = "Address is required.";
  } else {
    delete props.errors.address;
  }
};

const validatePostalCode = (postalCode) => {
  if (!postalCode.trim()) {
    props.errors.postalCode = "Postal code is required.";
  } else {
    delete props.errors.postalCode;
  }
};

const validateCity = (city) => {
  if (!city.trim()) {
    props.errors.city = "City is required.";
  } else {
    delete props.errors.city;
  }
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{9}$/;
  if (!phoneRegex.test(phone)) {
    props.errors.phone = "Enter a valid phone number";
    return false;
  }
  delete props.errors.phone;
  return true;
};

const validateFormUser = (address) => {
  validateEmail(user.email);
  validateCountry(address.country);
  validateFirstName(address.firstName);
  validateLastName(address.lastName);
  validateAddress(address.address1);
  validatePostalCode(address.postalCode);
  validateCity(address.city);
  validatePhone(address.mobileNo);

  return Object.values(props.errors).some(
    (error) => error !== "" && error !== null && error !== false
  );
};

const fetchUserData = async () => {
  try {
    const res = await client.get(`user/${user._id}`);
    authStore.setUser(res.data.user);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const handleAddressUpdated = (updatedAddress) => {
  const index = user.addresses.findIndex(
    (address) => address._id === updatedAddress._id
  );

  if (index !== -1) {
    user.addresses[index] = { ...user.addresses[index], ...updatedAddress };
  } else {
    user.addresses.push(updatedAddress);
  }

  user.addresses = [...user.addresses];

  if (
    props.selectedAddress &&
    props.selectedAddress._id === updatedAddress._id
  ) {
    emit("update:selectAddress", updatedAddress);
  } else if (!props.selectedAddress && updatedAddress._id) {
    emit("update:selectAddress", updatedAddress);
  }
  fetchUserData();
};

const isCountryValid = computed(() => {
  const activeCountry =
    props.countries.includes(props.formInfoProps.country) ||
    props.countries.includes(props.selectedAddress?.value?.country);
  return activeCountry;
});

onMounted(() => {
  if (user && user.addresses) {
    const defaultAddress = user.addresses.find((address) => address.default);
    if (defaultAddress) {
      props.selectedAddress.value = defaultAddress;
    }
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => props.selectedAddress,
  (newAddress) => {
    if (newAddress) {
      validateFormUser(newAddress);
    }
  }
);

watch(
  () => Object.keys(props.errors),
  (newKeys) => {
    console.log("Errors keys changed:", newKeys);
    console.log(props.errors);
  },
  { deep: true }
);
</script>

<style scoped>
.noUserContainer {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

h4 {
  margin-bottom: 0;
}

.lTop {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.lTopTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login {
  font-size: 13px;
  text-decoration: underline;
  color: var(--primary);
  cursor: pointer;
}

.inputErrorContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

.inputErrorContainerRow {
  width: 48%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

.inputContainer {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid rgb(80, 75, 75);
  cursor: text;
  z-index: 11;
}

.has-error {
  border: 1px solid var(--primary) !important;
}

.active {
  outline: 1px solid var(--primary);
}

.inputText {
  color: rgb(80, 75, 75);
  font-size: 14px;
  font-weight: 300;
}

.error {
  font-size: 13px;
  font-weight: 300;
  color: var(--primary);
}

.inputActive {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.inputActiveTop {
  font-size: 13px;
  font-weight: 300;
}

.inputActiveBottom {
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  color: #fff;
}

.bi-record-circle-fill {
  color: var(--primary);
}

.checkInput {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
  cursor: pointer;
}

.emailCheckboxSpan {
  font-size: 13px;
  font-weight: 300;
}

input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 0;
  height: 0;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 1px solid rgb(80, 75, 75);
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s;
}

.custom-checkbox::after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

input[type="checkbox"]:checked + .custom-checkbox::after {
  display: block;
}

input[type="checkbox"]:checked + .custom-checkbox {
  background-color: var(--primary);
  border-color: var(--primary);
}

.delivery {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

select {
  height: 50px;
  background-color: transparent;
  border-radius: 5px;
  outline: 1px solid rgb(80, 75, 75);
  border: none;
  padding: 10px;
  color: #fff;
}

option {
  color: black;
}

.inputContainerBox {
  position: relative;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid rgb(80, 75, 75);
  cursor: pointer;
}

.inputLeft {
  display: flex;
  flex-direction: column;
}

.inputLeft span {
  font-size: 14px;
  font-weight: 300;
}

.inputSpanTop {
  font-size: 13px !important;
  color: grey;
}

.countries {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 2px;
  border-radius: 5px;
  background-color: #fff;
  color: black;
  cursor: pointer;
  overflow-y: scroll;
  z-index: 99;
}

.countries span:hover {
  background-color: grey;
  color: #fff;
}

.inputRow {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.phoneInput {
  position: relative;
}

.inputPhoneRightSide {
  position: absolute;
  top: 6px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: grey;
}

.flagContainer {
  display: flex;
  align-items: center;
  z-index: 999;
}

.bi-chevron-up {
  margin-left: 10px;
}

.flags {
  position: absolute;
  bottom: 45px;
  right: -5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
  z-index: 999;
}

.flags span {
  padding: 0 10px;
}

.flags span:hover {
  background-color: grey;
  color: #fff;
}

.userOnContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.userOnTop {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
  border-top: 1px solid rgb(70, 66, 66);
  border-bottom: 1px solid rgb(70, 66, 66);
}

.account {
  font-size: 14px;
  color: lightgrey;
}

.userInfo {
  font-size: 14px;
  font-weight: 300;
}

.userShippingAddress {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.userAddressesContainer {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.warningInfo {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  color: black;
  border-radius: 10px;
}

.warningInfo span {
  font-size: 14px;
  font-weight: 300;
}

.bi-exclamation-circle {
  margin-right: 10px;
  color: red;
  font-size: 24px;
}

.updateAddressSpan {
  text-decoration: underline;
  cursor: pointer;
  margin: 0 2px;
}

.userAddresses {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.userAddress {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  cursor: pointer;
}

.userAddressActive {
  background-color: #fff;
  border-radius: 10px;
}

.userAddressesInfo {
  display: flex;
  flex-direction: column;
}

.userAddressesInfoTop {
  display: flex;
  gap: 5px;
  color: #fff;
  font-weight: 300;
  cursor: pointer;
  font-size: 14px;
}

.userAddressesInfoTopActive {
  color: black;
}

.userAddressesInfoBottom {
  display: flex;
  gap: 5px;
  color: grey;
  font-weight: 300;
  font-size: 14px;
}

.useOtherAddress {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.bi-plus-lg {
  font-size: 20px;
  color: var(--primary);
}

.diffAddress {
  font-size: 14px;
  font-weight: 30;
  color: var(--primary);
}

.shippingMethod {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.freeShippingMethod {
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  border: 1px solid var(--primary);
  border-radius: 5px;
}

.freeShippingMethod span {
  font-weight: 300;
  font-size: 14px;
}

.inputTextMethod {
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-weight: 300;
  font-size: 14px;
  color: lightgrey;
  background-color: rgb(37, 35, 35);
}

@media (max-width: 800px) {
  .inputContainer {
    width: 100%;
  }
  .inputActive {
    width: 100%;
  }

  .inputActiveTop {
    font-size: 12px;
    width: 100%;
  }

  .optional {
    width: 200px !important;
  }
}
</style>
