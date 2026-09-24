export function AdminHeader({ title, subtitle, right }) {
  return (
    <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-slate-200 bg-white">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

export function KpiCard({ label, value, delta }) {
  const positive = delta?.startsWith('+')
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {delta && (
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${positive ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
            {delta}
          </span>
        )}
      </div>
    </div>
  )
}

export function StatusDot({ status }) {
  const map = { green: 'bg-emerald-500', yellow: 'bg-amber-400', red: 'bg-rose-500' }
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${map[status] || 'bg-slate-300'}`} />
}

export function AdminCard({ children, className = '' }) {
  return <div className={`bg-white border border-slate-200 rounded-xl p-5 ${className}`}>{children}</div>
}

export function Pill({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-600',
    red: 'bg-rose-50 text-rose-700',
    amber: 'bg-amber-50 text-amber-700',
    emerald: 'bg-emerald-50 text-emerald-700',
  }
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tones[tone]}`}>{children}</span>
}
