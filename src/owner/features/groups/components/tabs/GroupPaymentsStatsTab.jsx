// State
import { useState } from "react";

// Components
import Card from "@/shared/components/ui/card/Card";
import { PeriodPicker } from "@/owner/features/attendance";
import GroupPaymentsBreakdownTable from "./GroupPaymentsBreakdownTable";

// Hooks
import { useGroupStatsQuery, useInvoicesQuery } from "@/owner/features/payments";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";

const GroupPaymentsStatsTab = ({ groupId }) => {
  const now = new Date();
  const [period, setPeriod] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const { data = [], isLoading } = useGroupStatsQuery(period);
  const stats = data.find((g) => g.groupId === groupId);
  const percent = stats ? Math.min(100, stats.percent) : 0;

  const { data: invoicesRes, isLoading: invoicesLoading } = useInvoicesQuery({
    groupId,
    year: period.year,
    month: period.month,
    limit: 500,
  });
  const invoices = invoicesRes?.data || [];

  return (
    <div className="space-y-4 pt-3">
      <PeriodPicker
        year={period.year}
        month={period.month}
        onChange={setPeriod}
      />

      {isLoading ? (
        <Card>
          <p className="py-6 text-center text-muted-foreground">
            Yuklanmoqda...
          </p>
        </Card>
      ) : !stats ? (
        <Card>
          <p className="py-6 text-center text-muted-foreground">
            Bu oy uchun hisob-kitob mavjud emas
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card>
              <p className="text-xs text-muted-foreground">Rejalashtirilgan</p>
              <p className="text-xl font-semibold">
                {formatMoney(stats.planned)}
              </p>
            </Card>
            <Card>
              <p className="text-xs text-muted-foreground">Yig'ilgan</p>
              <p className="text-xl font-semibold text-green-600">
                {formatMoney(stats.collected)}
              </p>
            </Card>
            <Card>
              <p className="text-xs text-muted-foreground">Qarz</p>
              <p className="text-xl font-semibold text-rose-500">
                {formatMoney(stats.outstanding)}
              </p>
            </Card>
            <Card>
              <p className="text-xs text-muted-foreground">To'lagan talabalar</p>
              <p className="text-xl font-semibold">
                {stats.paidStudents}/{stats.totalStudents}
              </p>
            </Card>
          </div>

          <Card className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Yig'ilish foizi</span>
              <span className="font-semibold">{stats.percent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-400 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </Card>
        </>
      )}

      <div>
        <h3 className="text-base font-semibold mb-2">Talabalar bo'yicha</h3>
        {invoicesLoading ? (
          <Card>
            <p className="py-6 text-center text-muted-foreground">
              Yuklanmoqda...
            </p>
          </Card>
        ) : (
          <GroupPaymentsBreakdownTable items={invoices} />
        )}
      </div>
    </div>
  );
};

export default GroupPaymentsStatsTab;
