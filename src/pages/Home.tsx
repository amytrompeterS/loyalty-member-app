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
    <main className="pb-24">
      {/* Points hero card */}
      <section className="px-4 pt-4 pb-5" aria-labelledby="points-heading">
        <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-green-100" id="points-heading">Your Balance</p>
              <p className="text-6xl font-black mt-1 tabular-nums tracking-tight" aria-label={`${pointsBalance.current} points`}>
                {pointsBalance.current.toLocaleString()}
              </p>
              <p className="text-green-200 text-sm font-semibold mt-0.5">points</p>
            </div>
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="text-xs text-white/70 border border-white/30 rounded-full px-3 py-1.5 min-h-[36px] hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Refresh data"
            >
              {refreshing ? 'Refreshing…' : '↻ Refresh'}
            </button>
          </div>

          {/* Tier progress */}
          {isMaxTier ? (
            <p className="text-sm font-bold text-green-100">You're at our highest tier 🏆</p>
          ) : (
            <div>
              <div className="flex justify-between text-xs font-semibold text-green-100 mb-2">
                <span>{member.tier}</span>
                <span>{pointsBalance.pointsToNextTier?.toLocaleString()} pts to {pointsBalance.nextTierName}</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${progress}% of the way to ${pointsBalance.nextTierName}`}
                className="h-2.5 rounded-full bg-white/25"
              >
                <div
                  className="h-2.5 rounded-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Expiring points */}
          {pointsBalance.expiringSoon && (
            <div className="mt-4 bg-white/15 rounded-xl px-4 py-2.5 flex items-center gap-2" role="alert">
              <span className="text-yellow-300 text-base" aria-hidden="true">⚠</span>
              <p className="text-xs font-semibold text-white">
                {pointsBalance.expiringSoon.points} pts expire {new Date(pointsBalance.expiringSoon.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Free toy reward */}
      {freeToy && (
        <section className="px-4 pb-5" aria-labelledby="free-toy-heading">
          <h2 className="text-lg font-black text-slate-900 mb-3" id="free-toy-heading">Your Reward</h2>
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl shrink-0" aria-hidden="true">
              🎁
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-slate-900 text-sm leading-tight">{freeToy.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Expires {new Date(freeToy.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => navigate('/offers')}
              className="shrink-0 bg-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Redeem
            </button>
          </div>
        </section>
      )}

      {/* Top offers */}
      {topOffers.length > 0 && (
        <section className="px-4 pb-5" aria-labelledby="offers-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900" id="offers-heading">For You</h2>
            <button
              onClick={() => navigate('/offers')}
              className="text-sm font-bold text-green-600 min-h-[44px] px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600"
            >
              See all
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {topOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center gap-3">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-xl shrink-0" aria-hidden="true">
                  {offer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{offer.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    Expires {new Date(offer.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <span className="shrink-0 text-green-700 font-black text-sm">{offer.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended sale items */}
      {topSaleItems.length > 0 && (
        <section className="px-4 pb-5" aria-labelledby="sale-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900" id="sale-heading">On Sale For You</h2>
            <button
              onClick={() => navigate('/sale')}
              className="text-sm font-bold text-green-600 min-h-[44px] px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600"
            >
              See all
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {topSaleItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{item.name}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Ages {item.ageRange}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-green-700 font-black text-base">${item.salePrice.toFixed(2)}</p>
                  <p className="text-xs text-slate-400 line-through">${item.originalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick links */}
      <section className="px-4 pb-5" aria-labelledby="quick-links-heading">
        <h2 className="text-lg font-black text-slate-900 mb-3" id="quick-links-heading">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/stores')}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col items-center gap-2 min-h-[88px] hover:border-green-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600"
          >
            <span className="text-2xl" aria-hidden="true">📍</span>
            <span className="text-sm font-bold text-slate-700">Find a Store</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col items-center gap-2 min-h-[88px] hover:border-green-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600"
          >
            <span className="text-2xl" aria-hidden="true">📋</span>
            <span className="text-sm font-bold text-slate-700">Points History</span>
          </button>
        </div>
      </section>
    </main>
  )
}
