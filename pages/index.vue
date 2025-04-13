<script setup lang="ts">
const helpers = [
  {
    label: "Movimentos",
    to: "/movimentos",
  },
];
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
    <div v-for="helper in helpers" :key="helper.label" class="flex bg-white text-black py-2 px-4">
      <NuxtLink :to="helper.to">{{ helper.label }}</NuxtLink>
    </div>
  </div>
</template>
