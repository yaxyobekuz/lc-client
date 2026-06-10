import { Plus } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { statusMeta } from "../utils/status";

const StudentPaymentCard = ({ payment }) => {
  const { openModal } = useModal();
  const student = payment.student || {};
  const expected = payment.expectedAmount || 0;
  const paid = payment.paidAmount || 0;
  const remaining = Math.max(0, expected - paid);
  const pct = expected > 0 ? Math.min(100, Math.round((paid / expected) * 100)) : paid > 0 ? 100 : 0;
  const meta = statusMeta(payment.status);

  const barColor =
    payment.status === "paid"
      ? "bg-emerald-500"
      : payment.status === "partial"
        ? "bg-amber-500"
        : "bg-rose-400";

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">
            {student.firstName} {student.lastName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {payment.group?.name}
          </p>
        </div>
        <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {formatMoney(paid)} / {formatMoney(expected)}
          </span>
          <span className="font-medium">{pct}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm">
          {remaining > 0 ? (
            <span className="text-rose-600">Qoldiq: {formatMoney(remaining)}</span>
          ) : (
            <span className="text-emerald-600">To'liq to'langan</span>
          )}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => openModal(MODAL.FINANCE_ADD_PAYMENT, { payment })}
        >
          <Plus className="size-4" />
          To'lov
        </Button>
      </div>
    </Card>
  );
};

export default StudentPaymentCard;
