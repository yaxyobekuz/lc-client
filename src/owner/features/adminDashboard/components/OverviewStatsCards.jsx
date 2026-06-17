// Icons
import {
  Users,
  Layers,
  UserPlus,
  UserMinus,
  GraduationCap,
  CalendarCheck,
} from "lucide-react";

// Components
import StatCard from "@/shared/components/ui/card/StatCard";

const OverviewStatsCards = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={GraduationCap}
        label="O'quvchilar"
        value={data.studentsCount}
        hint="Faol o'quvchilar"
        to="/owner/users/students"
      />
      <StatCard
        icon={Users}
        label="O'qituvchilar"
        value={data.teachersCount}
        hint="Faol o'qituvchilar"
        to="/owner/users"
      />
      <StatCard
        icon={Layers}
        label="Faol guruhlar"
        value={data.activeGroupsCount}
        hint="Faol guruhlar ro'yxati"
        to="/owner/groups"
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
        to="/owner/users/students"
      />
      <StatCard
        icon={UserMinus}
        label="Ketgan o'quvchilar (oy)"
        value={data.lostStudentsThisMonth}
        tone="negative"
        hint="Shu oy guruhdan chiqqanlar"
        to="/owner/users/students"
      />
    </div>
  );
};

export default OverviewStatsCards;
