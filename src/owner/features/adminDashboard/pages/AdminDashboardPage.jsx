import useObjectState from "@/shared/hooks/useObjectState";

import OverviewStatsCards from "../components/OverviewStatsCards";
import MonthlyFinancialsChart from "../components/MonthlyFinancialsChart";
import IncomeByDirectionTable from "../components/IncomeByDirectionTable";
import IncomeByTeacherTable from "../components/IncomeByTeacherTable";
import StudentFlowChart from "../components/StudentFlowChart";
import WeekdayActivityHeatmap from "../components/WeekdayActivityHeatmap";
import ForecastCard from "../components/ForecastCard";
import PeriodPicker from "../components/PeriodPicker";

import useOverviewQuery from "../hooks/useOverviewQuery";
import useMonthlyFinancialsQuery from "../hooks/useMonthlyFinancialsQuery";
import useIncomeByDirectionQuery from "../hooks/useIncomeByDirectionQuery";
import useIncomeByTeacherQuery from "../hooks/useIncomeByTeacherQuery";
import useStudentFlowQuery from "../hooks/useStudentFlowQuery";
import useForecastQuery from "../hooks/useForecastQuery";

const AdminDashboardPage = () => {
  const now = new Date();
  const period = useObjectState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const periodParams = { year: period.year, month: period.month };

  const { data: overview, isLoading: overviewLoading } =
    useOverviewQuery(periodParams);
  const { data: monthlyFin } = useMonthlyFinancialsQuery({ months: 6 });
  const { data: incomeDir } = useIncomeByDirectionQuery(periodParams);
  const { data: incomeTeacher } = useIncomeByTeacherQuery(periodParams);
  const { data: studentFlow } = useStudentFlowQuery({ months: 6 });
  const { data: forecast } = useForecastQuery();

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Boshqaruv paneli</h1>
          <p className="text-sm text-muted-foreground">
            Umumiy biznes ko'rsatkichlari va analitika
          </p>
        </div>
        <PeriodPicker
          year={period.year}
          month={period.month}
          onChange={(k, v) => period.setField(k, v)}
        />
      </header>

      {overviewLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <OverviewStatsCards data={overview} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyFinancialsChart items={monthlyFin || []} />
        <StudentFlowChart items={studentFlow || []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IncomeByDirectionTable items={incomeDir || []} />
        <IncomeByTeacherTable items={incomeTeacher || []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeekdayActivityHeatmap items={overview?.weekdayActivity || []} />
        <ForecastCard data={forecast} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
