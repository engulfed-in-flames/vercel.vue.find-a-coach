<script setup>
import { ref } from 'vue';

const filters = ref({
  frontend: true,
  backend: true,
  career: true,
});

const emit = defineEmits(['change-filter']);

function setFilter(event) {
  const inputId = event.target.id;
  const isActive = event.target.checked;
  const updatedFilters = {
    ...filters.value,
    [inputId]: isActive,
  };
  filters.value = updatedFilters;

  emit('change-filter', filters.value);
}
</script>

<template>
  <BaseCard>
    <h2>Find your coaches</h2>
    <span class="filter-option">
      <input @change="setFilter" type="checkbox" id="frontend" checked />
      <label for="frontend">Fronted</label>
      <input @change="setFilter" type="checkbox" id="backend" checked />
      <label for="backend">Backend</label>
      <input @change="setFilter" type="checkbox" id="career" checked />
      <label for="career">Career</label>
    </span>
  </BaseCard>
</template>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
