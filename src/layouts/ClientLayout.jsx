import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Compass, Dumbbell, Sparkles, Users, User } from 'lucide-react'

const TABS = [
  { to: '/journey', label: 'Journey', icon: Compass },
  { to: '/train', label: 'Train', icon: Dumbbell },
  { to: '/season', label: 'Season', icon: Sparkles },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function ClientLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen w-full bg-ink-950 flex items-center justify-center py-0 sm:py-8">
      <div className="relative w-full max-w-[390px] sm:h-[844px] h-screen bg-ink-950 sm:rounded-[2.5rem] sm:border sm:border-ink-700 overflow-hidden flex flex-col shadow-2xl">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div key={location.pathname} className="animate-fadeIn min-h-full">
            <Outlet />
          </div>
        </div>
        <nav className="shrink-0 border-t border-ink-800 bg-ink-900/95 backdrop-blur px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            {TABS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition-colors ${
                    isActive ? 'text-gold-400' : 'text-ink-400'
                  }`
                }
              >
                <Icon size={20} strokeWidth={1.8} />
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
