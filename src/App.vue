<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <PageHeader />

      <!-- Restart Button -->
      <RestartButton
        :canRestart="canRestart"
        :daysRemaining="daysRemaining"
        :testingMode="TESTING_MODE"
        @restart="handleRestart"
      >
        <template #icon>
          <RotateCcw class="h-4 w-4" />
        </template>
      </RestartButton>

      <!-- Warning Alert -->
      <WarningAlert :show="showWarning" :message="warningMessage">
        <template #icon>
          <AlertTriangle class="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
        </template>
      </WarningAlert>

      <!-- Card Decks -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <CardDeck
          v-for="deck in decks"
          :key="deck.type"
          :count="getAvailableCards(deck.type).length"
          :title="deck.title"
          :subtitle="deck.subtitle"
          @draw="() => drawCard(deck.type)"
        >
          <template #stack>
            <div
              class="absolute inset-0 bg-slate-300 rounded-lg transform rotate-1 translate-x-1 translate-y-1 opacity-60"
            ></div>
            <div
              class="absolute inset-0 bg-slate-400 rounded-lg transform -rotate-1 translate-x-0.5 translate-y-0.5 opacity-80"
            ></div>
          </template>
          <template #topcard>
            <component :is="deck.Visual" />
          </template>
        </CardDeck>
      </div>

      <!-- Card Placement Area -->
      <CardPlacementArea
        :placedCards="placedCardObjects"
        :replacedSlots="replacedSlots"
        :replacingSlot="slotBeingReplaced"
        @replace="handleCardReplace"
      />
    </div>
  </div>
</template>

<script setup>
import PageHeader from './components/PageHeader.vue'
import RestartButton from './components/RestartButton.vue'
import WarningAlert from './components/WarningAlert.vue'
import CardDeck from './components/CardDeck.vue'
import CardPlacementArea from './components/CardPlacementArea.vue'
import ArchetypeCardVisual from './components/ArchetypeCardVisual.vue'
import PastCardVisual from './components/PastCardVisual.vue'
import FutureCardVisual from './components/FutureCardVisual.vue'
import { useCardGame, decks as baseDecks } from './lib/useCardGame.js'
import { RotateCcw, AlertTriangle } from 'lucide-vue-next'

// Attach visual components to decks for rendering
const decks = baseDecks.map((deck) => {
  let Visual
  switch (deck.type) {
    case 'archetype':
      Visual = ArchetypeCardVisual
      break
    case 'past':
      Visual = PastCardVisual
      break
    case 'future':
      Visual = FutureCardVisual
      break
    default:
      Visual = null
  }
  return {
    ...deck,
    Visual,
  }
})

// Use the card game composable for all state and logic
const TESTING_MODE = true
const {
  placedCardObjects,
  showWarning,
  warningMessage,
  replacedSlots,
  slotBeingReplaced,
  canRestart,
  daysRemaining,
  getAvailableCards,
  drawCard,
  handleCardReplace,
  handleRestart,
} = useCardGame(TESTING_MODE)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
