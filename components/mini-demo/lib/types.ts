// Self-contained type definitions for the mini demo.
// Mirrors a subset of packages/core/src/types.ts so this package has zero
// internal monorepo dependencies and can be copy-pasted into any React app.

export interface Country {
  name: string
  emoji: string
  rankings: Record<string, number>
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface GameSelection {
  country: Country
  category: string
  rank: number
  wasUnranked: boolean
}

export type GamePhase = 'start' | 'playing' | 'done'

export const TOTAL_ROUNDS = 8
