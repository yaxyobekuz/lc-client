import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";

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
import UserEditModal from "../components/UserEditModal";
import UserDeleteModal from "../components/UserDeleteModal";
import GroupRemoveStudentConfirmModal from "../components/GroupRemoveStudentConfirmModal";

// To'lovlar tab uchun
import {
  InvoicesTable,
  PaymentsTable,
  PaymentRecordModal,
  PaymentRefundModal,
  InvoiceCancelModal,
  InvoiceEditModal,
} from "@/owner/features/payments";
import useInvoicesQuery from "@/owner/features/payments/hooks/useInvoicesQuery";
import usePaymentsQuery from "@/owner/features/payments/hooks/usePaymentsQuery";

// Chegirmalar tab uchun
import {
  DiscountsTable,
  DiscountCreateModal,
  DiscountDeleteModal,
} from "@/owner/features/discounts";

// Davomat tab uchun
import { MonthlyAttendanceCalendar } from "@/shared/components/attendance";
import useStudentMonthlyAttendanceQuery from "@/owner/features/attendance/hooks/useStudentMonthlyAttendanceQuery";

// Ozod davrlari tab uchun
import {
  ExemptionsTable,
  ExemptionCreateModal,
  ExemptionDeleteModal,
} from "@/owner/features/attendanceExemptions";

// Maoshlar va stavkalar tablari uchun
import { SalariesTable } from "@/owner/features/salaries";
import useSalariesQuery from "@/owner/features/salaries/hooks/useSalariesQuery";
import {
  RatesTable,
  RateCreateModal,
  RateEditModal,
  RateDeleteModal,
} from "@/owner/features/teacherGroupRates";
import useTeacherGroupRatesQuery from "@/owner/features/teacherGroupRates/hooks/useTeacherGroupRatesQuery";

import useModal from "@/shared/hooks/useModal";
import useUserDetailQuery from "../hooks/useUserDetailQuery";
import useUserGroupHistoryQuery from "../hooks/useUserGroupHistoryQuery";

import { MODAL } from "@/shared/constants/modals";
import { ROLES, ROLE_LABELS } from "@/shared/constants/roles";
import { formatMoney } from "@/shared/utils/formatMoney";
import BackLink from "@/shared/components/ui/link/BackLink";

const PaymentSummaryCard = ({ summary }) => {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="bg-white border rounded-lg p-3">
        <p className="text-xs text-muted-foreground">Joriy qarz</p>
        <p className="text-xl font-semibold text-red-600">
          {formatMoney(summary.currentDebt)}
        </p>
      </div>
      <div className="bg-white border rounded-lg p-3">
        <p className="text-xs text-muted-foreground">Jami to'langan</p>
        <p className="text-xl font-semibold text-green-600">
          {formatMoney(summary.totalPaid)}
        </p>
      </div>
      <div className="bg-white border rounded-lg p-3">
        <p className="text-xs text-muted-foreground">Ochiq hisoblar</p>
        <p className="text-xl font-semibold">
          {summary.openInvoicesCount || 0}
        </p>
      </div>
    </div>
  );
};

const AttendanceSummaryCard = ({ summary }) => {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <Card>
        <p className="text-xs text-muted-foreground">Joriy oy davomati</p>
        <p className="text-xl font-semibold text-blue-600">
          {summary.attendanceRate !== null ? `${summary.attendanceRate}%` : "—"}
        </p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">Jami darslar</p>
        <p className="text-xl font-semibold">{summary.totalClasses}</p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">Keldi</p>
        <p className="text-xl font-semibold text-green-600">
          {summary.present + summary.late}
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

const StudentPaymentsTab = ({ studentId, paymentSummary }) => {
  const { data: invoices, isLoading: invLoading } = useInvoicesQuery({
    studentId,
    limit: 50,
  });
  const { data: payments, isLoading: payLoading } = usePaymentsQuery({
    studentId,
    limit: 50,
  });

  return (
    <div className="space-y-4 pt-3">
      <PaymentSummaryCard summary={paymentSummary} />

      <div>
        <h3 className="text-base font-semibold mb-2">Hisoblar</h3>
        {invLoading ? (
          <div className="p-4 text-sm text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : (
          <InvoicesTable items={invoices?.data || []} showStudent={false} />
        )}
      </div>

      <div>
        <h3 className="text-base font-semibold mb-2">To'lovlar tarixi</h3>
        {payLoading ? (
          <div className="p-4 text-sm text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : (
          <PaymentsTable items={payments?.data || []} showStudent={false} />
        )}
      </div>
    </div>
  );
};

const StudentDiscountsTab = ({ studentId }) => {
  const { openModal } = useModal();
  return (
    <div className="space-y-3 pt-3">
      <div className="flex justify-end">
        <Button onClick={() => openModal(MODAL.DISCOUNT_CREATE, { studentId })}>
          <Plus className="size-4" />
          Yangi chegirma
        </Button>
      </div>
      <DiscountsTable studentId={studentId} />
    </div>
  );
};

const StudentAttendanceTab = ({ studentId, attendanceSummary }) => {
  const now = new Date();
  const [period, setPeriod] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const { data, isLoading } = useStudentMonthlyAttendanceQuery(
    studentId,
    period,
  );

  const goPrev = () =>
    setPeriod((p) => {
      const m = p.month - 1;
      if (m < 1) return { year: p.year - 1, month: 12 };
      return { year: p.year, month: m };
    });
  const goNext = () =>
    setPeriod((p) => {
      const m = p.month + 1;
      if (m > 12) return { year: p.year + 1, month: 1 };
      return { year: p.year, month: m };
    });

  return (
    <div className="space-y-4 pt-3">
      <AttendanceSummaryCard summary={attendanceSummary} />
      <Card>
        {isLoading ? (
          <div className="p-4 text-sm text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : (
          <MonthlyAttendanceCalendar
            data={data}
            year={period.year}
            month={period.month}
            onPrevMonth={goPrev}
            onNextMonth={goNext}
          />
        )}
      </Card>
    </div>
  );
};

const TeacherSalarySummaryCard = ({ summary }) => {
  if (!summary) return null;
  const cur = summary.currentMonth;
  const last = summary.lastMonth;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card>
        <p className="text-xs text-muted-foreground">Joriy oy yakuniy</p>
        <p className="text-xl font-semibold text-blue-600">
          {cur ? formatMoney(cur.finalAmount) : "—"}
        </p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">Joriy oy to'langan</p>
        <p className="text-xl font-semibold text-green-600">
          {cur ? formatMoney(cur.paidAmount) : "—"}
        </p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">O'tgan oy</p>
        <p className="text-xl font-semibold">
          {last ? formatMoney(last.finalAmount) : "—"}
        </p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">Yil bo'yicha</p>
        <p className="text-xl font-semibold">
          {formatMoney(summary.yearTotal)}
        </p>
      </Card>
    </div>
  );
};

const TeacherSalariesTab = ({ teacherId, salarySummary }) => {
  const { data, isLoading } = useSalariesQuery({
    teacherId,
    limit: 50,
  });
  return (
    <div className="space-y-4 pt-3">
      <TeacherSalarySummaryCard summary={salarySummary} />
      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <SalariesTable items={data?.data || []} />
      )}
    </div>
  );
};

const TeacherRatesTab = ({ teacherId }) => {
  const { openModal } = useModal();
  const { data, isLoading } = useTeacherGroupRatesQuery({
    teacherId,
    isActive: true,
    limit: 100,
  });
  return (
    <div className="space-y-3 pt-3">
      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <RatesTable
          items={data?.data || []}
          canEdit
          onAdd={() =>
            openModal(MODAL.TEACHER_GROUP_RATE_CREATE, { teacherId })
          }
        />
      )}
    </div>
  );
};

const StudentExemptionsTab = ({ studentId }) => {
  const { openModal } = useModal();
  return (
    <div className="space-y-3 pt-3">
      <div className="flex justify-end">
        <Button
          onClick={() =>
            openModal(MODAL.ATTENDANCE_EXEMPTION_CREATE, { studentId })
          }
        >
          <Plus className="size-4" />
          Yangi ozod davri
        </Button>
      </div>
      <ExemptionsTable studentId={studentId} />
    </div>
  );
};

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { data: profile, isLoading, isError } = useUserDetailQuery(id);
  const isStudent = profile?.role === ROLES.STUDENT;
  const isTeacher = profile?.role === ROLES.TEACHER;

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
        <Link to="/owner/users" className="text-blue-600 hover:underline">
          Foydalanuvchilar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const tabsItems = [
    {
      value: "profile",
      label: "Profil",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-3">
          <div className="lg:col-span-2 space-y-4">
            <UserProfileCard profile={profile} />
          </div>
          <div className="space-y-4">
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
      value: "exemptions",
      label: "Ozod davrlari",
      content: <StudentExemptionsTab studentId={profile._id} />,
    });
    tabsItems.push({
      value: "payments",
      label: "To'lovlar",
      content: (
        <StudentPaymentsTab
          studentId={profile._id}
          paymentSummary={profile.paymentSummary}
        />
      ),
    });
    tabsItems.push({
      value: "discounts",
      label: "Chegirmalar",
      content: <StudentDiscountsTab studentId={profile._id} />,
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

  if (isTeacher) {
    tabsItems.push({
      value: "salaries",
      label: "Maoshlar",
      content: (
        <TeacherSalariesTab
          teacherId={profile._id}
          salarySummary={profile.salarySummary}
        />
      ),
    });
    tabsItems.push({
      value: "rates",
      label: "Stavkalar",
      content: <TeacherRatesTab teacherId={profile._id} />,
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

          <Badge variant="secondary">
            {ROLE_LABELS[profile.role] || profile.role}
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
            className="text-red-600"
            onClick={() => openModal(MODAL.USER_DELETE, { user: profile })}
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
      <ModalWrapper name={MODAL.USER_DELETE} title="Foydalanuvchini o'chirish">
        <UserDeleteModal />
      </ModalWrapper>

      {/* Guruh modallari */}
      <ModalWrapper
        name={MODAL.GROUP_TRANSFER_STUDENT}
        title="Boshqa guruhga ko'chirish"
      >
        <GroupTransferStudentModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.GROUP_REMOVE_STUDENT}
        title="Talabani guruhdan chiqarish"
      >
        <GroupRemoveStudentConfirmModal />
      </ModalWrapper>

      {/* Student tab modallari */}
      {isStudent && (
        <>
          <ModalWrapper name={MODAL.PAYMENT_RECORD} title="To'lov yozish">
            <PaymentRecordModal />
          </ModalWrapper>
          <ModalWrapper name={MODAL.PAYMENT_REFUND} title="To'lovni qaytarish">
            <PaymentRefundModal />
          </ModalWrapper>
          <ModalWrapper
            name={MODAL.INVOICE_CANCEL}
            title="Hisobni bekor qilish"
          >
            <InvoiceCancelModal />
          </ModalWrapper>
          <ModalWrapper name={MODAL.INVOICE_EDIT} title="Hisobni tahrirlash">
            <InvoiceEditModal />
          </ModalWrapper>

          {/* Chegirma modallari */}
          <ModalWrapper name={MODAL.DISCOUNT_CREATE} title="Yangi chegirma">
            <DiscountCreateModal />
          </ModalWrapper>
          <ModalWrapper
            name={MODAL.DISCOUNT_DELETE}
            title="Chegirmani o'chirish"
          >
            <DiscountDeleteModal />
          </ModalWrapper>

          {/* Ozod davri modallari */}
          <ModalWrapper
            name={MODAL.ATTENDANCE_EXEMPTION_CREATE}
            title="Yangi ozod davri"
          >
            <ExemptionCreateModal />
          </ModalWrapper>
          <ModalWrapper
            name={MODAL.ATTENDANCE_EXEMPTION_DELETE}
            title="Ozod davrini o'chirish"
          >
            <ExemptionDeleteModal />
          </ModalWrapper>
        </>
      )}

      {/* Teacher tab modallari */}
      {isTeacher && (
        <>
          <ModalWrapper
            name={MODAL.TEACHER_GROUP_RATE_CREATE}
            title="Yangi stavka"
          >
            <RateCreateModal />
          </ModalWrapper>
          <ModalWrapper
            name={MODAL.TEACHER_GROUP_RATE_EDIT}
            title="Stavkani tahrirlash"
          >
            <RateEditModal />
          </ModalWrapper>
          <ModalWrapper
            name={MODAL.TEACHER_GROUP_RATE_DELETE}
            title="Stavkani o'chirish"
          >
            <RateDeleteModal />
          </ModalWrapper>
        </>
      )}
    </div>
  );
};

export default UserDetailPage;
