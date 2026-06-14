// Icons
import { Gift, AlertTriangle } from "lucide-react";

// Components
import Card from "@/shared/components/ui/card/Card";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";
import { adjustmentScopeLabel } from "../utils/status";

const valueLabel = (a) =>
  a.valueType === "percent" ? `${a.value}%` : formatMoney(a.value);

// Faol bonus va jarima qoidalari ro'yxati (sababi bilan). Bonus - yashil,
// jarima - qizil. Bo'sh bo'lsa karta umuman ko'rinmaydi (page'da shartli).
const AdjustmentsCard = ({ adjustments = [] }) => {
  const bonuses = adjustments.filter((a) => a.kind === "bonus");
  const fines = adjustments.filter((a) => a.kind === "fine");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <AdjustmentList
        title="Bonuslar"
        icon={Gift}
        items={bonuses}
        tone="emerald"
        sign="+"
        emptyText="Faol bonus yo'q"
      />
      <AdjustmentList
        title="Jarimalar"
        icon={AlertTriangle}
        items={fines}
        tone="rose"
        sign="−"
        emptyText="Faol jarima yo'q"
      />
    </div>
  );
};

const AdjustmentList = ({ title, icon: Icon, items, tone, sign, emptyText }) => {
  const accent = tone === "emerald" ? "text-emerald-600" : "text-rose-600";

  return (
    <Card>
      <div className="mb-3 flex items-center gap-2">
        <Icon className={`size-4 ${accent}`} strokeWidth={1.75} />
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {items.length} ta
        </span>
      </div>

      {items.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          {emptyText}
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((a) => (
            <li
              key={a._id}
              className="flex items-start justify-between gap-3 rounded-md border p-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {a.reason || (a.kind === "bonus" ? "Bonus" : "Jarima")}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {a.group?.name || "-"} · {adjustmentScopeLabel(a)}
                </p>
              </div>
              <span className={`shrink-0 text-sm font-semibold tabular-nums ${accent}`}>
                {sign}
                {valueLabel(a)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default AdjustmentsCard;
