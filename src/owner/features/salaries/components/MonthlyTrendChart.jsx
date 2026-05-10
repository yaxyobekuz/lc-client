import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/salary";

const MonthlyTrendChart = ({ items = [] }) => {
  if (!items.length) {
    return (
      <Card>
        <p className="text-muted-foreground text-sm">Ma'lumot yo'q</p>
      </Card>
    );
  }
  const max = Math.max(1, ...items.map((it) => it.total || 0));

  return (
    <Card className="space-y-3">
      <h3 className="font-semibold">Oyma-oy maoshlar dinamikasi</h3>
      <div className="space-y-2">
        {items.map((it) => {
          const pct = ((it.total || 0) / max) * 100;
          const paidPct = ((it.paid || 0) / max) * 100;
          return (
            <div key={`${it.year}-${it.month}`} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>
                  {MONTH_LABELS[it.month - 1]} {it.year}
                </span>
                <span className="text-muted-foreground">
                  {formatMoney(it.total)} ({it.count})
                </span>
              </div>
              <div className="relative h-3 bg-muted rounded overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-blue-200"
                  style={{ width: `${pct}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 bg-green-500"
                  style={{ width: `${paidPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-blue-200 rounded" /> Hisoblangan
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-green-500 rounded" /> To'langan
        </span>
      </div>
    </Card>
  );
};

export default MonthlyTrendChart;
