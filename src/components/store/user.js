// store/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    login(userInfo) {
      this.userInfo = {
        name: userInfo.name || '未提供名稱',
        email: userInfo.email || '未提供電子郵件',
        imageUrl: userInfo.imageUrl || 'https://example.com/default-image.png',
      };
    },
    logout() {
      this.userInfo = null;
    },
  },
});
