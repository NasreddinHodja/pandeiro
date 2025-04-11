<script setup lang="ts">
const playing = ref(false);
const currentMovement = ref(0);
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-10">
    <MovementsCueCard :current-movement="currentMovement" />
    <MovementsPlayButton :playing="playing" />
  </div>
</template>
