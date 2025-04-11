<script setup lang="ts">
const props = defineProps<{
  currentMovement: number;
}>();
</script>

<template>
  <div class="flex items-center justify-center p-10 border-4 border-white">
    <MovementsMovementDisplay
      v-if="currentMovement === 0"
      :movement="currentMovement"
    />
  </div>
</template>
