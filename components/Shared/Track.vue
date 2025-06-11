<script setup lang="ts">
import { type RawNote, Track, type TimeSignature, Note } from "~/lib/score";

const props = defineProps<{ notes: RawNote[]; timeSignature?: TimeSignature }>();

const container = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  await nextTick();

  if (!container.value) return;

  const staff = new Track(container.value);

  staff.addTimeStignature(props.timeSignature ?? "2/4");

  staff.addNotes(props.notes.map(rawNote => new Note(rawNote)));

  staff.draw();
});
</script>

<template>
  <ClientOnly>
    <div ref="container" class="w-full"></div>
  </ClientOnly>
</template>
