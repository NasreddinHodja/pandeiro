<script setup lang="ts">
import type { RawNote } from "~/lib/score";

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

const baiaoNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isGhost: true },
  { key: "pld", duration: "16" },
  { key: "gru", duration: "16", isAccent: true },

  { key: "pld", duration: "16", isGhost: true },
  { key: "plu", duration: "16", isGhost: true },
  { key: "pld", duration: "16", isAccent: true },
  { key: "plu", duration: "16", isGhost: true },
];

const forroNotes: RawNote[] = [
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16", isGhost: true },
  { key: "pld", duration: "16" },
  { key: "tau", duration: "16" },

  { key: "pld", duration: "16", isGhost: true },
  { key: "plu", duration: "16", isGhost: true },
  { key: "pld", duration: "16", isAccent: true },
  { key: "gru", duration: "16" },
];

const xoteNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isGhost: true },
  { key: "pld", duration: "16" },
  { key: "gru", duration: "16" },

  { key: "grd", duration: "16" },
  { key: "plu", duration: "16", isGhost: true },
  { key: "grd", duration: "16", isAccent: true },
  { key: "plu", duration: "16", isGhost: true },
];

const xaxadoNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "pld", duration: "16", isAccent: true },
  { key: "gau", duration: "16" },

  { key: "pld", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16", isAccent: true },
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

    <div class="flex-1 w-full overflow-y-auto">
      <div class="flex flex-col gap-10 py-4 md:py-24 px-5 md:px-28 pb-24 max-w-3xl mx-auto">
      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-4xl font-bold">Ritmos de lá pra cima</span>
      </div>

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-2xl font-bold">Baião</span>
        <SharedTrack :notes="baiaoNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-2xl font-bold">Forró</span>
        <SharedTrack :notes="forroNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-2xl font-bold">Xote</span>
        <SharedTrack :notes="xoteNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-2xl font-bold">Xaxado</span>
        <SharedTrack :notes="xaxadoNotes" />
      </div>

      <hr class="border-t border-white w-full" />
      </div>
    </div>
  </div>
</template>
