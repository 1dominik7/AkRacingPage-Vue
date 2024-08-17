<template>
  <div class="validationFormContainer">
    <div class="validationBackground"></div>
    <div class="validationForm" ref="dropdownRef">
      <div class="validationTop">
        <h4>Edit address</h4>
        <i @click="onToggleAddressValidator" class="bi bi-x-lg"></i>
      </div>
      <div class="delivery">
        <div class="inputErrorContainer">
          <div
            :class="['inputContainerBox', { 'has-error': errors.country }]"
            @click="toggleCountry"
            ref="countryContainer"
          >
            <div class="inputLeft">
              <span class="inputSpanTop">Country/Region</span>
              <span class="inputSpanBottom">{{ formInfo.country }}</span>
            </div>
            <i class="bi bi-chevron-down"></i>
            <div class="countries" v-if="openCountrySelector">
              <span
                v-for="country in props.countries"
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
          <div class="inputErrorContainer">
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
                  @blur="validateFirstName"
                  @input="handleInputChange"
                />
              </div>
            </div>
            <div v-if="errors.firstName" class="error">
              {{ errors.firstName }}
            </div>
          </div>
          <div class="inputErrorContainer">
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
                v-if="
                  activeInput === 'lastName' || formInfo.lastName.length > 0
                "
              >
                <span class="inputActiveTop">Last Name</span>
                <input
                  class="inputActiveBottom"
                  type="text"
                  v-model="formInfo.lastName"
                  @focus="handleInputFocus('lastName')"
                  @blur="validateLastName"
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
              v-if="activeInput === 'address' || formInfo.address?.length > 0"
            >
              <span class="inputActiveTop">Address</span>
              <input
                class="inputActiveBottom"
                type="text"
                v-model="formInfo.address"
                @focus="handleInputFocus('address')"
                @blur="validateAddress"
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
            class="inputText"
            v-if="activeInput !== 'optional' && !formInfo.optional"
            @click.stop="setActiveInput('optional')"
            >Apartment, suite, etc. (optional)</span
          >
          <div
            class="inputActive"
            v-if="activeInput === 'optional' || formInfo.optional.length > 0"
          >
            <span class="inputActiveTop"
              >Apartment, suite, etc. (optional)</span
            >
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
          <div class="inputErrorContainer">
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
                  @blur="validatePostalCode"
                />
              </div>
            </div>
            <div v-if="errors.postalCode" class="error">
              {{ errors.postalCode }}
            </div>
          </div>
          <div class="inputErrorContainer">
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
                  @blur="validateCity"
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
              v-if="activeInput === 'phone' || formInfo?.phone?.length > 0"
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
                  v-for="phone in props.phoneNumbers"
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
      <div class="buttonContainer">
        <button class="cancelButton" @click="onToggleAddressValidator">
          Cancel
        </button>
        <button class="saveButton" @click="updateAddress">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue";
import CountryFlag from "vue-country-flag-next";
import client from "../../api/client";

const props = defineProps({
  address: {
    type: Object,
  },
  countries: {
    type: Array,
  },
  phoneNumbers: {
    type: Array,
  },
  onToggleAddressValidator: Function,
});

const emit = defineEmits(["address-updated"]);

const authStore = useAuthStore();
const userId = authStore.user._id;
const formInfo = reactive({
  firstName: props?.address?.firstName || "",
  lastName: props?.address?.lastName || "",
  address: props?.address?.address1 || "",
  optional: props?.address?.address2 || "",
  postalCode: props?.address?.postalCode || "",
  city: props?.address?.city || "",
  phone: props?.address?.mobileNo || null,
  country: props?.address?.country || "--Select country",
});

const errors = reactive({
  country: false,
  firstName: false,
  lastName: false,
  address: false,
  postalCode: false,
  city: false,
  phone: false,
});

const phoneCountry = ref(props.phoneNumbers[0]);
const openCountrySelector = ref(false);
const activeInput = ref("");
const openPhoneSelector = ref(false);
const isInputActive = ref(false);
const dropdownRef = ref(null);

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
  formInfo.phone = event.target.value.replace(/\D/g, "");
};

const toggleCountry = () => {
  openCountrySelector.value = !openCountrySelector.value;
};

const togglePhone = () => {
  openPhoneSelector.value = !openPhoneSelector.value;
};

const selectCountry = (selectedCountry) => {
  formInfo.country = selectedCountry;
  openCountrySelector.value = false;
  validateCountry();
};

const selectPhone = (selectedPhone) => {
  phoneCountry.value = selectedPhone;
  openPhoneSelector.value = false;
};

const validateCountry = () => {
  if (formInfo.country === "--Select country" || !formInfo.country) {
    errors.country = "Select country.";
  } else {
    delete errors.country;
  }
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

const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    props.onToggleAddressValidator();
  }
};

const handleClickOutsideRef = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    props.onToggleAddressValidator();
  }
};

const validateFirstName = () => {
  if (!formInfo.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else {
    delete errors.firstName;
  }
};

const validateLastName = () => {
  if (!formInfo.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else {
    delete errors.lastName;
  }
};

const validateAddress = () => {
  if (!formInfo.address?.trim()) {
    errors.address = "Address is required.";
  } else {
    delete errors.address;
  }
};

const validatePostalCode = () => {
  if (!formInfo.postalCode.trim()) {
    errors.postalCode = "Postal code is required.";
  } else {
    delete errors.postalCode;
  }
};

const validateCity = () => {
  if (!formInfo.city.trim()) {
    errors.city = "City is required.";
  } else {
    delete errors.city;
  }
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{9}$/;
  if (!phoneRegex.test(phone)) {
    errors.phone = "Enter a valid phone number";
    return false;
  }
  delete errors.phone;
  return true;
};

const validateForm = () => {
  validateCountry();
  validateFirstName();
  validateLastName();
  validateAddress();
  validatePostalCode();
  validateCity();
  validatePhone(formInfo.phone);

  return Object.values(errors).some(
    (error) => error !== "" && error !== null && error !== false
  );
};

const isSubmitDisabled = computed(() => {
  return Object.values(errors).some(
    (error) => error !== "" && error !== null && error !== false
  );
});

const fetchUpdatedUser = async () => {
  try {
    const res = await client.get(`user/${userId}`);
    authStore.setUser(res.data.user);
    if (props?.address?._id) {
      const updatedAddress = res.data?.user?.addresses.find(
        (addr) => addr?._id === props?.address?._id
      );
      updateFormInfo(updatedAddress);
    } else {
      const newAddress =
        res.data?.user?.addresses[res.data.user.addresses.length - 1];
      updateFormInfo(newAddress);
    }
  } catch (error) {
    console.error("Error fetching updated user data:", error);
  }
};

const updateFormInfo = (updatedAddress) => {
  if (updatedAddress) {
    formInfo.firstName = updatedAddress?.firstName;
    formInfo.lastName = updatedAddress?.lastName;
    formInfo.address = updatedAddress?.address1;
    formInfo.optional = updatedAddress?.address2;
    formInfo.postalCode = updatedAddress?.postalCode;
    formInfo.city = updatedAddress?.city;
    formInfo.phone = updatedAddress?.mobileNo;
    formInfo.country = updatedAddress?.country;
  }
};

const updateAddress = async () => {
  validateForm();
  if (!isSubmitDisabled.value) {
    const form = {
      _id: props?.address?._id,
      firstName: formInfo.firstName,
      lastName: formInfo.lastName,
      company: "",
      address1: formInfo.address,
      address2: formInfo.optional,
      city: formInfo.city,
      postalCode: formInfo.postalCode,
      mobileNo: formInfo.phone,
      default: props?.address?.default,
      country: formInfo.country,
    };

    if (props?.address?._id) {
      try {
        await client.put(
          `user/address/${userId}/${props.address?._id}`,
          form
        );
        await fetchUpdatedUser();
        emit("address-updated", form);
        props.onToggleAddressValidator();
      } catch (error) {
        console.error("Error updating address:", error);
      }
    } else {
      try {
        await client.post(
          `user/address/${userId}`,
          form
        );
        await fetchUpdatedUser();
        emit("address-updated", form);
        props.onToggleAddressValidator();
      } catch (error) {
        console.error("Error updating address:", error);
      }
    }
  } else {
    console.log("Form contains errors:", errors);
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("click", handleClickOutsideRef);
  document.addEventListener("keydown", handleEscapeKey);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsideRef);
  document.removeEventListener("keydown", handleEscapeKey);
});
</script>

<style scoped>
.validationFormContainer {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  backdrop-filter: blur(6px);
}

.validationBackground {
  background-color: black;
  opacity: 0.8;
  width: 100%;
  height: 100%;
}

.validationForm {
  position: fixed;
  top: 40%;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 20px;
  background: black;
  border-radius: 10px;
  z-index: 999;
}

.validationTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h4 {
  margin-bottom: 0 !important;
}

.bi-x-lg {
  font-size: 24px;
  color: lightgrey;
  cursor: pointer;
}

.inputErrorContainer {
  width: 100%;
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
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
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

.buttonContainer {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
}

.buttonContainer button {
  width: 100px;
  padding: 10px 0px;
  outline: none;
  border: none;
}

.cancelButton {
  background-color: transparent;
  color: var(--primary);
  text-decoration: underline;
  font-weight: 300;
}

.saveButton {
  background-color: var(--primary);
  color: #fff;
  border-radius: 5px;
}

.buttonContainer button:hover {
  opacity: 0.8;
}

@media (max-width: 800px) {
  .validationForm {
    width: 95%;
    top: 500px;
    padding: 20px 10px;
    border: 1px solid rgb(80, 75, 75);
  }

  .inputRow {
    flex-direction: column;
  }
}
</style>
