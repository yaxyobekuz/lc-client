import Card from "@/shared/components/ui/card/Card";
import Tooltip from "@/shared/components/ui/tooltip/Tooltip";
import {
  ATTENDANCE_STATUSES,
  STATUS_LABEL,
  STATUS_BADGE_CLASS,
  DAY_SHORT,
} from "@/shared/constants/attendance";
import useGroupMonthlyAttendanceQuery from "../hooks/useGroupMonthlyAttendanceQuery";

const bgOf = (status) =>
  STATUS_BADGE_CLASS[status]?.split(" ").find((c) => c.startsWith("bg-")) || "bg-gray-300";

const tooltipText = (dateKey, status, cell) => {
  const parts = [`${dateKey} — ${STATUS_LABEL[status]}`];
  if (status === "late" && cell.lateMinutes) parts.push(`${cell.lateMinutes} daq`);
  if (status === "excused" && cell.reason) parts.push(cell.reason);
  return parts.join(" · ");
};

const Legend = () => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
    {ATTENDANCE_STATUSES.map((s) => (
      <span key={s} className="inline-flex items-center gap-1.5">
        <span className={`block w-2.5 h-2.5 rounded-full ${bgOf(s)}`} />
        {STATUS_LABEL[s]}
      </span>
    ))}
    <span className="inline-flex items-center gap-1.5">
      <span className="block w-2.5 h-2.5 bg-gray-200" />
      Dars yo'q
    </span>
    <span className="inline-flex items-center gap-1.5">
      <span className="block w-2.5 h-2.5 rounded-full border border-dashed opacity-40" />
      Belgilanmagan
    </span>
  </div>
);

const GroupMonthlyMatrix = ({ groupId, year, month }) => {
  const { data, isLoading } = useGroupMonthlyAttendanceQuery(groupId, {
    year,
    month,
  });

  if (!groupId) {
    return (
      <Card>
        <p className="py-6 text-center text-muted-foreground">Guruh tanlang</p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <p className="py-6 text-center text-muted-foreground">Yuklanmoqda...</p>
      </Card>
    );
  }

  if (!data || !data.students?.length) {
    return (
      <Card>
        <Legend />
        <p className="py-6 text-center text-muted-foreground mt-3">Ma'lumot yo'q</p>
      </Card>
    );
  }

  const dates = data.dates || [];

  return (
    <Card className="space-y-3">
      <Legend />
      <div className="relative overflow-x-auto">
        <table className="min-w-max border-separate border-spacing-0 text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-white border-r border-b border-gray-200 px-3 py-2 text-left whitespace-nowrap">
                Talaba
              </th>
              {dates.map((d) => {
                const day = d.dateKey.slice(8);
                const headerCls = d.isClassDay
                  ? "bg-white text-gray-700"
                  : "bg-gray-50 text-gray-400";
                return (
                  <th
                    key={d.dateKey}
                    className={`border-b border-gray-200 px-1 py-1 text-center font-medium w-7 ${headerCls}`}
                  >
                    <div className="leading-tight">{day}</div>
                    <div className="text-[10px] font-normal opacity-70">
                      {DAY_SHORT[d.dayOfWeek]}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.students.map((row) => {
              const sid = row.student._id;
              const name = `${row.student.firstName || ""} ${row.student.lastName || ""}`.trim();
              return (
                <tr key={sid}>
                  <td className="sticky left-0 z-10 bg-white border-r border-b border-gray-200 px-3 py-1.5 whitespace-nowrap">
                    {name || row.student.username || "—"}
                  </td>
                  {dates.map((d) => {
                    const cell = row.cells?.[d.dateKey];
                    if (!d.isClassDay || cell === null || cell === undefined) {
                      return (
                        <td
                          key={d.dateKey}
                          className="bg-gray-100/70 border-b border-gray-200 w-7 h-7"
                        />
                      );
                    }
                    const displayed = cell.status || cell.defaultStatus;
                    if (!displayed) {
                      return (
                        <td
                          key={d.dateKey}
                          className="border-b border-gray-200 w-7 h-7"
                        >
                          <span className="block mx-auto w-2.5 h-2.5 rounded-full border border-dashed opacity-40" />
                        </td>
                      );
                    }
                    return (
                      <td
                        key={d.dateKey}
                        className="border-b border-gray-200 w-7 h-7"
                      >
                        <Tooltip content={tooltipText(d.dateKey, displayed, cell)}>
                          <span
                            className={`block mx-auto w-2.5 h-2.5 rounded-full ${bgOf(displayed)}`}
                          />
                        </Tooltip>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default GroupMonthlyMatrix;
