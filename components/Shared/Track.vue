<script setup lang="ts">
import { type RawNote, Track, type TimeSignature, Note } from "~/lib/score";

const props = defineProps<{ notes: RawNote[]; timeSignature?: TimeSignature }>();

const container = ref<HTMLDivElement | null>(null);

let track: Track | null = null;

const createAndDrawTrack = () => {
  if (!container.value) return;

  container.value.innerHTML = "";

  track = new Track(container.value);
  track.addTimeSignature(props.timeSignature ?? "2/4");
  track.addNotes(props.notes.map(raw => new Note(raw)));
  track.draw();
};

const debouncedDraw = debounce(createAndDrawTrack, 100);

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
    <div ref="container" class="w-full"></div>
  </ClientOnly>
</template>
