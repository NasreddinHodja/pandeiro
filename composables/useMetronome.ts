let metronomeInstance: ReturnType<typeof createMetronome> | null = null;

export const createMetronome = () => {
  const isPlaying = useState<boolean>("isPlaying", () => false);
  const bpm = useCookie<number>("bpm", { default: () => 80 });
  const volume = useCookie<number>("volume", { default: () => 75 });
  const beatCount = useState<number>("beatCount", () => 0);

  const audioContext = ref<AudioContext | null>(null);
  const tickBuffer = ref<AudioBuffer | null>(null);
  const gainNode = ref<GainNode | null>(null);

  const nextNoteTime = ref(0);
  const schedulerInterval = ref<number | null>(null);
  const lookahead = 25.0;
  const scheduleAheadTime = 0.1;

  const wasPlaying = ref(false);
  const debounceTimeout = ref<number | null>(null);

  const loadTickSound = async () => {
    if (!audioContext.value) return;
    const response = await fetch("/click.mp3");
    const arrayBuffer = await response.arrayBuffer();
    tickBuffer.value = await audioContext.value.decodeAudioData(arrayBuffer);
  };

  const scheduleNote = (time: number) => {
    if (!audioContext.value || !tickBuffer.value || !gainNode.value) return;
    const source = audioContext.value.createBufferSource();
    source.buffer = tickBuffer.value;
    source.connect(gainNode.value);
    source.start(time);
    beatCount.value++;
  };

  const scheduler = () => {
    if (!audioContext.value || audioContext.value.state !== "running") return;
    const currentTime = audioContext.value.currentTime;

    while (nextNoteTime.value < currentTime + scheduleAheadTime) {
      scheduleNote(nextNoteTime.value);
      const secondsPerBeat = 60.0 / bpm.value;
      nextNoteTime.value += secondsPerBeat;
    }
  };

  const start = async () => {
    if (typeof window === "undefined") return;

    if (!audioContext.value) {
      audioContext.value = new AudioContext();
      await loadTickSound();
      gainNode.value = audioContext.value.createGain();
      gainNode.value.gain.value = volume.value / 100;
      gainNode.value.connect(audioContext.value.destination);
    }

    beatCount.value = 0;
    nextNoteTime.value = audioContext.value.currentTime + 0.05;
    schedulerInterval.value = window.setInterval(scheduler, lookahead);
    isPlaying.value = true;
  };

  const stop = () => {
    if (schedulerInterval.value !== null) {
      clearInterval(schedulerInterval.value);
      schedulerInterval.value = null;
    }

    if (audioContext.value) {
      audioContext.value
        .close()
        .then(() => {
          audioContext.value = null;
        })
        .catch(err => {
          console.error("Error closing AudioContext:", err);
        });
    }

    isPlaying.value = false;
    beatCount.value = 0;
    nextNoteTime.value = 0;
    gainNode.value = null;
  };

  const toggle = () => {
    if (isPlaying.value) {
      stop();
    } else {
      start();
    }
  };

  const handleBpmChange = () => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }

    if (!wasPlaying.value && isPlaying.value) {
      wasPlaying.value = true;
    }

    stop();

    debounceTimeout.value = setTimeout(() => {
      if (wasPlaying.value) {
        start();
        wasPlaying.value = false;
      }
    }, 300);
  };

  watch(bpm, handleBpmChange);

  watch(volume, newVal => {
    if (gainNode.value) {
      gainNode.value.gain.value = newVal / 100;
    }
  });

  return {
    isPlaying,
    bpm,
    beatCount,
    volume,
    toggle,
    start,
    stop,
  };
};

export const useMetronome = () => {
  if (!metronomeInstance) {
    metronomeInstance = createMetronome();
  }
  return metronomeInstance;
};
