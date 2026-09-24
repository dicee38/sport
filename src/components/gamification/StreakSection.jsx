import { Card, SectionTitle } from '../ui'
import { useApp } from '../../context/AppContext'
import { useGamification } from '../../context/GamificationContext'
import { Flame, Snowflake, TriangleAlert } from 'lucide-react'

function StreakCalendar({ streak }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayDate = today.getDate()
  // mock: last `streak` days (including today) trained, with one gap accounted for by a freeze earlier in the month
  const trained = new Set()
  for (let i = 0; i < streak; i++) {
    const d = todayDate - i
    if (d > 0) trained.add(d)
  }
  const frozenDay = todayDate - streak - 2 > 0 ? todayDate - streak - 2 : null

  return (
    <div className="grid grid-cols-7 gap-1.5 mt-3">
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
        const isTrained = trained.has(d)
        const isFrozen = d === frozenDay
        const isFuture = d > todayDate
        return (
          <div
            key={d}
            className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-medium ${
              isTrained
                ? 'bg-vermillion-500/80 text-white'
                : isFrozen
                ? 'bg-blue-400/30 text-blue-200 border border-blue-400/50'
                : isFuture
                ? 'bg-ink-800/50 text-ink-600'
                : 'bg-ink-800 text-ink-500'
            }`}
            title={isFrozen ? 'Спасено заморозкой' : undefined}
          >
            {isFrozen ? <Snowflake size={10} /> : d}
          </div>
        )
      })}
    </div>
  )
}

export default function StreakSection() {
  const { user } = useApp()
  const {
    streakFreezes, freezeUsedToday, applyStreakFreeze,
    streakThreatDismissed, setStreakThreatDismissed,
  } = useGamification()

  const streakInDanger = !streakThreatDismissed

  return (
    <div>
      <SectionTitle>2. Streak + заморозка</SectionTitle>

      {streakInDanger && (
        <Card className="mb-3 border-vermillion-500/50 bg-vermillion-500/10 animate-fadeUp">
          <div className="flex items-start gap-3">
            <TriangleAlert size={18} className="text-vermillion-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-ink-50 text-sm font-semibold">Стрик под угрозой!</p>
              <p className="text-ink-300 text-xs mt-1">Вчера тренировки не было. Потренируйся сегодня или используй заморозку, чтобы не потерять {user.streak} дней.</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setStreakThreatDismissed(true)}
                  className="px-3 py-1.5 rounded-lg bg-ink-800 border border-ink-700 text-ink-200 text-xs font-medium"
                >
                  Тренируюсь сегодня
                </button>
                {streakFreezes > 0 && !freezeUsedToday && (
                  <button
                    onClick={() => { applyStreakFreeze(); setStreakThreatDismissed(true) }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-medium"
                  >
                    <Snowflake size={13} /> Заморозить стрик
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Flame className="text-vermillion-500" size={18} />
            <span className="text-ink-50 font-semibold">{user.streak} дней подряд</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-300">
            <Snowflake size={14} />
            {streakFreezes} заморозки
            {freezeUsedToday && <span className="text-ink-500">· использована</span>}
          </div>
        </div>
        <p className="text-ink-500 text-[11px] mb-1">Календарь стрика — {new Date().toLocaleDateString('ru-RU', { month: 'long' })}</p>
        <StreakCalendar streak={user.streak} />
        <div className="flex items-center gap-4 mt-3 text-[10px] text-ink-500">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-vermillion-500/80 inline-block" /> Тренировка</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400/30 border border-blue-400/50 inline-block" /> Заморозка</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-ink-800 inline-block" /> Пропуск</span>
        </div>
      </Card>
    </div>
  )
}
