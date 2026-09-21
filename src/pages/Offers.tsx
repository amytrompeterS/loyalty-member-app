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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col items-center">
        <h2 id="barcode-title" className="text-base font-semibold text-slate-900 text-center">{offer.title}</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6 text-center">
          Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        {/* Mock barcode */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 w-full flex flex-col items-center gap-2" aria-label="Loyalty barcode for scanning at register">
          <div className="flex gap-0.5 h-16" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-900"
                style={{ width: i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2, height: '100%' }}
              />
            ))}
          </div>
          <p className="text-xs font-mono text-slate-600 tracking-widest">GLD-847203</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-slate-900">Your Offers</h1>
        <p className="text-sm text-slate-500 mt-0.5">{offers.length} offers available</p>
      </div>

      <FilterChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

      <div className="px-4 flex flex-col gap-3">
        {filtered.map((offer) => {
          const isSaved = savedOffers.has(offer.id)
          return (
            <article key={offer.id} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl mt-0.5" aria-hidden="true">{offer.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-slate-900 text-sm">{offer.title}</h2>
                    {offer.tierMinimum && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 font-semibold px-2 py-0.5 rounded-full" aria-label={`Requires ${offer.tierMinimum} tier or higher`}>
                        {offer.tierMinimum}+
                      </span>
                    )}
                    {offer.isFreeToyClaim && (
                      <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">Free Toy</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{offer.description}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <span className="shrink-0 text-orange-600 font-bold text-sm">{offer.value}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggleSave(offer.id)}
                  aria-pressed={isSaved}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border min-h-[44px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                    isSaved
                      ? 'bg-orange-50 text-orange-600 border-orange-300'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {isSaved ? '✓ Saved' : 'Save'}
                </button>
                <button
                  onClick={() => setRedeemingOffer(offer)}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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
