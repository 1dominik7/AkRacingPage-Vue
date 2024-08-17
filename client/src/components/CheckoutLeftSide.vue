<template>
  <div class="leftSide">
    <CheckoutUserAddress
      :formInfoProps="formInfoProps"
      :countries="countries"
      :formInfo="formInfo"
      :errors="errors"
      :selectedAddress="selectedAddress"
      @update:selectAddress="selectAddress"
    />
    <div class="payment">
      <div class="paymentTitle">
        <h4>Payment</h4>
        <span class="paymentDesc"
          >All transactions are secure and encrypted.</span
        >
      </div>
      <div class="paymentCard">
        <div class="topPayment">
          <div class="leftPayment">
            <i class="bi bi-record-circle-fill"></i>
            <span class="paymentSpan">Credit card</span>
          </div>
          <div class="creditCarts">
            <img class="cardImg" src="/images/visaCard.png" alt="" />
            <img class="cardImg" src="/images/mastercard.jpg" alt="" />
          </div>
        </div>
        <div class="formCard">
          <div class="inputErrorContainer">
            <div class="cardNumber">
              <div
                :class="[
                  'inputContainer',
                  {
                    active: activeInput === 'cardNumber',
                    'has-error': paymentErrors.cardNumber,
                  },
                ]"
                @click="setActiveInput('cardNumber')"
                data-input="cardNumber"
              >
                <span
                  class="inputText"
                  v-if="activeInput !== 'cardNumber' && !paymentInfo.cardNumber"
                  @click.stop="setActiveInput('cardNumber')"
                  >Card number</span
                >
                <div
                  class="inputActive"
                  v-if="
                    activeInput === 'cardNumber' ||
                    paymentInfo.cardNumber.length > 0
                  "
                >
                  <span class="inputActiveTop">Card number</span>
                  <input
                    class="inputActiveBottom"
                    type="text"
                    maxlength="19"
                    v-model="formattedCardNumber"
                    @input="handleCardNumberInput"
                    @keydown="restrictNonNumericInput"
                    @focus="handleInputFocus('cardNumber')"
                    @blur="validateCardNumber"
                  />
                </div>
              </div>
              <i class="bi bi-lock"></i>
            </div>
            <div v-if="paymentErrors.cardNumber" class="error">
              {{ paymentErrors.cardNumber }}
            </div>
          </div>
          <div class="inputRow">
            <div class="inputErrorContainerRow">
              <div
                :class="[
                  'inputContainer',
                  {
                    active: activeInput === 'expiryDate',
                    'has-error': paymentErrors.expiryDate,
                  },
                ]"
                @click="setActiveInput('expiryDate')"
                data-input="expiryDate"
              >
                <span
                  class="inputText"
                  v-if="activeInput !== 'expiryDate' && !paymentInfo.expiryDate"
                  @click.stop="setActiveInput('expiryDate')"
                  >Expiration date (MM/YY)</span
                >
                <div
                  class="inputActive"
                  v-if="
                    activeInput === 'expiryDate' ||
                    paymentInfo.expiryDate.length > 0
                  "
                >
                  <span class="inputActiveTop">Expiration date (MM/YY)</span>
                  <input
                    class="inputActiveBottom"
                    type="text"
                    maxlength="5"
                    v-model="formattedExpiryDate"
                    @input="handleInputChangeExpireDate"
                    @keydown="restrictNonNumericInput"
                    @focus="handleInputFocus('expiryDate')"
                    @blur="validateExpiryDate"
                  />
                </div>
              </div>
              <div v-if="paymentErrors.expiryDate" class="error">
                {{ paymentErrors.expiryDate }}
              </div>
            </div>
            <div class="inputErrorContainerRow">
              <div
                :class="[
                  'inputContainer',
                  {
                    active: activeInput === 'securityCode',
                    'has-error': paymentErrors.securityCode,
                  },
                ]"
                @click="setActiveInput('securityCode')"
                data-input="securityCode"
              >
                <span
                  class="inputText"
                  v-if="
                    activeInput !== 'securityCode' && !paymentInfo.securityCode
                  "
                  @click.stop="setActiveInput('securityCode')"
                  >Security code</span
                >
                <div
                  class="inputActive"
                  v-if="
                    activeInput === 'securityCode' ||
                    paymentInfo.securityCode.length > 0
                  "
                >
                  <span class="inputActiveTop">Security code</span>
                  <input
                    class="inputActiveBottom"
                    type="text"
                    maxlength="4"
                    v-model="paymentInfo.securityCode"
                    @input="handleInputChangeSecurityCode"
                    @focus="handleInputFocus('securityCode')"
                    @blur="validateSecurityCode(paymentInfo.securityCode)"
                  />
                </div>
              </div>
              <i class="bi bi-question-circle posAbsolute"></i>
              <div v-if="paymentErrors.securityCode" class="error">
                {{ paymentErrors.securityCode }}
              </div>
            </div>
          </div>
          <div class="nameCard">
            <div class="inputErrorContainer">
              <div
                ref="nameCardContainer"
                :class="[
                  'inputContainer',
                  {
                    active: activeInput === 'nameOnCard',
                    'has-error': paymentErrors.nameOnCard,
                  },
                ]"
                @click="setActiveInput('nameOnCard')"
                data-input="nameOnCard"
              >
                <span
                  class="inputText"
                  v-if="activeInput !== 'nameOnCard' && !paymentInfo.nameOnCard"
                  @click.stop="setActiveInput('nameOnCard')"
                  >Name on card</span
                >
                <div
                  class="inputActive"
                  v-if="
                    activeInput === 'nameOnCard' ||
                    paymentInfo.nameOnCard.length > 0
                  "
                >
                  <span class="inputActiveTop">Name on card</span>
                  <input
                    class="inputActiveBottom"
                    type="text"
                    v-model="paymentInfo.nameOnCard"
                    @input="handleInputChange"
                    @focus="handleInputFocus('nameOnCard')"
                    @blur="validateNameOnCard"
                  />
                </div>
              </div>
              <div v-if="paymentErrors.nameOnCard" class="error">
                {{ paymentErrors.nameOnCard }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="paymentButton" @click="submit">Pay now</button>
    <SuccessfulTransaction
      v-if="openSuccTransaction"
      :openSuccTransaction="openSuccTransaction"
      :order-id="orderId"
      :order-price="orderPrice"
      @close="toggle"
    />
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import axios from "axios";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import SuccessfulTransaction from "./SuccessfulTransaction.vue";
import { useAuthStore } from "@/stores/auth";
import CheckoutUserAddress from "./CheckoutUserAddress.vue";
import client from "../../api/client";

const props = defineProps({
  formInfoProps: {
    type: Object,
    required: false,
  },
  countries: {
    type: Array,
    required: false,
  },
});

const router = useRouter();

const cartStore = useCartStore();
const discountedTotal = computed(() => cartStore.discountedTotal);

const authStore = useAuthStore();
const user = authStore.user;

const activeInput = ref("");
const openCountrySelector = ref(false);
const isInputActive = ref(false);
const selectedAddress = ref(null);

const openSuccTransaction = ref(false);
const orderId = ref(null);
const orderPrice = ref(null);

const formInfo = reactive({
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  optional: "",
  postalCode: "",
  city: "",
  phone: "",
});

const paymentInfo = reactive({
  cardNumber: "",
  expiryDate: "",
  securityCode: "",
  nameOnCard: "",
});

const errors = reactive({
  email: false,
  country: false,
  firstName: false,
  lastName: false,
  address: false,
  postalCode: false,
  city: false,
  phone: false,
});

const paymentErrors = reactive({
  cardNumber: false,
  expiryDate: false,
  securityCode: false,
  nameOnCard: false,
});

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const toggle = () => {
  router.push("/");
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

const restrictNonNumericInput = (event) => {
  const key = event.key;

  if (
    key === "Backspace" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "Tab" ||
    key === "Enter" ||
    key === "Delete"
  ) {
    return;
  }

  if (!/[\d]/.test(key)) {
    event.preventDefault();
  }
};

function handleInputFocus(inputName) {
  activeInput.value = inputName;
}

function handleInputChange() {
  isInputActive.value = true;
}

const selectAddress = (address) => {
  selectedAddress.value = address;
  validateAddressUser(address);
};

function handleCardNumberInput(event) {
  const value = event.target.value.replace(/\D/g, "");
  paymentInfo.cardNumber = value;
}

const handleInputChangeExpireDate = (event) => {
  paymentInfo.expiryDate = event.target.value.replace(/\D/g, "");
};

const handleInputChangeSecurityCode = (event) => {
  paymentInfo.securityCode = event.target.value.replace(/\D/g, "");
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.match(emailRegex)) {
    errors.email = "Please enter a valid email address.";
  } else {
    delete errors.email;
  }
};

const validateCountry = (country) => {
  if (
    country === "--Select country" ||
    country === "" ||
    country === undefined
  ) {
    errors.country = "Select country.";
  } else {
    delete errors.country;
  }
};

const validateFirstName = (firstName) => {
  if (!firstName?.trim()) {
    errors.firstName = "First name is required.";
  } else {
    delete errors.firstName;
  }
};

const validateLastName = (lastName) => {
  if (!lastName?.trim()) {
    errors.lastName = "Last name is required.";
  } else {
    delete errors.lastName;
  }
};

const validateAddress = (address) => {
  if (!address?.trim()) {
    errors.address = "Address is required.";
  } else {
    delete errors.address;
  }
};

const validatePostalCode = (postalCode) => {
  if (!postalCode?.trim()) {
    errors.postalCode = "Postal code is required.";
  } else {
    delete errors.postalCode;
  }
};

const validateCity = (city) => {
  if (!city?.trim()) {
    errors.city = "City is required.";
  } else {
    delete errors.city;
  }
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{9}$/;
  if (!phoneRegex?.test(phone)) {
    errors.phone = "Enter a valid phone number";
    return false;
  }
  delete errors.phone;
  return true;
};

const validateCardNumber = () => {
  const number = paymentInfo.cardNumber.replace(/\s/g, "");
  if (!number) {
    paymentErrors.cardNumber = "Card Number is required";
  } else if (!luhnCheck(number)) {
    paymentErrors.cardNumber = "Invalid Card Number";
  } else {
    delete paymentErrors.cardNumber;
  }
};

function validateExpiryDate() {
  const value = paymentInfo.expiryDate.replace(/\D/g, "");
  if (!/^\d{4}$/.test(value)) {
    paymentErrors.expiryDate = "Invalid format, use MM/YY";
    return;
  }

  const month = parseInt(value.substring(0, 2), 10);
  const year = parseInt(`20${value.substring(2, 4)}`, 10);

  if (month < 1 || month > 12) {
    paymentErrors.expiryDate = "Invalid month";
  } else if (
    year < currentYear ||
    (year === currentYear && month < currentMonth)
  ) {
    paymentErrors.expiryDate = "Card is expired";
  } else {
    delete paymentErrors.expiryDate;
  }
}

const validateSecurityCode = () => {
  if ((paymentErrors.securityCode = !paymentInfo.securityCode)) {
    paymentErrors.securityCode = "CVV is required";
  } else {
    delete paymentErrors.securityCode;
  }
};

const validateNameOnCard = () => {
  if ((paymentErrors.nameOnCard = !paymentInfo.nameOnCard)) {
    paymentErrors.nameOnCard = "Name on Card is required";
  } else {
    delete paymentErrors.nameOnCard;
  }
};

const validateForm = () => {
  validateEmail(formInfo.email || user?.email);
  validateCountry(
    props.formInfoProps.country === "--Select country"
      ? selectedAddress?.value?.country
      : props.formInfoProps.country
  );
  validateFirstName(formInfo.firstName || selectedAddress?.value?.firstName);
  validateLastName(formInfo.lastName || selectedAddress?.value?.lastName);
  validateAddress(formInfo.address || selectedAddress?.value?.address1);
  validatePostalCode(formInfo.postalCode || selectedAddress?.value?.postalCode);
  validateCity(formInfo.city || selectedAddress?.value?.city);
  validatePhone(formInfo.phone || selectedAddress?.value?.mobileNo);
  validateCardNumber();
  validateExpiryDate();
  validateSecurityCode();
  validateNameOnCard();

  const allErrors = Object.values(errors).concat(Object.values(paymentErrors));

  return allErrors.some((error) => error !== "" && error != null);
};

const luhnCheck = (cardNumber) => {
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const submit = async () => {
  const hasErrors = validateForm();

  if (!hasErrors) {
    const toPlainObject = (data) => {
      return JSON.parse(JSON.stringify(data));
    };

    const plainCartItems = toPlainObject(cartStore.items);
    const plainTotalPrice = discountedTotal.value;
    const discount = cartStore.isValidDiscount
      ? cartStore.discountPercentage
      : 0;

    const shippingAddress = {
      country: user
        ? selectedAddress.value.country
        : props.formInfoProps.country,
      firstName: user ? selectedAddress.value.firstName : formInfo.firstName,
      lastName: user ? selectedAddress.value.lastName : formInfo.lastName,
      address: user ? selectedAddress.value.address1 : formInfo.address,
      optional: user ? selectedAddress.value.address2 : formInfo.optional,
      postalCode: user ? selectedAddress.value.postalCode : formInfo.postalCode,
      city: user ? selectedAddress.value.city : formInfo.city,
      phone: user ? selectedAddress.value.mobileNo : formInfo.phone,
    };

    const dataToSend = {
      cartItems: plainCartItems,
      totalPrice: plainTotalPrice,
      discount: discount,
      shippingAddress: shippingAddress,
      email: formInfo.email === "" ? user.email : formInfo.email,
    };
    try {
      const res = await client.post(
        `orders`,
        dataToSend,
        { withCredentials: true }
      );
      const { _id, totalPrice } = res.data.order;

      orderId.value = _id;
      orderPrice.value = totalPrice;
      openSuccTransaction.value = true;

      cartStore.clearCart();
      cartStore.discountPercentage = 0;
      cartStore.isValidDiscount = false;
      props.formInfoProps.discount = "";
    } catch (error) {
      console.error("Error during create order:", error);
    }
  } else {
    console.log("Form contains errors:", errors, paymentErrors);
  }
};

const validateAddressUser = (address) => {
  Object.keys(errors, paymentErrors).forEach((key) => {
    errors[key] = undefined;
    paymentErrors[key] = undefined;
  });

  validateFirstName(address?.firstName) &&
    validateLastName(address?.lastName) &&
    validateAddress(address?.address1) &&
    validatePostalCode(address?.postalCode) &&
    validateCity(address?.city) &&
    validatePhone(address?.mobileNo) &&
    validateCountry(address?.country);
};

const formattedExpiryDate = computed({
  get() {
    return paymentInfo.expiryDate
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{2})$/, "$1/$2")
      .toUpperCase();
  },
  set(value) {
    paymentInfo.expiryDate = value.replace(/\D/g, "");
  },
});

const formattedCardNumber = computed({
  get() {
    return paymentInfo.cardNumber
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  },
  set(value) {
    paymentInfo.cardNumber = value.replace(/\D/g, "");
  },
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

onMounted(() => {
  if (user && user.addresses) {
    const defaultAddress = user.addresses.find((address) => address.default);
    if (defaultAddress) {
      selectedAddress.value = defaultAddress;
    }
  }
});

watch(selectedAddress, (newAddress) => {
  if (newAddress) {
    validateAddressUser(newAddress);
  }
});

watch(
  [() => errors, () => paymentErrors],
  (newValues, oldValues) => {
    const [newErrors, newPaymentErrors] = newValues;
    const [oldErrors, oldPaymentErrors] = oldValues;

    const errorKeysChanged = Object.keys(newErrors).filter(
      (key) => newErrors[key] !== oldErrors[key]
    );

    const paymentErrorKeysChanged = Object.keys(newPaymentErrors).filter(
      (key) => newPaymentErrors[key] !== oldPaymentErrors[key]
    );

    console.log("Error keys changed:", errorKeysChanged);
    console.log("Payment error keys changed:", paymentErrorKeysChanged);

    console.log("New errors:", newErrors);
    console.log("Old errors:", oldErrors);
    console.log("New payment errors:", newPaymentErrors);
    console.log("Old payment errors:", oldPaymentErrors);
  },
  { deep: true }
);
</script>

<style scoped>
.leftSide {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

h4 {
  margin-bottom: 0;
}

.inputErrorContainerRow {
  position: relative;
  width: 48%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
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

.inputRow {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.payment {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.paymentTitle {
  display: flex;
  flex-direction: column;
}

.paymentDesc {
  font-size: 14px;
  color: lightgrey;
  font-weight: 300;
}

.paymentCard {
  display: flex;
  flex-direction: column;
  background-color: rgb(19, 18, 18);
  border-radius: 10px;
  border: none;
}

.topPayment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid var(--primary);
}

.leftPayment {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.bi-record-circle-fill {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #fff;
}

.paymentSpan {
  font-size: 15px;
  font-weight: 300;
}

.creditCarts {
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
}

.cardImg {
  width: 30px;
  height: 25px;
  object-fit: cover;
}

.formCard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 20px;
  border: 1px solid rgb(70, 66, 66);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: none;
}

.cardNumber {
  position: relative;
}

.bi-lock {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: grey;
}

.securityCodeC {
  width: 100%;
  position: relative;
}

.posAbsolute {
  position: absolute;
  top: 12px;
  right: 10px;
  color: darkgrey;
}

.paymentButton {
  padding: 20px;
  background-color: var(--primary);
  outline: none;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

@media (max-width: 800px) {
  .leftSide {
    width: 100%;
  }

  .formCard {
    padding: 15px;
  }

  .inputRow {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }

  .inputErrorContainerRow {
    width: 100%;
  }

  .paymentButton {
    padding: 10px;
  }
}
</style>
