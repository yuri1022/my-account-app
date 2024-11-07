<script setup>
import GoogleLogin from './login/GoogleLogin.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './store/user';

const router = useRouter();
const userStore = useUserStore();
const userInfo = ref(null);

function navigateToHome() {
  router.push('/');
}

// 使用者資訊監聽
userStore.$subscribe((_, state) => {
  userInfo.value = state.userInfo;
});

onMounted(() => {
  if (!userInfo.value) {
    userInfo.value = userStore.userInfo;
  }
});
</script>

<template>
  <div>
    <nav>
      <div class="nav-left">
        <div class="title" @click="navigateToHome"> 天天記帳 </div>
      </div>
      <div class="nav-right">
        <GoogleLogin v-if="!userInfo" />
        <div v-else>
          <img :src="userInfo.imageUrl" alt="Profile Picture" />
          <p>歡迎, {{ userInfo.name }}</p>
          <p>Email: {{ userInfo.email }}</p>
          <button @click="userStore.logout">登出</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-left .title {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
