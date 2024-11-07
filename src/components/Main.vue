<script setup>
import { ref, computed } from 'vue';
import AddRecord from './AddRecord.vue';
import EditRecord from './EditRecord.vue';

const records = ref(JSON.parse(localStorage.getItem('records') || '[]'));
const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const recordToEdit = ref(null);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const openEditModal = (record) => {
  isEditModalOpen.value = true;
  recordToEdit.value = record;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const updateRecords = (updatedRecords) => {
  records.value = updatedRecords;
  localStorage.setItem('records', JSON.stringify(records.value));
};

const selectedMonth = ref('') // 用來存儲用戶選擇的月份

// 按日期排序（由新到舊）
const sortedRecords = computed(() => {
  return records.value.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// 計算每月的總收入和總支出
const getMonthlySummary = computed(() => {
  const monthlySummary = {}

  records.value.forEach(record => {
    const month = record.date.substring(0, 7) // 取年份和月份，如 2024-11

    if (!monthlySummary[month]) {
      monthlySummary[month] = { income: 0, expense: 0 }
    }

    if (record.categoryType === '收入') {
      monthlySummary[month].income += parseFloat(record.amount)
    } else if (record.categoryType === '支出') {
      monthlySummary[month].expense += parseFloat(record.amount)
    }
  })

  return monthlySummary
})

// 篩選指定月份的統計
const filteredMonthlySummary = computed(() => {
  if (!selectedMonth.value) return getMonthlySummary.value
  const filtered = {}
  for (const [month, summary] of Object.entries(getMonthlySummary.value)) {
    if (month === selectedMonth.value) {
      filtered[month] = summary
    }
  }
  return filtered
})


// 刪除記錄
const deleteRecord = (id) => {
  records.value = records.value.filter(record => record.id !== id)
  localStorage.setItem('records', JSON.stringify(records.value))
}

</script>

<template>
  <div>
    <button @click="openModal">新增記錄</button>
        <!-- AddRecord 模态框 -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">X</button>
        <AddRecord 
          :records="records" 
          @close="closeModal" 
          @updateRecords="updateRecords" 
        />
      </div>
    </div>
  <!-- EditRecord 模态框 -->
    <div v-if="isEditModalOpen" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="closeEditModal">X</button>
        <EditRecord 
          :record="recordToEdit" 
          :records="records" 
          @close="closeEditModal" 
          @updateRecords="updateRecords" 
        />
      </div>
    </div>
     <MonthList :summary="filteredMonthlySummary"></MonthList>
         <div>
      <h2>記錄列表</h2>
      <div v-for="record in sortedRecords" :key="record.id">
  <h3>{{ record.date }} 的記錄</h3>
      <ul>
        <li>
      {{ record.categoryType === '收入' ? '收入' : '支出' }}：
      {{ record.category }} - {{ record.amount }} 元 - {{ record.description || '無描述' }}
      <button @click="openEditModal(record)">編輯</button>
      <button @click="deleteRecord(record.id)">刪除</button>
        </li>
     </ul>
    </div>
    </div>
  </div>
</template>


   

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2em;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.daily-summary {
  border: 1px solid #e0e0e0;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 5px;
  background-color: #f9f9f9;
}

</style>


