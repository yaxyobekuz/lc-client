import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  const items = [
    { label: "Reja", value: formatMoney(summary.planned), color: "text-gray-700" },
    { label: "Yig'ilgan", value: formatMoney(summary.collected), color: "text-green-600" },
    { label: "Qoldiq qarz", value: formatMoney(summary.outstanding), color: "text-red-600" },
    { label: "Bajarish", value: `${summary.percent}%`, color: "text-blue-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((it) => (
        <Card key={it.label}>
          <p className="text-sm text-muted-foreground">{it.label}</p>
          <p className={`text-2xl font-semibold ${it.color}`}>{it.value}</p>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
