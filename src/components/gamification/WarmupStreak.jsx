import { Card, SectionTitle, PrimaryButton } from '../ui'
import { useGamification } from '../../context/GamificationContext'
import { Sprout, PartyPopper } from 'lucide-react'

export default function WarmupStreak() {
  const { warmupActive, warmupDay, warmupTarget, justGraduated, completeWarmup } = useGamification()

  if (!warmupActive && !justGraduated) return null

  return (
    <div>
      <SectionTitle>3. Прогревочный стрик</SectionTitle>
      {justGraduated ? (
        <Card className="border-gold-500/50 bg-gold-500/10 text-center animate-scaleIn">
          <PartyPopper className="text-gold-400 mx-auto mb-2" size={24} />
          <p className="text-ink-50 font-semibold">Прогрев завершён!</p>
          <p className="text-ink-400 text-xs mt-1">Теперь у тебя настоящий стрик 🔥 — он считается наравне со всеми.</p>
        </Card>
      ) : (
        <Card className="border-matcha-500/40 bg-matcha-500/5">
          <div className="flex items-center gap-2 mb-2">
            <Sprout size={18} className="text-matcha-400" />
            <span className="text-ink-50 font-semibold">День {warmupDay} из {warmupTarget}</span>
          </div>
          <p className="text-ink-400 text-xs mb-3">
            Для новых участниц — облегчённый старт: даже короткая активность считается в прогрев. После {warmupTarget} дней прогрев превращается в полноценный streak.
          </p>
          <div className="flex gap-1.5 mb-4">
            {Array.from({ length: warmupTarget }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${i < warmupDay ? 'bg-matcha-400' : 'bg-ink-800'}`}
              />
            ))}
          </div>
          <PrimaryButton onClick={completeWarmup} className="!bg-matcha-500 !text-ink-950">
            Demo: завершить прогрев
          </PrimaryButton>
        </Card>
      )}
    </div>
  )
}
