import { Sparkles } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/salary";

const ForecastCard = ({ data }) => (
  <Card title="Kelgusi oy prognozi">
    {!data ? (
      <p className="text-muted-foreground text-sm mt-3">
        Ma'lumot yetarli emas (kamida 3 oy kerak)
      </p>
    ) : (
      <div className="space-y-3 mt-3">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Sparkles className="size-4 text-blue-500" />
          So'nggi {data.basedOn} oy o'rtachasi asosida{" "}
          <span className="font-medium">
            {MONTH_LABELS[data.period.month - 1]} {data.period.year}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="border rounded-lg p-3 bg-emerald-50 border-emerald-200">
            <p className="text-xs text-emerald-700 font-medium">Daromad</p>
            <p className="text-lg font-semibold text-emerald-700 mt-1">
              {formatMoney(data.income)}
            </p>
          </div>
          <div className="border rounded-lg p-3 bg-rose-50 border-rose-200">
            <p className="text-xs text-rose-700 font-medium">Xarajat</p>
            <p className="text-lg font-semibold text-rose-700 mt-1">
              {formatMoney(data.expenses)}
            </p>
          </div>
          <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
            <p className="text-xs text-blue-700 font-medium">Sof foyda</p>
            <p className="text-lg font-semibold text-blue-700 mt-1">
              {formatMoney(data.netProfit)}
            </p>
          </div>
        </div>
      </div>
    )}
  </Card>
);

export default ForecastCard;
