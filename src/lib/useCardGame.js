// Composable for card game logic and state
import { ref, onMounted } from 'vue'
import { archetypeCards, pastCards, futureCards } from '../data/cards.js'

// --- Deck definitions ---
export const decks = [
  { type: 'archetype', title: 'Archetypes', subtitle: 'Discover your inner patterns' },
  { type: 'past', title: 'Past Reflections', subtitle: 'Learn from your experiences' },
  { type: 'future', title: 'Future Visions', subtitle: 'Envision your path forward' },
]

// --- State ---
const initialPlaced = () => ({
  leftArchetype: null,
  rightArchetype: null,
  leftPast: null,
  leftFuture: null,
  rightPast: null,
  rightFuture: null,
})
const initialReplaced = () => ({
  leftArchetype: false,
  rightArchetype: false,
  leftPast: false,
  leftFuture: false,
  rightPast: false,
  rightFuture: false,
})
const initialDrawn = () => ({
  archetypes: [],
  past: [],
  future: [],
})

const placementSlots = {
  left: { archetype: 'leftArchetype', past: 'leftPast', future: 'leftFuture' },
  right: { archetype: 'rightArchetype', past: 'rightPast', future: 'rightFuture' },
}
const slotTypeMap = {
  leftArchetype: 'archetype',
  rightArchetype: 'archetype',
  leftPast: 'past',
  rightPast: 'past',
  leftFuture: 'future',
  rightFuture: 'future',
}

// --- Composable ---
export function useCardGame(TESTING_MODE = true) {
  const placedCardObjects = ref(initialPlaced())
  const replacedSlots = ref(initialReplaced())
  const drawnCardIds = ref(initialDrawn())
  const slotBeingReplaced = ref(null)
  const showWarning = ref(false)
  const warningMessage = ref('')
  const canRestart = ref(true)
  const daysRemaining = ref(0)

  // --- Cookie helpers ---
  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${value};expires=${expires};path=/`
  }
  const getCookie = (name) => {
    const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
    return v ? v.pop() : null
  }

  // --- Utility ---
  function warn(msg, timeout = 3000) {
    warningMessage.value = msg
    showWarning.value = true
    setTimeout(() => (showWarning.value = false), timeout)
  }

  // --- Card logic ---
  function getAvailableCards(type) {
    const all = type === 'archetype' ? archetypeCards : type === 'past' ? pastCards : futureCards
    const drawn = drawnCardIds.value[type === 'archetype' ? 'archetypes' : type]
    return all.filter((card) => !drawn.includes(card.id))
  }

  function getNextAvailableSlot(cardType) {
    if (cardType === 'archetype') {
      for (const side of ['left', 'right']) {
        const slot = placementSlots[side][cardType]
        if (!placedCardObjects.value[slot]) return slot
      }
      return null
    }
    for (const side of ['left', 'right']) {
      const archetypeSlot = placementSlots[side]['archetype']
      const targetSlot = placementSlots[side][cardType]
      if (placedCardObjects.value[archetypeSlot] && !placedCardObjects.value[targetSlot]) {
        return targetSlot
      }
    }
    return null
  }

  function drawCard(deckType) {
    const available = getAvailableCards(deckType)
    if (!available.length) return warn(`No more ${deckType} cards available!`)

    let targetSlot = slotBeingReplaced.value
      ? slotTypeMap[slotBeingReplaced.value] === deckType
        ? slotBeingReplaced.value
        : null
      : getNextAvailableSlot(deckType)

    if (!targetSlot) {
      if (slotBeingReplaced.value)
        return warn(
          `Please draw from the ${slotTypeMap[slotBeingReplaced.value]} deck to replace this card!`,
        )
      return warn(
        deckType === 'archetype'
          ? 'All archetype slots are full!'
          : `Place an archetype card first before drawing ${deckType} cards!`,
      )
    }

    const randomCard = available[Math.floor(Math.random() * available.length)]

    // If replacing, return old card to pool and mark replaced
    if (slotBeingReplaced.value && placedCardObjects.value[targetSlot]) {
      const old = placedCardObjects.value[targetSlot]
      const deckKey = old.type === 'archetype' ? 'archetypes' : old.type
      drawnCardIds.value[deckKey] = drawnCardIds.value[deckKey].filter((id) => id !== old.id)
      replacedSlots.value[targetSlot] = true
    }

    placedCardObjects.value[targetSlot] = randomCard
    const deckKey = deckType === 'archetype' ? 'archetypes' : deckType
    drawnCardIds.value[deckKey].push(randomCard.id)
    slotBeingReplaced.value = null
  }

  function handleCardReplace(slotKey) {
    if (replacedSlots.value[slotKey]) return warn('This card has already been replaced once!')
    slotBeingReplaced.value = slotKey
    warn('Click on a deck to draw a replacement card')
  }

  function handleRestart() {
    if (!TESTING_MODE && !canRestart.value)
      return warn(
        `You can restart again in ${daysRemaining.value} day${daysRemaining.value !== 1 ? 's' : ''}!`,
      )
    placedCardObjects.value = initialPlaced()
    drawnCardIds.value = initialDrawn()
    replacedSlots.value = initialReplaced()
    slotBeingReplaced.value = null
    if (!TESTING_MODE) {
      setCookie('lastRestart', new Date().toISOString(), 30)
      canRestart.value = false
      daysRemaining.value = 4
    }
    warn('All cards have been cleared!')
  }

  // --- Restart availability logic ---
  onMounted(() => {
    if (TESTING_MODE) return (canRestart.value = true), (daysRemaining.value = 0)
    const lastRestartDate = getCookie('lastRestart')
    if (!lastRestartDate) return (canRestart.value = true), (daysRemaining.value = 0)
    const daysSince = Math.floor((Date.now() - new Date(lastRestartDate)) / 864e5)
    const remaining = Math.max(0, 4 - daysSince)
    canRestart.value = remaining === 0
    daysRemaining.value = remaining
  })

  // --- Expose ---
  return {
    placedCardObjects,
    drawnCardIds,
    showWarning,
    warningMessage,
    replacedSlots,
    slotBeingReplaced,
    canRestart,
    daysRemaining,
    getAvailableCards,
    getNextAvailableSlot,
    drawCard,
    handleCardReplace,
    handleRestart,
    decks,
  }
}
