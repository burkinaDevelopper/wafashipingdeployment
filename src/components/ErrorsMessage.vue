<template>
  <div
    class="alert alert-danger alert-dismissible"
    role="alert"
    v-for="(error, index) in props.errors"
    :key="index"
  >
    {{ error }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script setup>
const props = defineProps(["errors"]);
</script>

<style>
</style>