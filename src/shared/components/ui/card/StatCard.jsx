// Router
import { Link } from "react-router-dom";

// Icons
import { ArrowUpRight } from "lucide-react";

// Utils
import { cn } from "@/shared/utils/cn";
import { formatMoney } from "@/shared/utils/formatMoney";

// Components
import Card from "@/shared/components/ui/card/Card";
import AnimatedCounter from "@/shared/components/ui/counter/AnimatedCounter";

const StatCard = ({
  hint,
  label,
  value,
  icon: Icon,
  suffix = "",
  isMoney = false,
  tone = "default",
  to,
}) => {
  const toneClass = {
    default: "bg-white",
    positive: "bg-green-50 border-green-200",
    negative: "bg-rose-50 border-rose-200",
    info: "bg-blue-50 border-blue-200",
    warn: "bg-amber-50 border-amber-200",
  }[tone];

  const iconTone = {
    default: "text-zinc-500",
    positive: "text-green-600",
    negative: "text-rose-600",
    info: "text-blue-600",
    warn: "text-amber-600",
  }[tone];

  const safeValue =
    typeof value === "number" && Number.isFinite(value) ? value : 0;

  const card = (
    <Card
      className={cn(
        toneClass,
        "h-full",
        to &&
          "group cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40",
      )}
    >
      {/* Top */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-zinc-600">{label}</p>
        {Icon && <Icon className={cn("size-4", iconTone)} />}
      </div>

      <p className="text-2xl font-semibold tracking-tight">
        {value === null || value === undefined ? (
          <span className="text-zinc-400">-</span>
        ) : (
          <AnimatedCounter
            value={safeValue}
            formatter={isMoney ? formatMoney : undefined}
            suffix={suffix}
          />
        )}
      </p>

      {(hint || to) && (
        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
          {hint}
          {to && (
            <ArrowUpRight className="size-3 text-zinc-400 transition group-hover:text-primary" />
          )}
        </p>
      )}
    </Card>
  );

  if (to) {
    return (
      <Link to={to} className="block focus:outline-none">
        {card}
      </Link>
    );
  }
  return card;
};

export default StatCard;
