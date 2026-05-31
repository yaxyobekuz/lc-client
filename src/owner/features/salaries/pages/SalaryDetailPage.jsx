import { useParams } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import BackLink from "@/shared/components/ui/link/BackLink";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import SalaryStatusBadge from "@/shared/components/salary/SalaryStatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MODAL } from "@/shared/constants/modals";
import { MONTH_LABELS } from "@/shared/constants/salary";

import SalaryActionsBar from "../components/SalaryActionsBar";
import GroupBreakdownTable from "../components/GroupBreakdownTable";
import AdjustmentsList from "../components/AdjustmentsList";
import PayoutsList from "../components/PayoutsList";

import AdjustmentAddModal from "../components/modals/AdjustmentAddModal";
import AdjustmentRemoveModal from "../components/modals/AdjustmentRemoveModal";
import PayoutAddModal from "../components/modals/PayoutAddModal";
import PayoutRemoveModal from "../components/modals/PayoutRemoveModal";
import RecomputeConfirmModal from "../components/modals/RecomputeConfirmModal";
import ApproveConfirmModal from "../components/modals/ApproveConfirmModal";
import CancelConfirmModal from "../components/modals/CancelConfirmModal";

import useSalaryDetailQuery from "../hooks/useSalaryDetailQuery";
import useSalaryPayoutsQuery from "../hooks/useSalaryPayoutsQuery";

// Bitta qiymatli xulosa katakchasi
const StatCard = ({ label, children }) => (
  <Card>
    <p className="text-xs text-muted-foreground">{label}</p>
    <div className="mt-0.5">{children}</div>
  </Card>
);

const SalarySummary = ({ salary }) => (
  <div className="grid grid-cols-2 gap-3">
    <StatCard label="Hisoblangan">
      <p className="text-xl font-semibold">{formatMoney(salary.baseAmount)}</p>
    </StatCard>
    <StatCard label="Yakuniy">
      <p className="text-xl font-semibold">{formatMoney(salary.finalAmount)}</p>
    </StatCard>
  </div>
);

const SalaryDetailPage = () => {
  const { id } = useParams();
  const { data: salary, isLoading } = useSalaryDetailQuery(id);
  const { data: payouts = [] } = useSalaryPayoutsQuery(id);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
    );
  }
  if (!salary) {
    return (
      <div className="p-8 text-center text-muted-foreground">Topilmadi</div>
    );
  }

  const isCancelled = salary.status === "cancelled";
  const isPaid = salary.status === "paid";
  const canEditAdjustments = !isCancelled && !isPaid;
  const canEditPayouts = !isCancelled;

  const adjustmentsCount = (salary.adjustments || []).length;
  const payoutsCount = payouts.length;

  // Minimal kafolat qo'llanganmi (jami xom summa baseAmount'dan kam bo'lsa)
  const subtotalSum = (salary.groupBreakdowns || []).reduce(
    (acc, b) => acc + (b.subtotal || 0),
    0,
  );
  const minApplied = (salary.baseAmount || 0) > subtotalSum + 1;

  const tabsItems = [
    {
      value: "overview",
      label: "Umumiy",
      content: (
        <div className="space-y-4 pt-3">
          <SalarySummary salary={salary} />
          {minApplied && (
            <p className="text-xs text-amber-700">
              Minimal kafolatli oylik qo'llandi: hisoblangan{" "}
              {formatMoney(subtotalSum)} → {formatMoney(salary.baseAmount)}
            </p>
          )}
          <GroupBreakdownTable items={salary.groupBreakdowns || []} />
          {salary.notes && (
            <Card>
              <p className="text-xs text-muted-foreground">Izoh</p>
              <p className="mt-0.5">{salary.notes}</p>
            </Card>
          )}
        </div>
      ),
    },
    {
      value: "adjustments",
      label: `O'zgartirishlar${adjustmentsCount ? ` (${adjustmentsCount})` : ""}`,
      content: (
        <div className="pt-3">
          <AdjustmentsList
            salaryId={salary._id}
            items={salary.adjustments || []}
            canEdit={canEditAdjustments}
          />
        </div>
      ),
    },
    {
      value: "payouts",
      label: `To'lovlar${payoutsCount ? ` (${payoutsCount})` : ""}`,
      content: (
        <div className="pt-3">
          <PayoutsList
            salaryId={salary._id}
            items={payouts}
            canEdit={canEditPayouts}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap min-w-0">
          <BackLink to="/owner/salaries" />
          <h1 className="text-2xl font-semibold flex items-center gap-3">
            {salary.teacher?.firstName} {salary.teacher?.lastName} -{" "}
            {MONTH_LABELS[salary.period.month - 1]} {salary.period.year}
            <SalaryStatusBadge status={salary.status} />
          </h1>
        </div>
        <SalaryActionsBar salary={salary} />
      </header>

      <TabsButtons items={tabsItems} />

      {/* Modallar */}
      <ModalWrapper
        name={MODAL.SALARY_RECOMPUTE_CONFIRM}
        title="Qayta hisoblash"
      >
        <RecomputeConfirmModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.SALARY_APPROVE_CONFIRM}
        title="Oylikni tasdiqlash"
      >
        <ApproveConfirmModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.SALARY_CANCEL_CONFIRM}
        title="Oylikni bekor qilish"
      >
        <CancelConfirmModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.SALARY_ADJUSTMENT_ADD}
        title="O'zgartirish qo'shish"
      >
        <AdjustmentAddModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.SALARY_ADJUSTMENT_REMOVE_CONFIRM}
        title="O'zgartirishni o'chirish"
      >
        <AdjustmentRemoveModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.SALARY_PAYOUT_ADD} title="To'lab berish">
        <PayoutAddModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.SALARY_PAYOUT_REMOVE_CONFIRM}
        title="To'lovni o'chirish"
      >
        <PayoutRemoveModal />
      </ModalWrapper>
    </div>
  );
};

export default SalaryDetailPage;
