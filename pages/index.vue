<script setup lang="ts">
const options = [
  {
    label: "Estudos",
    to: "/estudos",
  },
  {
    label: "Exercícios",
    to: "/exercicios",
  },
];
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center bg-black gap-10">
    <div v-for="option in options" :key="option.label" class="flex">
      <SharedButton>
        <NuxtLink :to="option.to" class="text-black bg-white py-2 px-4">
          {{ option.label }}
        </NuxtLink>
      </SharedButton>
    </div>
  </div>
</template>
