<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const props = defineProps({ coachId: String });
const currentCoach = ref(null);

const fullName = computed(() =>
  currentCoach.value
    ? currentCoach.value.firstName + ' ' + currentCoach.value.lastName
    : ''
);
const areas = computed(() => currentCoach.value?.areas || []);
const rate = computed(() => currentCoach.value?.hourlyRate || 0);
const description = computed(() => currentCoach.value?.description || '');
const isContactPath = computed(() => route.name === 'coach-contact');

const links = {
  coachContact: {
    name: 'coach-contact',
    params: { coachId: props.coachId },
  },
  coachDetails: {
    name: 'coach-details',
    params: { coachId: props.coachId },
  },
};

onMounted(() => {
  const coaches = store.getters['coaches/coaches'];
  if (Array.isArray(coaches) && coaches.length > 0) {
    currentCoach.value = coaches.find((coach) => coach.id === props.coachId);
  }
});
</script>

<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>

    <section>
      <BaseCard>
        <div>
          <h2>Interested? React out now!</h2>
          <BaseButton link :to="links.coachContact" v-if="!isContactPath">
            Contact
          </BaseButton>
          <BaseButton link :to="links.coachDetails" v-else>
            Return to Details
          </BaseButton>
        </div>
        <RouterView />
      </BaseCard>
    </section>

    <section>
      <BaseCard>
        <BaseBadge
          v-for="area in areas"
          :key="area"
          :type="area"
          :text="area"
        />
        <p>{{ description }}</p>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped></style>
