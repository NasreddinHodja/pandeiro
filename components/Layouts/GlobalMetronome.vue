<script setup lang="ts">
const { isPlaying, bpm, toggle, stop } = useMetronome();

onMounted(() => stop());
onUnmounted(() => stop());
</script>

<template>
  <div class="flex flex-col gap-4 lg:p-12 p-6 text-white border-4 border-white">
    <div class="flex items-center gap-4">
      <PlayButton :is-playing="isPlaying" @toggle="toggle" />

      <div class="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
        <div class="flex items-center gap-3 justify-between">
          <span>BPM:</span>
          <input
            v-model.number="bpm"
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
            step="1"
            min="40"
            max="240"
            class="w-24 bg-black py-1 pl-2 border-2 border-black focus:outline-none focus:border-white hover:border-white"
          />
        </div>
        <input
          v-model.number="bpm"
          type="range"
          min="40"
          max="240"
          step="1"
          class="w-full h-2 bg-white/20 appearance-none accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:shadow-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none"
        />
      </div>
    </div>
  </div>
</template>
