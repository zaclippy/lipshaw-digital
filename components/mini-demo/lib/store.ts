// Minimal Zustand store for the mini demo. No persistence, no auth, no
// network — everything resets on a fresh page load.

import { create } from 'zustand'
import type { Country, GamePhase, GameSelection } from './types'
import { TOTAL_ROUNDS } from './types'
import { CLASSIC_CATEGORIES, CLASSIC_COUNTRIES } from './data'
import { getCapForCategory } from './scoring'

interface DemoState {
  phase: GamePhase
  countries: Country[]          // shuffled subset, length === TOTAL_ROUNDS
  currentIndex: number
  selections: GameSelection[]
  usedCategories: string[]

  startGame: () => void
  selectCategory: (categoryId: string) => void
  restart: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRoundCountries(): Country[] {
  // Prefer countries that have rankings in at least 4 of 8 categories so
  // there's always something meaningful to pick.
  const eligible = CLASSIC_COUNTRIES.filter(c => Object.keys(c.rankings).length >= 4)
  return shuffle(eligible).slice(0, TOTAL_ROUNDS)
}

export const useDemoStore = create<DemoState>((set, get) => ({
  phase: 'start',
  countries: [],
  currentIndex: 0,
  selections: [],
  usedCategories: [],

  startGame: () => {
    set({
      phase: 'playing',
      countries: pickRoundCountries(),
      currentIndex: 0,
      selections: [],
      usedCategories: [],
    })
  },

  selectCategory: (categoryId: string) => {
    const { countries, currentIndex, selections, usedCategories } = get()
    const country = countries[currentIndex]
    if (!country) return

    const cap = getCapForCategory(categoryId)
    const rawRank = country.rankings[categoryId]
    const wasUnranked = rawRank === undefined || rawRank > cap
    const rank = wasUnranked ? cap : rawRank

    const nextSelections = [
      ...selections,
      { country, category: categoryId, rank, wasUnranked },
    ]
    const nextUsed = [...usedCategories, categoryId]
    const nextIndex = currentIndex + 1

    if (nextIndex >= countries.length || nextUsed.length >= CLASSIC_CATEGORIES.length) {
      set({
        selections: nextSelections,
        usedCategories: nextUsed,
        currentIndex: nextIndex,
        phase: 'done',
      })
    } else {
      set({
        selections: nextSelections,
        usedCategories: nextUsed,
        currentIndex: nextIndex,
      })
    }
  },

  restart: () => {
    set({
      phase: 'start',
      countries: [],
      currentIndex: 0,
      selections: [],
      usedCategories: [],
    })
  },
}))
