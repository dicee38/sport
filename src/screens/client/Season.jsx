import { useApp } from '../../context/AppContext'
import { useGamification } from '../../context/GamificationContext'
import { Card, SectionTitle, ProgressBar } from '../../components/ui'
import { SEASON, SEASON_PASS_TIERS, SEASON_MERCH } from '../../data/mock'
import { Check, Sparkles, ShoppingBag } from 'lucide-react'
import LeaguePreviewCard from '../../components/gamification/LeaguePreviewCard'

export default function Season() {
  const { seasonTasks, toggleSeasonTask } = useApp()
  const { toggles } = useGamification()
  const doneCount = seasonTasks.filter((t) => t.done).length

  return (
    <div className="pb-10">
      <div className="relative px-5 pt-10 pb-8 bg-gradient-to-br from-vermillion-700/40 via-ink-900 to-ink-950 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gold-500/10 blur-3xl" />
        <p className="text-gold-400 text-xs uppercase tracking-widest mb-2">{SEASON.daysLeft} дней осталось</p>
        <h1 className="font-serif-jp text-3xl text-ink-50 mb-2">{SEASON.name}</h1>
        <p className="text-ink-300 text-sm mb-5">{SEASON.theme}</p>
        <ProgressBar value={SEASON.progress} colorClass="bg-gradient-to-r from-vermillion-500 to-gold-400" height="h-2.5" />
        <p className="text-ink-400 text-xs mt-2">{SEASON.progress}% сезона пройдено</p>
      </div>

      {toggles.leagues && (
        <div className="px-5 mt-6">
          <LeaguePreviewCard />
        </div>
      )}

      <div className="px-5 mt-6">
        <SectionTitle>{SEASON.challenge.title} · {doneCount}/{seasonTasks.length}</SectionTitle>
        <Card className="!p-2">
          {seasonTasks.map((t, i) => (
            <button
              key={t.id}
              onClick={() => toggleSeasonTask(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left ${i !== seasonTasks.length - 1 ? 'border-b border-ink-800' : ''}`}
            >
              <span className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${t.done ? 'bg-matcha-500 border-matcha-500' : 'border-ink-600'}`}>
                {t.done && <Check size={13} className="text-ink-950" />}
              </span>
              <span className={`text-sm flex-1 ${t.done ? 'text-ink-500 line-through' : 'text-ink-100'}`}>{t.label}</span>
            </button>
          ))}
        </Card>
      </div>

      <div className="px-5 mt-6">
        <SectionTitle>Season Pass</SectionTitle>
        <div className="flex flex-col gap-3">
          {SEASON_PASS_TIERS.map((tier) => (
            <Card key={tier.id} className={tier.highlight ? 'border-gold-500/50 bg-gradient-to-br from-gold-500/10 to-ink-850' : ''}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {tier.highlight && <Sparkles size={15} className="text-gold-400" />}
                  <span className="text-ink-50 font-semibold">{tier.name}</span>
                </div>
                <span className="text-ink-300 text-sm">{tier.price}</span>
              </div>
              <ul className="flex flex-col gap-1.5 mb-4">
                {tier.perks.map((p) => (
                  <li key={p} className="text-ink-400 text-xs flex items-start gap-1.5">
                    <Check size={12} className="text-matcha-400 mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-xl text-sm font-medium ${tier.highlight ? 'bg-gold-500 text-ink-950' : 'bg-ink-800 text-ink-200 border border-ink-700'}`}>
                {tier.id === 'free' ? 'Текущий план' : 'Выбрать'}
              </button>
            </Card>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6">
        <SectionTitle>Лимитированный дроп сезона</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {SEASON_MERCH.map((m) => (
            <Card key={m.id}>
              <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-ink-700 to-ink-800 mb-3 flex items-center justify-center">
                <ShoppingBag className="text-ink-500" size={26} />
              </div>
              {m.limited && <span className="text-[10px] text-vermillion-400 font-medium uppercase tracking-wide">Limited</span>}
              <p className="text-ink-100 text-sm font-medium mt-1 leading-tight">{m.name}</p>
              <p className="text-ink-400 text-xs mt-1">{m.price}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
