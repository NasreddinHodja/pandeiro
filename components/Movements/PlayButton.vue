<script setup lang="ts">
const playing = defineModel<boolean>("playing");
const togglePlaying = () => {
  playing.value = !playing.value;
};
</script>

<template>
  <div
    class="flex items-center justify-center px-4 py-2 bg-white text-black"
    @click="togglePlaying"
  >
    <div v-if="!playing" class="flex items-center justify-center">
      <Icon name="mdi:play" class="w-6 h-6" />
    </div>
    <div v-else class="flex items-center justify-center">
      <Icon name="mdi:pause" class="w-6 h-6" />
    </div>
  </div>
</template>
