<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen flex flex-col bg-black text-white font-mono overflow-hidden">
    <NuxtPage />
    <div class="lg:flex lg:w-full lg:h-60 lg:flex-col lg:items-center lg:mb-24 m-10 lg:m-0">
      <SharedGlobalMetronome />
    </div>
  </div>
</template>
