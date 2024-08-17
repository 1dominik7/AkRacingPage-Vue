import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  }),
  actions: {
    loginStart() {
      this.loading = true;
      this.error = null;
    },
    loginSuccess(user) {
      this.user = user;
      this.loading = false;
      this.error = null;
      localStorage.setItem("user", JSON.stringify(user));
    },
    loginFailure(error) {
      this.user = null;
      this.loading = false;
      this.error = error;
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.isAdmin,
  },
});
