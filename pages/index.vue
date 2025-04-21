<script setup lang="ts">
const helpers = [
  {
    label: "Movimentos",
    to: "/movimentos",
  },
];
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center bg-black">
    <div v-for="helper in helpers" :key="helper.label" class="flex">
      <SharedButton>
        <NuxtLink :to="helper.to" class="text-black bg-white py-2 px-4">
          {{ helper.label }}
        </NuxtLink>
      </SharedButton>
    </div>
  </div>
</template>
