import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@/shared/components/ui/badge/Badge";
import { Skeleton } from "@/shared/components/shadcn/skeleton";
import PeriodPicker from "../components/PeriodPicker";
import useCorrelationQuery from "../hooks/useCorrelationQuery";
import { formatMoney } from "@/shared/utils/formatMoney";

const STATUS_LABEL = {
  unpaid: "To'lanmagan",
  partial: "Qisman",
  paid: "To'langan",
  cancelled: "Bekor qilingan",
};

const STATUS_CLASS = {
  unpaid: "bg-red-100 text-red-700",
  partial: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-600",
};

const SKELETON_ROWS = 10;

const CorrelationSkeleton = () => (
  <div className="border rounded-md overflow-hidden bg-white">
    <div className="px-4 py-3 border-b bg-gray-50">
      <Skeleton className="h-5 w-48" />
    </div>
    <div className="p-4 space-y-2">
      {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
        <div key={i} className="grid grid-cols-7 gap-3 items-center py-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

const AttendanceCorrelationPage = () => {
  const now = new Date();
  const [period, setPeriod] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });
  const { data: items = [], isLoading, isFetching } = useCorrelationQuery(period);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Davomat × To'lov</h1>
          <p className="text-sm text-muted-foreground">
            Davomat foizi va to'lov qarzdorligi o'rtasidagi bog'liqlik
          </p>
        </div>
        <PeriodPicker
          year={period.year}
          month={period.month}
          onChange={setPeriod}
        />
      </header>

      {isLoading ? (
        <CorrelationSkeleton />
      ) : items.length === 0 ? (
        <div className="border rounded-md bg-white p-12 text-center">
          <p className="text-muted-foreground">Bu davr uchun ma'lumot yo'q</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden bg-white">
          <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-base">
              {items.length} ta yozuv
            </h2>
            {isFetching && (
              <span className="text-xs text-muted-foreground">Yangilanmoqda...</span>
            )}
          </div>
          <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-gray-50 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-4 py-3 font-semibold">Talaba</th>
                  <th className="px-4 py-3 font-semibold">Guruh</th>
                  <th className="px-4 py-3 font-semibold">Davomat %</th>
                  <th className="px-4 py-3 font-semibold">Hisob</th>
                  <th className="px-4 py-3 font-semibold">To'langan</th>
                  <th className="px-4 py-3 font-semibold">Qarz</th>
                  <th className="px-4 py-3 font-semibold">Holat</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr
                    key={`${it.studentId}-${it.groupId}`}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to={`/owner/users/${it.studentId}`}
                        className="font-medium hover:underline"
                      >
                        {it.firstName} {it.lastName}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{it.groupName}</td>
                    <td className="px-4 py-3 font-medium">
                      <span
                        className={
                          it.attendanceRate !== null && it.attendanceRate < 60
                            ? "text-red-600"
                            : ""
                        }
                      >
                        {it.attendanceRate !== null
                          ? `${it.attendanceRate}%`
                          : "-"}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({it.attended}/{it.totalClasses})
                      </span>
                    </td>
                    <td className="px-4 py-3">{formatMoney(it.invoiced)}</td>
                    <td className="px-4 py-3 text-green-600">
                      {formatMoney(it.paid)}
                    </td>
                    <td className="px-4 py-3 text-red-600 font-medium">
                      {formatMoney(it.debt)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={STATUS_CLASS[it.status] || ""}>
                        {STATUS_LABEL[it.status] || it.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCorrelationPage;
