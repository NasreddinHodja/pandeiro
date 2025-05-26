<script setup lang="ts">
const route = useRoute();

const shouldShow = useState("shouldShowMobileSidebar", () => false);

const items = STUDIES_SIDEBAR_ITEMS;
</script>

<template>
  <Transition name="sidebar">
    <div
      v-if="shouldShow"
      class="flex flex-col absolute bg-black h-full min-w-60 border-r-2 border-white pt-14 overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] gap-4 px-4"
    >
      <div
        v-for="item in items"
        :key="item.label"
        class="text-sm px-4 py-2"
        :class="{ 'bg-white text-black': route.path === item.to }"
      >
        <NuxtLink :to="item.to">
          <div class="truncate">{{ item.label }}</div>
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>
