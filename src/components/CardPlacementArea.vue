<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
    <template v-for="side in ['left', 'right']" :key="side">
      <div class="flex flex-col items-center space-y-8">
        <CardSlot
          :card="placedCards[`${side}Archetype`]"
          :replaced="replacedSlots[`${side}Archetype`]"
          :replacing="replacingSlot === `${side}Archetype`"
          label="Archetype"
          @replace="() => $emit('replace', `${side}Archetype`)"
        />
        <div class="flex gap-8">
          <template v-for="type in ['Past', 'Future']" :key="type">
            <CardSlot
              :card="placedCards[`${side}${type}`]"
              :replaced="replacedSlots[`${side}${type}`]"
              :replacing="replacingSlot === `${side}${type}`"
              :label="type"
              @replace="() => $emit('replace', `${side}${type}`)"
            />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import CardSlot from './CardSlot.vue'

defineProps({
  placedCards: Object,
  replacedSlots: Object,
  replacingSlot: String,
})
</script>
