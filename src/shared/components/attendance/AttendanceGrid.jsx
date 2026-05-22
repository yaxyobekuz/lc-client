import { useEffect, useMemo, useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import AttendanceMarker from "./AttendanceMarker";
import AttendanceLegend from "./AttendanceLegend";
import { formatPhone } from "@/shared/utils/formatPhone";

// Avval mavjud attendance rowsdan boshlangich qiymatlarni quradi
const buildInitialRow = (row) => {
  const a = row.attendance;
  if (a) {
    return {
      status: a.status,
      reason: a.reason || "",
      lateMinutes: a.lateMinutes || 0,
    };
  }
  if (row.defaultStatus === "exempt") {
    return { status: "exempt", reason: "", lateMinutes: 0 };
  }
  return { status: "", reason: "", lateMinutes: 0 };
};

const isSame = (a, b) =>
  a.status === b.status &&
  String(a.reason || "") === String(b.reason || "") &&
  Number(a.lateMinutes || 0) === Number(b.lateMinutes || 0);

const AttendanceGrid = ({ data, onSubmit, isSubmitting = false }) => {
  // initial → state
  const initial = useMemo(() => {
    const map = {};
    for (const r of data?.rows || []) {
      map[String(r.student._id)] = buildInitialRow(r);
    }
    return map;
  }, [data]);
  const [state, setState] = useState(initial);

  // Data o'zgarsa state yangilanadi
  useEffect(() => {
    setState(initial);
  }, [initial]);

  if (!data) return null;
  if (!data.isClassDay) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Bu kun guruh uchun dars kuni emas.
      </div>
    );
  }
  if ((data.rows || []).length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Bu sanaga active talabalar yo'q.
      </div>
    );
  }

  const dirtyCount = (data.rows || []).reduce((acc, r) => {
    const sid = String(r.student._id);
    return isSame(initial[sid] || {}, state[sid] || {}) ? acc : acc + 1;
  }, 0);

  const handleSubmit = () => {
    const items = [];
    for (const r of data.rows) {
      const sid = String(r.student._id);
      const cur = state[sid] || { status: "" };
      if (!cur.status) continue;
      // O'zgartirilmagan va mavjud yozuvlarni qayta yubormaymiz (kichik optimization)
      if (r.attendance && isSame(initial[sid], cur)) continue;
      items.push({
        studentId: sid,
        status: cur.status,
        reason: cur.reason || "",
        lateMinutes: Number(cur.lateMinutes || 0),
      });
    }
    onSubmit(items);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <AttendanceLegend />
        <div className="flex items-center gap-2">
          {dirtyCount > 0 && (
            <Badge variant="outline" className="text-amber-600">
              {dirtyCount} ta o'zgartirish
            </Badge>
          )}
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </div>

      <div className="border rounded-sm overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className=" text-left">
            <tr>
              <th className="px-4 py-2 font-medium w-10">#</th>
              <th className="px-4 py-2 font-medium">Talaba</th>
              <th className="px-4 py-2 font-medium">Telefon</th>
              <th className="px-4 py-2 font-medium">Status / Qo'shimcha</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => {
              const sid = String(r.student._id);
              return (
                <tr key={sid} className="border-t">
                  <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-2">
                    {r.student.firstName} {r.student.lastName}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {formatPhone(r.student.phone) || "-"}
                  </td>
                  <td className="px-4 py-2">
                    <AttendanceMarker
                      value={state[sid] || {}}
                      onChange={(v) =>
                        setState((prev) => ({ ...prev, [sid]: v }))
                      }
                      disabled={isSubmitting}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceGrid;
