<template>
  <div :class="rootClass" @click="handleReplace">
    <template v-if="!isEmpty">
      <!-- Render card content here -->
      <div class="h-full p-3 flex flex-col relative">
        <div v-if="replaced" class="absolute top-1 right-1 w-3 h-3 bg-gray-400 rounded-full"></div>
        <div
          v-if="replacing"
          class="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"
        ></div>
        <div
          v-if="card.image"
          class="w-full h-16 mb-2 bg-gray-100 rounded flex items-center justify-center overflow-hidden"
        >
          <img
            :src="card.image || '/placeholder.svg'"
            :alt="card.title"
            class="w-full h-full object-cover"
          />
        </div>
        <h4 class="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{{ card.title }}</h4>
        <p class="text-xs text-gray-600 line-clamp-4 flex-1">{{ card.description }}</p>
      </div>
    </template>
    <template v-else>
      <span>{{ label }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  card: Object,
  replaced: Boolean,
  replacing: Boolean,
  label: String,
})

const isEmpty = computed(() => !props.card)

const rootClass = computed(() => {
  if (!isEmpty.value) {
    let base =
      'w-32 h-44 bg-white border-2 shadow-md overflow-hidden transition-all duration-200 rounded-lg '
    base += props.replaced
      ? 'border-gray-400 opacity-75'
      : 'border-gray-200 cursor-pointer hover:border-blue-400 hover:shadow-lg'
    if (props.replacing) {
      base += ' border-yellow-400 shadow-yellow-200 shadow-lg'
    }
    return base
  } else {
    if (props.label === 'Archetype') {
      return 'w-32 h-44 border-2 border-dashed border-red-200 bg-red-50 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer hover:border-opacity-60'
    } else {
      let color =
        props.label === 'Past' ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'
      let base = `w-32 h-44 border-2 border-dashed ${color} rounded-lg flex items-center justify-center transition-colors duration-200`
      base += ' cursor-pointer hover:border-opacity-60'
      return base
    }
  }
})

const emit = defineEmits(['replace'])
const handleReplace = () => emit('replace')
</script>
