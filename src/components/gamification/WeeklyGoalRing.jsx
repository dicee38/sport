import { Card, SectionTitle } from '../ui'
import { useGamification } from '../../context/GamificationContext'

const OPTIONS = [2, 3, 4, 5, 6]

export default function WeeklyGoalRing() {
  const { weeklyGoalTarget, setWeeklyGoalTarget, weeklyGoalDone } = useGamification()
  const pct = Math.min(1, weeklyGoalDone / weeklyGoalTarget)
  const r = 46
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - pct)
  const done = pct >= 1

  return (
    <div>
      <SectionTitle>11. Недельная цель</SectionTitle>
      <Card className="flex items-center gap-5">
        <div className="relative w-28 h-28 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r={r} fill="none" stroke="#22262b" strokeWidth="10" />
            <circle
              cx="50" cy="50" r={r} fill="none"
              stroke={done ? '#7c8f6e' : '#c9a35f'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-ink-50 font-bold text-xl">{weeklyGoalDone}/{weeklyGoalTarget}</span>
            <span className="text-ink-500 text-[10px]">тренировок</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-ink-100 text-sm font-medium mb-1">{done ? 'Цель недели выполнена! 🎉' : 'Цель на эту неделю'}</p>
          <p className="text-ink-400 text-xs mb-3">Сколько тренировок в неделю — твой выбор</p>
          <div className="flex gap-1.5 flex-wrap">
            {OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setWeeklyGoalTarget(n)}
                className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${
                  n === weeklyGoalTarget ? 'bg-gold-500 text-ink-950' : 'bg-ink-800 text-ink-300 border border-ink-700'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
