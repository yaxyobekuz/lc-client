// Router
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import { GroupsListPage, GroupDetailPage } from "@/owner/features/groups";
import { UsersListPage, UserDetailPage } from "@/owner/features/users";
import { ArchiveReasonsPage } from "@/owner/features/archiveReasons";
import {
  LeadsListPage,
  LeadsStatsPage,
  LeadsSettingsPage,
} from "@/owner/features/leads";
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
import {
  FinanceReportPage,
  StudentPaymentsPage,
  StudentPaymentHistoryPage,
  RefundsPage,
  GroupFeesPage,
  GroupFeeDetailPage,
  DiscountsPage,
} from "@/owner/features/finance";
import {
  TeacherSalariesPage,
  TeacherSalaryHistoryPage,
  TeacherObligationsPage,
  SalaryConfigsPage,
} from "@/owner/features/teacherSalary";
import { ProfilePage } from "@/owner/features/profile";
import { StudentStatsPage } from "@/owner/features/studentStats";
import { StudentRetentionPage } from "@/owner/features/studentRetention";
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
    <Route path="students/stats" element={<StudentStatsPage />} />
    <Route path="students/retention" element={<StudentRetentionPage />} />
    <Route path="archive-reasons" element={<ArchiveReasonsPage />} />

    {/* Lidlar (CRM) */}
    <Route path="leads" element={<LeadsListPage />} />
    <Route path="leads/stats" element={<LeadsStatsPage />} />
    <Route path="leads/settings" element={<LeadsSettingsPage />} />

    {/* Davomat */}
    <Route path="attendance" element={<AttendanceDashboardPage />} />
    <Route path="attendance/mark" element={<AttendanceMarkPage />} />
    <Route path="attendance/teachers" element={<TeacherAttendancePage />} />

    {/* Baholash */}
    <Route path="grades" element={<GradesGivePage />} />
    <Route path="rating" element={<RatingPage />} />
    <Route path="settings/rating" element={<RatingSettingsPage />} />

    {/* Aloqa: Notifications + Feedback */}
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

    {/* Moliya */}
    <Route path="finance" element={<FinanceReportPage />} />
    <Route path="finance/student-payments" element={<StudentPaymentsPage />} />
    <Route
      path="finance/student-payments/student/:studentId"
      element={<StudentPaymentHistoryPage />}
    />
    <Route path="finance/refunds" element={<RefundsPage />} />
    <Route path="finance/group-fees" element={<GroupFeesPage />} />
    <Route path="finance/group-fees/:groupId" element={<GroupFeeDetailPage />} />
    <Route path="finance/discounts" element={<DiscountsPage />} />
    <Route path="finance/teacher-salaries" element={<TeacherSalariesPage />} />
    <Route path="finance/salary-configs" element={<SalaryConfigsPage />} />
    <Route
      path="finance/teacher-salaries/teacher/:teacherId"
      element={<TeacherSalaryHistoryPage />}
    />
    <Route path="finance/obligations" element={<TeacherObligationsPage />} />

    <Route path="profile" element={<ProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default OwnerRoutes;
