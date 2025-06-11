<script setup lang="ts">
import { Note, Track } from "@/lib/score";

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

const graveContainer = ref<HTMLDivElement | null>(null);
const graveAbafadoContainer = ref<HTMLDivElement | null>(null);
const platinelaContainer = ref<HTMLDivElement | null>(null);
const tapaContainer = ref<HTMLDivElement | null>(null);
const graveSecoContainer = ref<HTMLDivElement | null>(null);
const accentContainer = ref<HTMLDivElement | null>(null);
const ghostNoteContainer = ref<HTMLDivElement | null>(null);
const ruloNoteContainer = ref<HTMLDivElement | null>(null);

const createTrack = (container: HTMLDivElement) => {
  return new Track(container, 125, 80, 210);
};

const createGraveNotes = () => {
  if (!graveContainer.value) return;

  const track = createTrack(graveContainer.value);

  track.addNote([new Note("grd", "4"), new Note("gru", "4")]);

  track.draw();
};

const createGraveAbafadoNotes = () => {
  if (!graveAbafadoContainer.value) return;

  const track = createTrack(graveAbafadoContainer.value);

  track.addNote([new Note("gad", "4"), new Note("gau", "4")]);

  track.draw();
};

const createPlatinelaNotes = () => {
  if (!platinelaContainer.value) return;

  const track = createTrack(platinelaContainer.value);

  track.addNote([new Note("pld", "4"), new Note("plu", "4")]);

  track.draw();
};

const createTapaNotes = () => {
  if (!tapaContainer.value) return;

  const track = createTrack(tapaContainer.value);

  track.addNote([new Note("tad", "4"), new Note("tau", "4")]);

  track.draw();
};

const createGraveSecoNotes = () => {
  if (!graveSecoContainer.value) return;

  const track = createTrack(graveSecoContainer.value);

  track.addNote([new Note("gsd", "4"), new Note("gsu", "4")]);

  track.draw();
};

const createAccentNote = () => {
  if (!accentContainer.value) return;

  const track = createTrack(accentContainer.value);

  track.addNote([new Note("pld", "4").addAccent(), new Note("plu", "4").addAccent()]);

  track.draw();
};

const createGhostNote = () => {
  if (!ghostNoteContainer.value) return;

  const track = createTrack(ghostNoteContainer.value);

  track.addNote([new Note("pld", "4").addGhost(), new Note("plu", "4").addGhost()]);

  track.draw();
};

const createRuloNote = () => {
  if (!ruloNoteContainer.value) return;

  const track = createTrack(ruloNoteContainer.value);

  track.addNote([new Note("pld", "4").addRoll(), new Note("plu", "4").addRoll()]);

  track.draw();
};

onMounted(() => {
  createGraveNotes();
  createGraveAbafadoNotes();
  createPlatinelaNotes();
  createTapaNotes();
  createGraveSecoNotes();
  createAccentNote();
  createGhostNote();
  createRuloNote();
});
</script>

<template>
  <div class="h-full w-full flex flex-col bg-black">
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
      <span class="text-2xl font-bold">Glossário</span>
      <div class="flex flex-col w-full">
        <div class="flex flex-row gap-10 items-center">
          <div ref="graveContainer" class="px-4"></div>
          <div>Grave</div>
        </div>
        <div class="flex flex-row gap-10 items-center">
          <div ref="graveAbafadoContainer" class="px-4"></div>
          <div>Grave abafado</div>
        </div>
        <div class="flex flex-row gap-10 items-center">
          <div ref="platinelaContainer" class="px-4"></div>
          <div>Platinela</div>
        </div>
        <div class="flex flex-row gap-10 items-center">
          <div ref="tapaContainer" class="px-4"></div>
          <div>Tapa</div>
        </div>
        <div class="flex flex-row gap-10 items-center">
          <div ref="graveSecoContainer" class="px-4"></div>
          <div>Grave seco (quase tapa)</div>
        </div>
      </div>

      <hr class="border-t border-white mt-4 w-full" />

      <div class="flex flex-col w-full">
        <div class="flex flex-col w-full">
          <div class="flex flex-row gap-10 items-center">
            <div ref="accentContainer" class="px-4"></div>
            <div>Acento</div>
          </div>
          <div class="flex flex-row gap-10 items-center">
            <div ref="ghostNoteContainer" class="px-4"></div>
            <div>Toque bem leve</div>
          </div>
          <div class="flex flex-row gap-10 items-center">
            <div ref="ruloNoteContainer" class="px-4"></div>
            <div>Rulo</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
