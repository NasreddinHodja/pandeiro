<script setup lang="ts">
import { Renderer, StaveNote, Formatter, Stave, Stem, Articulation } from "vexflow";

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

  const renderer = new Renderer(graveContainer.value, Renderer.Backends.SVG);
  renderer.resize(100, 80);
  const context = renderer.getContext();
  context.setFillStyle("white");
  context.setStrokeStyle("white");

  const style = { fillStyle: "white", strokeStyle: "white" };

  const stave = new Stave(0, 0, 100);
  stave.setNumLines(1);
  stave.setContext(context).draw();

  const notes = [
    new StaveNote({
      keys: ["e/5"],
      duration: "q",
      stemDirection: Stem.DOWN,
    }).setStyle(style),
    new StaveNote({
      keys: ["g/5"],
      duration: "q",
      stemDirection: Stem.DOWN,
    }).setStyle(style),
  ];

  Formatter.FormatAndDraw(context, stave, notes);
};

const createGraveAbafadoNotes = () => {
  if (!graveAbafadoContainer.value) return;

  const renderer = new Renderer(graveAbafadoContainer.value, Renderer.Backends.SVG);
  renderer.resize(100, 80);
  const context = renderer.getContext();
  context.setFillStyle("white");
  context.setStrokeStyle("white");

  const style = { fillStyle: "white", strokeStyle: "white" };

  const stave = new Stave(0, 0, 100);
  stave.setNumLines(1);
  stave.setContext(context).draw();

  const notes = [
    new StaveNote({
      keys: ["e/5/cx"],
      duration: "q",
      stemDirection: Stem.DOWN,
    }).setStyle(style),
    new StaveNote({
      keys: ["g/5/cx"],
      duration: "q",
      stemDirection: Stem.DOWN,
    }).setStyle(style),
  ];

  Formatter.FormatAndDraw(context, stave, notes);
};

const createPlatinelaNotes = () => {
  if (!platinelaContainer.value) return;

  const renderer = new Renderer(platinelaContainer.value, Renderer.Backends.SVG);
  renderer.resize(100, 80);
  const context = renderer.getContext();
  context.setFillStyle("white");
  context.setStrokeStyle("white");

  const style = { fillStyle: "white", strokeStyle: "white" };

  const stave = new Stave(0, 0, 100);
  stave.setNumLines(1);
  stave.setContext(context).draw();

  const notes = [
    new StaveNote({
      keys: ["e/5/di"],
      duration: "q",
      stemDirection: Stem.DOWN,
    }).setStyle(style),
    new StaveNote({
      keys: ["g/5/di"],
      duration: "q",
      stemDirection: Stem.DOWN,
    }).setStyle(style),
  ];

  Formatter.FormatAndDraw(context, stave, notes);
};

const createTapaNotes = () => {
  if (!tapaContainer.value) return;

  const renderer = new Renderer(tapaContainer.value, Renderer.Backends.SVG);
  renderer.resize(100, 80);
  const context = renderer.getContext();
  context.setFillStyle("white");
  context.setStrokeStyle("white");

  const style = { fillStyle: "white", strokeStyle: "white" };

  const stave = new Stave(0, 0, 100);
  stave.setNumLines(1);
  stave.setContext(context).draw();

  const notes = [
    new StaveNote({
      keys: ["e/5/x"],
      duration: "q",
      stemDirection: Stem.DOWN,
    }).setStyle(style),
    new StaveNote({
      keys: ["g/5/x"],
      duration: "q",
      stemDirection: Stem.DOWN,
    }).setStyle(style),
  ];

  Formatter.FormatAndDraw(context, stave, notes);
};

const createGraveSecoNotes = () => {
  if (!graveSecoContainer.value) return;

  const renderer = new Renderer(graveSecoContainer.value, Renderer.Backends.SVG);
  renderer.resize(100, 80);
  const context = renderer.getContext();
  context.setFillStyle("white");
  context.setStrokeStyle("white");

  const style = { fillStyle: "white", strokeStyle: "white" };

  const stave = new Stave(0, 0, 100);
  stave.setNumLines(1);
  stave.setContext(context).draw();

  const notes = [
    new StaveNote({
      keys: ["e/5/cx"],
      duration: "q",
      stemDirection: Stem.DOWN,
    })
      .setStyle(style)
      .addModifier(new Articulation("a^")),
    new StaveNote({
      keys: ["g/5/cx"],
      duration: "q",
      stemDirection: Stem.DOWN,
    })
      .setStyle(style)
      .addModifier(new Articulation("a^")),
  ];

  Formatter.FormatAndDraw(context, stave, notes);
};

const createAccentNote = () => {
  if (!accentContainer.value) return;

  const renderer = new Renderer(accentContainer.value, Renderer.Backends.SVG);
  renderer.resize(100, 80);
  const context = renderer.getContext();
  context.setFillStyle("black");
  context.setStrokeStyle("black");

  const style = { fillStyle: "white", strokeStyle: "white" };

  const stave = new Stave(25, 0, 100);
  stave.setNumLines(1);
  stave.setStyle({ fillStyle: "black", strokeStyle: "black" });
  stave.setContext(context).draw();

  const notes = [
    new StaveNote({
      keys: ["e/5/di"],
      duration: "q",
      stemDirection: Stem.DOWN,
    })
      .setStyle(style)
      .addModifier(new Articulation("a^")),
  ];

  Formatter.FormatAndDraw(context, stave, notes);
};

const createGhostNote = () => {
  if (!ghostNoteContainer.value) return;

  const renderer = new Renderer(ghostNoteContainer.value, Renderer.Backends.SVG);
  renderer.resize(100, 80);
  const context = renderer.getContext();
  context.setFillStyle("black");
  context.setStrokeStyle("black");

  const style = { fillStyle: "white", strokeStyle: "white" };

  const stave = new Stave(25, 0, 100);
  stave.setNumLines(1);
  stave.setStyle({ fillStyle: "black", strokeStyle: "black" });
  stave.setContext(context).draw();

  const notes = [
    new StaveNote({
      keys: ["e/5/di"],
      duration: "q",
      stemDirection: Stem.DOWN,
    })
      .setStyle(style)
      .addModifier(new Articulation("av")),
  ];

  Formatter.FormatAndDraw(context, stave, notes);
};

const createRuloNote = () => {
  if (!ruloNoteContainer.value) return;

  const renderer = new Renderer(ruloNoteContainer.value, Renderer.Backends.SVG);
  renderer.resize(100, 80);
  const context = renderer.getContext();
  context.setFillStyle("black");
  context.setStrokeStyle("black");

  const style = { fillStyle: "white", strokeStyle: "white" };

  const stave = new Stave(25, 0, 100);
  stave.setNumLines(1);
  stave.setStyle({ fillStyle: "black", strokeStyle: "black" });
  stave.setContext(context).draw();

  const notes = [
    new StaveNote({
      keys: ["e/5/di"],
      duration: "q",
      stemDirection: Stem.DOWN,
    })
      .setStyle(style)
      .addModifier(new Articulation("a-")),
  ];

  Formatter.FormatAndDraw(context, stave, notes);
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

    <div class="flex w-full flex-col gap-10 py-24 px-28 overflow-scroll">
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
      <div class="h-px bg-white mt-4 w-full mx-auto"></div>
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
