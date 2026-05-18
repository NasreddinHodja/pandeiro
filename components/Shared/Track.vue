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
const { isThisPlaying, activeNoteIndex, play, stop } = usePlayback();
const { metroLinked, startFrom: startMetronomeFrom, stop: stopMetronome, bpm } = useMetronome();

const handleToggle = async () => {
  if (isThisPlaying.value) {
    stop();
    if (metroLinked.value) stopMetronome();
  } else {
    const startTime = await play(props.notes, swingRatio.value);
    if (metroLinked.value) startMetronomeFrom(startTime);
  }
};

const handleMetroToggle = () => {
  metroLinked.value = !metroLinked.value;
  if (isThisPlaying.value) {
    if (metroLinked.value) startMetronomeFrom(getNextDownbeat());
    else stopMetronome();
  }
};

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

const toggleSwing = async () => {
  swingEnabled.value = !swingEnabled.value;
  if (isThisPlaying.value) {
    stop();
    if (metroLinked.value) stopMetronome();
    await nextTick();
    const startTime = await play(props.notes, swingRatio.value);
    if (metroLinked.value) startMetronomeFrom(startTime);
  }
};

watch(isThisPlaying, (playing) => {
  if (!playing && metroLinked.value) stopMetronome();
}, { flush: 'sync' });

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
    <div class="w-full flex flex-col">
      <div class="relative w-full">
        <div ref="container" class="w-full min-h-[140px]" />

        <div
          v-if="cursorStyle"
          class="absolute bg-white opacity-30 pointer-events-none"
          :style="cursorStyle"
          style="transition: left 40ms ease-out, width 40ms ease-out;"
        />
      </div>

      <div class="flex items-stretch justify-end gap-1 pt-1 px-1">
        <input
          type="number"
          :value="bpm"
          min="20"
          max="300"
          class="h-9 w-16 bg-transparent border border-white/30 text-white/60 text-sm font-mono text-center px-1 focus:outline-none focus:border-white focus:text-white"
          @change="bpm = Number(($event.target as HTMLInputElement).value)"
        />

        <button
          class="h-9 text-sm font-mono px-3 border transition-opacity leading-none"
          :class="metroLinked
            ? 'border-white text-white opacity-80 hover:opacity-100'
            : 'border-white/30 text-white/30 hover:opacity-60'"
          @click="handleMetroToggle"
        >
          metro
        </button>

        <button
          v-if="props.swing"
          class="h-9 text-sm font-mono px-3 border transition-opacity leading-none"
          :class="swingEnabled
            ? 'border-white text-white opacity-80 hover:opacity-100'
            : 'border-white/30 text-white/30 hover:opacity-60'"
          @click="toggleSwing"
        >
          swing
        </button>

        <button
          class="h-9 text-sm font-mono px-3 border border-white text-white opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center"
          @click="handleToggle"
        >
          <Icon :name="isThisPlaying ? 'mdi:stop' : 'mdi:play'" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <template #fallback>
      <div class="w-full flex flex-col">
        <div class="w-full min-h-[140px]" />
        <div class="h-10" />
      </div>
    </template>
  </ClientOnly>
</template>
