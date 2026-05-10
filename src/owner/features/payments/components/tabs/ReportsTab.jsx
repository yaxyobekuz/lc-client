import useObjectState from "@/shared/hooks/useObjectState";
import PeriodPicker from "../PeriodPicker";
import SummaryCards from "../reports/SummaryCards";
import MonthlyTrendChart from "../reports/MonthlyTrendChart";
import MethodBreakdown from "../reports/MethodBreakdown";
import GroupStatsTable from "../reports/GroupStatsTable";
import TopDebtorsTable from "../reports/TopDebtorsTable";
import TopPayersTable from "../reports/TopPayersTable";
import DailyCollectionsCard from "../reports/DailyCollectionsCard";
import {
  useSummaryQuery,
  useGroupStatsQuery,
  useTopDebtorsQuery,
  useTopPayersQuery,
  useMonthlyTrendQuery,
} from "../../hooks/useReportsQueries";

const ReportsTab = () => {
  const now = new Date();
  const filters = useObjectState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const { data: summary } = useSummaryQuery({
    year: filters.year,
    month: filters.month,
  });
  const { data: groupStats = [] } = useGroupStatsQuery({
    year: filters.year,
    month: filters.month,
  });
  const { data: topDebtors = [] } = useTopDebtorsQuery({ limit: 10 });
  const { data: topPayers = [] } = useTopPayersQuery({ limit: 10 });
  const { data: trend = [] } = useMonthlyTrendQuery({ months: 6 });

  return (
    <div className="space-y-4 pt-3">
      <div className="flex items-end gap-3">
        <PeriodPicker
          year={filters.year}
          month={filters.month}
          onChange={(p) => filters.setFields(p)}
        />
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <MonthlyTrendChart items={trend} />
        <MethodBreakdown items={summary?.methodBreakdown || []} />
      </div>

      <GroupStatsTable items={groupStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <TopDebtorsTable items={topDebtors} />
        <TopPayersTable items={topPayers} />
      </div>

      <DailyCollectionsCard />
    </div>
  );
};

export default ReportsTab;
