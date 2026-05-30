import Card from "@/shared/components/ui/card/Card";
import { MONTH_LABELS } from "@/shared/constants/salary";

const StudentFlowChart = ({ items = [] }) => {
  if (!items.length) {
    return (
      <Card title="O'quvchilar oqimi">
        <p className="text-muted-foreground text-sm mt-3">Ma'lumot yo'q</p>
      </Card>
    );
  }

  const max = Math.max(
    1,
    ...items.flatMap((it) => [it.joined || 0, it.left || 0]),
  );

  return (
    <Card title="O'quvchilar oqimi (yangi / ketgan)" className="space-y-3">
      <div className="space-y-3 mt-3">
        {items.map((it) => {
          const joinedPct = ((it.joined || 0) / max) * 100;
          const leftPct = ((it.left || 0) / max) * 100;
          const netTone =
            it.netGrowth > 0
              ? "text-green-600"
              : it.netGrowth < 0
                ? "text-rose-600"
                : "text-zinc-600";
          return (
            <div key={`${it.year}-${it.month}`} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  {MONTH_LABELS[it.month - 1]} {it.year}
                </span>
                <span className={`font-semibold ${netTone}`}>
                  {it.netGrowth > 0 ? "+" : ""}
                  {it.netGrowth}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative h-2 bg-zinc-100 rounded overflow-hidden flex-1">
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500"
                      style={{ width: `${joinedPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-600 w-12 text-right">
                    {it.joined}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-2 bg-zinc-100 rounded overflow-hidden flex-1">
                    <div
                      className="absolute inset-y-0 left-0 bg-rose-500"
                      style={{ width: `${leftPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-600 w-12 text-right">
                    {it.left}
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
          Yangi
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-rose-500 rounded" />
          Ketgan
        </span>
      </div>
    </Card>
  );
};

export default StudentFlowChart;
