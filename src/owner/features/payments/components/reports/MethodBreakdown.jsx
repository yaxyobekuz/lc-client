import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const MethodBreakdown = ({ items = [] }) => {
  const total = items.reduce((s, x) => s + x.amount, 0) || 1;

  return (
    <Card>
      <h3 className="font-semibold mb-3">To'lov usullari taqsimoti</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ma'lumot yo'q</p>
      ) : (
        <div className="space-y-2">
          {items.map((m) => {
            const pct = Math.round((m.amount / total) * 100);
            return (
              <div key={m.methodId || m.methodName} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{m.methodName}</span>
                  <span className="text-muted-foreground">
                    {formatMoney(m.amount)} ({pct}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded">
                  <div
                    className="h-full bg-sky-400 rounded"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default MethodBreakdown;
