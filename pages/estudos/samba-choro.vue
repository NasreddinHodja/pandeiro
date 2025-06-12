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

const bossaNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "pld", duration: "16", isAccent: true },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "pld", duration: "16" },
  { key: "gru", duration: "16" },
];

const dancingAccentsNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "pld", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "pld", duration: "16", isAccent: true },
  { key: "gru", duration: "16" },

  { key: "gad", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "pld", duration: "16", isAccent: true },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16", isAccent: true },
  { key: "pld", duration: "16" },
  { key: "gru", duration: "16" },
];

const tantanNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isGhost: true },
  { key: "pld", duration: "16", isGhost: true },
  { key: "tau", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16", isGhost: true },
  { key: "pld", duration: "16", isGhost: true },
  { key: "gru", duration: "16" },
];

const repiqueMaoNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isRoll: true },
  { key: "pld", duration: "16" },
  { key: "tau", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16" },

  { key: "gad", duration: "16" },
  { key: "plu", duration: "16", isGhost: true },
  { key: "pld", duration: "16" },
  { key: "tau", duration: "16" },
  { key: "pld", duration: "16" },
  { key: "gru", duration: "16" },
  { key: "pld", duration: "16" },
  { key: "tau", duration: "16" },
];

const repiqueAnelNotes: RawNote[] = [
  { key: "gad", duration: "16" },
  { key: "gsu", duration: "16" },
  { key: "pld", duration: "16" },
  { key: "gsu", duration: "16" },
  { key: "pld", duration: "16" },
  { key: "gru", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "plu", duration: "16" },

  { key: "gsd", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "gsd", duration: "16" },
  { key: "plu", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "gru", duration: "16" },
  { key: "grd", duration: "16" },
  { key: "gru", duration: "16" },
];

const viradas: RawNote[][] = [
  [
    // 1
    { key: "grd", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "grd", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "grd", duration: "16" },
    { key: "plu", duration: "16", isGhost: true },
    { key: "grd", duration: "16" },
    { key: "gru", duration: "16" },

    { key: "grd", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "grd", duration: "16" },
    { key: "plu", duration: "16", isGhost: true },
    { key: "grd", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "grd", duration: "16" },
    { key: "gru", duration: "16" },
  ],
  [
    // 2
    { key: "grd", duration: "16" },
    { key: "plu", duration: "16" },
    { key: "pld", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "pld", duration: "16" },
    { key: "plu", duration: "16" },
    { key: "grd", duration: "16" },
    { key: "plu", duration: "16" },

    { key: "pld", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "pld", duration: "16" },
    { key: "plu", duration: "16" },
    { key: "pld", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "grd", duration: "16" },
    { key: "gru", duration: "16" },
  ],
  [
    // 3
    { key: "grd", duration: "16" },
    { key: "plu", duration: "16" },
    { key: "pld", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "pld", duration: "16" },
    { key: "plu", duration: "16" },
    { key: "grd", duration: "16" },
    { key: "plu", duration: "16" },

    { key: "pld", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "pld", duration: "16" },
    { key: "plu", duration: "16" },
    { key: "pld", duration: "16" },
    { key: "plu", duration: "16" },
    { key: "grd", duration: "32" },
    { key: "plu", duration: "32" },
    { key: "pld", duration: "32" },
    { key: "plu", duration: "32" },
  ],
  [
    // 4
    { key: "grd", duration: "32" },
    { key: "plu", duration: "32" },
    { key: "pld", duration: "32" },
    { key: "rst", duration: "32r" },
    { key: "tau", duration: "32" },
    { key: "rst", duration: "32r" },
    { key: "grd", duration: "32" },
    { key: "plu", duration: "32" },
    { key: "pld", duration: "32" },
    { key: "rst", duration: "32r" },
    { key: "tau", duration: "32" },
    { key: "rst", duration: "32r" },
    { key: "grd", duration: "32" },
    { key: "plu", duration: "32" },
    { key: "pld", duration: "32" },
    { key: "rst", duration: "32r" },

    { key: "tau", duration: "32" },
    { key: "rst", duration: "32r" },
    { key: "grd", duration: "32" },
    { key: "plu", duration: "32" },
    { key: "pld", duration: "32" },
    { key: "rst", duration: "32r" },
    { key: "tau", duration: "32" },
    { key: "rst", duration: "32r" },
    { key: "pld", duration: "16" },
    { key: "gru", duration: "16" },
    { key: "grd", duration: "16" },
    { key: "gru", duration: "16" },
  ],
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

    <div class="flex w-full flex-col gap-10 py-4 md:py-24 px-5 md:px-28 overflow-scroll pb-24">
      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-2xl font-bold">Samba-choro</span>
        <SharedTrack :notes="levadaNotes" class="bg-blue-500" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Sotaque - Surdo</span>
        <SharedTrack :notes="surdoNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Sotaque - Bossa Nova</span>
        <SharedTrack :notes="bossaNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Sotaque - Dançando com acentos</span>
        <SharedTrack :notes="dancingAccentsNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Sotaque - Tantan</span>
        <div>
          <span class="font-bold">OBS:</span>
          Notas fantasma bem leves
        </div>
        <SharedTrack :notes="tantanNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Sotaque - Repique de mão</span>
        <SharedTrack :notes="repiqueMaoNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Sotaque - Repique de anel</span>
        <SharedTrack :notes="repiqueAnelNotes" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Virada 1</span>
        <SharedTrack :notes="viradas[0]" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Virada 2</span>
        <SharedTrack :notes="viradas[1]" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Virada 3</span>
        <SharedTrack :notes="viradas[2]" />
      </div>

      <hr class="border-t border-white w-full" />

      <div class="flex w-full flex-col gap-2 md:gap-5">
        <span class="text-xl font-bold">Virada 4</span>
        <SharedTrack :notes="viradas[3]" />
      </div>

      <hr class="border-t border-white w-full" />
    </div>
  </div>
</template>
