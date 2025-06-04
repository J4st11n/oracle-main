<template>
  <div class="flex flex-col items-center mb-8">
    <button
      @click="$emit('restart')"
      :disabled="isDisabled"
      :class="buttonClass"
      class="flex items-center gap-2 px-4 py-2 rounded-md border transition-colors"
    >
      <slot name="icon" />
      Restart
    </button>
    <p v-if="!testingMode && daysRemaining > 0" class="text-sm text-slate-500 mt-1">
      Next restart available in {{ daysRemaining }} day<span v-if="daysRemaining !== 1">s</span>
    </p>
    <p v-if="testingMode" class="text-xs text-orange-500 mt-1">Testing mode - no restrictions</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  canRestart: Boolean,
  daysRemaining: Number,
  testingMode: Boolean,
})

const isDisabled = computed(() => !props.testingMode && !props.canRestart)
const buttonClass = computed(() =>
  props.canRestart || props.testingMode
    ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
    : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
)
</script>
