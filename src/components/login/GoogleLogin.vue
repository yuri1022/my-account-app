<script setup>
import { ref, onMounted } from 'vue';
import { gapi } from 'gapi-script';
import { useUserStore } from '../store/user';

const errorMessage = ref('');
const userStore = useUserStore();

const initGoogleAuth = () => {
  gapi.load('auth2', () => {
    gapi.auth2.init({
      client_id: '620820097919-3pk02q99eb8hloflhe5nrim8ku7c8f5v.apps.googleusercontent.com',
    });
  });
};

const googleSignIn = async () => {
  try {
    const auth2 = gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();
    const userInfo = googleUser.getBasicProfile();
    console.log('userInfo', userInfo); // 確認這裡輸出是否正確

    // 使用 userInfo 的屬性來儲存使用者資料
    userStore.login({
      name: userInfo.getName() || '未提供名稱',
      email: userInfo.getEmail() || '未提供電子郵件',
      imageUrl: userInfo.getImageUrl() || 'https://example.com/default-image.png',
    });
  } catch (error) {
    console.error("Google 登入錯誤：", error);
    errorMessage.value = "登入失敗，請稍後再試";
  }
};

// 當組件掛載時初始化 Google 認證
onMounted(() => {
  initGoogleAuth();
});
</script>

<template>
  <div>
    <button @click="googleSignIn">使用 Google 登入</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
