import { useNavigate } from 'react-router-dom'
import type { MemberData } from '../types'

interface HomeProps {
  data: MemberData
  onRefresh: () => void
  refreshing: boolean
}

export default function Home({ data, onRefresh, refreshing }: HomeProps) {
  const { member, pointsBalance, offers, saleItems } = data
  const navigate = useNavigate()

  const isMaxTier = member.tier === 'Platinum'

  const tierThresholds: Record<string, number> = {
    Bronze: 0, Silver: 1000, Gold: 2500, Platinum: 5000,
  }
  const currentTierMin = tierThresholds[member.tier] ?? 0
  const nextTierMax = pointsBalance.nextTierThreshold ?? 5000
  const progress = Math.min(
    100,
    Math.round(((pointsBalance.current - currentTierMin) / (nextTierMax - currentTierMin)) * 100)
  )

  const topOffers = offers.filter((o) => !o.isFreeToyClaim).slice(0, 2)
  const freeToy = offers.find((o) => o.isFreeToyClaim)
  const topSaleItems = saleItems.filter((s) => s.recommended).slice(0, 2)

  return (
    <main className="pb-24 pt-2">
      {/* Pull-to-refresh indicator */}
      <div className="flex justify-center mb-2">
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="text-xs text-slate-500 border border-slate-200 rounded-full px-3 py-1 min-h-[36px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
          aria-label="Refresh data"
        >
          {refreshing ? 'Refreshing…' : '↻ Refresh'}
        </button>
      </div>

      {/* Points balance */}
      <section className="px-4 pt-2 pb-4" aria-labelledby="points-heading">
        <div className="bg-orange-500 rounded-2xl p-5 text-white">
          <p className="text-sm font-medium opacity-80" id="points-heading">Your Points Balance</p>
          <p className="text-5xl font-bold mt-1 tabular-nums" aria-label={`${pointsBalance.current} points`}>
            {pointsBalance.current.toLocaleString()}
          </p>
          <p className="text-sm opacity-80 mt-1">pts</p>

          {/* Tier progress */}
          <div className="mt-4">
            {isMaxTier ? (
              <p className="text-sm font-medium">You're at our highest tier 🏆</p>
            ) : (
              <>
                <div className="flex justify-between text-xs opacity-90 mb-1">
                  <span>{member.tier}</span>
                  <span>{pointsBalance.pointsToNextTier?.toLocaleString()} pts to {pointsBalance.nextTierName}</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${progress}% of the way to ${pointsBalance.nextTierName}`}
                  className="h-2 rounded-full bg-orange-300"
                >
                  <div
                    className="h-2 rounded-full bg-white transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Expiring points warning */}
          {pointsBalance.expiringSoon && (
            <p className="mt-3 text-xs bg-orange-600 rounded-lg px-3 py-2" role="alert">
              ⚠️ {pointsBalance.expiringSoon.points} pts expiring {new Date(pointsBalance.expiringSoon.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* Free toy reward (Gold/Platinum) */}
      {freeToy && (
        <section className="px-4 pb-4" aria-labelledby="free-toy-heading">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2" id="free-toy-heading">Your Reward</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">{freeToy.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">{freeToy.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">Expires {new Date(freeToy.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <button
              onClick={() => navigate('/offers')}
              className="shrink-0 bg-orange-500 text-white text-xs font-semibold px-3 py-2 rounded-lg min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              Redeem
            </button>
          </div>
        </section>
      )}

      {/* Top offers */}
      {topOffers.length > 0 && (
        <section className="px-4 pb-4" aria-labelledby="offers-heading">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide" id="offers-heading">For You</h2>
            <button
              onClick={() => navigate('/offers')}
              className="text-xs text-orange-500 font-medium min-h-[44px] px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
            >
              See all
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {topOffers.map((offer) => (
              <div key={offer.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{offer.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{offer.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <span className="shrink-0 text-orange-600 font-bold text-sm">{offer.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended sale items */}
      {topSaleItems.length > 0 && (
        <section className="px-4 pb-4" aria-labelledby="sale-heading">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide" id="sale-heading">On Sale For You</h2>
            <button
              onClick={() => navigate('/sale')}
              className="text-xs text-orange-500 font-medium min-h-[44px] px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
            >
              See all
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {topSaleItems.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{item.name}</p>
                  <p className="text-xs text-slate-500">Ages {item.ageRange}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-orange-600 font-bold text-sm">${item.salePrice.toFixed(2)}</p>
                  <p className="text-xs text-slate-400 line-through">${item.originalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick links */}
      <section className="px-4 pb-4" aria-labelledby="quick-links-heading">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2" id="quick-links-heading">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/stores')}
            className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-1 min-h-[80px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
          >
            <span className="text-2xl" aria-hidden="true">📍</span>
            <span className="text-sm font-medium text-slate-700">Find a Store</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-1 min-h-[80px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
          >
            <span className="text-2xl" aria-hidden="true">📋</span>
            <span className="text-sm font-medium text-slate-700">Points History</span>
          </button>
        </div>
      </section>
    </main>
  )
}
