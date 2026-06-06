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
        hint="Shu oydagi to'lovlar"
        to="/owner/payments"
      />
      <StatCard
        icon={TrendingDown}
        label="Joriy oy xarajatlari"
        value={data.expenses}
        isMoney
        tone="negative"
        hint="Shu oydagi xarajatlar"
        to="/owner/expenses"
      />
      <StatCard
        icon={Wallet}
        label="Sof foyda"
        value={data.netProfit}
        isMoney
        tone={profitTone}
        hint="Daromad − xarajat"
        to="/owner/payments"
      />
      <StatCard
        icon={AlertCircle}
        label="Joriy oy qarzdorligi"
        value={data.currentMonthDebt}
        isMoney
        tone="warn"
        hint="To'lanmagan hisoblar"
        to="/owner/payments"
      />

      <StatCard
        icon={GraduationCap}
        label="O'quvchilar"
        value={data.studentsCount}
        hint="Faol o'quvchilar"
        to="/owner/users?tab=student"
      />
      <StatCard
        icon={Users}
        label="O'qituvchilar"
        value={data.teachersCount}
        hint="Faol o'qituvchilar"
        to="/owner/users?tab=teacher"
      />
      <StatCard
        icon={Layers}
        label="Faol guruhlar"
        value={data.activeGroupsCount}
        hint="Faol guruhlar ro'yxati"
        to="/owner/groups"
      />
      <StatCard
        icon={Percent}
        label="Lid konversiyasi"
        value={data.leadsConversion?.rate ?? 0}
        suffix="%"
        hint={`${data.leadsConversion?.converted || 0} / ${data.leadsConversion?.total || 0} lid`}
        tone="info"
        to="/owner/leads"
      />

      <StatCard
        icon={CalendarCheck}
        label="Bugungi davomat"
        value={data.todayAttendanceRate}
        suffix={data.todayAttendanceRate === null ? "" : "%"}
        tone="info"
        hint="Bugun belgilangan davomat"
        to="/owner/attendance"
      />
      <StatCard
        icon={UserPlus}
        label="Yangi o'quvchilar (oy)"
        value={data.newStudentsThisMonth}
        tone="positive"
        hint="Shu oy qo'shilganlar"
        to="/owner/users?tab=student"
      />
      <StatCard
        icon={UserMinus}
        label="Ketgan o'quvchilar (oy)"
        value={data.lostStudentsThisMonth}
        tone="negative"
        hint="Shu oy guruhdan chiqqanlar"
        to="/owner/users?tab=student"
      />
      <StatCard
        icon={Star}
        label="Mashhur yo'nalish"
        value={data.mostPopularDirection?.studentsCount || 0}
        hint={data.mostPopularDirection?.name || "Ma'lumot yo'q"}
        tone="info"
        to="/owner/groups"
      />
    </div>
  );
};

export default OverviewStatsCards;
