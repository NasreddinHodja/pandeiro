<script setup lang="ts">
const { isPlaying, bpm, toggle, volume } = useMetronome();
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div class="h-[168px] md:h-[120px] w-full"></div>
    </template>

    <Transition appear name="fade-and-rise">
      <div v-if="mounted" class="flex flex-col gap-8 lg:p-12 p-6 text-white border-4 border-white">
        <div class="flex items-center gap-6">
          <SharedPlayButton :is-playing="isPlaying" class="hidden md:block" @toggle="toggle" />

          <div class="flex flex-col gap-4 w-full">
            <SharedNumberSlider v-model:value="bpm" label="BPM" :min="40" :max="240" />
            <SharedNumberSlider v-model:value="volume" label="Volume" :min="0" :max="100" />
          </div>
        </div>
        <div class="flex justify-center md:hidden">
          <SharedPlayButton :is-playing="isPlaying" @toggle="toggle" />
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>
