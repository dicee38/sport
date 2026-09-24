import { useNavigate } from 'react-router-dom'
import { AdminHeader, StatusDot } from '../../components/adminUi'
import { STUDIOS } from '../../data/mock'
import { ChevronRight } from 'lucide-react'

export default function Studios() {
  const navigate = useNavigate()
  return (
    <div>
      <AdminHeader title="Studios" subtitle={`${STUDIOS.length} студий в сети`} />
      <div className="p-8">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <th className="text-left px-5 py-3 font-medium">Студия</th>
                <th className="text-left px-5 py-3 font-medium">Город</th>
                <th className="text-left px-5 py-3 font-medium">Статус</th>
                <th className="text-right px-5 py-3 font-medium">Участники</th>
                <th className="text-right px-5 py-3 font-medium">Attendance</th>
                <th className="text-right px-5 py-3 font-medium">Тренд</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {STUDIOS.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => navigate(`/admin/studios/${s.id}`)}
                  className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-slate-900">{s.name}</td>
                  <td className="px-5 py-4 text-slate-600">{s.city}</td>
                  <td className="px-5 py-4"><StatusDot status={s.status} /></td>
                  <td className="px-5 py-4 text-right text-slate-700">{s.members.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right text-slate-700">{s.attendance}%</td>
                  <td className={`px-5 py-4 text-right font-medium ${s.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{s.trend}</td>
                  <td className="px-5 py-4 text-right"><ChevronRight size={16} className="text-slate-400 inline" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
