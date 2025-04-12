<script setup lang="ts">
const { isPlaying, bpm, beatCount, toggle } = useMetronome();

const COUNTDOWN_FROM = 4;

const movements = ["1", "2", "3", "4"];
const currentMovementIndex = ref(0);
const beatsForCurrentMovement = ref(0);
const lastBeatCount = ref(0);
const countDown = ref(COUNTDOWN_FROM);

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
  const choices = movements.filter((m) => m !== currentMovement);
  const nextIndexInChoices = Math.floor(Math.random() * choices.length);
  const nextMovement = choices[nextIndexInChoices];

  currentMovementIndex.value = movements.indexOf(nextMovement);
  beatsForCurrentMovement.value = getRandomBeatsForBPM(bpm.value) + 4;
  lastBeatCount.value = beatCount.value;
  countDown.value = COUNTDOWN_FROM;
};

watch(
  () => beatCount.value,
  (newCount) => {
    const beatsPassed = newCount - lastBeatCount.value;
    if (countDown.value > 0) countDown.value -= 1;
    if (beatsPassed >= beatsForCurrentMovement.value) {
      pickNewMovement();
    }
  }
);

onMounted(() => {
  pickNewMovement();

  const handleKey = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      toggle();
    }
  };
  window.addEventListener("keydown", handleKey);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKey);
  });
});
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-10">
    <MovementsCueCard
      :currentMovement="movements[currentMovementIndex]"
      :countDown="countDown"
    />
    <PlayButton :isPlaying="isPlaying" @toggle="toggle" />
  </div>
</template>
