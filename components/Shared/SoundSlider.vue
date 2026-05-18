<script setup lang="ts">
const props = defineProps<{
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}>();

const value = defineModel<number>({ required: true });

const display = computed(() => {
  const decimals = props.step < 0.1 ? 2 : props.step < 1 ? 1 : 0;
  return value.value.toFixed(decimals);
});
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div class="flex justify-between text-xs">
      <span class="text-white/50">{{ label }}</span>
      <span class="tabular-nums text-white/80">{{ display }}{{ unit }}</span>
    </div>
    <input
      v-model.number="value"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      class="w-full h-px bg-white/20 appearance-none accent-white cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none"
    />
  </div>
</template>
