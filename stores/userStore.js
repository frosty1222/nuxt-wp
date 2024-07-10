import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userInfo: {},
  }),

  actions: {
    setUserInfo(value) {
      this.userInfo = value;
    },

    login(userInfo) {
      this.userInfo = userInfo || {};
    },

    logOut() {
      this.userInfo = {};
    },

    checkAuth() {
      if (Object.keys(this.userInfo).length) {
        return true;
      } else {
        return false;
      }
    },
  },

  persist: true,
});
