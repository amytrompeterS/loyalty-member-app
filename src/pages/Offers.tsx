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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col items-center shadow-2xl">
        <div className="w-12 h-1.5 rounded-full bg-slate-200 mb-5" aria-hidden="true" />
        <h2 id="barcode-title" className="text-lg font-black text-slate-900 text-center leading-tight">{offer.title}</h2>
        <p className="text-sm text-slate-400 font-medium mt-1 mb-6 text-center">
          Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <div
          className="bg-white border-2 border-slate-100 rounded-2xl p-5 w-full flex flex-col items-center gap-3"
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
          <p className="text-sm font-mono font-bold text-slate-700 tracking-widest">GLD-847203</p>
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full bg-slate-100 text-slate-800 font-bold py-4 rounded-2xl min-h-[52px] text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
        <h1 className="text-2xl font-black text-slate-900">Your Offers</h1>
        <p className="text-sm text-slate-400 font-medium mt-1">{offers.length} offers available</p>
      </div>

      <FilterChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

      <div className="px-4 flex flex-col gap-3">
        {filtered.map((offer) => {
          const isSaved = savedOffers.has(offer.id)
          return (
            <article key={offer.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl shrink-0" aria-hidden="true">
                  {offer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-black text-slate-900 text-sm leading-tight">{offer.title}</h2>
                    {offer.tierMinimum && (
                      <span
                        className="text-xs bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded-full"
                        aria-label={`Requires ${offer.tierMinimum} tier or higher`}
                      >
                        {offer.tierMinimum}+
                      </span>
                    )}
                    {offer.isFreeToyClaim && (
                      <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Free Toy</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{offer.description}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <span className="shrink-0 text-green-700 font-black text-sm">{offer.value}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSave(offer.id)}
                  aria-pressed={isSaved}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
                    isSaved
                      ? 'bg-green-50 text-green-700 border-green-400'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {isSaved ? '✓ Saved' : 'Save'}
                </button>
                <button
                  onClick={() => setRedeemingOffer(offer)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold bg-green-600 text-white min-h-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
