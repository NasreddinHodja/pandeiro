<script setup lang="ts">
const { isPlaying, bpm, beatCount, toggle } = useMetronome();

const COUNTDOWN_FROM = 4;

const movements = ["1", "2", "3", "4"];
const currentMovementIndex = ref(1);
const beatsForCurrentMovement = ref(0);
const lastBeatCount = ref(0);
const countDown = ref(COUNTDOWN_FROM);
const isFirst = ref(true);

const getRandomBeatsForBPM = (bpm: number) => {
  const secondsPerBeat = 60 / bpm;
  const minSeconds = 4;
  const maxSeconds = 20;

  const minBeats = Math.ceil(minSeconds / secondsPerBeat);
  const maxBeats = Math.floor(maxSeconds / secondsPerBeat);

  return Math.floor(Math.random() * (maxBeats - minBeats + 1)) + minBeats;
};

const pickNewMovement = () => {
  const currentMovement = movements[currentMovementIndex.value];
  const choices = movements.filter(m => m !== currentMovement);
  const nextIndexInChoices = Math.floor(Math.random() * choices.length);
  let nextMovement = choices[nextIndexInChoices];
  if (isFirst.value) {
    nextMovement = "2";
    isFirst.value = false;
  }

  currentMovementIndex.value = movements.indexOf(nextMovement);
  beatsForCurrentMovement.value = getRandomBeatsForBPM(bpm.value) + 4;
  lastBeatCount.value = beatCount.value;
  countDown.value = COUNTDOWN_FROM;
};

const ignoreFirstBeat = ref(true);

watch(
  () => beatCount.value,
  newCount => {
    if (beatCount.value === 0) return;
    if (ignoreFirstBeat.value) {
      ignoreFirstBeat.value = false;
      return;
    }

    const beatsPassed = newCount - lastBeatCount.value;
    if (countDown.value > 0) countDown.value -= 1;
    if (beatsPassed >= beatsForCurrentMovement.value) {
      pickNewMovement();
    }
  }
);

onMounted(() => {
  if (isPlaying.value) toggle();
  lastBeatCount.value = beatCount.value;

  pickNewMovement();
});

onUnmounted(() => {
  if (isPlaying.value) toggle();
});
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center gap-10 px-10">
    <NuxtLink to="/exercicios" class="absolute top-5 left-5">
      <Icon name="mdi:arrow-back" class="w-10 h-10" />
    </NuxtLink>

    <MovementsCueCard :current-movement="movements[currentMovementIndex]" :count-down="countDown" />
    <SharedPlayButton :is-playing="isPlaying" @toggle="toggle" />
  </div>
</template>
