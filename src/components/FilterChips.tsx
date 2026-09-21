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
            className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors min-h-[36px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
              isActive
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-slate-700 border-slate-300 hover:border-orange-300'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
