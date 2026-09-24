import { useNavigate } from 'react-router-dom'
import { Card, SectionTitle } from '../ui'
import { NOTIFICATIONS_PREVIEW } from '../../data/gamification'
import { ChevronRight, Bell } from 'lucide-react'

export default function NotificationsPreviewCard() {
  const navigate = useNavigate()

  return (
    <div>
      <SectionTitle>10. Push-уведомления</SectionTitle>
      <Card onClick={() => navigate('/profile/notifications')} className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center shrink-0">
          <Bell size={17} className="text-ink-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-ink-50 font-medium text-sm">Notifications preview</p>
          <p className="text-ink-400 text-xs mt-0.5">{NOTIFICATIONS_PREVIEW.length} примеров mock push-уведомлений</p>
        </div>
        <ChevronRight className="text-ink-500 shrink-0" size={18} />
      </Card>
    </div>
  )
}
