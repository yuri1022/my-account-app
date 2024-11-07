<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue'

const props = defineProps({
  summary: Object // 或使用具體的數據結構
})

// 加載所有記錄
const records = ref(JSON.parse(localStorage.getItem('records') || '[]'))
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


</script>

<template>
  <div>
    <!-- 顯示月份篩選器 -->
    <div>
      <label for="month">選擇月份：</label>
      <select v-model="selectedMonth">
        <option value="">所有月份</option>
        <option v-for="month in Object.keys(getMonthlySummary)" :key="month" :value="month">
          {{ month }}
        </option>
      </select>
    </div>
    <!-- 顯示每月的收支情形 -->
    <div>
      <h2>每月收支總結</h2>
      <ul>
        <li v-for="(summary, month) in filteredMonthlySummary" :key="month">
          <h3>{{ month }}</h3>
          <p>總收入: {{ summary.income }} 元</p>
          <p>總支出: {{ summary.expense }} 元</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>


