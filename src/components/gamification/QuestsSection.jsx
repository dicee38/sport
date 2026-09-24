import { Card, SectionTitle, ProgressBar } from '../ui'
import { useGamification } from '../../context/GamificationContext'
import { Check, Gift } from 'lucide-react'

function QuestRow({ q, onClaim, last }) {
  const complete = q.progress >= q.target
  return (
    <div className={`px-3 py-3 ${!last ? 'border-b border-ink-800' : ''}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-sm ${q.claimed ? 'text-ink-500 line-through' : 'text-ink-100'}`}>{q.label}</span>
        <span className="text-ink-500 text-xs shrink-0 ml-2">{q.progress}/{q.target}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar value={q.progress} max={q.target} colorClass={complete ? 'bg-matcha-500' : 'bg-gold-500'} height="h-1.5" />
        </div>
        {q.claimed ? (
          <span className="flex items-center gap-1 text-matcha-400 text-xs shrink-0"><Check size={12} /> Получено</span>
        ) : complete ? (
          <button
            onClick={() => onClaim(q.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-500 text-ink-950 text-xs font-semibold shrink-0"
          >
            <Gift size={12} /> {q.reward}{q.rewardType === 'gems' ? '💎' : ' XP'}
          </button>
        ) : (
          <span className="text-ink-500 text-xs shrink-0">{q.reward}{q.rewardType === 'gems' ? '💎' : ' XP'}</span>
        )}
      </div>
    </div>
  )
}

export default function QuestsSection() {
  const { dailyQuests, weeklyQuests, claimDailyQuest, claimWeeklyQuest } = useGamification()

  return (
    <div>
      <SectionTitle>5. Квесты</SectionTitle>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-ink-500 text-[11px] uppercase tracking-wide mb-1.5 px-1">Ежедневные</p>
          <Card className="!p-0">
            {dailyQuests.map((q, i) => (
              <QuestRow key={q.id} q={q} onClaim={claimDailyQuest} last={i === dailyQuests.length - 1} />
            ))}
          </Card>
        </div>
        <div>
          <p className="text-ink-500 text-[11px] uppercase tracking-wide mb-1.5 px-1">Недельные</p>
          <Card className="!p-0">
            {weeklyQuests.map((q, i) => (
              <QuestRow key={q.id} q={q} onClaim={claimWeeklyQuest} last={i === weeklyQuests.length - 1} />
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
