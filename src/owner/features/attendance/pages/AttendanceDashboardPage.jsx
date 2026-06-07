import { useMemo, useState } from "react";
import {
  TrendingUp,
  Users,
  AlertTriangle,
  CalendarDays,
  CalendarX,
} from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import useObjectState from "@/shared/hooks/useObjectState";
import { Skeleton } from "@/shared/components/shadcn/skeleton";
import PeriodPicker from "../components/PeriodPicker";
import GroupPicker from "../components/GroupPicker";
import LowAttendanceList from "../components/LowAttendanceList";
import TopAbsentList from "../components/TopAbsentList";
import GroupBreakdownTable from "../components/GroupBreakdownTable";
import GroupMonthlyMatrix from "../components/GroupMonthlyMatrix";
import useDashboardQuery from "../hooks/useDashboardQuery";

const StatCard = ({ icon: Icon, iconClass, label, value, valueClass = "text-gray-900", hint }) => (
  <Card className="flex items-center gap-3">
    <span className={`grid place-items-center size-10 shrink-0 rounded-lg ${iconClass}`}>
      <Icon className="size-5" />
    </span>
    <div className="min-w-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`text-2xl font-semibold leading-tight ${valueClass}`}>{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
    </div>
  </Card>
);

const DashboardSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-7 w-16" />
          </div>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <Card>
        <Skeleton className="h-5 w-32 mb-3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full mb-2" />
        ))}
      </Card>
      <Card>
        <Skeleton className="h-5 w-32 mb-3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full mb-2" />
        ))}
      </Card>
    </div>
    <GroupBreakdownTable isLoading />
  </div>
);

const buildRange = (year, month) => {
  const fromDate = new Date(Date.UTC(year, month - 1, 1)).toISOString();
  const toDate = new Date(
    Date.UTC(year, month, 0, 23, 59, 59, 999),
  ).toISOString();
  return { fromDate, toDate };
};

const GROUP_BREAKDOWN_LIMIT = 10;

const OverallPanel = ({ year, month }) => {
  const range = useMemo(() => buildRange(year, month), [year, month]);
  const [groupPage, setGroupPage] = useState(1);

  const params = useMemo(
    () => ({ ...range, page: groupPage, limit: GROUP_BREAKDOWN_LIMIT }),
    [range, groupPage],
  );
  const { data, isLoading } = useDashboardQuery(params);

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  if (!data) {
    return (
      <div className="border rounded-md bg-white p-12 text-center">
        <p className="text-muted-foreground">Tanlangan davr uchun davomat ma'lumotlari topilmadi</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard
          icon={TrendingUp}
          iconClass="bg-emerald-50 text-emerald-600"
          label="Umumiy davomat"
          value={data.overallRate !== null ? `${data.overallRate}%` : "-"}
          valueClass="text-emerald-600"
        />
        <StatCard
          icon={Users}
          iconClass="bg-primary/10 text-primary"
          label="O'quvchilar soni"
          value={data.studentsCount || 0}
        />
        <StatCard
          icon={AlertTriangle}
          iconClass="bg-rose-50 text-rose-500"
          label="Past davomatlilar"
          value={data.lowAttendanceStudents?.length || 0}
          valueClass="text-rose-500"
          hint={`${data.threshold}% dan past`}
        />
        <StatCard
          icon={CalendarDays}
          iconClass="bg-slate-100 text-slate-500"
          label="Jami darslar"
          value={data.aggregate?.totalClasses || 0}
        />
        <StatCard
          icon={CalendarX}
          iconClass="bg-amber-50 text-amber-500"
          label="Belgilanmagan"
          value={data.aggregate?.unmarked || 0}
          valueClass="text-amber-600"
          hint="o'qituvchi belgilamagan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <LowAttendanceList
          items={data.lowAttendanceStudents || []}
          threshold={data.threshold}
        />
        <TopAbsentList items={data.topAbsent || []} />
      </div>

      <GroupBreakdownTable
        items={data.groupBreakdown || []}
        meta={data.groupBreakdownMeta}
        page={groupPage}
        onPageChange={setGroupPage}
      />
    </div>
  );
};

const PerGroupPanel = ({ year, month, groupId, onGroupChange }) => (
  <div className="space-y-4">
    <div className="max-w-md">
      <GroupPicker value={groupId} onChange={onGroupChange} />
    </div>
    <GroupMonthlyMatrix groupId={groupId} year={year} month={month} />
  </div>
);

const AttendanceDashboardPage = () => {
  const now = new Date();
  const { year, month, groupId, setField, setFields } = useObjectState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    groupId: "",
  });

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Davomat hisoboti</h1>
        <PeriodPicker
          year={year}
          month={month}
          onChange={({ year: y, month: m }) => setFields({ year: y, month: m })}
        />
      </header>

      <TabsButtons
        items={[
          {
            value: "overall",
            label: "Umumiy",
            content: (
              <OverallPanel key={`overall-${year}-${month}`} year={year} month={month} />
            ),
          },
          {
            value: "perGroup",
            label: "Guruh bo'yicha",
            content: (
              <PerGroupPanel
                year={year}
                month={month}
                groupId={groupId}
                onGroupChange={(v) => setField("groupId", v)}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AttendanceDashboardPage;
