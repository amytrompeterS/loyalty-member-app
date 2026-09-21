import { useState } from 'react'
import FilterChips from '../components/FilterChips'
import type { MemberData, Offer } from '../types'

const ALL_CATEGORIES = 'All'

// ─── Barcode modal (same as before, kept here since Offers page is removed) ───

function BarcodeModal({ offer, onClose }: { offer: Offer; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="barcode-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[#253166] border border-white/10 rounded-3xl p-6 w-full max-w-sm flex flex-col items-center shadow-2xl">
        <div className="w-12 h-1.5 rounded-full bg-white/20 mb-5" aria-hidden="true" />
        <h2 id="barcode-title" className="text-lg font-black text-white text-center leading-tight">{offer.title}</h2>
        <p className="text-sm text-white/50 font-medium mt-1 mb-6 text-center">
          Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <div
          className="bg-white rounded-2xl p-5 w-full flex flex-col items-center gap-3"
          aria-label="Loyalty barcode for scanning at register"
        >
          <div className="flex gap-0.5 h-20" aria-hidden="true">
            {Array.from({ length: 44 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-900"
                style={{ width: i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2, height: '100%' }}
              />
            ))}
          </div>
          <p className="text-sm font-mono font-black text-slate-800 tracking-widest">GLD-847203</p>
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full bg-white/10 text-white font-bold py-4 rounded-2xl min-h-[52px] text-sm hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ECDC4]"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// ─── Compact offer card ────────────────────────────────────────────────────────

function OfferCard({ offer, onRedeem }: { offer: Offer; onRedeem: () => void }) {
  return (
    <article className="bg-[#253166] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
      <div
        className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg shrink-0"
        aria-hidden="true"
      >
        {offer.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="font-black text-white text-sm leading-tight truncate">{offer.title}</p>
          {offer.tierMinimum && (
            <span
              className="text-xs bg-[#FFD93D] text-[#1D2951] font-black px-1.5 py-0.5 rounded-full shrink-0"
              aria-label={`Requires ${offer.tierMinimum} tier or higher`}
            >
              {offer.tierMinimum}+
            </span>
          )}
          {offer.isFreeToyClaim && (
            <span className="text-xs bg-[#4ECDC4] text-[#1D2951] font-black px-1.5 py-0.5 rounded-full shrink-0">
              Free Toy
            </span>
          )}
        </div>
        <p className="text-xs text-white/40 font-medium mt-0.5">
          {offer.value} · Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>
      <button
        onClick={onRedeem}
        className="shrink-0 bg-[#FF6B6B] text-[#1D2951] text-xs font-black px-3 py-2 rounded-xl min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ECDC4]"
      >
        Redeem
      </button>
    </article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface SaleProps {
  data: MemberData
}

export default function Sale({ data }: SaleProps) {
  const { offers, saleItems } = data
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)
  const [redeemingOffer, setRedeemingOffer] = useState<Offer | null>(null)

  // Show up to 3 offers — free toy reward first, then by earliest expiry
  const topOffers = [...offers]
    .sort((a, b) => {
      if (a.isFreeToyClaim !== b.isFreeToyClaim) return a.isFreeToyClaim ? -1 : 1
      return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
    })
    .slice(0, 3)

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(saleItems.map((s) => s.category)))]
  const filtered = activeCategory === ALL_CATEGORIES
    ? saleItems
    : saleItems.filter((s) => s.category === activeCategory)
  const sorted = [...filtered].sort((a, b) => Number(b.recommended) - Number(a.recommended))

  return (
    <main className="pb-24">
      {/* ── Offers strip ─────────────────────────────────────────── */}
      <section className="px-4 pt-5 pb-4" aria-labelledby="offers-heading">
        <h2 className="text-lg font-black text-white mb-3" id="offers-heading">Your Offers</h2>
        <div className="flex flex-col gap-2">
          {topOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onRedeem={() => setRedeemingOffer(offer)}
            />
          ))}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="mx-4 border-t border-white/10 mb-1" aria-hidden="true" />

      {/* ── Sale items ───────────────────────────────────────────── */}
      <section aria-labelledby="sale-heading">
        <div className="px-4 pt-4 pb-1">
          <h2 className="text-lg font-black text-white" id="sale-heading">Toys on Sale</h2>
          <p className="text-sm text-white/50 font-medium mt-1">{saleItems.length} items on sale</p>
        </div>

        <FilterChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

        {activeCategory === ALL_CATEGORIES && (
          <p className="px-4 mb-3 text-xs text-white/40 font-medium" aria-live="polite">
            Recommended items shown first — based on your purchase history
          </p>
        )}

        <div className="px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sorted.map((item) => (
            <article key={item.id} className="bg-[#253166] border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-square object-cover bg-[#1D2951]"
                  loading="lazy"
                />
                <span
                  className="absolute top-2 left-2 bg-[#FF6B6B] text-[#1D2951] text-xs font-black px-2 py-1 rounded-lg"
                  aria-label={`${item.percentOff}% off`}
                >
                  -{item.percentOff}%
                </span>
                {item.recommended && (
                  <span
                    className="absolute top-2 right-2 bg-[#4ECDC4] text-[#1D2951] text-xs font-black px-2 py-1 rounded-lg"
                    aria-label="Recommended based on your purchase history"
                  >
                    For You
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-white text-xs leading-snug line-clamp-2">{item.name}</h3>
                <p className="text-xs text-white/40 font-medium mt-0.5">{item.category}</p>
                <p className="text-xs text-white/40 mt-0.5">Ages {item.ageRange}</p>
                <div className="mt-2">
                  <p className="text-base font-black text-[#FFD93D]">${item.salePrice.toFixed(2)}</p>
                  <p className="text-xs text-white/30 line-through">${item.originalPrice.toFixed(2)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {redeemingOffer && (
        <BarcodeModal offer={redeemingOffer} onClose={() => setRedeemingOffer(null)} />
      )}
    </main>
  )
}
