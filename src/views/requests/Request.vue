<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import RequestList from '../../components/requests/RequestList.vue';

const store = useStore();

const isRequestsLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

const hasRequests = computed(() => store.getters['requests/hasRequests']);
const requests = computed(() => store.getters['requests/requests']);

async function loadRequests() {
  isRequestsLoading.value = true;
  try {
    hasError.value = false;
    await store.dispatch('requests/shouldFetchRequests');
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  }
  isRequestsLoading.value = false;
}

function confirmError() {
  hasError.value = false;
}

onBeforeMount(() => {
  loadRequests();
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
      <RequestList
        :isRequestsLoading="isRequestsLoading"
        :hasRequests="hasRequests"
        :requests="requests"
      />
    </section>
  </div>
</template>

<style scoped>
header {
  text-align: center;
}
</style>
