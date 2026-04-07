"use client"

import type { Category } from '../lib/types'

// 1:1 port of the category button from apps/web/components/game-screen.tsx
// (lines 1085-1158). Tailwind classes converted to plain CSS, Classic baseColor
// hard-coded to #9c62b3 (lighten 0.15 → #c288d9 for the used background).

interface CategoryButtonProps {
  category: Category
  disabled: boolean
  onClick: () => void
  /** If this category has been picked, the resulting rank (shown as a badge) */
  pickedRank?: number
  /** If picked, the flag emoji of the country it was picked for */
  pickedEmoji?: string
}

function rankBarColor(rank: number): string {
  if (rank <= 5) return '#34d399'   // emerald-400
  if (rank <= 15) return '#a3e635'  // lime-400
  if (rank <= 30) return '#fbbf24'  // amber-400
  if (rank <= 60) return '#f472b6'  // pink-400
  return '#f87171'                  // red-400
}

function rankLabel(rank: number, categoryId: string): string {
  if (categoryId === 'coffee' && rank > 73) return '73+'
  if (rank >= 100) return '100+'
  return `${rank}`
}

export function CategoryButton({
  category,
  disabled,
  onClick,
  pickedRank,
  pickedEmoji,
}: CategoryButtonProps) {
  const isUsed = pickedRank !== undefined

  return (
    <button
      type="button"
      className={`g-cat ${isUsed ? 'used' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="g-cat-inner">
        <span className="g-cat-icon">{category.icon}</span>
        <div className="g-cat-label-wrap">
          <div className="g-cat-label">{category.name}</div>
        </div>
        {isUsed && (
          <div className="g-cat-used-wrap">
            <span className="g-cat-flag" aria-label="chosen flag">{pickedEmoji}</span>
            <div className="g-cat-badge-wrap">
              <span className="g-cat-badge">{rankLabel(pickedRank!, category.id)}</span>
              <div
                className="g-cat-bar"
                style={{ background: rankBarColor(pickedRank!) }}
              />
            </div>
          </div>
        )}
      </div>
      <style>{`
        /* w-full min-h-[2.25rem] px-3 rounded-xl text-[14px] font-semibold */
        .g-cat {
          position:relative;
          width:100%;
          min-height:30px;
          padding:0 12px;
          border-radius:12px;
          border:none;
          background:#f9fafb; /* bg-gray-50 */
          color:#1f2937;       /* text-gray-800 */
          font-family:'Inter','Segoe UI',Arial,sans-serif;
          font-weight:600;
          font-size:14px;
          text-align:left;
          cursor:pointer;
          overflow:hidden;
          transition:transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .g-cat:hover:not(.used):not(:disabled) {
          transform:translateY(-1px);
          box-shadow:0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
        }
        .g-cat:active:not(.used):not(:disabled) { transform:scale(0.985); }
        .g-cat:disabled:not(.used) {
          color:#9ca3af; /* text-gray-400 */
          cursor:not-allowed;
        }
        /* Used: lighten(#9c62b3,0.15) ≈ #c288d9, border 2px #9c62b3, white text */
        .g-cat.used {
          background:#c288d9;
          border:2px solid #9c62b3;
          color:#ffffff;
          padding:0 10px; /* compensate for 2px border */
          box-shadow:inset 0 2px 4px rgba(0,0,0,0.06);
          cursor:default;
        }

        .g-cat-inner {
          display:flex;
          align-items:center;
          gap:12px;
          flex:1;
          position:relative;
        }
        /* text-lg = 18px, text-gray-700 default, white when used */
        .g-cat-icon {
          font-size:18px;
          line-height:1;
          flex-shrink:0;
          color:#374151;
          transition:transform .2s ease;
        }
        .g-cat:hover:not(.used) .g-cat-icon { transform:scale(1.10); }
        .g-cat.used .g-cat-icon { color:#ffffff; }

        .g-cat-label-wrap { flex:1; position:relative; }
        /* font-semibold uppercase text-[14px] letterSpacing 0.3px */
        .g-cat-label {
          font-weight:600;
          text-transform:uppercase;
          font-size:14px;
          letter-spacing:0.3px;
          color:#1f2937;
        }
        .g-cat.used .g-cat-label { color:#ffffff; }

        /* Used badge group: flag emoji + badge with right colored bar */
        .g-cat-used-wrap {
          display:flex;
          align-items:center;
          gap:8px;
          flex-shrink:0;
        }
        .g-cat-flag {
          font-size:18px;
          line-height:1;
        }
        .g-cat-badge-wrap { position:relative; }
        /* text-[12px] leading-none px-1.5 py-1 rounded-md bg-white/20 border-white/30 text-white shadow-sm font-bold */
        .g-cat-badge {
          display:inline-flex;
          align-items:center;
          gap:4px;
          font-size:12px;
          line-height:1;
          padding:4px 6px;
          padding-right:8px; /* room for the colored bar */
          border-radius:6px;
          background:rgba(255,255,255,0.20);
          border:1px solid rgba(255,255,255,0.30);
          color:#ffffff;
          font-weight:700;
          box-shadow:0 1px 2px rgba(0,0,0,0.05);
        }
        /* w-1 absolute right-0 top-0 bottom-0 rounded-r-md */
        .g-cat-bar {
          position:absolute;
          right:0;
          top:0;
          bottom:0;
          width:4px;
          border-top-right-radius:6px;
          border-bottom-right-radius:6px;
        }
      `}</style>
    </button>
  )
}
