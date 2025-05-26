<script setup lang="ts">
const helpers = [];
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center bg-black">
    <NuxtLink to="/" class="absolute top-5 left-5">
      <Icon name="mdi:arrow-back" class="w-10 h-10" />
    </NuxtLink>
    <div v-for="helper in helpers" :key="helper.label" class="flex">
      <SharedButton>
        <NuxtLink :to="helper.to" class="text-black bg-white py-2 px-4">
          {{ helper.label }}
        </NuxtLink>
      </SharedButton>
    </div>
  </div>
</template>
