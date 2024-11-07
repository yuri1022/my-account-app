<script setup>
import Nav from './components/Nav.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Nav></Nav>
  <RouterView />

</template>

<style scoped>
body {
  background-color: #ffe6f0; /* 柔和粉紅背景 */
  font-family: Arial, sans-serif;
  color: #5c005c; /* 深紫色文字，增加對比 */
}

h1, h2 {
  color: #ff66b2; /* 較亮的粉紅標題 */
}

label {
  color: #a60073;
  font-weight: bold;
}

input, select, button {
  background-color: #ffd1e8; /* 輕粉紅表單背景 */
  border: 1px solid #ff66b2;
  border-radius: 4px;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
}

button {
  background-color: #ff80bf;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e65c99;
}
</style>
