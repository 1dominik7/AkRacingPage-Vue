import { defineStore } from "pinia";
import client from "../../api/client";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [],
  }),
  actions: {
    async fetchOrders(userId) {
      try {
        const res = await client.get(`orders/user/${userId}`);
        this.orders = res.data.userOrders;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
  },
});
