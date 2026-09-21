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

  const sorted = [...filtered].sort((a, b) => Number(b.recommended) - Number(a.recommended))

  return (
    <main className="pb-24">
      <div className="px-4 pt-5 pb-1">
        <h1 className="text-2xl font-black text-slate-900">Toys on Sale</h1>
        <p className="text-sm text-slate-400 font-medium mt-1">{saleItems.length} items on sale</p>
      </div>

      <FilterChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

      {activeCategory === ALL_CATEGORIES && (
        <p className="px-4 mb-3 text-xs text-slate-400 font-medium" aria-live="polite">
          Recommended items shown first — based on your purchase history
        </p>
      )}

      <div className="px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {sorted.map((item) => (
          <article key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Product image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full aspect-square object-cover bg-slate-100"
                loading="lazy"
              />
              {/* Sale badge */}
              <span
                className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg"
                aria-label={`${item.percentOff}% off`}
              >
                -{item.percentOff}%
              </span>
              {/* Recommended badge */}
              {item.recommended && (
                <span
                  className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-lg"
                  aria-label="Recommended based on your purchase history"
                >
                  For You
                </span>
              )}
            </div>

            {/* Card body */}
            <div className="p-3">
              <h2 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">{item.name}</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{item.category}</p>
              <p className="text-xs text-slate-400 mt-0.5">Ages {item.ageRange}</p>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <p className="text-base font-black text-slate-900">${item.salePrice.toFixed(2)}</p>
                  <p className="text-xs text-slate-400 line-through">${item.originalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
