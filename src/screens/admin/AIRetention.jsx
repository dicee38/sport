import { useNavigate } from 'react-router-dom'
import { AdminHeader, AdminCard, Pill } from '../../components/adminUi'
import { AI_RETENTION_RISK } from '../../data/mock'
import { Sparkles, AlertTriangle } from 'lucide-react'

export default function AIRetention() {
  const navigate = useNavigate()
  return (
    <div>
      <AdminHeader title="AI Retention" subtitle="Клиенты группы риска и mock-сценарии возврата" />
      <div className="p-8 flex flex-col gap-4">
        {AI_RETENTION_RISK.map((r) => (
          <AdminCard key={r.id}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <button onClick={() => navigate(`/admin/members/${r.memberId}`)} className="text-slate-900 font-semibold hover:underline">
                  {r.name}
                </button>
                <p className="text-slate-500 text-xs mt-0.5">{r.studio}</p>
              </div>
              <Pill tone={r.riskLevel === 'Высокий' ? 'red' : 'amber'}>
                <span className="flex items-center gap-1"><AlertTriangle size={11} /> {r.riskLevel} риск</span>
              </Pill>
            </div>
            <div className="mb-3">
              <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Сигнал</p>
              <p className="text-slate-700 text-sm leading-relaxed">{r.signal}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles size={13} className="text-amber-500" />
                <p className="text-slate-900 text-xs font-semibold uppercase tracking-wide">Предложенный сценарий возврата</p>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{r.scenario}</p>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  )
}
