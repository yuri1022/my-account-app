<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  record: {
    type: Object,
    default: () => ({
      id: null,
      categoryType: '支出',
      category: '',
      amount: '',
      description: '',
      date: '',
    }),
  },
  mode: {
    type: String,
    default: 'add', // 'add' 或 'edit'
  },
});
const emits = defineEmits(['submit', 'close']);

const formRecord = ref({ ...props.record });
const categories = ref(['飲食費', '交通費', '娛樂費', '醫療費', '其他']);

// 監聽傳入的 record 值變動並更新 formRecord
watch(
  () => props.record,
  (newRecord) => {
    formRecord.value = { ...newRecord };
  },
  { immediate: true }
);

// 提交表單
const handleSubmit = () => {
  emits('submit', { ...formRecord.value });
  resetForm();
};

// 重置表單
const resetForm = () => {
  formRecord.value = {
    id: null,
    categoryType: '支出',
    category: '',
    amount: '',
    description: '',
    date: '',
  };
};
</script>

<template>
  <div>
    <h1>{{ mode === 'add' ? '新增記錄' : '編輯記錄' }}</h1>
    <form @submit.prevent="handleSubmit">
      <label for="categoryType">類別類型：</label>
      <select v-model="formRecord.categoryType">
        <option value="收入">收入</option>
        <option value="支出">支出</option>
      </select>

      <label for="category">類別：</label>
      <select v-model="formRecord.category">
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>

      <label for="amount">金額：</label>
      <input type="number" v-model="formRecord.amount" required />

      <label for="description">描述：</label>
      <input type="text" v-model="formRecord.description" />

      <label for="date">日期：</label>
      <input type="date" v-model="formRecord.date" />

      <button type="submit">{{ mode === 'add' ? '新增' : '更新' }}</button>
      <button type="button" @click="$emit('close')">取消</button>
    </form>
  </div>
</template>
