import { useParams, useNavigate } from 'react-router-dom'
import { AdminHeader, AdminCard, StatusDot, Pill } from '../../components/adminUi'
import { STUDIOS } from '../../data/mock'
import { ArrowLeft, TrendingDown, Sparkles } from 'lucide-react'

export default function StudioDetail() {
  const { studioId } = useParams()
  const navigate = useNavigate()
  const studio = STUDIOS.find((s) => s.id === studioId)

  if (!studio) return null

  const diagnosisChain = studio.insight.includes('→')
    ? studio.insight.split('.')[0].split('→').map((s) => s.trim())
    : null

  return (
    <div>
      <AdminHeader
        title={studio.name}
        subtitle={`${studio.city} · ${studio.members.toLocaleString()} участников`}
        right={
          <button onClick={() => navigate('/admin/studios')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={15} /> К списку студий
          </button>
        }
      />
      <div className="p-8 grid grid-cols-3 gap-6">
        <AdminCard>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Статус</p>
          <div className="flex items-center gap-2">
            <StatusDot status={studio.status} />
            <span className="font-semibold text-slate-900 capitalize">{studio.status === 'green' ? 'Стабильно' : studio.status === 'yellow' ? 'Требует внимания' : 'Критично'}</span>
          </div>
        </AdminCard>
        <AdminCard>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Attendance</p>
          <p className="font-semibold text-slate-900 text-xl">{studio.attendance}%</p>
        </AdminCard>
        <AdminCard>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Тренд за месяц</p>
          <p className={`font-semibold text-xl ${studio.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{studio.trend}</p>
        </AdminCard>

        <AdminCard className="col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={15} className="text-amber-500" />
            <p className="text-slate-900 font-semibold">AI-диагностика падения показателей</p>
            <Pill tone="slate">mock insight</Pill>
          </div>
          {diagnosisChain ? (
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {diagnosisChain.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium flex items-center gap-1">
                    {step.startsWith('↓') && <TrendingDown size={13} className="text-rose-500" />}
                    {step.replace('↓', '').trim()}
                  </span>
                  {i < diagnosisChain.length - 1 && <span className="text-slate-300">→</span>}
                </div>
              ))}
            </div>
          ) : null}
          <p className="text-slate-600 text-sm leading-relaxed">{studio.insight}</p>
        </AdminCard>
      </div>
    </div>
  )
}
