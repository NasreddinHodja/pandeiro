import { reactive, toRaw } from "vue";

export type MembraneParams = {
  startFreq: number;
  endFreq: number;
  decayMs: number;
};

export type NoiseParams = {
  filterFreq: number;
  filterQ: number;
  decayMs: number;
};

export type RollParams = {
  filterFreq: number;
  filterQ: number;
  durationMs: number;
  hitsPerSec: number;
};

export type SoundConfig = {
  baseLevelDown: number;
  baseLevelUp: number;
  accentMult: number;
  ghostLevelMult: number;
  gr: MembraneParams;
  ga: MembraneParams;
  gs: MembraneParams;
  ta: NoiseParams;
  pl: NoiseParams;
  roll: RollParams;
};

const DEFAULTS: SoundConfig = {
  baseLevelDown: 0.45,
  baseLevelUp: 0.45,
  accentMult: 2.2,
  ghostLevelMult: 0.05,
  gr: { startFreq: 180, endFreq: 80, decayMs: 630 },
  ga: { startFreq: 160, endFreq: 55, decayMs: 240 },
  gs: { startFreq: 310, endFreq: 75, decayMs: 40 },
  ta: { filterFreq: 1000, filterQ: 1.2, decayMs: 120 },
  pl: { filterFreq: 11100, filterQ: 1.5, decayMs: 90 },
  roll: { filterFreq: 5900, filterQ: 2.3, durationMs: 220, hitsPerSec: 24 },
};

const NOTE_KEYS = ["gr", "ga", "gs", "ta", "pl", "roll"] as const;
const STORAGE_KEY = "pandeiro-sound-config";

export const soundConfig = reactive<SoundConfig>(JSON.parse(JSON.stringify(DEFAULTS)));

export const useSoundConfig = () => {
  const load = () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const p: Partial<SoundConfig> = JSON.parse(raw);
      if (p.baseLevelDown != null) soundConfig.baseLevelDown = p.baseLevelDown;
      if (p.baseLevelUp != null) soundConfig.baseLevelUp = p.baseLevelUp;
      if (p.accentMult != null) soundConfig.accentMult = p.accentMult;
      if (p.ghostLevelMult != null) soundConfig.ghostLevelMult = p.ghostLevelMult;
      for (const k of NOTE_KEYS) {
        if (p[k]) Object.assign(soundConfig[k], p[k]);
      }
    } catch {}
  };

  const save = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toRaw(soundConfig)));
  };

  const reset = () => {
    const d: SoundConfig = JSON.parse(JSON.stringify(DEFAULTS));
    soundConfig.baseLevelDown = d.baseLevelDown;
    soundConfig.baseLevelUp = d.baseLevelUp;
    soundConfig.accentMult = d.accentMult;
    soundConfig.ghostLevelMult = d.ghostLevelMult;
    for (const k of NOTE_KEYS) Object.assign(soundConfig[k], d[k]);
    save();
  };

  return { config: soundConfig, defaults: DEFAULTS, load, save, reset };
};
