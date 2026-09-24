import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useGamification } from '../../context/GamificationContext'
import { Card, SectionTitle, PillButton, ProgressBar, FormatTag, PrimaryButton, GhostButton, Sheet } from '../../components/ui'
import { SKILLS_PROGRESS } from '../../data/mock'
import { Users2 } from 'lucide-react'
import QuestsSection from '../../components/gamification/QuestsSection'
import XpSection from '../../components/gamification/XpSection'

export default function Train() {
  const { schedule, bookedClassIds, toggleBook, waitlistedClassIds, toggleWaitlist } = useApp()
  const { toggles } = useGamification()
  const [activeDay, setActiveDay] = useState(0)
  const [skillCategory, setSkillCategory] = useState('boxing')
  const [selectedClass, setSelectedClass] = useState(null)

  const day = schedule[activeDay]
  const recommended = day.classes.filter((c) => c.recommended)

  function isBooked(id) { return bookedClassIds.includes(id) }
  function isWaitlisted(id) { return waitlistedClassIds.includes(id) }

  return (
    <div className="pb-8">
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-ink-50 text-2xl font-semibold">Расписание</h1>
        <p className="text-ink-400 text-sm mt-1">Выбери день и запишись на класс</p>
      </div>

      <div className="px-5 mb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {schedule.map((d, i) => (
          <PillButton key={d.day} active={i === activeDay} onClick={() => setActiveDay(i)}>{d.day}</PillButton>
        ))}
      </div>

      {recommended.length > 0 && (
        <div className="px-5 mb-5">
          <SectionTitle>Recommended for you</SectionTitle>
          <div className="flex flex-col gap-3">
            {recommended.map((c) => (
              <ClassCard key={c.id} c={c} booked={isBooked(c.id)} waitlisted={isWaitlisted(c.id)} onClick={() => setSelectedClass(c)} highlight />
            ))}
          </div>
        </div>
      )}

      <div className="px-5 mb-6">
        <SectionTitle>{day.day} · все тренировки</SectionTitle>
        <div className="flex flex-col gap-3">
          {day.classes.map((c) => (
            <ClassCard key={c.id} c={c} booked={isBooked(c.id)} waitlisted={isWaitlisted(c.id)} onClick={() => setSelectedClass(c)} />
          ))}
        </div>
      </div>

      <div className="px-5">
        <SectionTitle>Карта прогресса по навыкам</SectionTitle>
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {Object.keys(SKILLS_PROGRESS).map((cat) => (
            <PillButton key={cat} active={skillCategory === cat} onClick={() => setSkillCategory(cat)}>
              {cat === 'boxing' ? 'Boxing' : cat === 'strength' ? 'Strength' : 'Mobility'}
            </PillButton>
          ))}
        </div>
        <Card>
          <div className="flex flex-col gap-4">
            {SKILLS_PROGRESS[skillCategory].map((s) => (
              <div key={s.skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-ink-200 text-sm">{s.skill}</span>
                  <span className="text-ink-400 text-xs">{s.value}%</span>
                </div>
                <ProgressBar value={s.value} colorClass={s.value >= 80 ? 'bg-matcha-500' : s.value >= 50 ? 'bg-gold-500' : 'bg-vermillion-500'} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {(toggles.quests || toggles.xp) && (
        <div className="px-5 mt-6 border-t border-dashed border-ink-700 pt-5 flex flex-col gap-5">
          {toggles.xp && <XpSection />}
          {toggles.quests && <QuestsSection />}
        </div>
      )}

      <Sheet open={!!selectedClass} onClose={() => setSelectedClass(null)} title={selectedClass ? `${day.day}, ${selectedClass.time}` : ''}>
        {selectedClass && (
          <ClassDetail
            c={selectedClass}
            booked={isBooked(selectedClass.id)}
            waitlisted={isWaitlisted(selectedClass.id)}
            onBook={() => { toggleBook(selectedClass.id); setSelectedClass(null) }}
            onWaitlist={() => { toggleWaitlist(selectedClass.id); setSelectedClass(null) }}
          />
        )}
      </Sheet>
    </div>
  )
}

function ClassCard({ c, booked, waitlisted, onClick, highlight }) {
  const full = c.booked >= c.capacity
  return (
    <Card onClick={onClick} className={highlight ? 'border-gold-500/40' : ''}>
      <div className="flex items-start justify-between">
        <div>
          <FormatTag formatId={c.format} />
          <p className="text-ink-50 font-semibold mt-2">{c.time} · {c.duration} мин</p>
          <p className="text-ink-400 text-xs mt-1">Тренер: {c.trainer}</p>
        </div>
        <div className="text-right shrink-0">
          {booked && <span className="text-[11px] text-matcha-400 font-medium">Записана</span>}
          {!booked && waitlisted && <span className="text-[11px] text-gold-400 font-medium">В листе ожидания</span>}
          {!booked && !waitlisted && full && <span className="text-[11px] text-vermillion-400 font-medium">Мест нет</span>}
          {!booked && !waitlisted && !full && (
            <span className="text-[11px] text-ink-400 flex items-center gap-1 justify-end">
              <Users2 size={12} /> {c.capacity - c.booked} мест
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

function ClassDetail({ c, booked, waitlisted, onBook, onWaitlist }) {
  const full = c.booked >= c.capacity
  return (
    <div>
      <FormatTag formatId={c.format} />
      <p className="text-ink-400 text-sm mt-3">Тренер</p>
      <p className="text-ink-50 font-medium mb-3">{c.trainer}</p>
      <p className="text-ink-400 text-sm">Длительность</p>
      <p className="text-ink-50 font-medium mb-3">{c.duration} минут</p>
      <p className="text-ink-400 text-sm">Заполненность</p>
      <p className="text-ink-50 font-medium mb-5">{c.booked} / {c.capacity} {c.waitlist > 0 && `· ${c.waitlist} в листе ожидания`}</p>
      {booked ? (
        <GhostButton onClick={onBook}>Отменить запись</GhostButton>
      ) : full ? (
        <PrimaryButton onClick={onWaitlist}>{waitlisted ? 'Выйти из листа ожидания' : 'Встать в лист ожидания'}</PrimaryButton>
      ) : (
        <PrimaryButton onClick={onBook}>Записаться</PrimaryButton>
      )}
    </div>
  )
}
