import { Card } from '../ui'
import { useGamification } from '../../context/GamificationContext'
import { MASCOT_MESSAGES } from '../../data/gamification'

export default function MascotReaction() {
  const { mascotVariant, setMascotVariant, streakThreatDismissed, warmupActive } = useGamification()

  const state = !streakThreatDismissed ? 'streakThreat' : warmupActive ? 'warmup' : 'streakHigh'
  const msg = MASCOT_MESSAGES[state]

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-ink-100 font-semibold text-sm tracking-wide uppercase">9. Маскот-реакции</h2>
        <div className="flex gap-1 bg-ink-800 rounded-full p-0.5 border border-ink-700">
          <button
            onClick={() => setMascotVariant('character')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${mascotVariant === 'character' ? 'bg-gold-500 text-ink-950' : 'text-ink-400'}`}
          >
            Персонаж
          </button>
          <button
            onClick={() => setMascotVariant('text')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${mascotVariant === 'text' ? 'bg-gold-500 text-ink-950' : 'text-ink-400'}`}
          >
            Без персонажа
          </button>
        </div>
      </div>
      <Card className="flex items-center gap-3">
        {mascotVariant === 'character' && (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500/25 to-vermillion-500/15 border border-gold-500/30 flex items-center justify-center text-2xl shrink-0 animate-fadeUp">
            {msg.emoji}
          </div>
        )}
        <p className="text-ink-100 text-sm leading-relaxed flex-1">
          {mascotVariant === 'text' && <span className="mr-1.5">{msg.emoji}</span>}
          {msg.text}
        </p>
      </Card>
    </div>
  )
}
