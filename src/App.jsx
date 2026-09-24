import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { GamificationProvider } from './context/GamificationContext'
import ClientLayout from './layouts/ClientLayout'
import Onboarding from './screens/client/Onboarding'
import Journey from './screens/client/Journey'
import AICoach from './screens/client/AICoach'
import Train from './screens/client/Train'
import Season from './screens/client/Season'
import Community from './screens/client/Community'
import Profile from './screens/client/Profile'
import League from './screens/client/League'
import NotificationsPreview from './screens/client/NotificationsPreview'

import AdminLayout from './layouts/AdminLayout'
import Overview from './screens/admin/Overview'
import Studios from './screens/admin/Studios'
import StudioDetail from './screens/admin/StudioDetail'
import Members from './screens/admin/Members'
import MemberDetail from './screens/admin/MemberDetail'
import AIRetention from './screens/admin/AIRetention'

export default function App() {
  return (
    <AppProvider>
      <GamificationProvider>
        <Routes>
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Onboarding />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/journey/coach" element={<AICoach />} />
            <Route path="/train" element={<Train />} />
            <Route path="/season" element={<Season />} />
            <Route path="/season/league" element={<League />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/notifications" element={<NotificationsPreview />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="studios" element={<Studios />} />
            <Route path="studios/:studioId" element={<StudioDetail />} />
            <Route path="members" element={<Members />} />
            <Route path="members/:memberId" element={<MemberDetail />} />
            <Route path="retention" element={<AIRetention />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GamificationProvider>
    </AppProvider>
  )
}
