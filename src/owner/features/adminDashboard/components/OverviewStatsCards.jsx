// Icons
import {
  Star,
  Users,
  Wallet,
  Layers,
  Percent,
  UserPlus,
  UserMinus,
  TrendingUp,
  AlertCircle,
  TrendingDown,
  GraduationCap,
  CalendarCheck,
} from "lucide-react";

// Components
import StatCard from "@/shared/components/ui/card/StatCard";

const OverviewStatsCards = ({ data }) => {
  if (!data) return null;

  const profitTone =
    data.netProfit > 0
      ? "positive"
      : data.netProfit < 0
        ? "negative"
        : "default";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <StatCard icon={Users} label="O'qituvchilar" value={data.teachersCount} />
      <StatCard
        icon={Layers}
        label="Faol guruhlar"
        value={data.activeGroupsCount}
      />
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
