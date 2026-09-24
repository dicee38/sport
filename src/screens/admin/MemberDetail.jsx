import { useParams, useNavigate } from 'react-router-dom'
import { AdminHeader, AdminCard, Pill } from '../../components/adminUi'
import { MEMBERS } from '../../data/mock'
import { ArrowLeft } from 'lucide-react'

export default function MemberDetail() {
  const { memberId } = useParams()
  const navigate = useNavigate()
  const member = MEMBERS.find((m) => m.id === memberId)

  if (!member) return null

  return (
    <div>
      <AdminHeader
        title={member.name}
        subtitle={`${member.studio} · Level ${member.level}`}
        right={
          <button onClick={() => navigate('/admin/members')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={15} /> К списку клиентов
          </button>
        }
      />
      <div className="p-8 grid grid-cols-3 gap-6">
        <AdminCard>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Profile</p>
          <p className="text-slate-900 font-semibold">{member.name}</p>
          <p className="text-slate-500 text-sm mt-1">Пояс: {member.belt}</p>
          <p className="text-slate-500 text-sm">Attendance rate: {member.attendanceRate}%</p>
        </AdminCard>
        <AdminCard>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Goals</p>
          <p className="text-slate-700 text-sm leading-relaxed">{member.goal}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Purchases</p>
          <div className="flex flex-wrap gap-1.5">
            {member.purchases.map((p) => <Pill key={p}>{p}</Pill>)}
          </div>
        </AdminCard>

        <AdminCard className="col-span-2">
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-3">Attendance — последние 12 недель</p>
          <div className="flex gap-1.5">
            {member.attendance.map((a, i) => (
              <div key={i} className={`flex-1 h-8 rounded ${a ? 'bg-slate-900' : 'bg-slate-100'}`} />
            ))}
          </div>
        </AdminCard>
        <AdminCard>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Trainer notes</p>
          <p className="text-slate-700 text-sm leading-relaxed">{member.trainerNotes}</p>
        </AdminCard>

        <AdminCard className="col-span-3">
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-3">Communication history</p>
          <div className="flex flex-col gap-2">
            {member.comms.map((c, i) => (
              <div key={i} className="flex items-center gap-4 text-sm py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-400 w-20 shrink-0">{c.date}</span>
                <Pill tone="slate">{c.channel}</Pill>
                <span className="text-slate-700">{c.text}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  )
}
