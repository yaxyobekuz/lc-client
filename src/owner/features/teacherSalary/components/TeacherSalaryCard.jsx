import { Plus, Pencil } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { statusMeta, SALARY_TYPE_LABEL } from "../utils/status";

const TeacherSalaryCard = ({ salary }) => {
  const { openModal } = useModal();
  const teacher = salary.teacher || {};
  const expected = salary.expectedAmount || 0;
  const paid = salary.paidAmount || 0;
  const remaining = Math.max(0, expected - paid);
  const pct = expected > 0 ? Math.min(100, Math.round((paid / expected) * 100)) : paid > 0 ? 100 : 0;
  const meta = statusMeta(salary.status);

  const barColor =
    salary.status === "paid"
      ? "bg-emerald-500"
      : salary.status === "partial"
        ? "bg-amber-500"
        : "bg-rose-400";

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">
            {teacher.firstName} {teacher.lastName}
          </p>
          <p className="truncate text-xs text-muted-foreground">{salary.group?.name}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
          <span className="text-[11px] text-muted-foreground">
            {SALARY_TYPE_LABEL[salary.salaryType] || ""}
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
        {salary.proratedFixed > 0 && (
          <span>Fiksa: {formatMoney(salary.proratedFixed)}</span>
        )}
        {salary.percentAmount > 0 && (
          <span>Foiz ({salary.percentRate}%): {formatMoney(salary.percentAmount)}</span>
        )}
        {salary.bonusTotal > 0 && (
          <span className="text-emerald-600">Bonus: +{formatMoney(salary.bonusTotal)}</span>
        )}
        {salary.fineTotal > 0 && (
          <span className="text-rose-600">Jarima: −{formatMoney(salary.fineTotal)}</span>
        )}
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
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => openModal(MODAL.SALARY_EDIT, { salary })}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openModal(MODAL.SALARY_ADD_PAYOUT, { salary })}
          >
            <Plus className="size-4" />
            To'lov
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TeacherSalaryCard;
