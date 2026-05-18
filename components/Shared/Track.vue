<script setup lang="ts">
import { type RawNote, Track, type TimeSignature, Note, STAFF_Y_SHIFT, DEFAULT_ROW_HEIGHT, STAVE_MIDDLE_LINE_OFFSET } from "~/lib/score";

const props = defineProps<{ notes: RawNote[]; timeSignature?: TimeSignature; swing?: boolean | number }>();

const swingEnabled = ref(true);

const swingRatio = computed(() => {
  if (!props.swing || !swingEnabled.value) return 0;
  return typeof props.swing === "number" ? props.swing : 0.7;
});

const container = ref<HTMLDivElement | null>(null);
let track: Track | null = null;

type NotePos = { x: number; width: number; rowTop: number; rowHeight: number };
const notePositions = ref<NotePos[]>([]);
const { isThisPlaying, activeNoteIndex, toggle } = usePlayback();

const cursorStyle = computed(() => {
  const pos = notePositions.value[activeNoteIndex.value];
  if (!pos || activeNoteIndex.value < 0) return null;
  return {
    left: `${pos.x - 4}px`,
    width: `${Math.max(pos.width + 8, 20)}px`,
    top: `${pos.rowTop}px`,
    height: `${pos.rowHeight}px`,
  };
});

const captureNotePositions = () => {
  if (!container.value) return;
  const cr = container.value.getBoundingClientRect();

  const noteEls = Array.from(container.value.querySelectorAll(".vf-stavenote"));
  if (noteEls.length === 0) return;

  const centres = noteEls.map(el => {
    const r = el.getBoundingClientRect();
    return r.top + r.height / 2 - cr.top;
  });

  const clusters: number[] = [];
  for (const cy of [...centres].sort((a, b) => a - b)) {
    const last = clusters[clusters.length - 1];
    if (last === undefined || cy - last > 40) clusters.push(cy);
  }

  const staffLineY = (rowIdx: number) =>
    STAFF_Y_SHIFT + rowIdx * DEFAULT_ROW_HEIGHT + STAVE_MIDDLE_LINE_OFFSET;

  notePositions.value = noteEls.map((el, idx) => {
    const headEl = el.querySelector(".vf-notehead") ?? el;
    const r = headEl.getBoundingClientRect();
    const cy = centres[idx];
    const rowIdx = clusters.findIndex(c => Math.abs(cy - c) <= 40);
    const lineY = staffLineY(rowIdx >= 0 ? rowIdx : 0);
    return {
      x: r.left - cr.left,
      width: r.width,
      rowTop: lineY - 52,
      rowHeight: 115,
    };
  });
};

const createAndDrawTrack = () => {
  if (!container.value) return;

  container.value.innerHTML = "";

  track = new Track(container.value);
  track.addTimeSignature(props.timeSignature ?? "2/4");
  track.addNotes(props.notes.map(raw => new Note(raw)));
  track.draw();

  nextTick(captureNotePositions);
};

const debouncedDraw = debounce(createAndDrawTrack, 100);

const toggleSwing = () => {
  swingEnabled.value = !swingEnabled.value;
  if (isThisPlaying.value) {
    toggle(props.notes, swingRatio.value); // stop
    nextTick(() => toggle(props.notes, swingRatio.value)); // restart with new ratio
  }
};

onMounted(async () => {
  await nextTick();
  createAndDrawTrack();

  window.addEventListener("resize", debouncedDraw);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", debouncedDraw);
});

watch(
  () => [props.notes, props.timeSignature],
  () => {
    createAndDrawTrack();
  },
  { deep: true }
);
</script>

<template>
  <ClientOnly>
    <div class="relative w-full">
      <div ref="container" class="w-full" />

      <div
        v-if="cursorStyle"
        class="absolute bg-white opacity-30 pointer-events-none"
        :style="cursorStyle"
      />

      <div class="absolute top-1 right-1 flex items-center gap-1">
        <button
          v-if="props.swing"
          class="text-sm font-mono px-3 py-2 border transition-opacity leading-none"
          :class="swingEnabled
            ? 'border-white text-white opacity-80 hover:opacity-100'
            : 'border-white/30 text-white/30 hover:opacity-60'"
          @click="toggleSwing"
        >
          swing
        </button>

        <button
          class="text-sm font-mono px-3 py-2 border border-white text-white opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center"
          @click="toggle(props.notes, swingRatio)"
        >
          <Icon :name="isThisPlaying ? 'mdi:stop' : 'mdi:play'" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </ClientOnly>
</template>
