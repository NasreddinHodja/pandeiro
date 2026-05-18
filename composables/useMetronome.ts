import type { Sequence } from "./useAudioEngine";

let metronomeInstance: ReturnType<typeof createMetronome> | null = null;

export const createMetronome = () => {
  const isPlaying = useState<boolean>("isPlaying", () => false);
  const bpm = useCookie<number>("bpm", { default: () => 80 });
  const volume = useCookie<number>("volume", { default: () => 75 });
  const beatCount = useState<number>("beatCount", () => 0);

  const engine = useAudioEngine();
  let tickBuffer: AudioBuffer | null = null;
  let gainNode: GainNode | null = null;
  let seq: Sequence | null = null;

  const loadClick = async () => {
    const ctx = engine.getContext();
    if (!ctx || tickBuffer) return;
    const response = await fetch("/click.mp3");
    const arrayBuffer = await response.arrayBuffer();
    tickBuffer = await ctx.decodeAudioData(arrayBuffer);
  };

  const start = async () => {
    await engine.start();
    const ctx = engine.getContext()!;

    if (!gainNode) {
      gainNode = ctx.createGain();
      gainNode.gain.value = volume.value / 100;
      gainNode.connect(ctx.destination);
    }

    await loadClick();

    seq = {
      nextTime: ctx.currentTime + 0.05,
      fire(time) {
        if (!ctx || !tickBuffer || !gainNode) return;
        const source = ctx.createBufferSource();
        source.buffer = tickBuffer;
        source.connect(gainNode);
        source.start(time);
        beatCount.value++;
      },
      advance() {
        this.nextTime += 60 / bpm.value;
      },
    };

    engine.register(seq);
    isPlaying.value = true;
    beatCount.value = 0;
  };

  const stop = () => {
    if (seq) {
      engine.unregister(seq);
      seq = null;
    }
    isPlaying.value = false;
    beatCount.value = 0;
  };

  const toggle = () => (isPlaying.value ? stop() : start());

  watch(volume, val => {
    if (gainNode) gainNode.gain.value = val / 100;
  });

  return { isPlaying, bpm, beatCount, volume, toggle, start, stop };
};

export const useMetronome = () => {
  if (!metronomeInstance) metronomeInstance = createMetronome();
  return metronomeInstance;
};
