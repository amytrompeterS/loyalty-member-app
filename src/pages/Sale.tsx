import { useState } from 'react'
import FilterChips from '../components/FilterChips'
import type { MemberData } from '../types'

const ALL_CATEGORIES = 'All'

interface SaleProps {
  data: MemberData
}

export default function Sale({ data }: SaleProps) {
  const { saleItems } = data
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(saleItems.map((s) => s.category)))]

  const filtered = activeCategory === ALL_CATEGORIES
    ? saleItems
    : saleItems.filter((s) => s.category === activeCategory)

  // Recommended items first
  const sorted = [...filtered].sort((a, b) => Number(b.recommended) - Number(a.recommended))

  return (
    <main className="pb-24">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-slate-900">Toys on Sale</h1>
        <p className="text-sm text-slate-500 mt-0.5">{saleItems.length} items on sale</p>
      </div>

      <FilterChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

      {activeCategory === ALL_CATEGORIES && (
        <p className="px-4 mb-3 text-xs text-slate-500" aria-live="polite">
          Showing recommended items first — based on your purchase history
        </p>
      )}

      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sorted.map((item) => (
          <article key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 relative">
            {item.recommended && (
              <span
                className="absolute top-3 right-3 text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full"
                aria-label="Recommended based on your purchase history"
              >
                For You
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl" aria-hidden="true">{item.icon}</span>
              <div className="flex-1 min-w-0 pr-16">
                <h2 className="font-semibold text-slate-900 text-sm leading-snug">{item.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{item.category} · Ages {item.ageRange}</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900">${item.salePrice.toFixed(2)}</p>
                <p className="text-xs text-slate-400 line-through">${item.originalPrice.toFixed(2)}</p>
              </div>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-lg" aria-label={`${item.percentOff}% off`}>
                -{item.percentOff}%
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
