<script setup lang="ts">
import type { RawNote } from "~/lib/score";

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

const levadaNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "pld", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "pld", duration: "16" },
  { key: "gru", duration: "16" },
];

const surdoNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "pld", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "pld", duration: "16" },
  { key: "gru", duration: "16" },

  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "pld", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16" },
];
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="w-full flex flex-row gap-4 items-center p-4 z-10">
      <NuxtLink to="/" class="flex">
        <Icon name="mdi:arrow-back" class="w-6 h-6" />
      </NuxtLink>
      <Icon
        name="mdi:hamburger-menu"
        class="w-6 h-6 md:hidden"
        @click="shouldShowMobileSidebar = !shouldShowMobileSidebar"
      />
    </div>

    <div
      class="flex w-full flex-col gap-4 md:gap-10 py-4 md:py-24 px-5 md:px-28 overflow-scroll pb-24"
    >
      <span class="text-2xl font-bold">Samba-choro</span>
      <SharedTrack :notes="levadaNotes" />

      <hr class="border-t border-white my-10 w-full" />
      <SharedTrack :notes="surdoNotes" />
    </div>
  </div>
</template>
