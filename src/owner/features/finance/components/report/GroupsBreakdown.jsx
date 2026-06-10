import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

// rows: [{ group, name, income|debt }], valueKey: "income" | "debt"
const GroupsBreakdown = ({ title, rows = [], valueKey, tone = "default" }) => {
  const valueClass = tone === "negative" ? "text-rose-600" : "text-emerald-600";
  return (
    <Card title={title}>
      {rows.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Ma'lumot yo'q
        </p>
      ) : (
        <ul className="mt-3 divide-y">
          {rows.map((r, i) => (
            <li key={r.group} className="flex items-center justify-between gap-2 py-2">
              <span className="flex min-w-0 items-center gap-2">
                <span className="w-5 shrink-0 text-xs text-muted-foreground">
                  {i + 1}.
                </span>
                <span className="truncate text-sm">{r.name}</span>
              </span>
              <span className={`shrink-0 text-sm font-medium ${valueClass}`}>
                {formatMoney(r[valueKey])}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default GroupsBreakdown;
