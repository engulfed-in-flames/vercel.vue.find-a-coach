<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import CoachForm from '../../components/coaches/CoachForm.vue';

const router = useRouter();
const store = useStore();
const hasError = ref(false);
const errorMessage = ref('');

async function saveCoach(coachData) {
  try {
    hasError.value = false;
    await store.dispatch('coaches/addCoach', coachData);
    router.replace('/coaches');
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  }
}

function confirmError() {
  hasError.value = false;
}
</script>

<template>
  <div>
    <BaseDialog
      :show="hasError"
      title="An error occurred!"
      @close="confirmError"
    >
      {{ errorMessage }}
    </BaseDialog>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-coach="saveCoach" />
    </BaseCard>
  </div>
</template>

<style scoped></style>
