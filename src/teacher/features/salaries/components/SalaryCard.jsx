import Card from "@/shared/components/ui/card/Card";
import SalaryStatusBadge from "@/shared/components/salary/SalaryStatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/salary";

const SalaryCard = ({ salary, period }) => {
  const monthName = period
    ? `${MONTH_LABELS[period.month - 1]} ${period.year}`
    : salary
      ? `${MONTH_LABELS[salary.period.month - 1]} ${salary.period.year}`
      : "—";

  if (!salary) {
    return (
      <Card className="text-center space-y-2">
        <h2 className="text-lg font-semibold">{monthName}</h2>
        <p className="text-muted-foreground">
          Bu oy uchun maosh hali hisoblanmagan
        </p>
      </Card>
    );
  }

  const remaining = Math.max(
    0,
    (salary.finalAmount || 0) - (salary.paidAmount || 0),
  );

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{monthName}</h2>
        <SalaryStatusBadge status={salary.status} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Hisoblangan</p>
          <p className="font-semibold">{formatMoney(salary.baseAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Yakuniy</p>
          <p className="font-semibold text-blue-600">
            {formatMoney(salary.finalAmount)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">To'langan</p>
          <p className="font-semibold text-green-600">
            {formatMoney(salary.paidAmount)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Qoldiq</p>
          <p className="font-semibold text-amber-600">
            {formatMoney(remaining)}
          </p>
        </div>
      </div>

      {(salary.bonusTotal > 0 ||
        salary.penaltyTotal > 0 ||
        salary.advanceTotal > 0 ||
        salary.deductionTotal > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t text-sm">
          {salary.bonusTotal > 0 && (
            <div>
              <p className="text-xs text-muted-foreground">Bonus</p>
              <p className="text-green-700">
                +{formatMoney(salary.bonusTotal)}
              </p>
            </div>
          )}
          {salary.penaltyTotal > 0 && (
            <div>
              <p className="text-xs text-muted-foreground">Jarima</p>
              <p className="text-red-700">
                −{formatMoney(salary.penaltyTotal)}
              </p>
            </div>
          )}
          {salary.advanceTotal > 0 && (
            <div>
              <p className="text-xs text-muted-foreground">Avans</p>
              <p className="text-amber-700">
                −{formatMoney(salary.advanceTotal)}
              </p>
            </div>
          )}
          {salary.deductionTotal > 0 && (
            <div>
              <p className="text-xs text-muted-foreground">Ushlangan</p>
              <p className="text-orange-700">
                −{formatMoney(salary.deductionTotal)}
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default SalaryCard;
