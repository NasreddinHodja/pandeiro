<script setup lang="ts">
defineProps<{
  label: string;
  min: number;
  max: number;
}>();

const value = defineModel<number>("value");
</script>

<template>
  <div class="flex flex-col gap-4 w-full sm:flex-row sm:items-center">
    <div class="flex items-center gap-3 justify-between min-w-28">
      <span>{{ label }}:</span>
      <span class="inline-block text-right tabular-nums w-[3ch]">{{ value }}</span>
    </div>

    <input
      v-model.number="value"
      type="range"
      :min="min"
      :max="max"
      step="1"
      class="w-full h-2 bg-white/20 appearance-none accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:shadow-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none"
    />
  </div>
</template>
