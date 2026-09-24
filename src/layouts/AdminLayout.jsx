import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutGrid, Building2, Users, Sparkles, ArrowLeft } from 'lucide-react'

const NAV = [
  { to: '/admin', label: 'Network Overview', icon: LayoutGrid, end: true },
  { to: '/admin/studios', label: 'Studios', icon: Building2 },
  { to: '/admin/members', label: 'Member 360', icon: Users },
  { to: '/admin/retention', label: 'AI Retention', icon: Sparkles },
]

export default function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-900 flex">
      <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
        <div className="px-6 py-6 border-b border-slate-100">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">EN Franchise</p>
          <h1 className="text-lg font-bold text-slate-900">HQ Dashboard</h1>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-100">
          <Link to="/journey" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100">
            <ArrowLeft size={15} /> В клиентское приложение
          </Link>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
