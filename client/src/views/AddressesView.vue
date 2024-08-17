<template>
  <div class="addressesContainer">
    <h1>Addresses</h1>
    <button class="addAddress" @click="openAddressHandler">Add address</button>
    <div class="popup" v-if="addAddressPopup">
      <h3>Add Address</h3>
      <div class="validationContainer">
        <div class="rowInputs">
          <div class="inputContainer">
            <span>First name</span>
            <input v-model="form.firstName" type="text" />
          </div>
          <div class="inputContainer">
            <span>Last name</span>
            <input v-model="form.lastName" type="text" />
          </div>
        </div>
        <div class="inputContainer">
          <span>Company</span>
          <input v-model="form.company" type="text" />
        </div>
        <div class="inputContainer">
          <span>Address1</span>
          <input v-model="form.address1" type="text" />
        </div>
        <div class="inputContainer">
          <span>Address2</span>
          <input v-model="form.address2" type="text" />
        </div>
        <div class="rowInputs">
          <div class="inputContainer">
            <span>City</span>
            <input v-model="form.city" type="text" />
          </div>
          <div class="selectContainer">
            <span>Country</span>
            <div class="selectDisplay" @click="countrySelector">
              <span>{{ selectedCountry }}</span>
              <i class="bi bi-chevron-down" v-if="openCountrySelector"></i>
              <i class="bi bi-chevron-up" v-else></i>
            </div>
            <div class="selectList" v-if="openCountrySelector">
              <span
                v-for="(country, index) in countries"
                :key="index"
                @click="selectCountry(country)"
                >{{ country }}</span
              >
            </div>
          </div>
        </div>
        <div class="rowInputs">
          <div class="inputContainer">
            <span>Postal/Zip code</span>
            <input v-model="form.postalCode" type="text" />
          </div>
          <div class="inputContainer">
            <span>Phone</span>
            <input v-model="form.mobileNo" type="text" />
          </div>
        </div>
        <div class="checkboxContainer" @click="toggleCheck">
          <input class="checkbox" type="checkbox" v-model="isDefault" />
          <span>Set as default address</span>
        </div>
      </div>
      <button class="submitAddress" @click="addAddress">Add address</button>
      <button class="cancelAddress" @click="openAddressHandler">Cancel</button>
    </div>
    <div class="addresses" v-if="sortedAddress.length > 0">
      <div
        class="savedAddress"
        v-for="(address, index) in sortedAddress"
        :key="index"
      >
        <EditAddress
          :address="address"
          :countries="countries"
          :fetchUpdatedUser="fetchUpdatedUser"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import EditAddress from "@/components/EditAddress.vue";
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from "vue";
import client from "../../api/client";

const countries = [
  "Poland",
  "Germany",
  "England",
  "United States",
  "Spain",
  "Italy",
  "The Czech Republic",
];

const authStore = useAuthStore();
const userId = authStore.user._id;

const addAddressPopup = ref(false);
const addresses = ref(authStore.user.addresses || []);
const openCountrySelector = ref(false);
const isDefault = ref(false);
const selectedCountry = ref(countries[0]);
const form = ref({
  firstName: "",
  lastName: "",
  company: "",
  address1: "",
  address2: "",
  city: "",
  postalCode: "",
  mobileNo: "",
});

const openAddressHandler = () => {
  addAddressPopup.value = !addAddressPopup.value;
};

const countrySelector = () => {
  openCountrySelector.value = !openCountrySelector.value;
};

const selectCountry = (country) => {
  selectedCountry.value = country;
  openCountrySelector.value = false;
};

const toggleCheck = () => {
  isDefault.value = !isDefault.value;
};

const clearForm = () => {
  form.value.firstName = "";
  form.value.lastName = "";
  form.value.company = "";
  form.value.address1 = "";
  form.value.address2 = "";
  form.value.city = "";
  form.value.zipCode = "";
  form.value.phone = "";
  selectedCountry.value = countries[0];
  isDefault.value = false;
};

const addAddress = async () => {
  const address = {
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    address1: form.value.address1,
    address2: form.value.address2,
    city: form.value.city,
    country: selectedCountry.value,
    postalCode: form.value.postalCode,
    mobileNo: form.value.mobileNo,
    isDefault: isDefault.value,
  };

  try {
    const res = await client.post(
      `user/address/${userId}`,
      address,
      {
        withCredentials: true,
      }
    );
    clearForm();
    fetchUpdatedUser();
  } catch (error) {
    console.error("Error submitting product:", error);
  }
};

const fetchUpdatedUser = async () => {
  try {
    const res = await client.get(`user/${userId}`, {
      withCredentials: true,
    });
    authStore.setUser(res.data.user);
    addresses.value = res.data.user.addresses;
  } catch (error) {
    console.error("Error fetching updated user data:", error);
  }
};

const sortedAddress = computed(() => {
  return addresses.value.slice().sort((a, b) => b.default - a.default);
});
</script>

<style scoped>
.addressesContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 50px 0px;
}

.addAddress {
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  background: grey;
  color: #fff;
  cursor: pointer;
  margin-bottom: 30px;
}

.popup {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
}

.validationContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.rowInputs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.inputContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input {
  padding: 10px;
  outline: none;
  border: 1px solid rgb(80, 75, 75);
  background-color: transparent;
  color: #fff;
}

.selectContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.selectDisplay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid rgb(80, 75, 75);
  cursor: pointer;
}

.selectList {
  position: absolute;
  bottom: 50px;
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
  color: black;
  padding: 5px;
  border-radius: 5px;
}

.selectList span:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.selectList span:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.selectList span:hover {
  background-color: grey;
  color: #fff;
  cursor: pointer;
}

.selectList span {
  padding: 5px;
  background-color: #fff;
}

.checkboxContainer {
  display: flex;
  align-self: flex-start;
  gap: 10px;
  cursor: pointer;
}

.checkbox span {
  font-size: 14px;
}

.submitAddress {
  width: 200px;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  background: var(--primary);
  color: #fff;
  cursor: pointer;
  margin-top: 30px;
}

.cancelAddress {
  width: 200px;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  background: grey;
  color: #fff;
  cursor: pointer;
}

.addresses {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #fff;
  margin-bottom: 20px;
}

.savedAddress {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid rgb(80, 75, 75);
}

.default {
  font-weight: 300;
  margin-bottom: 15px;
}

.nameContainer {
  display: flex;
  gap: 5px;
}

.buttonContainer {
  display: flex;
  margin-top: 10px;
  gap: 20px;
}

.edit,
.update {
  width: 150px;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  font-size: 14px;
  background: var(--primary);
  color: #fff;
  cursor: pointer;
}

.delete {
  width: 150px;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  clip-path: polygon(5% 0%, 100% 0, 95% 100%, 0% 100%);
  font-size: 14px;
  background: grey;
  color: #fff;
  cursor: pointer;
}

.editForm {
  width: 100%;
  margin-top: 50px;
}

@media (max-width: 800px) {
  .rowInputs {
    flex-direction: column;
  }

  .submitAddress {
    align-self: center;
  }

  .cancelAddress {
    align-self: center;
  }
}
</style>
