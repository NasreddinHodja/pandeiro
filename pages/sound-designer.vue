<script setup lang="ts">
import { previewNote } from "~/composables/usePlayback";

const { config, defaults, load, save, reset } = useSoundConfig();

onMounted(load);
watch(config, save, { deep: true });

type Prefix = "gr" | "ga" | "gs" | "ta" | "pl" | "roll";

const preview = (prefix: Prefix, opts: { accent?: boolean; ghost?: boolean; isUp?: boolean } = {}) =>
  previewNote(prefix, opts);
const debouncedPreview = (prefix: Prefix) => debounce(() => preview(prefix), 120)();

const membraneNotes = [
  { prefix: "gr" as const, label: "Grave", pt: "Toque cheio da pele" },
  { prefix: "ga" as const, label: "Grave Abafado", pt: "Toque abafado" },
  { prefix: "gs" as const, label: "Grave Seco", pt: "Toque seco" },
];

const noiseNotes = [
  { prefix: "ta" as const, label: "Tapa", pt: "Tapa na pele" },
  { prefix: "pl" as const, label: "Platinela", pt: "Toque nas platinelas" },
];
</script>

<template>
  <div class="min-h-full w-full flex flex-col bg-black text-white">
    <div class="flex items-center justify-between p-4 border-b border-white/10">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="flex">
          <Icon name="mdi:arrow-back" class="w-5 h-5" />
        </NuxtLink>
        <span class="text-lg font-bold">Sound Designer</span>
      </div>
      <button class="text-xs text-white/40 hover:text-white/80 transition-colors" @click="reset">
        Reset defaults
      </button>
    </div>

    <div class="flex flex-col gap-8 p-6 md:p-10 max-w-4xl overflow-scroll pb-24">

      <!-- Global levels -->
      <section class="flex flex-col gap-4">
        <h2 class="text-sm font-bold uppercase tracking-widest text-white/40">Global</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SharedSoundSlider
            v-model="config.baseLevelDown"
            label="Level (down stroke)"
            :min="0.05" :max="1" :step="0.05"
          />
          <SharedSoundSlider
            v-model="config.baseLevelUp"
            label="Level (up stroke)"
            :min="0.05" :max="1" :step="0.05"
          />
          <SharedSoundSlider
            v-model="config.accentMult"
            label="Accent multiplier"
            :min="1" :max="4" :step="0.1"
            unit="×"
          />
        </div>
      </section>

      <hr class="border-white/10" />

      <!-- Membrane notes -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm font-bold uppercase tracking-widest text-white/40">Membrane</h2>
        <div
          v-for="n in membraneNotes"
          :key="n.prefix"
          class="flex flex-col gap-4 p-4 border border-white/10"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-bold">{{ n.label }}</span>
              <span class="text-xs text-white/40">{{ n.pt }}</span>
            </div>
            <div class="flex gap-2">
              <button
                class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors"
                @click="preview(n.prefix)"
              >
                ↓ play
              </button>
              <button
                class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors"
                @click="preview(n.prefix, { isUp: true })"
              >
                ↑ play
              </button>
              <button
                class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors text-white/60"
                @click="preview(n.prefix, { accent: true })"
              >
                accent
              </button>
              <button
                class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors text-white/40"
                @click="preview(n.prefix, { ghost: true })"
              >
                ghost
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5" @input="debouncedPreview(n.prefix)">
            <SharedSoundSlider
              v-model="config[n.prefix].startFreq"
              label="Start freq"
              :min="50" :max="600" :step="5"
              unit=" Hz"
            />
            <SharedSoundSlider
              v-model="config[n.prefix].endFreq"
              label="End freq"
              :min="20" :max="300" :step="5"
              unit=" Hz"
            />
            <SharedSoundSlider
              v-model="config[n.prefix].decayMs"
              label="Decay"
              :min="10" :max="1000" :step="10"
              unit=" ms"
            />
          </div>
        </div>
      </section>

      <hr class="border-white/10" />

      <!-- Noise notes -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm font-bold uppercase tracking-widest text-white/40">Noise</h2>
        <div
          v-for="n in noiseNotes"
          :key="n.prefix"
          class="flex flex-col gap-4 p-4 border border-white/10"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-bold">{{ n.label }}</span>
              <span class="text-xs text-white/40">{{ n.pt }}</span>
            </div>
            <div class="flex gap-2">
              <button
                class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors"
                @click="preview(n.prefix)"
              >
                ↓ play
              </button>
              <button
                class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors"
                @click="preview(n.prefix, { isUp: true })"
              >
                ↑ play
              </button>
              <button
                class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors text-white/60"
                @click="preview(n.prefix, { accent: true })"
              >
                accent
              </button>
              <button
                class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors text-white/40"
                @click="preview(n.prefix, { ghost: true })"
              >
                ghost
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5" @input="debouncedPreview(n.prefix)">
            <SharedSoundSlider
              v-model="config[n.prefix].filterFreq"
              label="Filter freq"
              :min="200" :max="20000" :step="100"
              unit=" Hz"
            />
            <SharedSoundSlider
              v-model="config[n.prefix].filterQ"
              label="Filter Q"
              :min="0.1" :max="15" :step="0.1"
            />
            <SharedSoundSlider
              v-model="config[n.prefix].decayMs"
              label="Decay"
              :min="10" :max="500" :step="5"
              unit=" ms"
            />
          </div>
        </div>
      </section>

      <hr class="border-white/10" />

      <!-- Ghost & Roll -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm font-bold uppercase tracking-widest text-white/40">Modifiers</h2>

        <!-- Ghost -->
        <div class="flex flex-col gap-4 p-4 border border-white/10">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-bold">Ghost note</span>
              <span class="text-xs text-white/40">Toque fantasma</span>
            </div>
            <button
              class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors"
              @click="preview('gr', { ghost: true })"
            >
              preview
            </button>
          </div>
          <SharedSoundSlider
            v-model="config.ghostLevelMult"
            label="Level multiplier"
            :min="0.02" :max="0.5" :step="0.01"
            unit="×"
          />
        </div>

        <!-- Roll -->
        <div class="flex flex-col gap-4 p-4 border border-white/10">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-bold">Rulo</span>
              <span class="text-xs text-white/40">Tremolo nas platinelas</span>
            </div>
            <button
              class="px-3 py-1 text-xs border border-white/30 hover:border-white transition-colors"
              @click="preview('roll')"
            >
              preview
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5" @input="debouncedPreview('roll')">
            <SharedSoundSlider
              v-model="config.roll.filterFreq"
              label="Filter freq"
              :min="200" :max="20000" :step="100"
              unit=" Hz"
            />
            <SharedSoundSlider
              v-model="config.roll.filterQ"
              label="Filter Q"
              :min="0.1" :max="15" :step="0.1"
            />
            <SharedSoundSlider
              v-model="config.roll.durationMs"
              label="Duration"
              :min="50" :max="600" :step="10"
              unit=" ms"
            />
            <SharedSoundSlider
              v-model="config.roll.hitsPerSec"
              label="Hits per second"
              :min="8" :max="60" :step="1"
              unit=" /s"
            />
          </div>
        </div>
      </section>

    </div>
  </div>
</template>
