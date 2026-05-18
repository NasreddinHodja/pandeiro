const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

export interface Sequence {
  nextTime: number;
  fire(audioTime: number): void;
  advance(): void;
  visualUpdate?(now: number): void;
}

const createEngine = () => {
  let ctx: AudioContext | null = null;
  let noiseBuffer: AudioBuffer | null = null;
  let intervalId: number | null = null;
  let rafId: number | null = null;
  const sequences = new Set<Sequence>();

  const buildNoiseBuffer = () => {
    if (!ctx || noiseBuffer) return;
    const length = ctx.sampleRate;
    noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  };

  const schedule = () => {
    if (!ctx) return;
    const now = ctx.currentTime;
    for (const seq of sequences) {
      while (seq.nextTime < now + SCHEDULE_AHEAD_S) {
        seq.fire(seq.nextTime);
        seq.advance();
      }
    }
  };

  const rafLoop = () => {
    if (ctx) {
      const now = ctx.currentTime;
      for (const seq of sequences) {
        seq.visualUpdate?.(now);
      }
    }
    rafId = requestAnimationFrame(rafLoop);
  };

  const start = async () => {
    if (!ctx) {
      ctx = new AudioContext();
      buildNoiseBuffer();
    }
    if (ctx.state === "suspended") await ctx.resume();
    if (!intervalId) intervalId = window.setInterval(schedule, LOOKAHEAD_MS);
    if (!rafId) rafId = requestAnimationFrame(rafLoop);
  };

  const getContext = () => ctx;
  const getNoiseBuffer = () => noiseBuffer;

  const register = (seq: Sequence) => sequences.add(seq);
  const unregister = (seq: Sequence) => sequences.delete(seq);

  return { start, getContext, getNoiseBuffer, register, unregister };
};

let _engine: ReturnType<typeof createEngine> | null = null;

export const useAudioEngine = () => {
  if (!_engine) _engine = createEngine();
  return _engine;
};
