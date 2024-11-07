<script setup>
import { defineProps, defineEmits } from 'vue';
import RecordForm from './RecordForm.vue';

const props = defineProps({
  records: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(['close', 'updateRecords']);

const handleAdd = (newRecord) => {
  newRecord.id = Date.now();
  props.records.push(newRecord);
  localStorage.setItem('records', JSON.stringify(props.records));
  emits('updateRecords', props.records);
  emits('close');
};
</script>

<template>
  <RecordForm
    :mode="'add'"
    @submit="handleAdd"
    @close="$emit('close')"
  />
</template>
