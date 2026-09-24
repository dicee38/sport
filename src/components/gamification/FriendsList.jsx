import { useState } from 'react'
import { Card, SectionTitle } from '../ui'
import { FRIENDS } from '../../data/gamification'
import { useApp } from '../../context/AppContext'
import { Flame } from 'lucide-react'

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export default function FriendsList() {
  const { user } = useApp()
  const [cheered, setCheered] = useState({})
  const [compareId, setCompareId] = useState(FRIENDS[0].id)
  const compareFriend = FRIENDS.find((f) => f.id === compareId)
  const myWeek = user.streakHistory.map((v) => (v ? 1 : 0))

  return (
    <div>
      <SectionTitle>8. Друзья</SectionTitle>
      <div className="flex flex-col gap-2.5 mb-4">
        {FRIENDS.map((f) => (
          <Card key={f.id} onClick={() => setCompareId(f.id)} className={compareId === f.id ? 'border-gold-500/40' : ''}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center text-sm font-semibold text-ink-200 shrink-0">
                {f.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-ink-100 text-sm font-medium">{f.name}</p>
                <p className="text-ink-500 text-xs flex items-center gap-1">
                  Level {f.level} · <Flame size={11} className="text-vermillion-500" /> {f.streak}д
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setCheered((p) => ({ ...p, [f.id]: true })) }}
                disabled={cheered[f.id]}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  cheered[f.id] ? 'bg-matcha-500/20 text-matcha-400 scale-95' : 'bg-ink-800 border border-ink-700 text-ink-200'
                }`}
              >
                {cheered[f.id] ? '💪 Подбодрили' : '👏 Подбодрить'}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {compareFriend && (
        <Card>
          <p className="text-ink-400 text-xs mb-3">Сравнение активности за неделю: ты vs {compareFriend.name}</p>
          <div className="grid grid-cols-7 gap-1.5">
            {DAY_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-full flex flex-col-reverse gap-0.5 h-16">
                  <div className={`w-full rounded-sm ${myWeek[i] ? 'bg-gold-500' : 'bg-ink-800'}`} style={{ height: myWeek[i] ? '60%' : '15%' }} />
                  <div className={`w-full rounded-sm ${compareFriend.weekSessions[i] ? 'bg-ink-500' : 'bg-ink-800'}`} style={{ height: compareFriend.weekSessions[i] ? '60%' : '15%' }} />
                </div>
                <span className="text-ink-600 text-[9px]">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] text-ink-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-gold-500 inline-block" /> Ты</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-ink-500 inline-block" /> {compareFriend.name}</span>
          </div>
        </Card>
      )}
    </div>
  )
}
