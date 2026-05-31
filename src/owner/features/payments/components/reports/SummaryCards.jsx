import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  const items = [
    {
      label: "Reja",
      value: formatMoney(summary.planned),
      bg: "bg-slate-50",
      text: "text-slate-700",
    },
    {
      label: "Yig'ilgan",
      value: formatMoney(summary.collected),
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Qoldiq qarz",
      value: formatMoney(summary.outstanding),
      bg: "bg-rose-50",
      text: "text-rose-500",
    },
    {
      label: "Bajarish",
      value: `${summary.percent}%`,
      bg: "bg-sky-50",
      text: "text-sky-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((it) => (
        <Card key={it.label} className={`${it.bg} border-transparent`}>
          <p className="text-sm text-muted-foreground">{it.label}</p>
          <p className={`text-2xl font-semibold ${it.text}`}>{it.value}</p>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
