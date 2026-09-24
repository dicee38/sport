import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminHeader } from '../../components/adminUi'
import { MEMBERS } from '../../data/mock'
import { Search, ChevronRight } from 'lucide-react'

export default function Members() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = MEMBERS.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()) || m.studio.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <AdminHeader title="Member 360" subtitle={`${MEMBERS.length} записей · CRM`} />
      <div className="p-8">
        <div className="relative mb-4 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по имени или студии"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <th className="text-left px-5 py-3 font-medium">Имя</th>
                <th className="text-left px-5 py-3 font-medium">Студия</th>
                <th className="text-left px-5 py-3 font-medium">Уровень</th>
                <th className="text-left px-5 py-3 font-medium">Цель</th>
                <th className="text-right px-5 py-3 font-medium">Attendance</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => navigate(`/admin/members/${m.id}`)}
                  className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-slate-900">{m.name}</td>
                  <td className="px-5 py-4 text-slate-600">{m.studio}</td>
                  <td className="px-5 py-4 text-slate-600">{m.level}</td>
                  <td className="px-5 py-4 text-slate-600 max-w-[220px] truncate">{m.goal}</td>
                  <td className={`px-5 py-4 text-right font-medium ${m.attendanceRate >= 70 ? 'text-emerald-600' : m.attendanceRate >= 45 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {m.attendanceRate}%
                  </td>
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
