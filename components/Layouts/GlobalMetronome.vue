<script setup lang="ts">
const { isPlaying, bpm, toggle, volume } = useMetronome();
</script>

<template>
  <div class="flex flex-col gap-4 lg:p-12 p-6 text-white border-4 border-white">
    <div class="flex items-center gap-6">
      <SharedPlayButton :is-playing="isPlaying" @toggle="toggle" />

      <div class="flex flex-col gap-4 w-full">
        <SharedNumberSlider v-model:value="bpm" label="BPM" :min="40" :max="240" />
        <SharedNumberSlider v-model:value="volume" label="Volume" :min="0" :max="100" />
      </div>
    </div>
  </div>
</template>
