// Scoring helpers — mirrors packages/core/src/scoring.ts but only the bits
// the demo needs (sum of ranks + per-category rank cap).

import type { GameSelection } from './types'
import { CATEGORY_CAPS, DEFAULT_RANK_CAP } from './data'

export function getCapForCategory(catId: string): number {
  return CATEGORY_CAPS[catId] ?? DEFAULT_RANK_CAP
}

export function calculateScore(selections: GameSelection[]): number {
  return selections.reduce((sum, s) => sum + s.rank, 0)
}

export function getScoreVerdict(score: number): string {
  if (score < 80) return 'Incredible run! 🏆'
  if (score < 130) return 'Great score! 🌟'
  if (score < 200) return 'Solid run! 👍'
  if (score < 300) return 'Not bad — try again!'
  return 'Tough one — give it another shot!'
}
