import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useGamification } from '../../context/GamificationContext'
import { Card, SectionTitle, BeltBadge, ProgressBar, Sheet, PillButton } from '../../components/ui'
import { BELTS, WALLET, REWARDS_LADDER, SHOP_ITEMS, CITIES } from '../../data/mock'
import { Globe, Wallet as WalletIcon, Award, ShoppingBag, Check, MapPin } from 'lucide-react'
import AchievementsGrid from '../../components/gamification/AchievementsGrid'
import NotificationsPreviewCard from '../../components/gamification/NotificationsPreviewCard'

const BASE_TABS = ['Overview', 'Passport', 'Wallet', 'Rewards', 'Shop']

export default function Profile() {
  const { user, cityId, setCityId, city, cart, addToCart } = useApp()
  const { toggles } = useGamification()
  const [tab, setTab] = useState('Overview')
  const [citySheet, setCitySheet] = useState(false)
  const TABS = toggles.achievements ? [...BASE_TABS, 'Ачивки'] : BASE_TABS

  return (
    <div className="pb-10">
      <div className="px-5 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-ink-50 text-2xl font-semibold">{user.fullName}</h1>
          <p className="text-ink-400 text-sm mt-1">Member since {user.memberSince}</p>
        </div>
        <button
          onClick={() => setCitySheet(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-ink-800 border border-ink-700 text-ink-200 text-xs font-medium shrink-0"
        >
          <Globe size={13} /> {city.name}
        </button>
      </div>

      <div className="px-5 mb-5 flex gap-2 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <PillButton key={t} active={tab === t} onClick={() => setTab(t)}>{t}</PillButton>
        ))}
      </div>

      {tab === 'Overview' && <OverviewTab user={user} showNotifications={toggles.notifications} />}
      {tab === 'Passport' && <PassportTab user={user} />}
      {tab === 'Wallet' && <WalletTab />}
      {tab === 'Rewards' && <RewardsTab />}
      {tab === 'Shop' && <ShopTab cart={cart} addToCart={addToCart} />}
      {tab === 'Ачивки' && toggles.achievements && (
        <div className="px-5">
          <AchievementsGrid />
        </div>
      )}

      <Sheet open={citySheet} onClose={() => setCitySheet(false)} title="Выбери студию">
        <div className="flex flex-col gap-2">
          {CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCityId(c.id); setCitySheet(false) }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl2 border text-left ${cityId === c.id ? 'border-gold-500 bg-gold-500/10' : 'border-ink-700 bg-ink-850'}`}
            >
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-ink-400" />
                <div>
                  <p className="text-ink-50 text-sm font-medium">{c.name}</p>
                  <p className="text-ink-500 text-xs">{c.studios.join(', ')}</p>
                </div>
              </div>
              {cityId === c.id && <Check size={16} className="text-gold-400" />}
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  )
}

function OverviewTab({ user, showNotifications }) {
  return (
    <div className="px-5 flex flex-col gap-5">
      <Card>
        <div className="flex items-center justify-between mb-3">
          <BeltBadge beltId={user.belt} size="lg" />
          <span className="text-ink-400 text-xs">Level {user.level}</span>
        </div>
        <ProgressBar value={user.xp} max={user.xpToNext} colorClass="bg-gradient-to-r from-gold-600 to-gold-400" />
        <p className="text-ink-400 text-xs mt-2">{user.xp} / {user.xpToNext} XP</p>
      </Card>
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Streak" value={`${user.streak}д`} />
        <StatBox label="Сезонов" value={user.seasonsCompleted} />
        <StatBox label="Челленджей" value={user.challengesCompleted} />
      </div>
      <div>
        <SectionTitle>Пояса</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {BELTS.map((b) => {
            const reached = BELTS.findIndex((x) => x.id === user.belt) >= BELTS.findIndex((x) => x.id === b.id)
            return (
              <span
                key={b.id}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${reached ? '' : 'opacity-30'}`}
                style={{ background: b.color, color: b.text }}
              >
                {b.label}
              </span>
            )
          })}
        </div>
      </div>
      {showNotifications && <NotificationsPreviewCard />}
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <Card className="text-center !p-3">
      <p className="text-ink-50 font-semibold text-lg">{value}</p>
      <p className="text-ink-500 text-[11px] mt-0.5">{label}</p>
    </Card>
  )
}

function PassportTab({ user }) {
  return (
    <div className="px-5 flex flex-col gap-4">
      <Card className="bg-gradient-to-br from-ink-850 to-ink-900 border-gold-500/20">
        <p className="font-serif-jp text-ink-50 text-lg mb-1">Digital Passport</p>
        <p className="text-ink-400 text-xs">Member since {user.memberSince}</p>
      </Card>
      <Row label="Студии посещены" value={user.studiosVisited.join(', ')} />
      <Row label="Страны" value={user.countriesVisited.join(', ')} />
      <Row label="Сезонов завершено" value={user.seasonsCompleted} />
      <Row label="Челленджей закрыто" value={user.challengesCompleted} />
    </div>
  )
}

function Row({ label, value }) {
  return (
    <Card>
      <p className="text-ink-400 text-xs mb-1">{label}</p>
      <p className="text-ink-100 text-sm font-medium">{value}</p>
    </Card>
  )
}

function WalletTab() {
  const icons = { Membership: WalletIcon, Credits: Award, Ticket: ShoppingBag, Reward: Award }
  return (
    <div className="px-5 flex flex-col gap-3">
      {WALLET.map((w) => {
        const Icon = icons[w.type] || WalletIcon
        return (
          <Card key={w.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-gold-400" />
            </div>
            <div className="flex-1">
              <p className="text-ink-500 text-[11px] uppercase tracking-wide">{w.type}</p>
              <p className="text-ink-100 text-sm font-medium">{w.label}</p>
            </div>
            <span className="text-ink-400 text-xs text-right shrink-0">{w.status}</span>
          </Card>
        )
      })}
    </div>
  )
}

function RewardsTab() {
  const totalSessions = 132
  return (
    <div className="px-5">
      <Card className="mb-4">
        <p className="text-ink-400 text-xs mb-1">Всего тренировок</p>
        <p className="text-ink-50 font-semibold text-2xl">{totalSessions}</p>
      </Card>
      <div className="flex flex-col gap-3">
        {REWARDS_LADDER.map((r) => {
          const reached = totalSessions >= r.milestone
          const pct = Math.min(100, Math.round((totalSessions / r.milestone) * 100))
          return (
            <Card key={r.milestone}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-ink-100 text-sm font-medium">{r.milestone} тренировок</span>
                {reached ? <Check size={16} className="text-matcha-400" /> : <span className="text-ink-500 text-xs">{pct}%</span>}
              </div>
              <ProgressBar value={Math.min(totalSessions, r.milestone)} max={r.milestone} colorClass={reached ? 'bg-matcha-500' : 'bg-gold-500'} />
              <p className="text-ink-400 text-xs mt-2">{r.reward}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function ShopTab({ cart, addToCart }) {
  return (
    <div className="px-5">
      <div className="grid grid-cols-2 gap-3">
        {SHOP_ITEMS.map((item) => {
          const inCart = cart.some((c) => c.id === item.id)
          return (
            <Card key={item.id}>
              <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-ink-700 to-ink-800 mb-3 flex items-center justify-center">
                <ShoppingBag className="text-ink-500" size={24} />
              </div>
              <span className="text-[10px] text-gold-400 font-medium uppercase tracking-wide">{item.tag}</span>
              <p className="text-ink-100 text-sm font-medium mt-1 leading-tight">{item.name}</p>
              <p className="text-ink-400 text-xs mt-1 mb-3">{item.price}</p>
              <button
                onClick={() => !inCart && addToCart(item)}
                className={`w-full py-2 rounded-lg text-xs font-medium ${inCart ? 'bg-ink-800 text-matcha-400 border border-matcha-500/40' : 'bg-gold-500 text-ink-950'}`}
              >
                {inCart ? 'В корзине' : 'В корзину'}
              </button>
            </Card>
          )
        })}
      </div>
      {cart.length > 0 && (
        <div className="sticky bottom-4 mx-auto mt-4 w-full bg-gold-500 text-ink-950 rounded-full py-3 px-5 flex items-center justify-between text-sm font-semibold shadow-glow animate-fadeUp">
          <span>Корзина</span>
          <span>{cart.length} товар(а)</span>
        </div>
      )}
    </div>
  )
}
