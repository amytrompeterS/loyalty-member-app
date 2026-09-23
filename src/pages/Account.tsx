import type { MemberData, Tier } from '../types'

const tierBadge: Record<Tier, string> = {
  Bronze:   'bg-amber-600 text-white',
  Silver:   'bg-slate-400 text-white',
  Gold:     'bg-[#FFD93D] text-[#1D2951]',
  Platinum: 'bg-[#4ECDC4] text-[#1D2951]',
}

const tierBenefits: Record<Tier, { earnRate: string; offers: string; perks: string[] }> = {
  Bronze: {
    earnRate: '1 pt per $1 spent',
    offers: 'Standard rotating offers (10–15% discounts)',
    perks: [],
  },
  Silver: {
    earnRate: '1.25 pts per $1 spent',
    offers: 'Better offers + occasional double-points events',
    perks: ['2× points during your birthday month'],
  },
  Gold: {
    earnRate: '1.5 pts per $1 spent',
    offers: 'Priority access + deeper discounts (20–30%)',
    perks: ['Quarterly free small toy reward (up to $15)', '2× points during your birthday month'],
  },
  Platinum: {
    earnRate: '2 pts per $1 spent',
    offers: 'Exclusive offers: 40–50% discounts + early sale access',
    perks: [
      'Monthly free small toy reward (up to $15)',
      '2× points during your birthday month',
      'Free gift wrapping in-store',
    ],
  },
}

interface AccountProps {
  data: MemberData
}

export default function Account({ data }: AccountProps) {
  const { member, pointsBalance } = data
  const benefits = tierBenefits[member.tier]

  return (
    <main className="pb-24">
      {/* Profile card */}
      <section className="px-4 pt-5 pb-4" aria-labelledby="profile-heading">
        <div className="bg-[#253166] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl bg-[#FF6B6B] text-[#1D2951] font-black text-xl flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            {member.avatarPlaceholder}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black text-white tracking-tight" id="profile-heading">{member.name}</h1>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className={`text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${tierBadge[member.tier]}`}
                aria-label={`Membership tier: ${member.tier}`}
              >
                {member.tier}
              </span>
              <span className="text-xs text-white/40 font-medium">
                Since {new Date(member.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <p className="text-xs text-white/30 mt-1 font-mono font-bold">{member.memberId}</p>
          </div>
        </div>
      </section>

      {/* Loyalty card */}
      <section className="px-4 pb-4" aria-labelledby="card-heading">
        <h2 className="text-lg font-black text-white mb-3" id="card-heading">Loyalty Card</h2>
        <div
          className="bg-gradient-to-br from-[#5B4B8A] to-[#3d2d6b] rounded-2xl border border-white/10 p-6 flex flex-col items-center"
          aria-label="Digital loyalty card with scannable barcode"
        >
          <p className="text-xs text-white/50 font-medium mb-5 text-center">
            Show this barcode at the register to earn or redeem points
          </p>
          {/* White background so barcode is scannable */}
          <div className="bg-white rounded-xl p-4 w-full flex flex-col items-center gap-2">
            <div className="flex gap-0.5 h-16" aria-hidden="true">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-900"
                  style={{ width: i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2, height: '100%' }}
                />
              ))}
            </div>
            <p className="text-sm font-mono font-black text-slate-800 tracking-widest">{member.memberId}</p>
          </div>
          <p className="text-xs text-white/40 font-medium mt-3">{pointsBalance.current.toLocaleString()} pts balance</p>
        </div>
      </section>

      {/* Tier benefits */}
      <section className="px-4 pb-4" aria-labelledby="benefits-heading">
        <h2 className="text-lg font-black text-white mb-3" id="benefits-heading">Your Benefits</h2>
        <div className="bg-[#253166] border border-white/10 rounded-2xl p-5">
          <div className={`inline-flex items-center gap-2 text-sm font-black px-3 py-2 rounded-xl mb-4 ${tierBadge[member.tier]}`}>
            ⭐ {member.tier} Member
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs text-white/30 font-black uppercase tracking-widest mb-1">Earn Rate</dt>
              <dd className="text-white/80 font-semibold">{benefits.earnRate}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/30 font-black uppercase tracking-widest mb-1">Offer Access</dt>
              <dd className="text-white/80 font-semibold">{benefits.offers}</dd>
            </div>
            {benefits.perks.length > 0 && (
              <div>
                <dt className="text-xs text-white/30 font-black uppercase tracking-widest mb-1">Perks</dt>
                <dd>
                  <ul className="space-y-2">
                    {benefits.perks.map((perk, i) => (
                      <li key={i} className="text-white/80 font-semibold flex items-start gap-2">
                        <span className="text-[#4ECDC4] mt-0.5 font-black shrink-0" aria-hidden="true">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* Platinum upgrade teaser */}
      {member.tier !== 'Platinum' && (
        <section className="px-4 pb-4" aria-labelledby="platinum-heading">
          <h2 className="text-lg font-black text-white mb-3" id="platinum-heading">Unlock Platinum</h2>
          <div className="bg-[#253166] border border-[#4ECDC4]/30 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-[#4ECDC4] text-[#1D2951]">
                Platinum
              </span>
              <span className="text-xs text-white/40 font-medium">{(pointsBalance.pointsToNextTier ?? 0).toLocaleString()} pts away</span>
            </div>
            <dl className="space-y-4 text-sm mb-5">
              <div>
                <dt className="text-xs text-white/30 font-black uppercase tracking-widest mb-1">Earn Rate</dt>
                <dd className="text-white/80 font-semibold">{tierBenefits.Platinum.earnRate}</dd>
              </div>
              <div>
                <dt className="text-xs text-white/30 font-black uppercase tracking-widest mb-1">Offer Access</dt>
                <dd className="text-white/80 font-semibold">{tierBenefits.Platinum.offers}</dd>
              </div>
              <div>
                <dt className="text-xs text-white/30 font-black uppercase tracking-widest mb-1">Perks</dt>
                <dd>
                  <ul className="space-y-2">
                    {tierBenefits.Platinum.perks.map((perk, i) => (
                      <li key={i} className="text-white/80 font-semibold flex items-start gap-2">
                        <span className="text-[#4ECDC4] mt-0.5 font-black shrink-0" aria-hidden="true">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div>
              <div className="flex justify-between text-xs text-white/40 font-medium mb-1.5">
                <span>{pointsBalance.current.toLocaleString()} pts</span>
                <span>{(pointsBalance.nextTierThreshold ?? 0).toLocaleString()} pts</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4ECDC4] rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.round((pointsBalance.current / (pointsBalance.nextTierThreshold ?? 1)) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Account actions */}
      <section className="px-4 pb-4" aria-labelledby="actions-heading">
        <h2 className="text-lg font-black text-white mb-3" id="actions-heading">Account</h2>
        <div className="bg-[#253166] border border-white/10 rounded-2xl divide-y divide-white/5">
          {[
            { label: 'Edit Profile', icon: '✏️' },
            { label: 'Notification Preferences', icon: '🔔' },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-white/80 min-h-[56px] hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4ECDC4] focus-visible:outline-offset-[-2px]"
            >
              <span className="flex items-center gap-3">
                <span aria-hidden="true">{icon}</span>
                {label}
              </span>
              <span className="text-white/20 font-normal" aria-hidden="true">›</span>
            </button>
          ))}
          <button
            className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-[#FF6B6B] min-h-[56px] hover:bg-[#FF6B6B]/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B6B] focus-visible:outline-offset-[-2px]"
          >
            <span className="flex items-center gap-3">
              <span aria-hidden="true">🚪</span>
              Sign Out
            </span>
            <span className="text-[#FF6B6B]/40 font-normal" aria-hidden="true">›</span>
          </button>
        </div>
      </section>
    </main>
  )
}
