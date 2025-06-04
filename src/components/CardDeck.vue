<template>
  <div class="flex flex-col items-center">
    <div class="relative mb-4">
      <div class="relative cursor-pointer group" @click="$emit('draw')">
        <slot name="stack" />
        <slot name="topcard" />
        <div
          class="absolute -bottom-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-gray-300"
        >
          {{ count }}
        </div>
      </div>
    </div>
    <h3 class="text-lg font-medium text-slate-700">{{ title }}</h3>
    <p class="text-sm text-slate-500 text-center mt-1">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  count: Number,
  title: String,
  subtitle: String,
})
</script>
