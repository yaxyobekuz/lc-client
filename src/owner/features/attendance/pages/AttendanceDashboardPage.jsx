import { useMemo, useState } from "react";
import Card from "@/shared/components/ui/card/Card";
import PeriodPicker from "../components/PeriodPicker";
import LowAttendanceList from "../components/LowAttendanceList";
import TopAbsentList from "../components/TopAbsentList";
import GroupBreakdownTable from "../components/GroupBreakdownTable";
import useDashboardQuery from "../hooks/useDashboardQuery";

const buildRange = (year, month) => {
  const fromDate = new Date(Date.UTC(year, month - 1, 1)).toISOString();
  const toDate = new Date(
    Date.UTC(year, month, 0, 23, 59, 59, 999),
  ).toISOString();
  return { fromDate, toDate };
};

const AttendanceDashboardPage = () => {
  const now = new Date();
  const [period, setPeriod] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });
  const range = useMemo(() => buildRange(period.year, period.month), [period]);
  const { data, isLoading } = useDashboardQuery(range);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Davomat hisoboti</h1>
        <PeriodPicker
          year={period.year}
          month={period.month}
          onChange={setPeriod}
        />
      </header>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : !data ? (
        <div className="p-8 text-center text-muted-foreground">Ma'lumot yo'q</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card>
              <p className="text-sm text-muted-foreground">Umumiy davomat</p>
              <p className="text-2xl font-semibold text-blue-600">
                {data.overallRate !== null ? `${data.overallRate}%` : "—"}
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
        </>
      )}
    </div>
  );
};

export default AttendanceDashboardPage;
