<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import CoachList from '../../components/coaches/CoachList.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

const store = useStore();

const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});
const isCoachesLoading = ref(true);
const hasError = ref(false);
const errorMessage = ref('');

const isLoggedIn = computed(() => store.getters['isAuthenticated'] || false);
const isCoach = computed(() => store.getters['coaches/isCoach'] || false);
const hasCoaches = computed(() => store.getters['coaches/hasCoaches']);
const filteredCoaches = computed(() => {
  const coaches = store.getters['coaches/coaches'];

  return coaches.filter((coach) =>
    Object.entries(activeFilters.value).some(
      ([key, value]) => coach.areas.includes(key) && value
    )
  );
});

async function loadCoaches(refresh = false) {
  isCoachesLoading.value = true;
  try {
    hasError.value = false;
    await store.dispatch('coaches/shouldFetchCoaches', {
      forceRefresh: refresh,
    });
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  }
  isCoachesLoading.value = false;
}

function confirmError() {
  hasError.value = false;
}

function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters;
}

onBeforeMount(() => {
  loadCoaches();
});
</script>

<template>
  <div>
    <BaseDialog
      :show="hasError"
      title="An error occurred!"
      @close="confirmError"
    >
      <p>{{ errorMessage }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
      <CoachList
        :isLoggedIn="isLoggedIn"
        :isCoach="isCoach"
        :isCoachesLoading="isCoachesLoading"
        :hasCoaches="hasCoaches"
        :coaches="filteredCoaches"
        @load-coaches="loadCoaches"
      />
    </section>
  </div>
</template>

<style scoped></style>
