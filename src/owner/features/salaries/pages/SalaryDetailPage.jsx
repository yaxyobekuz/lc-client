import { useParams } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import BackLink from "@/shared/components/ui/link/BackLink";
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

  const remaining = Math.max(
    0,
    (salary.finalAmount || 0) - (salary.paidAmount || 0),
  );
  const isCancelled = salary.status === "cancelled";
  const isPaid = salary.status === "paid";
  const canEditAdjustments = !isCancelled && !isPaid;
  const canEditPayouts = !isCancelled;

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <BackLink to="/owner/salaries" />
          <h1 className="text-2xl font-semibold flex items-center gap-3">
            {salary.teacher?.firstName} {salary.teacher?.lastName} -{" "}
            {MONTH_LABELS[salary.period.month - 1]} {salary.period.year}
            <SalaryStatusBadge status={salary.status} />
          </h1>
        </div>
        <SalaryActionsBar salary={salary} />
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card>
          <p className="text-sm text-muted-foreground">Hisoblangan</p>
          <p className="text-xl font-semibold">
            {formatMoney(salary.baseAmount)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Bonus / Jarima</p>
          <p className="text-sm">
            <span className="text-green-600">
              +{formatMoney(salary.bonusTotal)}
            </span>{" "}
            /{" "}
            <span className="text-red-600">
              −{formatMoney(salary.penaltyTotal)}
            </span>
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Avans / Ushlab</p>
          <p className="text-sm">
            <span className="text-amber-600">
              −{formatMoney(salary.advanceTotal)}
            </span>{" "}
            /{" "}
            <span className="text-orange-600">
              −{formatMoney(salary.deductionTotal)}
            </span>
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Yakuniy</p>
          <p className="text-xl font-semibold text-blue-600">
            {formatMoney(salary.finalAmount)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">To'langan / Qoldiq</p>
          <p className="text-sm">
            <span className="text-green-700">
              {formatMoney(salary.paidAmount)}
            </span>{" "}
            /{" "}
            <span className="text-amber-700">{formatMoney(remaining)}</span>
          </p>
        </Card>
      </div>

      <GroupBreakdownTable items={salary.groupBreakdowns || []} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <AdjustmentsList
          salaryId={salary._id}
          items={salary.adjustments || []}
          canEdit={canEditAdjustments}
        />
        <PayoutsList
          salaryId={salary._id}
          items={payouts}
          canEdit={canEditPayouts}
        />
      </div>

      {salary.notes && (
        <Card>
          <p className="text-sm text-muted-foreground">Izoh</p>
          <p>{salary.notes}</p>
        </Card>
      )}

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
