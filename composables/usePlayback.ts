import type { RawNote, NoteKey } from "~/lib/score";
import type { Sequence } from "./useAudioEngine";
import { soundConfig } from "./useSoundConfig";

// --- percussion synths (raw Web Audio) ---

const playMembrane = (
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  startFreq: number,
  endFreq: number,
  decay: number,
  level: number
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(startFreq, time);
  osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.025);
  gain.gain.setValueAtTime(level, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(time);
  osc.stop(time + decay + 0.01);
};

const playNoise = (
  ctx: AudioContext,
  dest: AudioNode,
  noiseBuffer: AudioBuffer,
  time: number,
  filterFreq: number,
  filterQ: number,
  decay: number,
  level: number
) => {
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = filterFreq;
  filter.Q.value = filterQ;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(level, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  source.start(time);
  source.stop(time + decay + 0.01);
};

const playRoll = (
  ctx: AudioContext,
  dest: AudioNode,
  noiseBuffer: AudioBuffer,
  time: number,
  level: number
) => {
  const { filterFreq, filterQ, durationMs, hitsPerSec } = soundConfig.roll;
  const dur = durationMs / 1000;
  const numHits = Math.max(2, Math.round(hitsPerSec * dur));
  const spacing = dur / numHits;
  const hitDecay = spacing * 1.8;

  for (let i = 0; i < numHits; i++) {
    playNoise(ctx, dest, noiseBuffer, time + i * spacing, filterFreq, filterQ, hitDecay, level * 0.55);
  }
};

const triggerNote = (
  key: NoteKey,
  time: number,
  ctx: AudioContext,
  dest: AudioNode,
  noiseBuffer: AudioBuffer,
  accent = false,
  ghost = false,
  roll = false
) => {
  if (key === "rst") return;

  if (roll) {
    const base = key[2] === "u" ? soundConfig.baseLevelUp : soundConfig.baseLevelDown;
    const level = accent ? base * soundConfig.accentMult : base;
    playRoll(ctx, dest, noiseBuffer, time, level);
    return;
  }

  const prefix = key.substring(0, 2);
  const isUp = key[2] === "u";
  const base = isUp ? soundConfig.baseLevelUp : soundConfig.baseLevelDown;
  const level = ghost
    ? base * soundConfig.ghostLevelMult
    : accent
      ? base * soundConfig.accentMult
      : base;

  switch (prefix) {
    case "gr": {
      const p = soundConfig.gr;
      playMembrane(ctx, dest, time, p.startFreq, p.endFreq, p.decayMs / 1000, level);
      break;
    }
    case "ga": {
      const p = soundConfig.ga;
      playMembrane(ctx, dest, time, p.startFreq, p.endFreq, p.decayMs / 1000, level);
      break;
    }
    case "gs": {
      const p = soundConfig.gs;
      playMembrane(ctx, dest, time, p.startFreq, p.endFreq, p.decayMs / 1000, level);
      break;
    }
    case "ta": {
      const p = soundConfig.ta;
      playNoise(ctx, dest, noiseBuffer, time, p.filterFreq, p.filterQ, p.decayMs / 1000, level * 0.6);
      break;
    }
    case "pl": {
      const p = soundConfig.pl;
      playNoise(ctx, dest, noiseBuffer, time, p.filterFreq, p.filterQ, p.decayMs / 1000, level * 0.5);
      break;
    }
  }
};

// --- per-note duration in seconds ---

const noteDurSec = (note: RawNote, bpm: number): number => {
  const base = parseInt(note.duration.replace("r", ""));
  return (4 / base) * (60 / bpm) * (note.isDotted ? 1.5 : 1);
};

// 16th-grid position for each note (0 = beat 1, 1 = e, 2 = and, ...)
const compute16thPositions = (notes: RawNote[]): number[] => {
  const positions: number[] = [];
  let pos = 0;
  for (const note of notes) {
    positions.push(pos);
    const base = parseInt(note.duration.replace("r", ""));
    pos += 16 / base * (note.isDotted ? 1.5 : 1);
  }
  return positions;
};

// Samba swing: within each beat, 4 16th notes follow the "bouncing ball" pattern.
// Pedro Batista's tamborim analysis: durations 28%/17%/23%/32% of a beat (equal = 25% each).
// Cumulative position offsets vs equal: 0 / +3% / -5% / -7% of a quarter note.
const SAMBA_SWING_OFFSETS = [0, 0.03, -0.05, -0.07];

const swingOffset = (pos16: number, swingRatio: number, bpm: number): number => {
  if (swingRatio <= 0) return 0;
  const beatPos = Math.floor(pos16) % 4;
  return SAMBA_SWING_OFFSETS[beatPos] * (60 / bpm) * swingRatio;
};

// --- module-level playback state ---

let _currentSeq: Sequence | null = null;
let _currentOwner: symbol | null = null;
const _isPlaying = ref(false);
const _activeNoteIndex = ref(-1);
let _loopStartTime = 0;
let _loopDuration = 0;

export const getNextDownbeat = () => _loopStartTime + _loopDuration;

const _stopAll = () => {
  if (_currentSeq) {
    useAudioEngine().unregister(_currentSeq);
    _currentSeq = null;
  }
  _isPlaying.value = false;
  _activeNoteIndex.value = -1;
  _currentOwner = null;
};

// --- preview a single note instantly (for sound designer) ---

export const previewNote = async (
  prefix: "gr" | "ga" | "gs" | "ta" | "pl" | "roll",
  options: { accent?: boolean; ghost?: boolean; isUp?: boolean } = {}
) => {
  const engine = useAudioEngine();
  await engine.start();
  const ctx = engine.getContext();
  const noiseBuffer = engine.getNoiseBuffer();
  if (!ctx || !noiseBuffer) return;
  const { accent = false, ghost = false, isUp = false } = options;
  const key = `${prefix === "roll" ? "pl" : prefix}${isUp ? "u" : "d"}` as NoteKey;
  const isRoll = prefix === "roll";
  triggerNote(key, ctx.currentTime + 0.01, ctx, ctx.destination, noiseBuffer, accent, ghost, isRoll);
};

// --- composable ---

export const usePlayback = () => {
  const myId = Symbol();
  const { bpm } = useMetronome();

  const isThisPlaying = computed(() => _isPlaying.value && _currentOwner === myId);
  const activeNoteIndex = computed(() => (isThisPlaying.value ? _activeNoteIndex.value : -1));

  const play = async (notes: RawNote[], swingRatio = 0): Promise<number> => {
    const engine = useAudioEngine();
    await engine.start();

    _stopAll();

    const ctx = engine.getContext()!;
    const noiseBuffer = engine.getNoiseBuffer()!;
    const dest = ctx.destination;

    let noteIndex = 0;
    const startTime = ctx.currentTime + 0.05;
    _loopStartTime = startTime;
    const grid16 = compute16thPositions(notes);

    // Precompute each note's actual sound time relative to loop start (straight + swing offset)
    let straightAcc = 0;
    const noteSoundTimes = notes.map((note, i) => {
      const t = straightAcc + swingOffset(grid16[i], swingRatio, bpm.value);
      straightAcc += noteDurSec(note, bpm.value);
      return t;
    });
    _loopDuration = straightAcc;

    _currentOwner = myId;
    _isPlaying.value = true;

    _currentSeq = {
      nextTime: startTime,

      fire(time) {
        const i = noteIndex % notes.length;
        if (i === 0) _loopStartTime = time;

        const note = notes[i];
        if (!note.duration.includes("r")) {
          const offset = swingOffset(grid16[i], swingRatio, bpm.value);
          triggerNote(note.key as NoteKey, time + offset, ctx, dest, noiseBuffer, note.isAccent, note.isGhost, note.isRoll);
        }
      },

      advance() {
        const i = noteIndex % notes.length;
        this.nextTime += noteDurSec(notes[i], bpm.value);
        noteIndex++;
      },

      visualUpdate(now) {
        if (_currentOwner !== myId) return;
        const elapsed = (now - _loopStartTime) % _loopDuration;
        if (elapsed < 0) return;

        let activeIdx = 0;
        for (let i = 0; i < notes.length; i++) {
          if (noteSoundTimes[i] <= elapsed) activeIdx = i;
          else break;
        }
        _activeNoteIndex.value = activeIdx;
      },
    };

    engine.register(_currentSeq);
    return startTime;
  };

  const stop = () => {
    if (_currentOwner === myId) _stopAll();
  };

  onBeforeUnmount(() => {
    if (_currentOwner === myId) _stopAll();
  });

  return { isThisPlaying, activeNoteIndex, play, stop };
};
