import type { Tier } from '../types'

const tierBadge: Record<Tier, string> = {
  Bronze: 'bg-amber-600 text-white',
  Silver: 'bg-slate-400 text-white',
  Gold:   'bg-[#FFD93D] text-[#1D2951]',
  Platinum: 'bg-[#4ECDC4] text-[#1D2951]',
}

interface TopBarProps {
  memberName: string
  tier: Tier
  initials: string
}

export default function TopBar({ memberName, tier, initials }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#1D2951] border-b border-white/10 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-black tracking-tight text-white">ToyRewards</span>
        <span
          className={`text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${tierBadge[tier]}`}
          aria-label={`Membership tier: ${tier}`}
        >
          {tier}
        </span>
      </div>
      <button
        className="w-10 h-10 rounded-full bg-[#FF6B6B] text-[#1D2951] font-black text-sm flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ECDC4]"
        aria-label={`Account for ${memberName}`}
      >
        {initials}
      </button>
    </header>
  )
}
