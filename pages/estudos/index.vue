<script setup lang="ts">
import {
  createGraveDown,
  createGraveUp,
  createGraveAbafadoDown,
  createGraveAbafadoUp,
  createGraveSecoDown,
  createGraveSecoUp,
  createPlatinelaDown,
  createPlatinelaUp,
  createTapaDown,
  createTapaUp,
  Staff,
  createAccent,
  createGhost,
  createRoll,
} from "@/lib/score";

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

const graveContainer = ref<HTMLDivElement | null>(null);
const graveAbafadoContainer = ref<HTMLDivElement | null>(null);
const platinelaContainer = ref<HTMLDivElement | null>(null);
const tapaContainer = ref<HTMLDivElement | null>(null);
const graveSecoContainer = ref<HTMLDivElement | null>(null);
const accentContainer = ref<HTMLDivElement | null>(null);
const ghostNoteContainer = ref<HTMLDivElement | null>(null);
const ruloNoteContainer = ref<HTMLDivElement | null>(null);

const createGraveNotes = () => {
  if (!graveContainer.value) return;

  const staff = new Staff(graveContainer.value, 100, 80, 0, 0, 1);

  staff.addNote([createGraveDown("4"), createGraveUp("4")]);

  staff.draw();
};

const createGraveAbafadoNotes = () => {
  if (!graveAbafadoContainer.value) return;

  const staff = new Staff(graveAbafadoContainer.value, 100, 80, 0, 0, 1);

  staff.addNote([createGraveAbafadoDown("4"), createGraveAbafadoUp("4")]);

  staff.draw();
};

const createPlatinelaNotes = () => {
  if (!platinelaContainer.value) return;

  const staff = new Staff(platinelaContainer.value, 100, 80, 0, 0, 1);

  staff.addNote([createPlatinelaDown("4"), createPlatinelaUp("4")]);

  staff.draw();
};

const createTapaNotes = () => {
  if (!tapaContainer.value) return;

  const staff = new Staff(tapaContainer.value, 100, 80, 0, 0, 1);

  staff.addNote([createTapaDown("4"), createTapaUp("4")]);

  staff.draw();
};

const createGraveSecoNotes = () => {
  if (!graveSecoContainer.value) return;

  const staff = new Staff(graveSecoContainer.value, 100, 80, 0, 0, 1);

  staff.addNote([createGraveSecoDown("4"), createGraveSecoUp("4")]);

  staff.draw();
};

const createAccentNote = () => {
  if (!accentContainer.value) return;

  const staff = new Staff(accentContainer.value, 100, 80, 0, 0, 1);

  staff.addNote([
    createPlatinelaDown("4").addModifier(createAccent()),
    createPlatinelaUp("4").addModifier(createAccent()),
  ]);

  staff.draw();
};

const createGhostNote = () => {
  if (!ghostNoteContainer.value) return;

  const staff = new Staff(ghostNoteContainer.value, 100, 80, 0, 0, 1);

  staff.addNote([
    createPlatinelaDown("4").addModifier(createGhost()),
    createPlatinelaUp("4").addModifier(createGhost()),
  ]);

  staff.draw();
};

const createRuloNote = () => {
  if (!ruloNoteContainer.value) return;

  const staff = new Staff(ruloNoteContainer.value, 100, 80, 0, 0, 1);

  staff.addNote([
    createPlatinelaDown("4").addModifier(createRoll()),
    createPlatinelaUp("4").addModifier(createRoll()),
  ]);

  staff.draw();
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
