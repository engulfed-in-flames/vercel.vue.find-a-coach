<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const email = ref('');
const message = ref('');
const isFormValid = ref(true);
const hasError = ref(false);
const errorMessage = ref('');

async function submitForm() {
  validateForm();

  if (!isFormValid.value) return;

  const newRequest = {
    coachId: route.params.coachId,
    email: email.value,
    message: message.value,
  };

  try {
    hasError.value = false;
    await store.dispatch('requests/addRequest', newRequest);
    router.replace('/coaches');
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  } finally {
    isFormValid.value = true;
  }
}

function validateForm() {
  if (
    email.value === '' ||
    !email.value.includes('@') ||
    message.value === ''
  ) {
    isFormValid.value = false;
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
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          v-model.trim="email"
        />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea
          rows="5"
          id="message"
          v-model.trim="message"
        ></textarea>
      </div>
      <div
        class="errors"
        v-if="!isFormValid"
        >Please enter a valid email and non-empty message.
      </div>
      <div class="actions">
        <BaseButton>Send Message</BaseButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
