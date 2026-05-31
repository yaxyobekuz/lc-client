import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const SalaryActionsBar = ({ salary }) => {
  const { openModal } = useModal();
  if (!salary) return null;

  const isCancelled = salary.status === "cancelled";
  const isPaid = salary.status === "paid";
  const canRecompute = !isCancelled && !isPaid;
  const canApprove = salary.status === "calculated";
  const canCancel = !isCancelled;
  const canAdjust = !isCancelled && !isPaid;
  // Tasdiqlash shart emas - hisoblangan oylik ham to'g'ridan-to'g'ri to'lanadi
  const canPayout = !isCancelled && !isPaid;

  return (
    <div className="flex flex-wrap gap-2">
      {canRecompute && (
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            openModal(MODAL.SALARY_RECOMPUTE_CONFIRM, { salaryId: salary._id })
          }
        >
          Qayta hisoblash
        </Button>
      )}
      {canApprove && (
        <Button
          size="sm"
          onClick={() =>
            openModal(MODAL.SALARY_APPROVE_CONFIRM, { salaryId: salary._id })
          }
        >
          Tasdiqlash
        </Button>
      )}
      {canAdjust && (
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            openModal(MODAL.SALARY_ADJUSTMENT_ADD, { salaryId: salary._id })
          }
        >
          O'zgartirish qo'shish
        </Button>
      )}
      {canPayout && (
        <Button
          size="sm"
          onClick={() =>
            openModal(MODAL.SALARY_PAYOUT_ADD, {
              salaryId: salary._id,
              remaining: Math.max(
                0,
                (salary.finalAmount || 0) - (salary.paidAmount || 0),
              ),
            })
          }
        >
          To'lab berish
        </Button>
      )}
      {canCancel && (
        <Button
          size="sm"
          variant="danger"
          onClick={() =>
            openModal(MODAL.SALARY_CANCEL_CONFIRM, { salaryId: salary._id })
          }
        >
          Bekor qilish
        </Button>
      )}
    </div>
  );
};

export default SalaryActionsBar;
