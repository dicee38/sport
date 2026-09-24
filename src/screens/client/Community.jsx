import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useGamification } from '../../context/GamificationContext'
import { Card, SectionTitle, LockBadge, Sheet, PrimaryButton } from '../../components/ui'
import { COMMUNITY_EVENTS, TEAM_COMPETITION, COMMUNITY_BADGES, JOURNEYS } from '../../data/mock'
import { Ticket, Trophy, Award, MapPin } from 'lucide-react'
import FriendsList from '../../components/gamification/FriendsList'

export default function Community() {
  const { user } = useApp()
  const { toggles } = useGamification()
  const [ticketSheet, setTicketSheet] = useState(null)
  const [journeySheet, setJourneySheet] = useState(null)
  const [purchased, setPurchased] = useState([])

  const maxScore = Math.max(...TEAM_COMPETITION.teams.map((t) => t.score))

  return (
    <div className="pb-10">
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-ink-50 text-2xl font-semibold">Community</h1>
        <p className="text-ink-400 text-sm mt-1">Мероприятия, команды и путешествия</p>
      </div>

      <div className="px-5 mb-6">
        <SectionTitle>Ближайшие события</SectionTitle>
        <div className="flex flex-col gap-3">
          {COMMUNITY_EVENTS.map((ev) => (
            <Card key={ev.id}>
              <p className="text-ink-50 font-semibold">{ev.title}</p>
              <p className="text-ink-400 text-xs mt-1">{ev.date} · {ev.studio}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-ink-300 text-sm">{ev.price}</span>
                <button
                  onClick={() => setTicketSheet(ev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-800 border border-ink-700 text-ink-100 text-xs font-medium"
                >
                  <Ticket size={13} /> {purchased.includes(ev.id) ? 'Куплено' : 'Купить билет'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {toggles.friends && (
        <div className="px-5 mb-6">
          <FriendsList />
        </div>
      )}

      <div className="px-5 mb-6">
        <SectionTitle action={<span className="text-ink-400 text-xs flex items-center gap-1"><Trophy size={13} /> {TEAM_COMPETITION.daysLeft}д осталось</span>}>
          {TEAM_COMPETITION.title}
        </SectionTitle>
        <Card>
          <div className="flex flex-col gap-4">
            {TEAM_COMPETITION.teams.map((t) => (
              <div key={t.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-ink-100 text-sm font-medium">{t.name}</span>
                  <span className="text-ink-400 text-xs">{t.score.toLocaleString()} pts</span>
                </div>
                <div className="w-full bg-ink-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.round((t.score / maxScore) * 100)}%`, background: t.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-ink-500 text-xs mt-3">{TEAM_COMPETITION.teams[0].studio} vs {TEAM_COMPETITION.teams[1].studio}</p>
        </Card>
      </div>

      <div className="px-5 mb-6">
        <SectionTitle>Лента бейджей сообщества</SectionTitle>
        <div className="flex flex-col gap-2.5">
          {COMMUNITY_BADGES.map((b) => (
            <div key={b.id} className="flex items-center gap-3 bg-ink-850 border border-ink-700/60 rounded-xl2 px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
                <Award size={15} className="text-gold-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-ink-100 text-sm"><span className="font-semibold">{b.member}</span> получила «{b.badge}»</p>
              </div>
              <span className="text-ink-500 text-[11px] shrink-0">{b.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <SectionTitle>Journey-туры</SectionTitle>
        <div className="flex flex-col gap-3">
          {JOURNEYS.map((j) => {
            const locked = user.level < j.minLevel
            return (
              <Card key={j.id} onClick={() => !locked && setJourneySheet(j)} className={locked ? 'opacity-70' : ''}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-vermillion-400" />
                    <span className="text-ink-50 font-semibold">{j.title}</span>
                  </div>
                  {locked && <LockBadge label={`с ${j.minLevel} ур.`} />}
                </div>
                <p className="text-ink-400 text-xs leading-relaxed mb-2">{j.description}</p>
                <p className="text-ink-300 text-sm">{j.price}</p>
              </Card>
            )
          })}
        </div>
      </div>

      <Sheet open={!!ticketSheet} onClose={() => setTicketSheet(null)} title={ticketSheet?.title}>
        {ticketSheet && (
          <div>
            <p className="text-ink-400 text-sm mb-1">{ticketSheet.date}</p>
            <p className="text-ink-400 text-sm mb-4">{ticketSheet.studio}</p>
            <div className="flex items-center justify-between mb-5">
              <span className="text-ink-300 text-sm">Стоимость</span>
              <span className="text-ink-50 font-semibold">{ticketSheet.price}</span>
            </div>
            <PrimaryButton onClick={() => { setPurchased((p) => [...p, ticketSheet.id]); setTicketSheet(null) }}>
              Подтвердить покупку
            </PrimaryButton>
          </div>
        )}
      </Sheet>

      <Sheet open={!!journeySheet} onClose={() => setJourneySheet(null)} title={journeySheet?.title}>
        {journeySheet && (
          <div>
            <p className="text-ink-300 text-sm leading-relaxed mb-4">{journeySheet.description}</p>
            <div className="flex items-center justify-between mb-5">
              <span className="text-ink-300 text-sm">Стоимость</span>
              <span className="text-ink-50 font-semibold">{journeySheet.price}</span>
            </div>
            <PrimaryButton onClick={() => setJourneySheet(null)}>Узнать подробнее</PrimaryButton>
          </div>
        )}
      </Sheet>
    </div>
  )
}
