<script setup lang="ts">
const route = useRoute();

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

watch(
  () => route.fullPath,
  _ => (shouldShowMobileSidebar.value = false)
);
</script>

<template>
  <div class="h-screen w-screen flex flex-row bg-black text-white font-mono overflow-hidden">
    <LayoutsStudiesDefaultSideBar class="hidden lg:flex" />
    <LayoutsStudiesMobileSideBar class="flex lg:hidden" />
    <NuxtPage />
  </div>
</template>
