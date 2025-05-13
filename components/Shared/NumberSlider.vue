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

    <div class="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap items-center gap-3 w-full">
      <div class="flex gap-3 w-full md:w-auto justify-between">
        <SharedButton class="bg-white text-black p-1 md:p-2 flex items-center" @click="decrement">
          <Icon name="mdi:minus" class="text-sm md:text-base" />
        </SharedButton>
        <SharedButton
          class="bg-white text-black p-1 md:p-2 md:hidden flex items-center"
          @click="increment"
        >
          <Icon name="mdi:plus" />
        </SharedButton>
      </div>

      <input
        v-model.number="value"
        type="range"
        :min="min"
        :max="max"
        step="1"
        class="order-2 md:order-none w-full h-2 bg-white/20 appearance-none accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:shadow-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none"
      />

      <SharedButton
        class="bg-white text-black p-1 md:p-2 hidden md:flex flex items-center"
        @click="increment"
      >
        <Icon name="mdi:plus" />
      </SharedButton>
    </div>
  </div>
</template>
