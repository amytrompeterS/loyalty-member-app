import { NavLink } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import SellIcon from '@mui/icons-material/Sell'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import type { SvgIconComponent } from '@mui/icons-material'

interface Tab {
  to: string
  label: string
  Icon: SvgIconComponent
}

const tabs: Tab[] = [
  { to: '/',        label: 'Home',    Icon: HomeRoundedIcon },
  { to: '/offers',  label: 'Offers',  Icon: LocalOfferIcon },
  { to: '/sale',    label: 'Sale',    Icon: SellIcon },
  { to: '/stores',  label: 'Stores',  Icon: LocationOnIcon },
  { to: '/history', label: 'History', Icon: ReceiptLongIcon },
  { to: '/account', label: 'Account', Icon: AccountCircleIcon },
]

export default function BottomNav() {
  return (
    <nav
      role="tablist"
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 pb-safe shadow-[0_-1px_0_0_rgb(0,0,0,0.05)]"
    >
      <div className="flex max-w-2xl mx-auto">
        {tabs.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            role="tab"
            aria-label={label}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600 focus-visible:outline-offset-[-2px] ${
                isActive ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon sx={{ fontSize: 22 }} aria-hidden="true" />
                <span className={`text-[10px] mt-0.5 font-semibold ${isActive ? 'text-green-600' : 'text-slate-400'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
