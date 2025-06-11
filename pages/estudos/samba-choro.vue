<script setup lang="ts">
// import { Staff } from "~/lib/score";

const shouldShowMobileSidebar = useState("shouldShowMobileSidebar", () => false);

const levadaContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  // if (levadaContainer.value === null) return;
  // const staff = new Staff(levadaContainer.value, 100, 80, 0, 0, 1);
  // staff.addNote([
  //   createGraveAbafadoDown("8"),
  //   createPlatinelaUp("8"),
  // ])
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
      <div ref="levadaContainer" class="px-4"></div>
    </div>
  </div>
</template>
