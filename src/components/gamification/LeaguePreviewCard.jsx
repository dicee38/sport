import { useNavigate } from 'react-router-dom'
import { Card, SectionTitle } from '../ui'
import { useGamification } from '../../context/GamificationContext'
import { LEAGUE_PLAYERS } from '../../data/gamification'
import { ChevronRight, Trophy } from 'lucide-react'

export default function LeaguePreviewCard() {
  const navigate = useNavigate()
  const { leagueIndex, leagueTiers } = useGamification()
  const league = leagueTiers[leagueIndex]
  const you = LEAGUE_PLAYERS.find((p) => p.you)
  const rank = LEAGUE_PLAYERS.findIndex((p) => p.you) + 1

  return (
    <div>
      <SectionTitle>1. Лига</SectionTitle>
      <Card onClick={() => navigate('/season/league')} className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: league.color }}>
          <Trophy size={18} style={{ color: league.text }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-ink-50 font-medium text-sm">{league.name}</p>
          <p className="text-ink-400 text-xs mt-0.5">Ты на {rank}-м месте · {you?.points} pts</p>
        </div>
        <ChevronRight className="text-ink-500 shrink-0" size={18} />
      </Card>
    </div>
  )
}
