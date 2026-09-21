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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-black tracking-tight text-slate-900">ToyRewards</span>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${tierColors[tier]}`}
          aria-label={`Membership tier: ${tier}`}
        >
          {tier}
        </span>
      </div>
      <button
        className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-black text-sm flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        aria-label={`Account for ${memberName}`}
      >
        {initials}
      </button>
    </header>
  )
}
