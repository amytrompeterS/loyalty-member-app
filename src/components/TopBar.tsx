import type { Tier } from '../types'

const tierColors: Record<Tier, string> = {
  Bronze: 'bg-amber-700 text-white',
  Silver: 'bg-slate-400 text-white',
  Gold: 'bg-yellow-500 text-white',
  Platinum: 'bg-cyan-600 text-white',
}

interface TopBarProps {
  memberName: string
  tier: Tier
  initials: string
}

export default function TopBar({ memberName, tier, initials }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-slate-900 tracking-tight">ToyRewards</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tierColors[tier]}`} aria-label={`Membership tier: ${tier}`}>
          {tier}
        </span>
      </div>
      <button
        className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        aria-label={`Account for ${memberName}`}
      >
        {initials}
      </button>
    </header>
  )
}
