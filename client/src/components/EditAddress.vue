<template>
  <span v-if="address.default" class="default">Default</span>
  <div class="nameContainer">
    <span>{{ address?.firstName }}</span>
    <span>{{ address?.lastName }}</span>
  </div>
  <span>{{ address?.company }}</span>
  <span>{{ address?.address1 }}</span>
  <span>{{ address?.address2 }}</span>
  <span>{{ address?.country }}</span>
  <div class="buttonContainer">
    <button class="edit" @click="openEditPopupHandler(address)">Edit</button>
    <button class="delete">Delete</button>
  </div>
  <div class="editForm" v-if="openEditPopup">
    <div class="validationContainer">
      <div class="rowInputs">
        <div class="inputContainer">
          <span>First name</span>
          <input v-model="editForm.firstName" type="text" />
        </div>
        <div class="inputContainer">
          <span>Last name</span>
          <input v-model="editForm.lastName" type="text" />
        </div>
      </div>
      <div class="inputContainer">
        <span>Company</span>
        <input v-model="editForm.company" type="text" />
      </div>
      <div class="inputContainer">
        <span>Address1</span>
        <input v-model="editForm.address1" type="text" />
      </div>
      <div class="inputContainer">
        <span>Address2</span>
        <input v-model="editForm.address2" type="text" />
      </div>
      <div class="rowInputs">
        <div class="inputContainer">
          <span>City</span>
          <input v-model="editForm.city" type="text" />
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
          <input v-model="editForm.postalCode" type="text" />
        </div>
        <div class="inputContainer">
          <span>Phone</span>
          <input v-model="editForm.mobileNo" type="text" />
        </div>
      </div>
      <div class="checkboxContainer" @click="toggleCheckEdit">
        <input class="checkbox" type="checkbox" v-model="editForm.default" />
        <span>Set as default address</span>
      </div>
      <div class="update" @click="updateAddress">Update address</div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import client from "../../api/client";

const props = defineProps({
  address: Object,
  countries: Array,
  fetchUpdatedUser: Function,
});

const authStore = useAuthStore();
const userId = authStore.user._id;

const editForm = ref({
  _id: "",
  firstName: "",
  lastName: "",
  company: "",
  address1: "",
  address2: "",
  city: "",
  postalCode: "",
  mobileNo: "",
  default: false,
});
const selectedCountry = ref(props.countries[0]);
const openCountrySelector = ref(false);
const openEditPopup = ref(false);

const openEditPopupHandler = (address) => {
  editForm.value = { ...address };
  selectedCountry.value = address.country || props.countries[0];

  openEditPopup.value = !openEditPopup.value;
};

const countrySelector = () => {
  openCountrySelector.value = !openCountrySelector.value;
};

const toggleCheckEdit = () => {
  editForm.value.default = !editForm.value.default;
};

const selectCountry = (country) => {
  selectedCountry.value = country;
  openCountrySelector.value = false;
};

const updateAddress = async () => {
  if (!editForm.value._id) {
    console.error("Error: Address ID is missing.");
    return;
  }
  try {
    await client.put(
      `user/address/${userId}/${editForm.value._id}`,
      {
        ...editForm.value,
        country: selectedCountry.value,
        isDefault: editForm.value.default,
      },
      {
        withCredentials: true,
      }
    );
    await props.fetchUpdatedUser();
    openEditPopupHandler(false);
  } catch (error) {
    console.error("Error updating address:", error);
  }
};
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
}
</style>
