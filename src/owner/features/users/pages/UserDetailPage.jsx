import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Pencil,
  Plus,
  Trash2,
  Archive,
} from "lucide-react";

import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import Card from "@/shared/components/ui/card/Card";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";

import {
  UserProfileCard,
  UserActiveGroupsList,
  UserTaughtGroupsList,
  UserTelegramCard,
  UserGroupHistoryTable,
} from "@/shared/components/userProfile";

import GroupTransferStudentModal from "@/owner/features/groups/components/modals/GroupTransferStudentModal";
import StudentAddToGroupModal from "@/owner/features/groups/components/modals/StudentAddToGroupModal";
import UserEditModal from "../components/UserEditModal";
import UserDeleteModal from "../components/UserDeleteModal";
import UserPermanentDeleteModal from "../components/UserPermanentDeleteModal";
import UserPasswordModal from "../components/UserPasswordModal";
import UserPasswordCard from "../components/UserPasswordCard";
import GroupRemoveStudentConfirmModal from "../components/GroupRemoveStudentConfirmModal";

// Davomat tab uchun
import { AttendanceYearHeatmap } from "@/shared/components/attendance";
import useStudentYearAttendanceQuery from "@/owner/features/attendance/hooks/useStudentYearAttendanceQuery";

// Baholar tab uchun
import { StudentGradesTab } from "@/owner/features/grades";

// Davomatdan ozod tab uchun
import {
  ExemptionsTable,
  ExemptionCreateModal,
  ExemptionDeleteModal,
} from "@/owner/features/attendanceExemptions";

import useModal from "@/shared/hooks/useModal";
import useGoBack from "@/shared/hooks/useGoBack";
import useUserDetailQuery from "../hooks/useUserDetailQuery";
import useUserGroupHistoryQuery from "../hooks/useUserGroupHistoryQuery";

import { MODAL } from "@/shared/constants/modals";
import { ROLES } from "@/shared/constants/roles";
import { getRoleLabel, hasValidRole } from "@/shared/helpers/role.helpers";
import BackLink from "@/shared/components/ui/link/BackLink";

const AttendanceSummaryCard = ({ summary }) => {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card>
        <p className="text-xs text-muted-foreground">Jami darslar</p>
        <p className="text-xl font-semibold">{summary.totalClasses}</p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">Keldi</p>
        <p className="text-xl font-semibold text-green-600">
          {summary.present}
        </p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">Kelmadi</p>
        <p className="text-xl font-semibold text-red-600">{summary.absent}</p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">Sababli</p>
        <p className="text-xl font-semibold text-amber-600">
          {summary.excused}
        </p>
      </Card>
    </div>
  );
};

const NoGroupNotice = () => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
    <AlertTriangle className="size-5 shrink-0 text-amber-500" />
    <div>
      <p className="font-medium text-amber-800">
        O'quvchi hech qaysi guruhda emas
      </p>
      <p className="text-amber-700">
        To'lov, chegirma va boshqa amallar uchun avval o'quvchini guruhga qo'shing.
      </p>
    </div>
  </div>
);

const StudentAttendanceTab = ({ studentId, attendanceSummary }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());

  const { data, isLoading } = useStudentYearAttendanceQuery(studentId, { year });

  return (
    <div className="space-y-4 pt-3">
      <AttendanceSummaryCard summary={attendanceSummary} />
      <Card>
        {isLoading ? (
          <div className="p-4 text-sm text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : (
          <AttendanceYearHeatmap
            data={data}
            year={year}
            onPrevYear={() => setYear((y) => y - 1)}
            onNextYear={() => setYear((y) => y + 1)}
          />
        )}
      </Card>
    </div>
  );
};

const StudentExemptionsTab = ({ studentId, locked = false }) => {
  const { openModal } = useModal();
  return (
    <div className="space-y-3 pt-3">
      {locked ? (
        <NoGroupNotice />
      ) : (
        <div className="flex justify-end">
          <Button
            onClick={() =>
              openModal(MODAL.ATTENDANCE_EXEMPTION_CREATE, { studentId })
            }
          >
            <Plus className="size-4" />
            Yangi davr
          </Button>
        </div>
      )}
      <ExemptionsTable studentId={studentId} />
    </div>
  );
};

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = useGoBack("/owner/users");
  const { openModal } = useModal();
  const { data: profile, isLoading, isError } = useUserDetailQuery(id);
  const isStudent = profile?.role === ROLES.STUDENT;

  const { data: historyData, isLoading: historyLoading } =
    useUserGroupHistoryQuery(isStudent ? id : null, { limit: 50 });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Yuklanmoqda...
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Foydalanuvchi topilmadi</p>
        <button
          type="button"
          onClick={goBack}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Foydalanuvchilar ro'yxatiga qaytish
        </button>
      </div>
    );
  }

  // O'quvchi hech qaysi guruhda emas - to'lov/chegirma/ozod amallari bloklanadi
  const noActiveGroup = isStudent && (profile.activeGroups?.length ?? 0) === 0;

  const tabsItems = [
    {
      value: "profile",
      label: "Profil",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4 lg:gap-6">
          <div className="lg:col-span-2 space-y-5">
            <UserProfileCard profile={profile} />
          </div>
          <div className="space-y-5">
            <UserPasswordCard user={profile} />
            <UserTelegramCard telegram={profile.telegram} />
            {isStudent && (
              <UserActiveGroupsList
                studentId={profile._id}
                activeGroups={profile.activeGroups || []}
                ownerLinks
              />
            )}
            {profile.role === ROLES.TEACHER && (
              <UserTaughtGroupsList groups={profile.groups || []} ownerLinks />
            )}
          </div>
        </div>
      ),
    },
  ];

  if (isStudent) {
    tabsItems.push({
      value: "attendance",
      label: "Davomat",
      content: (
        <StudentAttendanceTab
          studentId={profile._id}
          attendanceSummary={profile.attendanceSummary}
        />
      ),
    });

    tabsItems.push({
      value: "grades",
      label: "Baholar",
      content: <StudentGradesTab studentId={profile._id} />,
    });

    tabsItems.push({
      value: "exemptions",
      label: "Davomatdan ozod",
      content: (
        <StudentExemptionsTab studentId={profile._id} locked={noActiveGroup} />
      ),
    });
    tabsItems.push({
      value: "history",
      label: "Guruhlar tarixi",
      content: (
        <div className="pt-3">
          <UserGroupHistoryTable
            items={historyData?.data || []}
            isLoading={historyLoading}
          />
        </div>
      ),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <BackLink to="/owner/users" />

          <h1 className="text-2xl font-semibold truncate">
            {profile.firstName} {profile.lastName}
          </h1>

          <Badge
            variant={hasValidRole(profile.role) ? "secondary" : "destructive"}
          >
            {getRoleLabel(profile.role)}
          </Badge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            onClick={() => openModal(MODAL.USER_EDIT, { user: profile })}
          >
            <Pencil className="size-4" />
            Tahrirlash
          </Button>
          <Button
            variant="outline"
            className="text-amber-600"
            onClick={() => openModal(MODAL.USER_DELETE, { user: profile })}
          >
            <Archive className="size-4" />
            Arxivlash
          </Button>
          <Button
            variant="outline"
            className="text-red-600"
            onClick={() => openModal(MODAL.USER_PERMANENT_DELETE, { user: profile })}
          >
            <Trash2 className="size-4" />
            O'chirish
          </Button>
        </div>
      </div>

      <TabsButtons items={tabsItems} />

      {/* Profil modallari */}
      <ModalWrapper
        name={MODAL.USER_EDIT}
        title="Profilni tahrirlash"
        className="max-w-xl"
      >
        <UserEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.USER_DELETE} title="Foydalanuvchini arxivlash">
        <UserDeleteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.USER_PERMANENT_DELETE} title="Butunlay o'chirish">
        <UserPermanentDeleteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.USER_PASSWORD} title="Foydalanuvchi paroli">
        <UserPasswordModal />
      </ModalWrapper>

      {/* Guruh modallari */}
      <ModalWrapper
        name={MODAL.STUDENT_ADD_TO_GROUP}
        title="O'quvchini guruhga qo'shish"
      >
        <StudentAddToGroupModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.GROUP_TRANSFER_STUDENT}
        title="Boshqa guruhga ko'chirish"
      >
        <GroupTransferStudentModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.GROUP_REMOVE_STUDENT}
        title="O'quvchini guruhdan chiqarish"
      >
        <GroupRemoveStudentConfirmModal />
      </ModalWrapper>

      {/* Davomatdan ozod modallari */}
      {isStudent && (
        <>
          <ModalWrapper
            name={MODAL.ATTENDANCE_EXEMPTION_CREATE}
            title="Davomatdan ozod qilish"
          >
            <ExemptionCreateModal />
          </ModalWrapper>
          <ModalWrapper
            name={MODAL.ATTENDANCE_EXEMPTION_DELETE}
            title="Davrni o'chirish"
          >
            <ExemptionDeleteModal />
          </ModalWrapper>
        </>
      )}
    </div>
  );
};

export default UserDetailPage;
