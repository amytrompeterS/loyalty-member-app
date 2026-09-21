import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/offers', label: 'Offers', icon: '🏷️' },
  { to: '/sale', label: 'Sale', icon: '🔖' },
  { to: '/stores', label: 'Stores', icon: '📍' },
  { to: '/history', label: 'History', icon: '📋' },
  { to: '/account', label: 'Account', icon: '👤' },
]

export default function BottomNav() {
  return (
    <nav
      role="tablist"
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 pb-safe"
    >
      <div className="flex">
        {tabs.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            role="tab"
            aria-label={label}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-[-2px] ${
                isActive
                  ? 'text-orange-500'
                  : 'text-slate-500 hover:text-slate-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-xl leading-none mb-0.5" aria-hidden="true">{icon}</span>
                <span className={isActive ? 'font-semibold' : ''}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
