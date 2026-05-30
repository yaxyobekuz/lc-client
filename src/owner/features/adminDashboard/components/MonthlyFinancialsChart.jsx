import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/salary";

const MonthlyFinancialsChart = ({ items = [] }) => {
  if (!items.length) {
    return (
      <Card title="Oyma-oy moliya">
        <p className="text-muted-foreground text-sm mt-3">Ma'lumot yo'q</p>
      </Card>
    );
  }

  const max = Math.max(
    1,
    ...items.flatMap((it) => [it.income || 0, it.expenses || 0]),
  );

  return (
    <Card title="Oyma-oy moliyaviy ko'rsatkichlar" className="space-y-3">
      <div className="space-y-3 mt-3">
        {items.map((it) => {
          const incomePct = ((it.income || 0) / max) * 100;
          const expensesPct = ((it.expenses || 0) / max) * 100;
          const profitTone =
            it.netProfit > 0
              ? "text-green-600"
              : it.netProfit < 0
                ? "text-rose-600"
                : "text-zinc-600";
          return (
            <div key={`${it.year}-${it.month}`} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  {MONTH_LABELS[it.month - 1]} {it.year}
                </span>
                <span className={`font-semibold ${profitTone}`}>
                  {formatMoney(it.netProfit)}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative h-2 bg-zinc-100 rounded overflow-hidden flex-1">
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500"
                      style={{ width: `${incomePct}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-600 w-32 text-right">
                    {formatMoney(it.income)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-2 bg-zinc-100 rounded overflow-hidden flex-1">
                    <div
                      className="absolute inset-y-0 left-0 bg-rose-500"
                      style={{ width: `${expensesPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-600 w-32 text-right">
                    {formatMoney(it.expenses)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 text-xs text-muted-foreground pt-1">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-green-500 rounded" />
          Daromad
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-rose-500 rounded" />
          Xarajat
        </span>
      </div>
    </Card>
  );
};

export default MonthlyFinancialsChart;
