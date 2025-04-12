<script setup lang="ts">
defineProps<{
  movement: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-10">
    <div class="text-xl font-bold">Movimento #{{ movement }}</div>
    <div v-if="movement === '1'" class="flex gap-4">
      <Icon name="mdi:circle" class="w-10 h-10" />
      <Icon name="mdi:circle-outline" class="w-10 h-10" />
    </div>
    <div v-else-if="movement === '2'" class="flex gap-4">
      <Icon name="mdi:circle" class="w-10 h-10" />
      <Icon name="mdi:circle" class="w-10 h-10" />
    </div>
    <div v-else-if="movement === '3'" class="flex gap-4">
      <Icon name="mdi:circle" class="w-10 h-10" />
      <Icon name="mdi:circle-outline" class="w-10 h-10" />
    </div>
    <div v-else-if="movement === '4'" class="flex gap-4">
      <Icon name="mdi:circle-outline" class="w-10 h-10" />
      <Icon name="mdi:circle-outline" class="w-10 h-10" />
    </div>
  </div>
</template>
