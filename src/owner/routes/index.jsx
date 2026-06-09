// Router
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import { GroupsListPage, GroupDetailPage } from "@/owner/features/groups";
import { UsersListPage, UserDetailPage } from "@/owner/features/users";
import { LeadSourcesListPage } from "@/owner/features/leadSources";
import { PaymentMethodsListPage } from "@/owner/features/paymentMethods";
import { DiscountKindsListPage } from "@/owner/features/discountKinds";
import {
  PaymentsListPage,
  InvoiceDetailPage,
} from "@/owner/features/payments";
import { PaymentSettingsPage } from "@/owner/features/paymentSettings";
import {
  AttendanceMarkPage,
  AttendanceDashboardPage,
  AttendanceSettingsPage,
} from "@/owner/features/attendance";
import { TeacherAttendancePage } from "@/owner/features/teacherAttendance";
import { GradesGivePage } from "@/owner/features/grades";
import {
  SalariesListPage,
  SalaryDetailPage,
  SalariesDashboardPage,
  SalarySettingsPage,
} from "@/owner/features/salaries";
import {
  LeadsListPage,
  LeadDetailPage,
  LeadsDashboardPage,
} from "@/owner/features/leads";
import { LeadDirectionsListPage } from "@/owner/features/leadDirections";
import { LeadStatusesListPage } from "@/owner/features/leadStatuses";
import { LeadSettingsPage } from "@/owner/features/leadSettings";
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
import { ExpensesListPage } from "@/owner/features/expenses";
import { ExpenseTypesListPage } from "@/owner/features/expenseTypes";
import { ActivityLogsPage } from "@/owner/features/activityLogs";
import { ProfilePage } from "@/owner/features/profile";
import NotFoundPage from "@/shared/components/ui/feedback/NotFoundPage";

const OwnerRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="dashboard" replace />} />

    {/* Boshqaruv paneli (Bo'lak 9) */}
    <Route path="dashboard" element={<AdminDashboardPage />} />
    <Route path="expenses" element={<ExpensesListPage />} />
    <Route path="expense-types" element={<ExpenseTypesListPage />} />
    <Route path="activity-logs" element={<ActivityLogsPage />} />

    <Route path="groups" element={<GroupsListPage />} />
    <Route path="groups/:id" element={<GroupDetailPage />} />

    <Route path="users" element={<UsersListPage />} />
    <Route path="users/:id" element={<UserDetailPage />} />

    <Route path="lead-sources" element={<LeadSourcesListPage />} />
    <Route path="payment-methods" element={<PaymentMethodsListPage />} />
    <Route path="discount-kinds" element={<DiscountKindsListPage />} />

    <Route path="payments" element={<PaymentsListPage />} />
    <Route path="payments/invoices/:id" element={<InvoiceDetailPage />} />

    {/* Davomat */}
    <Route path="attendance" element={<AttendanceDashboardPage />} />
    <Route path="attendance/mark" element={<AttendanceMarkPage />} />
    <Route path="attendance/teachers" element={<TeacherAttendancePage />} />

    {/* Baholash */}
    <Route path="grades" element={<GradesGivePage />} />

    {/* Maoshlar */}
    <Route path="salaries" element={<SalariesListPage />} />
    <Route path="salaries/dashboard" element={<SalariesDashboardPage />} />
    <Route path="salaries/:id" element={<SalaryDetailPage />} />

    {/* Lidlar (CRM) */}
    <Route path="leads" element={<LeadsListPage />} />
    <Route path="leads/dashboard" element={<LeadsDashboardPage />} />
    <Route path="leads/:id" element={<LeadDetailPage />} />
    <Route path="lead-directions" element={<LeadDirectionsListPage />} />
    <Route path="lead-statuses" element={<LeadStatusesListPage />} />

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

    <Route path="settings/payments" element={<PaymentSettingsPage />} />
    <Route path="settings/attendance" element={<AttendanceSettingsPage />} />
    <Route path="settings/salaries" element={<SalarySettingsPage />} />
    <Route path="settings/leads" element={<LeadSettingsPage />} />

    <Route path="profile" element={<ProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default OwnerRoutes;
