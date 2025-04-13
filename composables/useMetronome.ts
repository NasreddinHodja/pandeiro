export const useMetronome = () => {
  const isPlaying = useState<boolean>("isPlaying", () => false);
  const bpm = useState<number>("bpm", () => 80);
  const beatCount = useState<number>("beatCount", () => 0);

  const audioContext = ref<AudioContext | null>(null);
  const tickBuffer = ref<AudioBuffer | null>(null);

  const nextNoteTime = ref(0);
  const schedulerInterval = ref<number | null>(null);
  const lookahead = 25.0;
  const scheduleAheadTime = 0.1;

  const wasPlaying = ref(false);
  const debounceTimeout = ref<number | null>(null);

  const loadTickSound = async () => {
    if (!audioContext.value) return;
    const response = await fetch("/click_new.mp3");
    const arrayBuffer = await response.arrayBuffer();
    tickBuffer.value = await audioContext.value.decodeAudioData(arrayBuffer);
  };

  const scheduleNote = (time: number) => {
    if (!audioContext.value || !tickBuffer.value) return;
    const source = audioContext.value.createBufferSource();
    source.buffer = tickBuffer.value;
    source.connect(audioContext.value.destination);
    source.start(time);
    beatCount.value++;
  };

  const scheduler = () => {
    if (!audioContext.value) return;
    const currentTime = audioContext.value.currentTime;

    while (nextNoteTime.value < currentTime + scheduleAheadTime) {
      scheduleNote(nextNoteTime.value);

      const secondsPerBeat = 60.0 / bpm.value;
      nextNoteTime.value += secondsPerBeat;
    }
  };

  const start = async () => {
    if (!audioContext.value) {
      audioContext.value = new AudioContext();
      await loadTickSound();
    }

    beatCount.value = 0;
    nextNoteTime.value = audioContext.value.currentTime + 0.05;
    schedulerInterval.value = window.setInterval(scheduler, lookahead);
    isPlaying.value = true;
  };

  const stop = () => {
    if (schedulerInterval.value) {
      clearInterval(schedulerInterval.value);
      schedulerInterval.value = null;
    }
    isPlaying.value = false;
    beatCount.value = 0;
  };

  const toggle = () => {
    if (isPlaying.value) {
      stop();
      wasPlaying.value = false;
    } else {
      start();
      wasPlaying.value = true;
    }
  };

  const handleBpmChange = () => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }

    stop();

    debounceTimeout.value = setTimeout(() => {
      if (wasPlaying.value) {
        start();
      }
    }, 300);
  };

  watch(bpm, handleBpmChange);

  onMounted(() => {
    stop();
    isPlaying.value = false;
  });

  onBeforeUnmount(() => {
    stop();
    isPlaying.value = false;
  });

  return {
    isPlaying,
    bpm,
    beatCount,
    toggle,
    start,
    stop,
  };
};
