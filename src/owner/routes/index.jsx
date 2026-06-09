// Router
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import { GroupsListPage, GroupDetailPage } from "@/owner/features/groups";
import { UsersListPage, UserDetailPage } from "@/owner/features/users";
import {
  AttendanceMarkPage,
  AttendanceDashboardPage,
  AttendanceSettingsPage,
} from "@/owner/features/attendance";
import { TeacherAttendancePage } from "@/owner/features/teacherAttendance";
import { GradesGivePage } from "@/owner/features/grades";
import { RatingPage, RatingSettingsPage } from "@/owner/features/rating";
import {
  NotificationsListPage,
  NotificationDetailPage,
  NotificationsDashboardPage,
  MyInboxPage as OwnerInboxPage,
} from "@/owner/features/notifications";
import { NotificationTemplatesListPage } from "@/owner/features/notificationTemplates";
import { HolidaysListPage } from "@/owner/features/holidays";
import {
  FeedbackListPage,
  FeedbackDetailPage,
  FeedbackDashboardPage,
  FeedbackTypesListPage,
} from "@/owner/features/feedback";
import { AdminDashboardPage } from "@/owner/features/adminDashboard";
import { ActivityLogsPage } from "@/owner/features/activityLogs";
import { ProfilePage } from "@/owner/features/profile";
import NotFoundPage from "@/shared/components/ui/feedback/NotFoundPage";

const OwnerRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="dashboard" replace />} />

    {/* Boshqaruv paneli (Bo'lak 9) */}
    <Route path="dashboard" element={<AdminDashboardPage />} />
    <Route path="activity-logs" element={<ActivityLogsPage />} />

    <Route path="groups" element={<GroupsListPage />} />
    <Route path="groups/:id" element={<GroupDetailPage />} />

    <Route path="users" element={<UsersListPage />} />
    <Route path="users/:id" element={<UserDetailPage />} />

    {/* Davomat */}
    <Route path="attendance" element={<AttendanceDashboardPage />} />
    <Route path="attendance/mark" element={<AttendanceMarkPage />} />
    <Route path="attendance/teachers" element={<TeacherAttendancePage />} />

    {/* Baholash */}
    <Route path="grades" element={<GradesGivePage />} />
    <Route path="rating" element={<RatingPage />} />
    <Route path="settings/rating" element={<RatingSettingsPage />} />

    {/* Aloqa: Notifications + Feedback */}
    <Route path="notifications/dashboard" element={<NotificationsDashboardPage />} />
    <Route path="notifications" element={<NotificationsListPage />} />
    <Route path="notifications/:id" element={<NotificationDetailPage />} />
    <Route path="inbox" element={<OwnerInboxPage />} />
    <Route path="notification-templates" element={<NotificationTemplatesListPage />} />
    <Route path="holidays" element={<HolidaysListPage />} />
    <Route path="feedback/dashboard" element={<FeedbackDashboardPage />} />
    <Route path="feedback" element={<FeedbackListPage />} />
    <Route path="feedback/:id" element={<FeedbackDetailPage />} />
    <Route path="feedback-types" element={<FeedbackTypesListPage />} />

    <Route path="settings/attendance" element={<AttendanceSettingsPage />} />

    <Route path="profile" element={<ProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default OwnerRoutes;
