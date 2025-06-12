<script setup lang="ts">
import { Note, type RawNote } from "@/lib/score";
import { Stave, Renderer, BarlineType, Formatter } from "vexflow";

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

const graveContainer = ref<HTMLDivElement | null>(null);
const graveAbafadoContainer = ref<HTMLDivElement | null>(null);
const platinelaContainer = ref<HTMLDivElement | null>(null);
const tapaContainer = ref<HTMLDivElement | null>(null);
const graveSecoContainer = ref<HTMLDivElement | null>(null);
const accentContainer = ref<HTMLDivElement | null>(null);
const ghostNoteContainer = ref<HTMLDivElement | null>(null);
const rollNoteContainer = ref<HTMLDivElement | null>(null);

const createAndDrawStave = (container: HTMLDivElement, rawNotes: RawNote[]) => {
  const width = 100;
  const height = 90;
  const renderer = new Renderer(container, Renderer.Backends.SVG);

  renderer.resize(width, height);

  const context = renderer.getContext();
  context.setFillStyle("white");
  context.setStrokeStyle("white");

  const stave = new Stave(0, -15, width);
  stave.setContext(context);
  stave.setConfigForLines([
    { visible: false },
    { visible: false },
    { visible: true },
    { visible: false },
    { visible: false },
  ]);
  stave.setBegBarType(BarlineType.NONE);

  stave.draw();
  Formatter.FormatAndDraw(
    context,
    stave,
    rawNotes.map(rawNote => new Note(rawNote))
  );
};

const createGraveNotes = () => {
  if (!graveContainer.value) return;

  const rawNotes: RawNote[] = [
    { key: "grd", duration: "4" },
    { key: "gru", duration: "4" },
  ];

  createAndDrawStave(graveContainer.value, rawNotes);
};

const createGraveAbafadoNotes = () => {
  if (!graveAbafadoContainer.value) return;

  const rawNotes: RawNote[] = [
    { key: "gad", duration: "4" },
    { key: "gau", duration: "4" },
  ];

  createAndDrawStave(graveAbafadoContainer.value, rawNotes);
};

const createPlatinelaNotes = () => {
  if (!platinelaContainer.value) return;

  const rawNotes: RawNote[] = [
    { key: "pld", duration: "4" },
    { key: "plu", duration: "4" },
  ];

  createAndDrawStave(platinelaContainer.value, rawNotes);
};

const createTapaNotes = () => {
  if (!tapaContainer.value) return;

  const rawNotes: RawNote[] = [
    { key: "tad", duration: "4" },
    { key: "tau", duration: "4" },
  ];

  createAndDrawStave(tapaContainer.value, rawNotes);
};

const createGraveSecoNotes = () => {
  if (!graveSecoContainer.value) return;

  const rawNotes: RawNote[] = [
    { key: "gsd", duration: "4" },
    { key: "gsu", duration: "4" },
  ];

  createAndDrawStave(graveSecoContainer.value, rawNotes);
};

const createAccentNote = () => {
  if (!accentContainer.value) return;

  const rawNotes: RawNote[] = [
    { key: "gsd", duration: "4", isAccent: true },
    { key: "gsu", duration: "4", isAccent: true },
  ];

  createAndDrawStave(accentContainer.value, rawNotes);
};

const createGhostNote = () => {
  if (!ghostNoteContainer.value) return;

  const rawNotes: RawNote[] = [
    { key: "gsd", duration: "4", isGhost: true },
    { key: "gsu", duration: "4", isGhost: true },
  ];

  createAndDrawStave(ghostNoteContainer.value, rawNotes);
};

const createRollNote = () => {
  if (!rollNoteContainer.value) return;

  const rawNotes: RawNote[] = [
    { key: "gsd", duration: "4", isRoll: true },
    { key: "gsu", duration: "4", isRoll: true },
  ];

  createAndDrawStave(rollNoteContainer.value, rawNotes);
};

onMounted(() => {
  createGraveNotes();
  createGraveAbafadoNotes();
  createPlatinelaNotes();
  createTapaNotes();
  createGraveSecoNotes();
  createAccentNote();
  createGhostNote();
  createRollNote();
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
      <span class="text-4xl font-bold">Glossário</span>
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
            <div ref="rollNoteContainer" class="px-4"></div>
            <div>Rulo</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
