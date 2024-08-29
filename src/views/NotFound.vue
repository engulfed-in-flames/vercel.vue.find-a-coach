<script setup>
const coachesLink = {
  name: 'coaches',
};
</script>

<template>
  <div>
    <section>
      <BaseCard>
        <h2>Page not found</h2>
        <p>
          The page you are looking for does not exist. Please check out all our
          <RouterLink :to="coachesLink">coaches</RouterLink>.
        </p>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped></style>
