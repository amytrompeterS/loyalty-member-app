interface FilterChipsProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export default function FilterChips({ categories, active, onChange }: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
    >
      {categories.map((cat) => {
        const isActive = cat === active
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors min-h-[36px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ECDC4] ${
              isActive
                ? 'bg-[#FF6B6B] text-[#1D2951] border-[#FF6B6B]'
                : 'bg-[#253166] text-white/80 border-white/10 hover:border-[#FF6B6B]/50'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
