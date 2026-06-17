import { TrendingUp, TrendingDown, Scale, TriangleAlert, Wallet } from "lucide-react";
import StatCard from "@/shared/components/ui/card/StatCard";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import useObjectState from "@/shared/hooks/useObjectState";
import { useSalaryReportQuery } from "@/owner/features/teacherSalary";
import MonthPicker from "../components/MonthPicker";
import StatCards from "../components/report/StatCards";
import DailyIncomeChart from "../components/report/DailyIncomeChart";
import GroupsBreakdown from "../components/report/GroupsBreakdown";
import useFinanceReportQuery from "../hooks/useFinanceReportQuery";

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
  const { data: salary } = useSalaryReportQuery({
    year: period.year,
    month: period.month,
  });

  const income = data?.totals?.income || 0;
  const expense = salary?.totals?.expense || 0;
  const net = income - expense;
  const debt = data?.totals?.debt || 0;
  const obligations = salary?.totals?.obligations || 0;

  // O'qituvchi breakdown'larini GroupsBreakdown formatiga moslaymiz (key uchun group)
  const payoutRows = (salary?.teachersByPayout || []).map((t) => ({
    group: t.teacher,
    name: t.name,
    payout: t.payout,
  }));
  const obligationRows = (salary?.teachersByObligation || []).map((t) => ({
    group: t.teacher,
    name: t.name,
    obligation: t.obligation,
  }));

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Statistika & Hisobotlar</h1>
          <p className="text-sm text-muted-foreground">
            Tanlangan oy uchun kirim, chiqim, qarzdorlik va majburiyatlar
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <MonthPicker
            year={period.year}
            month={period.month}
            onChange={({ year, month }) => period.setFields({ year, month })}
          />
        </div>
      </header>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <>
          {/* Umumiy moliyaviy ko'rinish */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard label="Kirim" value={income} isMoney icon={TrendingUp} tone="positive" />
            <StatCard label="Chiqim (maosh)" value={expense} isMoney icon={TrendingDown} tone="warn" />
            <StatCard
              label="Sof"
              value={net}
              isMoney
              icon={Scale}
              tone={net >= 0 ? "positive" : "negative"}
            />
            <StatCard label="Qarzdorlik" value={debt} isMoney icon={TriangleAlert} tone="negative" />
            <StatCard label="Qarzdorliklar" value={obligations} isMoney icon={Wallet} tone="info" />
          </div>

          {/* O'quvchi to'lovlari tafsiloti */}
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
            <GroupsBreakdown
              title="O'qituvchilarga to'langan"
              rows={payoutRows}
              valueKey="payout"
            />
            <GroupsBreakdown
              title="O'qituvchilar majburiyati"
              rows={obligationRows}
              valueKey="obligation"
              tone="negative"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FinanceReportPage;
