<script setup lang="ts">
import { Track, Note } from "~/lib/score";

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

const levadaContainer = ref<HTMLDivElement | null>(null);
const surdoContainer = ref<HTMLDivElement | null>(null);

const createLevadaScore = () => {
  if (levadaContainer.value === null) return;

  const staff = new Track(levadaContainer.value);
  staff.addTimeStignature("2/4");

  staff.addNote([
    new Note("gad", "16"),
    new Note("plu", "16").addAccent(),
    new Note("pld", "16"),
    new Note("plu", "16"),
    new Note("grd", "16"),
    new Note("plu", "16").addAccent(),
    new Note("pld", "16"),
    new Note("gru", "16"),
  ]);

  staff.draw();
};

const createSurdoScore = () => {
  if (surdoContainer.value === null) return;

  const staff = new Track(surdoContainer.value);
  staff.addTimeStignature("2/4");

  staff.addNote([
    new Note("gad", "16"),
    new Note("plu", "16").addAccent(),
    new Note("pld", "16"),
    new Note("plu", "16"),
    new Note("grd", "16"),
    new Note("plu", "16").addAccent(),
    new Note("pld", "16"),
    new Note("gru", "16"),

    new Note("gad", "16"),
    new Note("plu", "16").addAccent(),
    new Note("pld", "16"),
    new Note("plu", "16"),
    new Note("grd", "16"),
    new Note("plu", "16").addAccent(),
    new Note("grd", "16"),
    new Note("plu", "16"),

    new Note("gad", "16"),
    new Note("plu", "16").addAccent(),
    new Note("pld", "16"),
    new Note("plu", "16"),
    new Note("grd", "16"),
    new Note("plu", "16").addAccent(),
    new Note("grd", "16"),
    new Note("plu", "16"),
  ]);

  staff.draw();
};

onMounted(() => {
  createLevadaScore();
  createSurdoScore();
});
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="w-full flex flex-row gap-4 items-center p-4 z-10">
      <NuxtLink to="/" class="flex">
        <Icon name="mdi:arrow-back" class="w-6 h-6" />
      </NuxtLink>
      <Icon
        name="mdi:hamburger-menu"
        class="w-6 h-6 md:hidden"
        @click="shouldShowMobileSidebar = !shouldShowMobileSidebar"
      />
    </div>

    <div
      class="flex w-full flex-col gap-4 md:gap-10 py-4 md:py-24 px-5 md:px-28 overflow-scroll pb-24"
    >
      <span class="text-2xl font-bold">Samba-choro</span>
      <div ref="levadaContainer" class="w-full"></div>

      <hr class="border-t border-white my-10 w-full" />

      <span class="text-xl font-bold">Sotaque - Surdo</span>
      <div ref="surdoContainer" class="w-full"></div>
    </div>
  </div>
</template>
