import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Pencil,
  Plus,
  Trash2,
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
  InvoicePaymentsModal,
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
import { AttendanceYearHeatmap } from "@/shared/components/attendance";
import useStudentYearAttendanceQuery from "@/owner/features/attendance/hooks/useStudentYearAttendanceQuery";

// Davomatdan ozod tab uchun
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
import useGoBack from "@/shared/hooks/useGoBack";
import useUserDetailQuery from "../hooks/useUserDetailQuery";
import useUserGroupHistoryQuery from "../hooks/useUserGroupHistoryQuery";
import useUserUpdateMutation from "../hooks/useUserUpdateMutation";

import { MODAL } from "@/shared/constants/modals";
import { ROLES, ROLE_LABELS } from "@/shared/constants/roles";
import { LEAVE_STATUS, LEAVE_STATUS_LABELS } from "@/shared/constants/leaveStatus";
import { formatMoney } from "@/shared/utils/formatMoney";
import BackLink from "@/shared/components/ui/link/BackLink";

const PaymentSummaryCard = ({ summary }) => {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-white border rounded-lg p-3">
        <p className="text-xs text-muted-foreground">Joriy qarz</p>
        <p className="text-xl font-semibold text-rose-500">
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
        <p className="text-xs text-muted-foreground">Balans</p>
        <p className="text-xl font-semibold text-sky-600">
          {formatMoney(summary.balance || 0)}
        </p>
      </div>
      <div className="bg-white border rounded-lg p-3">
        <p className="text-xs text-muted-foreground">Ochiq hisoblar</p>
        <p className="text-xl font-semibold text-gray-700">
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
          {summary.attendanceRate !== null ? `${summary.attendanceRate}%` : "-"}
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

const NoGroupNotice = () => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
    <AlertTriangle className="size-5 shrink-0 text-amber-500" />
    <div>
      <p className="font-medium text-amber-800">
        Talaba hech qaysi guruhda emas
      </p>
      <p className="text-amber-700">
        To'lov, chegirma va boshqa amallar uchun avval talabani guruhga qo'shing.
      </p>
    </div>
  </div>
);

const StudentPaymentsTab = ({ studentId, paymentSummary, locked = false }) => {
  const { openModal } = useModal();
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
      {locked && <NoGroupNotice />}
      <PaymentSummaryCard summary={paymentSummary} />

      <div>
        <h3 className="text-base font-semibold mb-2">Hisoblar</h3>
        {invLoading ? (
          <div className="p-4 text-sm text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : (
          <InvoicesTable
            items={invoices?.data || []}
            showStudent={false}
            onRowClick={(inv) =>
              openModal(MODAL.INVOICE_PAYMENTS, { invoice: inv })
            }
            onPay={
              locked
                ? undefined
                : (inv) => openModal(MODAL.PAYMENT_RECORD, { invoice: inv })
            }
          />
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

const StudentDiscountsTab = ({ studentId, groups = [], locked = false }) => {
  const { openModal } = useModal();
  return (
    <div className="space-y-3 pt-3">
      {locked ? (
        <NoGroupNotice />
      ) : (
        <div className="flex justify-end">
          <Button
            onClick={() =>
              openModal(MODAL.DISCOUNT_CREATE, { studentId, groups })
            }
          >
            <Plus className="size-4" />
            Yangi chegirma
          </Button>
        </div>
      )}
      <DiscountsTable studentId={studentId} />
    </div>
  );
};

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

const TeacherSalarySummaryCard = ({ summary }) => {
  if (!summary) return null;
  const cur = summary.currentMonth;
  const last = summary.lastMonth;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card>
        <p className="text-xs text-muted-foreground">Joriy oy yakuniy</p>
        <p className="text-xl font-semibold">
          {cur ? formatMoney(cur.finalAmount) : "-"}
        </p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">Joriy oy to'langan</p>
        <p className="text-xl font-semibold">
          {cur ? formatMoney(cur.paidAmount) : "-"}
        </p>
      </Card>
      <Card>
        <p className="text-xs text-muted-foreground">O'tgan oy</p>
        <p className="text-xl font-semibold">
          {last ? formatMoney(last.finalAmount) : "-"}
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
  const isTeacher = profile?.role === ROLES.TEACHER;

  const { data: historyData, isLoading: historyLoading } =
    useUserGroupHistoryQuery(isStudent ? id : null, { limit: 50 });

  const { mutate: updateUser, isPending: settling } = useUserUpdateMutation();

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

  // Talaba hech qaysi guruhda emas — to'lov/chegirma/ozod amallari bloklanadi
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
            <UserTelegramCard telegram={profile.telegram} />
            {isStudent && (
              <UserActiveGroupsList
                studentId={profile._id}
                activeGroups={profile.activeGroups || []}
                studentDebt={profile.paymentSummary?.currentDebt || 0}
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
      label: "Davomatdan ozod",
      content: (
        <StudentExemptionsTab studentId={profile._id} locked={noActiveGroup} />
      ),
    });
    tabsItems.push({
      value: "payments",
      label: "To'lovlar",
      content: (
        <StudentPaymentsTab
          studentId={profile._id}
          paymentSummary={profile.paymentSummary}
          locked={noActiveGroup}
        />
      ),
    });
    tabsItems.push({
      value: "discounts",
      label: "Chegirmalar",
      content: (
        <StudentDiscountsTab
          studentId={profile._id}
          groups={profile.activeGroups || []}
          locked={noActiveGroup}
        />
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

          {profile.leaveStatus === LEAVE_STATUS.LEFT_UNPAID && (
            <Badge className="bg-red-100 text-red-700">
              {LEAVE_STATUS_LABELS[LEAVE_STATUS.LEFT_UNPAID]}
            </Badge>
          )}
          {profile.leaveStatus === LEAVE_STATUS.LEFT_PAID && (
            <Badge variant="outline" className="text-muted-foreground">
              {LEAVE_STATUS_LABELS[LEAVE_STATUS.LEFT_PAID]}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {profile.leaveStatus === LEAVE_STATUS.LEFT_UNPAID && (
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
              disabled={settling}
              onClick={() =>
                updateUser({
                  id: profile._id,
                  body: { leaveStatus: LEAVE_STATUS.LEFT_PAID },
                })
              }
            >
              <BadgeCheck className="size-4" />
              To'lab chiqdi deb belgilash
            </Button>
          )}
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
          <ModalWrapper
            name={MODAL.INVOICE_PAYMENTS}
            title="To'lov tafsilotlari"
            className="max-w-lg"
          >
            <InvoicePaymentsModal />
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

          {/* Davomatdan ozod modallari */}
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
