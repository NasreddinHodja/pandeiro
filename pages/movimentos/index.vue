<script setup lang="ts">
const { isPlaying, toggle } = useMetronome();
const currentMovement = ref(0);

const handleSpacebarPress = (event: KeyboardEvent) => {
  if (event.code === "Space") {
    toggle();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleSpacebarPress);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleSpacebarPress);
});
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-10">
    <MovementsCueCard :current-movement="currentMovement" />
    <PlayButton :isPlaying="isPlaying" @toggle="toggle" />
  </div>
</template>
