<script setup lang="ts">
defineProps<{
  isPlaying: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();

const toggle = () => {
  emit("toggle");
};
</script>

<template>
  <div class="flex items-center justify-center px-4 py-2 bg-white text-black" @click="toggle">
    <div v-if="!isPlaying" class="flex items-center justify-center">
      <Icon name="mdi:play" class="w-6 h-6" />
    </div>
    <div v-else class="flex items-center justify-center">
      <Icon name="mdi:pause" class="w-6 h-6" />
    </div>
  </div>
</template>
