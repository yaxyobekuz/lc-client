// State
import { useState } from "react";

// Components
import Card from "@/shared/components/ui/card/Card";
import {
  PeriodPicker,
  GroupMonthlyMatrix,
  useGroupAttendanceSummaryQuery,
} from "@/owner/features/attendance";

// Utils
import { toDateInput } from "@/shared/utils/formatDate";

const GroupAttendanceStatsTab = ({ groupId }) => {
  const now = new Date();
  const [period, setPeriod] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  // Oyning birinchi va oxirgi kuni
  const fromDate = toDateInput(new Date(period.year, period.month - 1, 1));
  const toDate = toDateInput(new Date(period.year, period.month, 0));

  const { data, isLoading } = useGroupAttendanceSummaryQuery(groupId, {
    fromDate,
    toDate,
  });
  const agg = data?.aggregate;

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
      ) : !agg ? (
        <Card>
          <p className="py-6 text-center text-muted-foreground">
            Ma'lumot yo'q
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <Card>
            <p className="text-xs text-muted-foreground">Davomat</p>
            <p className="text-xl font-semibold text-sky-600">
              {agg.groupRate !== null ? `${agg.groupRate}%` : "-"}
            </p>
          </Card>
          <Card>
            <p className="text-xs text-muted-foreground">Jami darslar</p>
            <p className="text-xl font-semibold text-gray-700">
              {agg.totalClasses}
            </p>
          </Card>
          <Card>
            <p className="text-xs text-muted-foreground">Keldi</p>
            <p className="text-xl font-semibold text-green-600">
              {agg.present + agg.late}
            </p>
          </Card>
          <Card>
            <p className="text-xs text-muted-foreground">Kelmadi</p>
            <p className="text-xl font-semibold text-rose-500">{agg.absent}</p>
          </Card>
          <Card>
            <p className="text-xs text-muted-foreground">Sababli</p>
            <p className="text-xl font-semibold text-amber-500">{agg.excused}</p>
          </Card>
          <Card>
            <p className="text-xs text-muted-foreground">Ozod</p>
            <p className="text-xl font-semibold text-gray-400">{agg.exempt}</p>
          </Card>
        </div>
      )}

      <GroupMonthlyMatrix
        groupId={groupId}
        year={period.year}
        month={period.month}
      />
    </div>
  );
};

export default GroupAttendanceStatsTab;
