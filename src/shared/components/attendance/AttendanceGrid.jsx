import { useMemo, useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import AttendanceMarker from "./AttendanceMarker";
import AttendanceLegend from "./AttendanceLegend";
import { formatPhone } from "@/shared/utils/formatPhone";
import {
  ATTENDANCE_STATUSES,
  STATUS_LABEL,
  STATUS_BADGE_CLASS,
  STATUS_EMOJI,
} from "@/shared/constants/attendance";
import { cn } from "@/shared/utils/cn";

const DEFAULT_STATUS = "absent";

// Avval mavjud attendance rowsdan boshlangich qiymatlarni quradi.
// Yangi yozuvlar default ravishda "absent" (Kelmadi) bo'ladi.
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
  return { status: DEFAULT_STATUS, reason: "", lateMinutes: 0 };
};

const isSame = (a, b) =>
  a.status === b.status &&
  String(a.reason || "") === String(b.reason || "") &&
  Number(a.lateMinutes || 0) === Number(b.lateMinutes || 0);

const BULK_ACTIONS = ATTENDANCE_STATUSES.filter(
  // exempt va excused individual tanlash kerakligi uchun bulk'da ko'rsatmaymiz
  (s) => s === "present" || s === "absent" || s === "late",
);

const AttendanceGrid = ({ data, onSubmit, isSubmitting = false }) => {
  const initial = useMemo(() => {
    const map = {};
    for (const r of data?.rows || []) {
      map[String(r.student._id)] = buildInitialRow(r);
    }
    return map;
  }, [data]);
  const [state, setState] = useState(initial);
  // Data o'zgarsa state'ni reset qilamiz — render-time sync (effekt'siz)
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setState(initial);
  }

  if (!data) return null;
  if (!data.isClassDay) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground bg-white">
        Bu kun guruh uchun dars kuni emas.
      </div>
    );
  }
  if ((data.rows || []).length === 0) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground bg-white">
        Bu sanaga active talabalar yo'q.
      </div>
    );
  }

  const dirtyCount = (data.rows || []).reduce((acc, r) => {
    const sid = String(r.student._id);
    return isSame(initial[sid] || {}, state[sid] || {}) ? acc : acc + 1;
  }, 0);

  // Hammasiga bitta status berish
  const setAll = (status) => {
    setState((prev) => {
      const next = { ...prev };
      for (const r of data.rows) {
        const sid = String(r.student._id);
        // exempt default'lar saqlanadi (auto-exempt'ni bekor qilmasin)
        if (r.defaultStatus === "exempt") continue;
        next[sid] = {
          status,
          reason: prev[sid]?.reason || "",
          lateMinutes: status === "late" ? prev[sid]?.lateMinutes || 5 : 0,
        };
      }
      return next;
    });
  };

  const clearAll = () => {
    setState(() => {
      const next = {};
      for (const r of data.rows) {
        next[String(r.student._id)] = { status: "", reason: "", lateMinutes: 0 };
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const items = [];
    for (const r of data.rows) {
      const sid = String(r.student._id);
      const cur = state[sid] || { status: "" };
      if (!cur.status) continue;
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
      {/* Sticky action panel */}
      <div className="sticky top-0 z-20 -mx-1 px-1 py-2 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">
              Hammaga:
            </span>
            {BULK_ACTIONS.map((s) => (
              <button
                key={s}
                type="button"
                disabled={isSubmitting}
                onClick={() => setAll(s)}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-opacity hover:opacity-80 disabled:opacity-50",
                  STATUS_BADGE_CLASS[s],
                )}
              >
                <span>{STATUS_EMOJI[s]}</span>
                <span>{STATUS_LABEL[s]}</span>
              </button>
            ))}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={clearAll}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 text-muted-foreground hover:bg-gray-50 disabled:opacity-50"
            >
              Tozalash
            </button>
          </div>

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
        <div className="mt-2">
          <AttendanceLegend />
        </div>
      </div>

      <div className="border rounded-md overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="text-left bg-gray-50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-semibold w-10">#</th>
              <th className="px-4 py-2.5 font-semibold">Talaba</th>
              <th className="px-4 py-2.5 font-semibold hidden md:table-cell">Telefon</th>
              <th className="px-4 py-2.5 font-semibold">Status / Qo'shimcha</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => {
              const sid = String(r.student._id);
              const cur = state[sid] || {};
              return (
                <tr key={sid} className="border-t hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span>
                        {r.student.firstName} {r.student.lastName}
                      </span>
                      {cur.status && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium",
                            STATUS_BADGE_CLASS[cur.status],
                          )}
                        >
                          {STATUS_EMOJI[cur.status]}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground hidden md:table-cell">
                    {formatPhone(r.student.phone) || "-"}
                  </td>
                  <td className="px-4 py-2.5">
                    <AttendanceMarker
                      value={cur}
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
