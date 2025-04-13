<script setup lang="ts">
const { toggle } = useMetronome();

const handleSpace = (e: KeyboardEvent) => {
  if (e.code === "Space") {
    e.preventDefault();
    toggle();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleSpace);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleSpace);
});
</script>
<template>
  <div class="h-screen w-screen flex flex-col bg-black text-white font-mono">
    <div class="hidden lg:flex"><LayoutsDefaultHeader /></div>
    <div class="lg:hidden"><LayoutsMobileHeader /></div>
    <slot />
  </div>
</template>
