import { AdminHeader, KpiCard, AdminCard } from '../../components/adminUi'
import { NETWORK_KPIS, NETWORK_TREND, STUDIOS } from '../../data/mock'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function Overview() {
  const alerts = STUDIOS.filter((s) => s.status !== 'green')

  return (
    <div>
      <AdminHeader title="Network Overview" subtitle="Сводка по всей сети студий · сентябрь 2026" />
      <div className="p-8">
        <div className="grid grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <KpiCard label="Active Members" value={NETWORK_KPIS.activeMembers.value} delta={NETWORK_KPIS.activeMembers.delta} />
          <KpiCard label="Retention" value={NETWORK_KPIS.retention.value} delta={NETWORK_KPIS.retention.delta} />
          <KpiCard label="ARPU" value={NETWORK_KPIS.arpu.value} delta={NETWORK_KPIS.arpu.delta} />
          <KpiCard label="Attendance" value={NETWORK_KPIS.attendance.value} delta={NETWORK_KPIS.attendance.delta} />
          <KpiCard label="NPS" value={NETWORK_KPIS.nps.value} delta={NETWORK_KPIS.nps.delta} />
          <KpiCard label="Churn" value={NETWORK_KPIS.churn.value} delta={NETWORK_KPIS.churn.delta} />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <AdminCard className="col-span-2">
            <p className="text-slate-900 font-semibold mb-1">Динамика за 6 месяцев</p>
            <p className="text-slate-500 text-xs mb-4">Active members / Retention %</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={NETWORK_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[75, 90]} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="members" name="Active Members" stroke="#0f172a" strokeWidth={2.5} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="retention" name="Retention %" stroke="#c1573f" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </AdminCard>

          <AdminCard>
            <p className="text-slate-900 font-semibold mb-1">Студии, требующие внимания</p>
            <p className="text-slate-500 text-xs mb-4">Статус 🟡/🔴</p>
            <div className="flex flex-col gap-3">
              {alerts.map((s) => (
                <div key={s.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${s.status === 'red' ? 'bg-rose-500' : 'bg-amber-400'}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
