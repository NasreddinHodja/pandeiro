<script setup lang="ts">
import type { RawNote } from "~/lib/score";

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

const preguicosoNotes: RawNote[] = [
  { key: "rst", duration: "16r" },
  { key: "tau", duration: "8", isDotted: true },
  { key: "grd", duration: "8" },
  { key: "grd", duration: "8" },

  { key: "grd", duration: "8" },
  { key: "tau", duration: "8", isDotted: true },
  { key: "grd", duration: "8" },
  { key: "grd", duration: "16" },
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

    <div class="flex-1 w-full overflow-y-auto">
      <div class="flex flex-col gap-10 py-4 md:py-24 px-5 md:px-28 pb-24 max-w-3xl mx-auto">
        <div class="flex w-full flex-col gap-2 md:gap-5">
          <span class="text-4xl font-bold">Partido Alto</span>
        </div>

        <div class="flex w-full flex-col gap-2 md:gap-5">
          <span class="text-2xl font-bold">Partido Preguiçoso</span>
          <SharedTrack :notes="preguicosoNotes" time-signature="4/4" />
        </div>

        <hr class="border-t border-white w-full" />

        <!-- <div class="flex w-full flex-col gap-2 md:gap-5">
          <span class="text-2xl font-bold">Sotaque - Bossa Nova</span>
          <SharedTrack :notes="bossaNotes" />
        </div>

        <hr class="border-t border-white w-full" /> -->
      </div>
    </div>
  </div>
</template>
