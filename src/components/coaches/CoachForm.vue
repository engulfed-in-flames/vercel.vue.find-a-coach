<script setup>
import { ref } from 'vue';

const emit = defineEmits(['save-coach']);

const coach = ref({
  firstName: {
    value: '',
    hasError: false,
  },
  lastName: {
    value: '',
    hasError: false,
  },
  description: {
    value: '',
    hasError: false,
  },
  hourlyRate: {
    value: null,
    hasError: false,
  },
  areas: {
    value: [],
    hasError: false,
  },
});
const isFormValid = ref(false);

function submitForm() {
  validateForm();

  if (!isFormValid.value) return;

  const coachData = {
    firstName: coach.value.firstName.value,
    lastName: coach.value.lastName.value,
    description: coach.value.description.value,
    hourlyRate: coach.value.hourlyRate.value,
    areas: coach.value.areas.value,
  };

  emit('save-coach', coachData);
}

function validateForm() {
  coach.value.firstName.hasError = coach.value.firstName.value === '';
  coach.value.lastName.hasError = coach.value.lastName.value === '';
  coach.value.description.hasError = coach.value.description.value === '';
  coach.value.hourlyRate.hasError = coach.value.hourlyRate.value === null;
  coach.value.areas.hasError = coach.value.areas.value.length === 0;

  isFormValid.value = !Object.values(coach.value).some(
    (field) => field.hasError
  );
}

function clearError(field) {
  coach.value[field].hasError = false;
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div
      class="form-control"
      :class="{ invalid: coach.firstName.hasError }"
    >
      <label for="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="coach.firstName.value"
        @blur="clearError('firstName')"
      />
      <small v-if="coach.firstName.hasError"
        >First name must not be empty.</small
      >
    </div>
    <div
      class="form-control"
      :class="{ invalid: coach.lastName.hasError }"
    >
      <label for="lastName">Last name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="coach.lastName.value"
        @blur="clearError('lastName')"
      />
      <small v-if="coach.lastName.hasError">Last name must not be empty.</small>
    </div>
    <div
      class="form-control"
      :class="{ invalid: coach.description.hasError }"
    >
      <label for="description">Description</label>
      <textarea
        id="description"
        cols="30"
        rows="5"
        v-model.trim="coach.description.value"
        @blur="clearError('description')"
      ></textarea>
      <small v-if="coach.description.hasError"
        >Description must not be empty.</small
      >
    </div>
    <div
      class="form-control"
      :class="{ invalid: coach.hourlyRate.hasError }"
    >
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="coach.hourlyRate.value"
        @blur="clearError('hourlyRate')"
      />
      <small v-if="coach.hourlyRate.hasError">
        Hourly rate must be greater than 0.
      </small>
    </div>
    <div
      class="form-control"
      :class="{ invalid: coach.areas.hasError }"
    >
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="coach.areas.value"
          @focus="clearError('areas')"
          @blur="clearError('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="coach.areas.value"
          @focus="clearError('areas')"
          @blur="clearError('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="coach.areas.value"
          @focus="clearError('areas')"
          @blur="clearError('areas')"
        />
        <label for="career">Career Development</label>
      </div>
      <small v-if="coach.areas.hasError">
        At least one expertise must be selected.
      </small>
    </div>
    <p v-if="!isFormValid">
      <strong>Please fill in all fields.</strong>
    </p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
