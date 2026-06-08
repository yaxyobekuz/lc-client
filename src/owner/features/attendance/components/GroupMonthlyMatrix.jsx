import Card from "@/shared/components/ui/card/Card";
import Tooltip from "@/shared/components/ui/tooltip/Tooltip";
import {
  ATTENDANCE_STATUSES,
  STATUS_LABEL,
  STATUS_DOT_CLASS,
  DAY_SHORT,
} from "@/shared/constants/attendance";
import useGroupMonthlyAttendanceQuery from "../hooks/useGroupMonthlyAttendanceQuery";

const bgOf = (status) => STATUS_DOT_CLASS[status] || "bg-slate-300";

const tooltipText = (dateKey, status, cell) => {
  const parts = [`${dateKey} - ${STATUS_LABEL[status]}`];
  if (status === "excused" && cell.reason) parts.push(cell.reason);
  return parts.join(" · ");
};

const Legend = () => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
    {ATTENDANCE_STATUSES.map((s) => (
      <span key={s} className="inline-flex items-center gap-1.5">
        <span className={`block w-3 h-3 rounded-full ${bgOf(s)}`} />
        {STATUS_LABEL[s]}
      </span>
    ))}
    <span className="inline-flex items-center gap-1.5">
      <span className="block w-3 h-3 rounded-sm border border-gray-200" />
      Dars yo'q
    </span>
    <span className="inline-flex items-center gap-1.5">
      <span className="block w-3 h-3 rounded-full border border-dashed border-slate-400 opacity-60" />
      Belgilanmagan
    </span>
    <span className="inline-flex items-center gap-1.5">
      <span className="block w-3 h-3 rounded-sm bg-rose-50 border border-rose-200" />
      Bayram
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
        <table className="w-full table-fixed min-w-[820px] border-separate border-spacing-0 text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 w-44 bg-white border-r border-b border-gray-200 px-3 py-2 text-left whitespace-nowrap">
                O'quvchi
              </th>
              {dates.map((d) => {
                const day = d.dateKey.slice(8);
                const headerCls = d.isHoliday
                  ? "bg-rose-50 text-rose-400"
                  : d.isClassDay
                    ? "bg-white text-gray-700"
                    : "bg-gray-50 text-gray-400";
                return (
                  <th
                    key={d.colKey || d.dateKey}
                    title={
                      d.isHoliday
                        ? "Bayram/dam olish kuni"
                        : d.slot
                          ? `${day}-kun, ${d.startTime}`
                          : undefined
                    }
                    className={`border-b border-gray-200 px-1 py-1 text-center font-medium ${headerCls}`}
                  >
                    <div className="leading-tight">{day}</div>
                    <div className="text-[10px] font-normal opacity-70">
                      {d.slot ? d.startTime : DAY_SHORT[d.dayOfWeek]}
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
                  <td className="sticky left-0 z-10 w-44 bg-white border-r border-b border-gray-200 px-3 py-1.5 truncate">
                    {name || row.student.username || "-"}
                  </td>
                  {dates.map((d) => {
                    const colKey = d.colKey || d.dateKey;
                    const cell = row.cells?.[colKey];
                    if (!d.isClassDay || cell === null || cell === undefined) {
                      return (
                        <td
                          key={colKey}
                          className="border-b border-gray-200 h-7"
                        />
                      );
                    }
                    const displayed = cell.status || cell.defaultStatus;
                    const label = d.slot ? `${d.dateKey} ${d.startTime}` : d.dateKey;
                    if (!displayed) {
                      return (
                        <td
                          key={colKey}
                          className="border-b border-gray-200 h-7"
                        >
                          <span className="block mx-auto w-3 h-3 rounded-full border border-dashed border-slate-400 opacity-60" />
                        </td>
                      );
                    }
                    return (
                      <td
                        key={colKey}
                        className="border-b border-gray-200 h-7"
                      >
                        <Tooltip content={tooltipText(label, displayed, cell)}>
                          <span
                            className={`block mx-auto w-3 h-3 rounded-full ${bgOf(displayed)}`}
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
