import { RefreshCw } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import useObjectState from "@/shared/hooks/useObjectState";
import MonthPicker from "../components/MonthPicker";
import StatCards from "../components/report/StatCards";
import DailyIncomeChart from "../components/report/DailyIncomeChart";
import GroupsBreakdown from "../components/report/GroupsBreakdown";
import useFinanceReportQuery from "../hooks/useFinanceReportQuery";
import { useRegenerateMutation } from "../hooks/useFinanceMutations";

const now = new Date();

const FinanceReportPage = () => {
  const period = useObjectState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const { data, isLoading, isError, refetch } = useFinanceReportQuery({
    year: period.year,
    month: period.month,
  });

  const regenerate = useRegenerateMutation();

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Statistika & Hisobotlar</h1>
          <p className="text-sm text-muted-foreground">
            Tanlangan oy uchun kirim, qarzdorlik va chegirmalar
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <MonthPicker
            year={period.year}
            month={period.month}
            onChange={({ year, month }) => period.setFields({ year, month })}
          />
          <Button
            variant="outline"
            disabled={regenerate.isPending}
            onClick={() =>
              regenerate.mutate({ year: period.year, month: period.month })
            }
          >
            <RefreshCw className="size-4" />
            Generatsiya
          </Button>
        </div>
      </header>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <>
          <StatCards totals={data?.totals} byMethod={data?.byMethod} />
          <DailyIncomeChart data={data?.dailyIncome || []} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <GroupsBreakdown
              title="Guruhlar bo'yicha tushum"
              rows={data?.groupsByIncome || []}
              valueKey="income"
            />
            <GroupsBreakdown
              title="Guruhlar bo'yicha qarzdorlik"
              rows={data?.groupsByDebt || []}
              valueKey="debt"
              tone="negative"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FinanceReportPage;
