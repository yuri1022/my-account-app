<script setup>
import { defineProps, defineEmits } from 'vue';
import RecordForm from './RecordForm.vue';

const props = defineProps({
  record: {
    type: Object,
    required: true,
  },
  records: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(['close', 'updateRecords']);

const handleUpdate = (updatedRecord) => {
  const index = props.records.findIndex((r) => r.id === updatedRecord.id);
  if (index !== -1) {
    props.records[index] = updatedRecord;
    localStorage.setItem('records', JSON.stringify(props.records));
    emits('updateRecords', props.records);
  }
  emits('close');
};
</script>

<template>
  <RecordForm
    :record="record"
    :mode="'edit'"
    @submit="handleUpdate"
    @close="$emit('close')"
  />
</template>
