<script setup lang="ts">
const props = defineProps<{
  label: string;
  min: number;
  max: number;
}>();

const value = defineModel<number>("value");

const increment = () => {
  if (value.value < props.max) value.value += 1;
};

const decrement = () => {
  if (value.value > props.min) value.value -= 1;
};
</script>

<template>
  <div class="flex gap-1 md:gap-4 w-full flex-col md:flex-row">
    <div class="flex items-center gap-3 justify-between min-w-28">
      <span>{{ label }}:</span>
      <span class="inline-block text-right tabular-nums w-[3ch]">{{ value }}</span>
    </div>

    <div class="flex flex-row items-center gap-3 w-full">
      <SharedButton class="bg-white text-black p-1.5 md:p-2 flex items-center" @click="decrement">
        <Icon name="mdi:minus" class="text-sm md:text-base" />
      </SharedButton>

      <input
        v-model.number="value"
        type="range"
        :min="min"
        :max="max"
        step="1"
        class="w-full h-2 bg-white/20 appearance-none accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:shadow-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none"
      />

      <SharedButton class="bg-white text-black p-1.5 md:p-2 flex items-center" @click="increment">
        <Icon name="mdi:plus" class="text-sm md:text-base" />
      </SharedButton>
    </div>
  </div>
</template>
