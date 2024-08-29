<script setup>
import { computed } from 'vue';

const props = defineProps(['coach']);

const fullName = computed(
  () => props.coach.firstName + ' ' + props.coach.lastName
);
const hourlyRate = computed(() => props.coach.hourlyRate);
const areas = computed(() => props.coach.areas);

const links = {
  coachDetails: {
    name: 'coach-details',
    params: { coachId: props.coach.id },
  },
  coachContact: {
    name: 'coach-contact',
    params: { coachId: props.coach.id },
  },
};
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ hourlyRate }}/hour</h4>
    <div>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :text="area" />
    </div>
    <div class="actions">
      <BaseButton mode="outline" link :to="links.coachContact">
        Contact
      </BaseButton>
      <BaseButton link :to="links.coachDetails">View Details </BaseButton>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
