import SalaryStatusBadge from "@/shared/components/salary/SalaryStatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/salary";

const SalaryHistoryItem = ({ salary }) => {
  const remaining = Math.max(
    0,
    (salary.finalAmount || 0) - (salary.paidAmount || 0),
  );
  return (
    <div className="border rounded-md p-3 space-y-1">
      <div className="flex items-center justify-between">
        <p className="font-medium">
          {MONTH_LABELS[salary.period.month - 1]} {salary.period.year}
        </p>
        <SalaryStatusBadge status={salary.status} />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Yakuniy</span>
        <span className="font-medium">{formatMoney(salary.finalAmount)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">To'langan</span>
        <span className="text-green-700">{formatMoney(salary.paidAmount)}</span>
      </div>
      {remaining > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Qoldiq</span>
          <span className="text-amber-700">{formatMoney(remaining)}</span>
        </div>
      )}
    </div>
  );
};

export default SalaryHistoryItem;
