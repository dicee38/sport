import TopBar from '../../components/TopBar'
import { Card } from '../../components/ui'
import { NOTIFICATIONS_PREVIEW } from '../../data/gamification'

export default function NotificationsPreview() {
  return (
    <div className="min-h-full flex flex-col">
      <TopBar title="Notifications preview" subtitle="Демо push-уведомлений · не настоящие" onBack={null} />
      <div className="px-5 py-4 flex flex-col gap-3">
        {NOTIFICATIONS_PREVIEW.map((n) => (
          <Card key={n.id} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-ink-800 border border-ink-700 flex items-center justify-center text-lg shrink-0">
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-ink-50 text-sm font-semibold truncate">{n.title}</p>
                <span className="text-ink-500 text-[11px] shrink-0">{n.time}</span>
              </div>
              <p className="text-ink-400 text-xs mt-1 leading-relaxed">{n.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
