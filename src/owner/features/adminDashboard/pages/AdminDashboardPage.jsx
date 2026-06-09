import useObjectState from "@/shared/hooks/useObjectState";
import SystemNotificationBell from "@/shared/components/systemNotification/SystemNotificationBell";

import OverviewStatsCards from "../components/OverviewStatsCards";
import StudentFlowChart from "../components/StudentFlowChart";
import WeekdayActivityHeatmap from "../components/WeekdayActivityHeatmap";
import PeriodPicker from "../components/PeriodPicker";

import useOverviewQuery from "../hooks/useOverviewQuery";
import useStudentFlowQuery from "../hooks/useStudentFlowQuery";

const AdminDashboardPage = () => {
  const now = new Date();
  const period = useObjectState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const periodParams = { year: period.year, month: period.month };

  const { data: overview, isLoading: overviewLoading } =
    useOverviewQuery(periodParams);
  const { data: studentFlow } = useStudentFlowQuery({ months: 6 });

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Boshqaruv paneli</h1>
          <p className="text-sm text-muted-foreground">
            Umumiy biznes ko'rsatkichlari va analitika
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SystemNotificationBell />
          <PeriodPicker
            year={period.year}
            month={period.month}
            onChange={(k, v) => period.setField(k, v)}
          />
        </div>
      </header>

      {overviewLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <OverviewStatsCards data={overview} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StudentFlowChart items={studentFlow || []} />
        <WeekdayActivityHeatmap items={overview?.weekdayActivity || []} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
