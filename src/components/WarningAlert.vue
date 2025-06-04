<template>
  <div v-if="show" class="mb-6 flex justify-center">
    <div
      class="max-w-md bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3"
    >
      <slot name="icon" />
      <p class="text-sm text-yellow-800">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
})
</script>
