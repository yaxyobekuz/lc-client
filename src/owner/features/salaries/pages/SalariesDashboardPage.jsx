import { useState } from "react";
import PeriodPicker from "../components/PeriodPicker";
import SalaryStatsCards from "../components/SalaryStatsCards";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import TopEarnersList from "../components/TopEarnersList";
import TeacherReportTable from "../components/TeacherReportTable";
import useSalaryDashboardQuery from "../hooks/useSalaryDashboardQuery";
import useSalaryTrendQuery from "../hooks/useSalaryTrendQuery";
import useSalaryTeacherReportQuery from "../hooks/useSalaryTeacherReportQuery";

const SalariesDashboardPage = () => {
  const now = new Date();
  const [period, setPeriod] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const { data: dashboard, isLoading } = useSalaryDashboardQuery(period);
  const { data: trend = [] } = useSalaryTrendQuery({ months: 6 });
  const { data: teacherReport = [] } = useSalaryTeacherReportQuery(period);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Maoshlar hisoboti</h1>
        <PeriodPicker
          year={period.year}
          month={period.month}
          onChange={setPeriod}
        />
      </header>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <SalaryStatsCards data={dashboard} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <MonthlyTrendChart items={trend} />
            <TopEarnersList items={dashboard?.topEarners || []} />
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">O'qituvchilar kesimida</h2>
            <p className="text-xs text-muted-foreground">
              Daromad bo'yicha kamayish tartibida. Qator ustiga bosib batafsil
              oylikni ochish mumkin.
            </p>
            <TeacherReportTable items={teacherReport} />
          </div>
        </>
      )}
    </div>
  );
};

export default SalariesDashboardPage;
