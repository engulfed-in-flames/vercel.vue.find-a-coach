<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();

const mode = ref('login');
const email = ref('');
const password = ref('');
const isFormValid = ref(true);
const isFormLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref(null);

const submitButtonLabel = computed(() =>
  mode.value === 'login' ? 'Login' : 'Signup'
);
const switchModeButtonLabel = computed(() =>
  mode.value === 'login' ? 'Signup' : 'Login'
);

async function submitForm() {
  validateForm();

  if (!isFormValid.value) return;

  isFormValid.value = true;
  isFormLoading.value = true;

  const userData = {
    email: email.value,
    password: password.value,
  };

  try {
    if (mode.value === 'login') await store.dispatch('login', userData);
    if (mode.value === 'signup') await store.dispatch('signup', userData);

    const redirectTo = { name: route.query.redirect || 'coaches' };
    router.replace(redirectTo);
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  }
  isFormLoading.value = false;
}

function validateForm() {
  if (
    email.value === '' ||
    !email.value.includes('@') ||
    password.value === '' ||
    password.value.length < 6
  ) {
    isFormValid.value = false;
  }
}

function switchAuthMode() {
  mode.value = mode.value === 'login' ? 'signup' : 'login';
}

function confirmError() {
  hasError.value = false;
  errorMessage.value = null;
}
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
    <BaseDialog :show="isFormLoading" title="Now authenticating..." fixed>
      <BaseSpinner />
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!isFormValid">
          Please enter a valid email and a password with at least 6 characters.
        </p>
        <BaseButton>{{ submitButtonLabel }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode"
          >{{ switchModeButtonLabel }}
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
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
</style>
