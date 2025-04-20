<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen flex flex-col bg-black text-white font-mono">
    <div class="hidden lg:flex"><LayoutsDefaultHeader /></div>
    <div class="lg:hidden"><LayoutsMobileHeader /></div>
    <slot />
  </div>
</template>
