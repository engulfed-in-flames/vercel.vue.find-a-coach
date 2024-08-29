<script setup>
import CoachListItem from './CoachListItem.vue';

const props = defineProps([
  'isLoggedIn',
  'isCoach',
  'isCoachesLoading',
  'hasCoaches',
  'coaches',
]);
const emit = defineEmits(['load-coaches']);

const links = {
  auth: {
    name: 'auth',
    query: { redirect: 'coach-create' },
  },
  coachCreate: {
    name: 'coach-create',
  },
};

function loadCoaches() {
  emit('load-coaches', true);
}
</script>

<template>
  <BaseCard>
    <div class="controls">
      <BaseButton mode="outline" @click="loadCoaches">Refresh </BaseButton>
      <BaseButton v-if="!isLoggedIn" link :to="links.auth">
        Login to Register as Coach
      </BaseButton>
      <BaseButton v-else-if="!isCoach" link :to="links.coachCreate">
        Register as Coach
      </BaseButton>
    </div>
    <BaseSpinner v-if="isCoachesLoading" />
    <ul v-else-if="hasCoaches">
      <CoachListItem v-for="coach in coaches" :key="coach.id" :coach="coach" />
    </ul>
    <h3 v-else>No coaches found</h3>
  </BaseCard>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
