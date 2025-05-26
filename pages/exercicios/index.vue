<script setup lang="ts">
const options = [
  {
    label: "Movimentos",
    to: "/exercicios/movimentos",
  },
];
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center bg-black">
    <NuxtLink to="/" class="absolute top-5 left-5">
      <Icon name="mdi:arrow-back" class="w-6 h-6" />
    </NuxtLink>

    <div v-for="option in options" :key="option.label" class="flex">
      <SharedButton>
        <NuxtLink :to="option.to" class="text-black bg-white py-2 px-4">
          {{ option.label }}
        </NuxtLink>
      </SharedButton>
    </div>
  </div>
</template>
