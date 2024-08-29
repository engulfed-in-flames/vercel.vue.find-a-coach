<script setup>
import { computed, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { authRedirect } from './utils/auth';

import TheHeader from './layouts/TheHeader.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

watch(isAuthenticated, (isAuthenticated) => {
  const { requireAuth, requireNoAuth } = route.meta;

  const newRoute = authRedirect(
    { requireAuth, requireNoAuth },
    isAuthenticated
  );

  if (newRoute) {
    router.push(newRoute);
  }
});

onBeforeMount(() => {
  store.dispatch('tryLogin');
});
</script>

<template>
  <TheHeader />
  <RouterView v-slot="{ Component }">
    <Transition name="route-view" mode="out-in">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-view-enter-from,
.route-view-leave-to {
  opacity: 0;
}

.route-view-enter-active,
.route-view-leave-active {
  transition: opacity 0.1s;
}

.router-view-enter-to,
.route-view-leave-from {
  opacity: 1;
}
</style>
