import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Users,
  GraduationCap,
  Layers,
  Percent,
  CalendarCheck,
  AlertCircle,
  UserPlus,
  UserMinus,
  Star,
} from "lucide-react";
import AnimatedCounter from "@/shared/components/ui/counter/AnimatedCounter";
import { formatMoney } from "@/shared/utils/formatMoney";
import { cn } from "@/shared/utils/cn";

const StatCard = ({
  icon: Icon,
  label,
  value,
  hint,
  tone = "default",
  isMoney = false,
  suffix = "",
}) => {
  const toneClass = {
    default: "bg-white",
    positive: "bg-emerald-50 border-emerald-200",
    negative: "bg-rose-50 border-rose-200",
    info: "bg-blue-50 border-blue-200",
    warn: "bg-amber-50 border-amber-200",
  }[tone];

  const iconTone = {
    default: "text-zinc-500",
    positive: "text-emerald-600",
    negative: "text-rose-600",
    info: "text-blue-600",
    warn: "text-amber-600",
  }[tone];

  const safeValue =
    typeof value === "number" && Number.isFinite(value) ? value : 0;

  return (
    <div className={cn("border rounded-lg p-4", toneClass)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-zinc-600">{label}</p>
        {Icon && <Icon className={cn("size-4", iconTone)} />}
      </div>
      <p className="text-2xl font-semibold tracking-tight">
        {value === null || value === undefined ? (
          <span className="text-zinc-400">—</span>
        ) : (
          <AnimatedCounter
            value={safeValue}
            formatter={isMoney ? formatMoney : undefined}
            suffix={suffix}
          />
        )}
      </p>
      {hint && <p className="text-xs text-zinc-500 mt-1">{hint}</p>}
    </div>
  );
};

const OverviewStatsCards = ({ data }) => {
  if (!data) return null;

  const profitTone =
    data.netProfit > 0 ? "positive" : data.netProfit < 0 ? "negative" : "default";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        icon={TrendingUp}
        label="Joriy oy daromadi"
        value={data.income}
        isMoney
        tone="positive"
      />
      <StatCard
        icon={TrendingDown}
        label="Joriy oy xarajatlari"
        value={data.expenses}
        isMoney
        tone="negative"
      />
      <StatCard
        icon={Wallet}
        label="Sof foyda"
        value={data.netProfit}
        isMoney
        tone={profitTone}
      />
      <StatCard
        icon={AlertCircle}
        label="Joriy oy qarzdorligi"
        value={data.currentMonthDebt}
        isMoney
        tone="warn"
      />

      <StatCard
        icon={GraduationCap}
        label="O'quvchilar"
        value={data.studentsCount}
      />
      <StatCard
        icon={Users}
        label="O'qituvchilar"
        value={data.teachersCount}
      />
      <StatCard icon={Layers} label="Faol guruhlar" value={data.activeGroupsCount} />
      <StatCard
        icon={Percent}
        label="Lid konversiyasi"
        value={data.leadsConversion?.rate ?? 0}
        suffix="%"
        hint={`${data.leadsConversion?.converted || 0} / ${data.leadsConversion?.total || 0}`}
        tone="info"
      />

      <StatCard
        icon={CalendarCheck}
        label="Bugungi davomat"
        value={data.todayAttendanceRate}
        suffix={data.todayAttendanceRate === null ? "" : "%"}
        tone="info"
      />
      <StatCard
        icon={UserPlus}
        label="Yangi o'quvchilar (oy)"
        value={data.newStudentsThisMonth}
        tone="positive"
      />
      <StatCard
        icon={UserMinus}
        label="Ketgan o'quvchilar (oy)"
        value={data.lostStudentsThisMonth}
        tone="negative"
      />
      <StatCard
        icon={Star}
        label="Mashhur yo'nalish"
        value={data.mostPopularDirection?.studentsCount || 0}
        hint={data.mostPopularDirection?.name || "Ma'lumot yo'q"}
        tone="info"
      />
    </div>
  );
};

export default OverviewStatsCards;
