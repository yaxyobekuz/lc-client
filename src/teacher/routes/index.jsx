// Router
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import { MyGroupsPage, MyGroupDetailPage } from "@/teacher/features/groups";
import { TeacherProfilePage } from "@/teacher/features/profile";
import {
  TeacherAttendancePage,
  TeacherAttendanceMarkPage,
} from "@/teacher/features/attendance";
import {
  TeacherGradesPage,
  TeacherGradesMarkPage,
} from "@/teacher/features/grades";
import { MySalariesPage } from "@/teacher/features/salaries";
import {
  TeacherNotificationsListPage,
  MyInboxPage,
} from "@/teacher/features/notifications";
import { MyFeedbackPage } from "@/teacher/features/feedback";
import NotFoundPage from "@/shared/components/ui/feedback/NotFoundPage";

const TeacherRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="groups" replace />} />
    <Route path="groups" element={<MyGroupsPage />} />
    <Route path="groups/:id" element={<MyGroupDetailPage />} />
    <Route path="attendance" element={<TeacherAttendancePage />} />
    <Route path="attendance/:groupId" element={<TeacherAttendanceMarkPage />} />
    <Route path="grades" element={<TeacherGradesPage />} />
    <Route path="grades/:groupId" element={<TeacherGradesMarkPage />} />
    <Route path="salaries" element={<MySalariesPage />} />
    <Route path="notifications" element={<TeacherNotificationsListPage />} />
    <Route path="inbox" element={<MyInboxPage />} />
    <Route path="feedback" element={<MyFeedbackPage />} />
    <Route path="profile" element={<TeacherProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default TeacherRoutes;
