import { useState } from 'react'
import FilterChips from '../components/FilterChips'
import type { MemberData, Offer } from '../types'

interface BarcodeModalProps {
  offer: Offer
  onClose: () => void
}

function BarcodeModal({ offer, onClose }: BarcodeModalProps) {
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
        {/* Barcode on white background so it scans in-store */}
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

const ALL_CATEGORIES = 'All'

interface OffersProps {
  data: MemberData
}

export default function Offers({ data }: OffersProps) {
  const { offers } = data
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)
  const [redeemingOffer, setRedeemingOffer] = useState<Offer | null>(null)
  const [savedOffers, setSavedOffers] = useState<Set<string>>(new Set())

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(offers.map((o) => o.category)))]
  const filtered = activeCategory === ALL_CATEGORIES
    ? offers
    : offers.filter((o) => o.category === activeCategory)

  function toggleSave(id: string) {
    setSavedOffers((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <main className="pb-24">
      <div className="px-4 pt-5 pb-1">
        <h1 className="text-2xl font-black text-white">Your Offers</h1>
        <p className="text-sm text-white/50 font-medium mt-1">{offers.length} offers available</p>
      </div>

      <FilterChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

      <div className="px-4 flex flex-col gap-3">
        {filtered.map((offer) => {
          const isSaved = savedOffers.has(offer.id)
          return (
            <article key={offer.id} className="bg-[#253166] border border-white/10 rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl shrink-0" aria-hidden="true">
                  {offer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-black text-white text-sm leading-tight">{offer.title}</h2>
                    {offer.tierMinimum && (
                      <span
                        className="text-xs bg-[#FFD93D] text-[#1D2951] font-black px-2 py-0.5 rounded-full"
                        aria-label={`Requires ${offer.tierMinimum} tier or higher`}
                      >
                        {offer.tierMinimum}+
                      </span>
                    )}
                    {offer.isFreeToyClaim && (
                      <span className="text-xs bg-[#4ECDC4] text-[#1D2951] font-black px-2 py-0.5 rounded-full">
                        Free Toy
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">{offer.description}</p>
                  <p className="text-xs text-white/30 font-medium mt-1">
                    Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <span className="shrink-0 text-[#FFD93D] font-black text-sm">{offer.value}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSave(offer.id)}
                  aria-pressed={isSaved}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ECDC4] ${
                    isSaved
                      ? 'bg-[#4ECDC4]/20 text-[#4ECDC4] border-[#4ECDC4]/50'
                      : 'bg-transparent text-white/70 border-white/20 hover:border-white/40'
                  }`}
                >
                  {isSaved ? '✓ Saved' : 'Save'}
                </button>
                <button
                  onClick={() => setRedeemingOffer(offer)}
                  className="flex-1 py-3 rounded-xl text-sm font-black bg-[#FF6B6B] text-[#1D2951] min-h-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ECDC4]"
                >
                  Redeem
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {redeemingOffer && (
        <BarcodeModal offer={redeemingOffer} onClose={() => setRedeemingOffer(null)} />
      )}
    </main>
  )
}
