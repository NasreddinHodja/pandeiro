<script setup lang="ts">
const route = useRoute();

const items = [
  { label: "Glossary", to: "/estudos" },
  { label: "Samba-choro", to: "/estudos/samba-choro" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
  { label: "Home", to: "/" },
];
</script>

<template>
  <div
    class="flex flex-col h-full w-72 border-r-2 border-white pt-4 overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] gap-4 px-4"
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
</template>
