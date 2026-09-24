import { Card, SectionTitle } from '../ui'
import { useApp } from '../../context/AppContext'
import { useGamification } from '../../context/GamificationContext'
import { Zap } from 'lucide-react'

export default function XpSection() {
  const { user } = useApp()
  const { sessionXp, xpGainEvents, triggerXpGain, doubleXpActive, setDoubleXpActive } = useGamification()

  const displayedXp = user.xp + sessionXp

  return (
    <div>
      <SectionTitle>4. XP / уровни</SectionTitle>

      {doubleXpActive && (
        <Card className="mb-3 border-gold-500/50 bg-gradient-to-r from-gold-500/15 to-transparent flex items-center gap-3">
          <Zap className="text-gold-400 shrink-0" size={18} />
          <div className="flex-1">
            <p className="text-ink-50 text-sm font-semibold">Сегодня x2 XP!</p>
            <p className="text-ink-400 text-xs">Все тренировки сегодня дают двойной опыт</p>
          </div>
          <button onClick={() => setDoubleXpActive(false)} className="text-ink-500 text-xs shrink-0">Скрыть</button>
        </Card>
      )}

      <Card className="relative overflow-visible">
        <div className="flex items-center justify-between mb-3">
          <span className="text-ink-300 text-sm">Текущий опыт</span>
          <span className="text-ink-50 font-bold text-xl">{displayedXp} XP</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => triggerXpGain(doubleXpActive ? 60 : 30, 'Чек-ин')}
            className="px-3 py-2 rounded-lg bg-ink-800 border border-ink-700 text-ink-200 text-xs font-medium"
          >
            Demo: +XP за чек-ин
          </button>
          <button
            onClick={() => triggerXpGain(doubleXpActive ? 240 : 120, 'Первая тренировка дня')}
            className="px-3 py-2 rounded-lg bg-ink-800 border border-ink-700 text-ink-200 text-xs font-medium"
          >
            Demo: +XP за первую тренировку
          </button>
        </div>
        <p className="text-ink-500 text-[11px]">Бонус за первую тренировку дня, {doubleXpActive ? 'сейчас активен множитель x2' : 'множитель x2 выключен'}.</p>

        <div className="pointer-events-none absolute top-2 right-4 flex flex-col items-end gap-1">
          {xpGainEvents.map((e) => (
            <span
              key={e.id}
              className="text-gold-400 font-bold text-sm animate-xpFloat"
            >
              +{e.amount} XP
            </span>
          ))}
        </div>
      </Card>
    </div>
  )
}
