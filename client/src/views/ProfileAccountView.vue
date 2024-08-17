<template>
  <div class="profileAccount">
    <div class="paMid">
      <h2>My account</h2>
      <div class="adminPanel" @click="adminPanelNavigator" v-if="user?.isAdmin">
        Admin Panel
      </div>
      <button @click="logoutHandler">Logout</button>
    </div>
    <div class="paBottom">
      <div class="paOrders">
        <h5>Order History</h5>
        <div class="paOrderHistory">
          <span v-if="ordersStore?.orders?.length === 0"
            >You haven't placed any orders yet.</span
          >
          <div class="paOrderHistoryItems" v-else @click="usersOrdersNavigator">
            <span class="viewOrders"
              >View orders ({{ ordersStore?.orders?.length }})</span
            >
          </div>
        </div>
      </div>
      <div class="paAddresses">
        <span class="addressTitle">Account details</span>
        <div class="paAccountInfo">
          <span>{{ user.firstName }}</span>
          <span v-if="user.lastName">{{ user.lastName }}</span>
          <span>{{ user.email }}</span>
        </div>
        <span class="viewAddresses" @click="addressesNavigation"
          >View addresses ({{
            user?.addresses?.length === undefined ? 0 : user?.addresses?.length
          }})</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useOrdersStore } from "@/stores/orders";
import client from "../../api/client";

const authStore = useAuthStore();
const ordersStore = useOrdersStore();

const { user } = authStore;
const router = useRouter();

const logoutHandler = async () => {
  try {
    await client.post("user/logout", null);
    authStore.logout();
    router.push("/");
  } catch (err) {
    console.error("Error navigating after logout:", err);
  }
};

const getUsersOrders = async () => {
  if (authStore.user && authStore.user._id) {
    await ordersStore.fetchOrders(authStore.user._id);
  } else {
    console.error("User ID is not available");
  }
};

const addressesNavigation = () => {
  router.push("/profile/addresses");
};

const adminPanelNavigator = () => {
  router.push("/adminPanel");
};

const usersOrdersNavigator = () => {
  router.push("/usersOrders");
};

onMounted(() => {
  getUsersOrders();
});
</script>

<style scoped>
.profileAccount {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 30px;
  padding: 70px;
  border-bottom: solid 1px rgb(80, 75, 75);
}

.paMid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.paMid button,
.adminPanel {
  width: 100px;
  align-self: center;
  padding: 5px 10px;
  font-size: 13px;
  color: #fff;
  clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
  background-color: var(--primary);
  border: none;
  cursor: pointer;
}

.paBottom {
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.paOrders {
  color: #fff;
}

.paAddresses {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #fff;
}

.addressTitle {
  font-size: 20px;
}

.paAccountInfo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.viewAddresses,
.viewOrders {
  cursor: pointer;
}

@media (max-width: 800px) {
  .profileAccount {
    min-height: 30vh;
    padding: 50px 20px;
  }

  .paBottom{
    width: 100%;
  }
}
</style>
