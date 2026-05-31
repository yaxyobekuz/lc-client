import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const MONTH_SHORT = [
  "Yan", "Fev", "Mar", "Apr", "May", "Iyn",
  "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek",
];

const MonthlyTrendChart = ({ items = [] }) => {
  const max = items.reduce((m, x) => Math.max(m, x.planned, x.collected), 0) || 1;

  return (
    <Card>
      <h3 className="font-semibold mb-3">Oyma-oy trend</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ma'lumot yo'q</p>
      ) : (
        <div className="space-y-3">
          {items.map((it) => {
            const plannedW = (it.planned / max) * 100;
            const collectedW = (it.collected / max) * 100;
            return (
              <div key={`${it.period.year}-${it.period.month}`} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {MONTH_SHORT[it.period.month - 1]} {it.period.year}
                  </span>
                  <span className="text-muted-foreground">
                    {formatMoney(it.collected)} / {formatMoney(it.planned)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-slate-100 rounded">
                    <div
                      className="h-full bg-slate-300 rounded"
                      style={{ width: `${plannedW}%` }}
                    />
                  </div>
                  <div className="h-2 bg-slate-100 rounded">
                    <div
                      className="h-full bg-emerald-400 rounded"
                      style={{ width: `${collectedW}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3 pt-3 border-t">
        <span className="flex items-center gap-1">
          <span className="size-3 bg-slate-300 rounded-sm" /> Reja
        </span>
        <span className="flex items-center gap-1">
          <span className="size-3 bg-emerald-400 rounded-sm" /> Yig'ilgan
        </span>
      </div>
    </Card>
  );
};

export default MonthlyTrendChart;
