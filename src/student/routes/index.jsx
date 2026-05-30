// Router
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import { MyGroupPage } from "@/student/features/group";
import { StudentProfilePage } from "@/student/features/profile";
import { MyPaymentsPage } from "@/student/features/payments";
import { MyAttendancePage } from "@/student/features/attendance";
import { MyInboxPage } from "@/student/features/notifications";
import { MyFeedbackPage } from "@/student/features/feedback";
import NotFoundPage from "@/shared/components/ui/feedback/NotFoundPage";

const StudentRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="group" replace />} />
    <Route path="group" element={<MyGroupPage />} />
    <Route path="payments" element={<MyPaymentsPage />} />
    <Route path="attendance" element={<MyAttendancePage />} />
    <Route path="inbox" element={<MyInboxPage />} />
    <Route path="feedback" element={<MyFeedbackPage />} />
    <Route path="profile" element={<StudentProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default StudentRoutes;
