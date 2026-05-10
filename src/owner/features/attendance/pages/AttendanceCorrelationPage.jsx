import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";
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
};

const AttendanceCorrelationPage = () => {
  const now = new Date();
  const [period, setPeriod] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });
  const { data: items = [], isLoading } = useCorrelationQuery(period);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Davomat × To'lov</h1>
        <PeriodPicker
          year={period.year}
          month={period.month}
          onChange={setPeriod}
        />
      </header>

      <Card>
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">Yuklanmoqda...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Bu davr uchun ma'lumot yo'q
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2">Talaba</th>
                  <th className="py-2">Guruh</th>
                  <th className="py-2">Davomat %</th>
                  <th className="py-2">Hisob</th>
                  <th className="py-2">To'langan</th>
                  <th className="py-2">Qarz</th>
                  <th className="py-2">Holat</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr
                    key={`${it.studentId}-${it.groupId}`}
                    className="border-t"
                  >
                    <td className="py-2">
                      <Link
                        to={`/owner/users/${it.studentId}`}
                        className="font-medium hover:underline"
                      >
                        {it.firstName} {it.lastName}
                      </Link>
                    </td>
                    <td className="py-2">{it.groupName}</td>
                    <td className="py-2 font-medium">
                      <span
                        className={
                          it.attendanceRate !== null && it.attendanceRate < 60
                            ? "text-red-600"
                            : ""
                        }
                      >
                        {it.attendanceRate !== null ? `${it.attendanceRate}%` : "—"}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({it.attended}/{it.totalClasses})
                      </span>
                    </td>
                    <td className="py-2">{formatMoney(it.invoiced)}</td>
                    <td className="py-2 text-green-600">
                      {formatMoney(it.paid)}
                    </td>
                    <td className="py-2 text-red-600 font-medium">
                      {formatMoney(it.debt)}
                    </td>
                    <td className="py-2">
                      <Badge className={STATUS_CLASS[it.status] || ""}>
                        {STATUS_LABEL[it.status] || it.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AttendanceCorrelationPage;
