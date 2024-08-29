<script setup>
import RequestListItem from './RequestListItem.vue';

const props = defineProps(['isRequestsLoading', 'hasRequests', 'requests']);
</script>

<template>
  <BaseCard>
    <header>
      <h2>Requests Received</h2>
    </header>
    <BaseSpinner v-if="isRequestsLoading" />
    <ul v-else-if="hasRequests">
      <RequestListItem
        v-for="request in requests"
        :key="request.id"
        :request="request"
      />
    </ul>
    <h3 v-else> You haven't received any requests yet! </h3>
  </BaseCard>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
