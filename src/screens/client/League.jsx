import { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { Card, PrimaryButton } from '../../components/ui'
import { useGamification } from '../../context/GamificationContext'
import { LEAGUE_PLAYERS, PROMOTION_ZONE, DEMOTION_ZONE } from '../../data/gamification'
import { Trophy, ArrowUp, ArrowDown, Sparkles } from 'lucide-react'

function useWeekCountdown() {
  const [text, setText] = useState('')
  useEffect(() => {
    function tick() {
      const now = new Date()
      const day = now.getDay()
      const daysUntilSunday = (7 - day) % 7
      const end = new Date(now)
      end.setDate(now.getDate() + daysUntilSunday)
      end.setHours(23, 59, 59, 999)
      const diff = Math.max(0, end - now)
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setText(`${d}д ${h}ч ${m}м`)
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])
  return text
}

export default function League() {
  const { leagueIndex, leagueTiers, promotionAnim, promoteLeague } = useGamification()
  const league = leagueTiers[leagueIndex]
  const countdown = useWeekCountdown()
  const total = LEAGUE_PLAYERS.length

  return (
    <div className="min-h-full flex flex-col">
      <TopBar title="Лига" subtitle="Соревнование недели" onBack={null} />

      <div className="px-5 pt-2 pb-6">
        <Card className="mb-5 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${league.color}22, transparent)` }}>
          <div
            className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
            style={{ background: league.color }}
          >
            <Trophy size={26} style={{ color: league.text }} />
          </div>
          <p className="text-ink-50 font-semibold text-lg">{league.name}</p>
          <p className="text-ink-400 text-xs mt-1">До конца недели: {countdown}</p>
        </Card>

        <div className="flex items-center gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1.5 text-matcha-400"><ArrowUp size={13} /> Топ {PROMOTION_ZONE} — повышение</span>
          <span className="flex items-center gap-1.5 text-vermillion-400"><ArrowDown size={13} /> Низ {DEMOTION_ZONE} — понижение</span>
        </div>

        <Card className="!p-2">
          {LEAGUE_PLAYERS.map((p, i) => {
            const rank = i + 1
            const isPromotion = rank <= PROMOTION_ZONE
            const isDemotion = rank > total - DEMOTION_ZONE
            return (
              <div
                key={p.id}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl ${i !== LEAGUE_PLAYERS.length - 1 ? 'border-b border-ink-800' : ''} ${p.you ? 'bg-gold-500/10' : ''}`}
              >
                <span
                  className={`w-6 text-center text-sm font-semibold shrink-0 ${
                    isPromotion ? 'text-matcha-400' : isDemotion ? 'text-vermillion-400' : 'text-ink-400'
                  }`}
                >
                  {rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center text-xs font-semibold text-ink-200 shrink-0">
                  {p.name[0]}
                </div>
                <span className={`flex-1 text-sm ${p.you ? 'text-gold-400 font-semibold' : 'text-ink-100'}`}>
                  {p.name}{p.you && ' (ты)'}
                </span>
                <span className="text-ink-400 text-xs font-medium">{p.points} pts</span>
              </div>
            )
          })}
        </Card>

        <div className="mt-5">
          <PrimaryButton onClick={promoteLeague} disabled={leagueIndex >= leagueTiers.length - 1}>
            Demo: симулировать повышение лиги
          </PrimaryButton>
          <p className="text-ink-500 text-[11px] text-center mt-2">Кнопка только для демонстрации анимации</p>
        </div>
      </div>

      {promotionAnim && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 animate-fadeIn">
          <div className="text-center animate-scaleIn">
            <div className="w-20 h-20 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-gold-400" />
            </div>
            <p className="text-ink-50 font-semibold text-xl mb-1">Повышение лиги!</p>
            <p className="text-ink-400 text-sm">Поздравляем с переходом на новый уровень</p>
          </div>
        </div>
      )}
    </div>
  )
}
