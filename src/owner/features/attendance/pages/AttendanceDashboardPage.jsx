import { useMemo } from "react";
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

const DashboardSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-16" />
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

const OverallPanel = ({ year, month }) => {
  const range = useMemo(() => buildRange(year, month), [year, month]);
  const { data, isLoading } = useDashboardQuery(range);

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <p className="text-sm text-muted-foreground">Umumiy davomat</p>
          <p className="text-2xl font-semibold text-blue-600">
            {data.overallRate !== null ? `${data.overallRate}%` : "-"}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Talabalar soni</p>
          <p className="text-2xl font-semibold">{data.studentsCount || 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Past davomatlilar</p>
          <p className="text-2xl font-semibold text-red-600">
            {data.lowAttendanceStudents?.length || 0}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {data.threshold}% dan past
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Jami darslar</p>
          <p className="text-2xl font-semibold">
            {data.aggregate?.totalClasses || 0}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <LowAttendanceList
          items={data.lowAttendanceStudents || []}
          threshold={data.threshold}
        />
        <TopAbsentList items={data.topAbsent || []} />
      </div>

      <GroupBreakdownTable items={data.groupBreakdown || []} />
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
            content: <OverallPanel year={year} month={month} />,
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
