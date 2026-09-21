import type { MemberData, Tier } from '../types'

const tierColors: Record<Tier, string> = {
  Bronze: 'bg-amber-700 text-white',
  Silver: 'bg-slate-400 text-white',
  Gold: 'bg-yellow-500 text-white',
  Platinum: 'bg-cyan-600 text-white',
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
      <section className="px-4 pt-4 pb-4" aria-labelledby="profile-heading">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-700 font-bold text-xl flex items-center justify-center shrink-0" aria-hidden="true">
            {member.avatarPlaceholder}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-slate-900" id="profile-heading">{member.name}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tierColors[member.tier]}`} aria-label={`Membership tier: ${member.tier}`}>
                {member.tier}
              </span>
              <span className="text-xs text-slate-400">Member since {new Date(member.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{member.memberId}</p>
          </div>
        </div>
      </section>

      {/* Loyalty card / barcode */}
      <section className="px-4 pb-4" aria-labelledby="card-heading">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2" id="card-heading">Your Loyalty Card</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center" aria-label="Digital loyalty card with scannable barcode">
          <p className="text-xs text-slate-400 mb-4">Show this barcode at the register to earn or redeem points</p>
          <div className="flex gap-0.5 h-16 mb-2" aria-hidden="true">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-900"
                style={{ width: i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2, height: '100%' }}
              />
            ))}
          </div>
          <p className="text-sm font-mono font-semibold text-slate-700 tracking-widest">{member.memberId}</p>
          <p className="text-xs text-slate-400 mt-1">{pointsBalance.current.toLocaleString()} pts balance</p>
        </div>
      </section>

      {/* Current tier + benefits */}
      <section className="px-4 pb-4" aria-labelledby="benefits-heading">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2" id="benefits-heading">Your Tier Benefits</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full mb-3 ${tierColors[member.tier]}`}>
            <span aria-hidden="true">⭐</span> {member.tier} Member
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Earn Rate</dt>
              <dd className="text-slate-800 mt-0.5">{benefits.earnRate}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Offer Access</dt>
              <dd className="text-slate-800 mt-0.5">{benefits.offers}</dd>
            </div>
            {benefits.perks.length > 0 && (
              <div>
                <dt className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Perks</dt>
                <dd className="mt-0.5">
                  <ul className="space-y-1">
                    {benefits.perks.map((perk, i) => (
                      <li key={i} className="text-slate-800 flex items-start gap-1.5">
                        <span className="text-orange-500 mt-0.5" aria-hidden="true">✓</span>
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

      {/* Account actions */}
      <section className="px-4 pb-4" aria-labelledby="actions-heading">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2" id="actions-heading">Account</h2>
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
          {[
            { label: 'Edit Profile', icon: '✏️' },
            { label: 'Notification Preferences', icon: '🔔' },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className="w-full flex items-center justify-between px-4 py-4 text-sm text-slate-700 min-h-[56px] hover:bg-slate-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-[-2px]"
            >
              <span className="flex items-center gap-3">
                <span aria-hidden="true">{icon}</span>
                {label}
              </span>
              <span className="text-slate-400" aria-hidden="true">›</span>
            </button>
          ))}
          <button
            className="w-full flex items-center justify-between px-4 py-4 text-sm text-red-600 min-h-[56px] hover:bg-red-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-[-2px]"
          >
            <span className="flex items-center gap-3">
              <span aria-hidden="true">🚪</span>
              Sign Out
            </span>
            <span className="text-red-300" aria-hidden="true">›</span>
          </button>
        </div>
      </section>
    </main>
  )
}
