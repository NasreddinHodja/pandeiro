<script setup lang="ts">
defineProps<{
  currentMovement: string;
  countDown: number;
}>();
</script>

<template>
  <div class="flex flex-col gap-10">
    <div
      :class="[
        'flex h-10 items-center justify-center',
        countDown > 0 ? 'visible' : 'invisible',
      ]"
    >
      <span class="px-6 py-2 bg-white text-black text-3xl">{{
        countDown
      }}</span>
    </div>
    <div
      class="flex flex-col gap-6 items-center justify-center p-10 border-4 border-white"
    >
      <MovementsMovementDisplay :movement="currentMovement" />
    </div>
  </div>
</template>
