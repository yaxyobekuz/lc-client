import Card from "@/shared/components/ui/card/Card";
import LeadStatusBadge from "@/shared/components/lead/LeadStatusBadge";
import { MONTH_LABELS } from "@/shared/constants/salary";
import RemindersWidget from "../components/RemindersWidget";
import SourcePerformanceCard from "../components/SourcePerformanceCard";
import {
  useLeadDashboardQuery,
  useSourcePerformanceQuery,
  useTodayRemindersQuery,
  useOverdueRemindersQuery,
} from "../hooks/useLeadDashboardQuery";

const StatusBreakdownCard = ({ items = [] }) => (
  <Card className="space-y-3">
    <h3 className="font-semibold">Statuslar bo'yicha</h3>
    {items.length === 0 ? (
      <p className="text-muted-foreground text-sm">Ma'lumot yo'q</p>
    ) : (
      <ul className="space-y-1">
        {items.map((it) => (
          <li
            key={String(it.status._id)}
            className="flex items-center justify-between gap-2"
          >
            <LeadStatusBadge status={it.status} />
            <span className="text-sm font-medium">{it.count}</span>
          </li>
        ))}
      </ul>
    )}
  </Card>
);

const MonthlyTrendCard = ({ items = [] }) => {
  if (!items.length) return null;
  const max = Math.max(1, ...items.map((it) => it.created || 0));

  return (
    <Card className="space-y-3">
      <h3 className="font-semibold">Oyma-oy yangi lidlar</h3>
      <div className="space-y-2">
        {items.map((it) => {
          const pct = ((it.created || 0) / max) * 100;
          const convPct = ((it.converted || 0) / max) * 100;
          return (
            <div key={`${it.year}-${it.month}`} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>
                  {MONTH_LABELS[it.month - 1]} {it.year}
                </span>
                <span className="text-muted-foreground">
                  {it.created} lid / {it.converted} o'quvchi
                </span>
              </div>
              <div className="relative h-3 bg-muted rounded overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-blue-200"
                  style={{ width: `${pct}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 bg-green-500"
                  style={{ width: `${convPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-blue-200 rounded" /> Yangi
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-green-500 rounded" />{" "}
          O'quvchiga aylangan
        </span>
      </div>
    </Card>
  );
};

const LeadsDashboardPage = () => {
  const { data, isLoading } = useLeadDashboardQuery();
  const { data: sourcePerf = [] } = useSourcePerformanceQuery();
  const { data: todayItems = [] } = useTodayRemindersQuery();
  const { data: overdueItems = [] } = useOverdueRemindersQuery();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Lidlar hisoboti</h1>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card>
              <p className="text-sm text-muted-foreground">Jami lidlar</p>
              <p className="text-2xl font-semibold">{data?.total || 0}</p>
              <p className="text-xs text-muted-foreground">
                Joriy oyda: {data?.newThisMonth || 0}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-muted-foreground">
                Konversiya
              </p>
              <p className="text-2xl font-semibold text-green-600">
                {data?.conversionRate || 0}%
              </p>
              <p className="text-xs text-muted-foreground">
                {data?.totalConverted || 0} o'quvchi
              </p>
            </Card>
            <Card>
              <p className="text-sm text-muted-foreground">
                O'rtacha konversiya
              </p>
              <p className="text-2xl font-semibold">
                {data?.avgConversionDays !== null &&
                data?.avgConversionDays !== undefined
                  ? `${data.avgConversionDays} kun`
                  : "-"}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-muted-foreground">Eslatmalar</p>
              <p className="text-2xl font-semibold">
                <span className="text-blue-600">
                  {data?.todayRemindersCount || 0}
                </span>
                <span className="text-muted-foreground mx-1">/</span>
                <span className="text-red-600">
                  {data?.overdueRemindersCount || 0}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Bugungi / Kechikkan
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <StatusBreakdownCard items={data?.statusBreakdown || []} />
            <MonthlyTrendCard items={data?.monthlyTrend || []} />
          </div>

          <SourcePerformanceCard items={sourcePerf} />

          <RemindersWidget
            todayItems={todayItems}
            overdueItems={overdueItems}
          />
        </>
      )}
    </div>
  );
};

export default LeadsDashboardPage;
