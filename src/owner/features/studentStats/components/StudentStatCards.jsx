// Icons
import { GraduationCap, Clock, UserPlus, Layers } from "lucide-react";

// Components
import StatCard from "@/shared/components/ui/card/StatCard";

// O'rtacha davomiylikni (oyda) "1 yil 3 oy" ko'rinishida.
const formatAvgDuration = (months) => {
  if (!months || months <= 0) return "0 oy";
  const y = Math.floor(months / 12);
  const m = Math.round(months - y * 12);
  const parts = [];
  if (y > 0) parts.push(`${y} yil`);
  if (m > 0) parts.push(`${m} oy`);
  return parts.join(" ") || "0 oy";
};

const StudentStatCards = ({ data }) => {
  if (!data) return null;

  // Joriy oyda qo'shilganlar (trendning oxirgi elementi).
  const trend = data.enrollmentTrend || [];
  const thisMonth = trend.length ? trend[trend.length - 1].count : 0;

  // Eng katta kohorta (ko'pchilik qancha vaqt o'qiydi).
  const cohorts = data.cohorts || [];
  const topCohort = cohorts.reduce(
    (best, c) => (c.count > (best?.count ?? -1) ? c : best),
    null,
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={GraduationCap}
        label="Faol o'quvchilar"
        value={data.activeCount}
        hint="Jami faol o'quvchilar"
        to="/owner/users/students"
      />
      <StatCard
        icon={UserPlus}
        label="Yangi (shu oy)"
        value={thisMonth}
        tone="positive"
        hint="Shu oy ro'yxatga olinganlar"
      />
      <StatCard
        icon={Clock}
        label="O'rtacha o'qish muddati"
        value={data.avgDurationMonths}
        suffix=" oy"
        tone="info"
        hint={formatAvgDuration(data.avgDurationMonths)}
      />
      <StatCard
        icon={Layers}
        label="Ko'pchilik muddati"
        value={topCohort?.count ?? 0}
        tone="default"
        hint={topCohort ? `${topCohort.label} o'qiganlar` : "-"}
      />
    </div>
  );
};

export default StudentStatCards;
