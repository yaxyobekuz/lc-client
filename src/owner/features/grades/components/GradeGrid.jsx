// State
import { useMemo, useState } from "react";

// Components
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import GradePicker from "./GradePicker";

// Utils
import { formatPhone } from "@/shared/utils/formatPhone";

// data: { rows: [{ student, grade }], isClassDay }, onSubmit(items), isSubmitting
const GradeGrid = ({ data, onSubmit, isSubmitting }) => {
  // Server ma'lumotidan boshlang'ich ballar (student._id -> value|null)
  const initial = useMemo(() => {
    const init = {};
    for (const r of data?.rows || []) {
      init[String(r.student._id)] = r.grade ? r.grade.value : null;
    }
    return init;
  }, [data]);

  // Render paytida hosil qilingan state'ni "reset on change" bilan boshqaramiz
  // (effect ichida setState chaqirmaslik — React tavsiyasi).
  const [state, setState] = useState(initial);
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setState(initial);
  }

  if (!data) return null;

  const rows = data.rows || [];
  if (rows.length === 0) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground bg-white">
        Bu sanaga aktiv o'quvchilar yo'q.
      </div>
    );
  }

  const locked = !data.isClassDay;

  // O'zgargan (saqlanadigan) ballar soni
  const dirtyCount = rows.reduce((acc, r) => {
    const sid = String(r.student._id);
    const orig = r.grade ? r.grade.value : null;
    return state[sid] !== orig ? acc + 1 : acc;
  }, 0);

  const setAll = (n) => {
    setState((prev) => {
      const next = { ...prev };
      for (const r of rows) next[String(r.student._id)] = n;
      return next;
    });
  };

  const handleSubmit = () => {
    const items = [];
    for (const r of rows) {
      const sid = String(r.student._id);
      const val = state[sid];
      if (val == null) continue; // ball qo'yilmagan — yubormaymiz
      const orig = r.grade ? r.grade.value : null;
      if (val === orig) continue; // o'zgarmagan
      items.push({ studentId: sid, value: val });
    }
    if (items.length === 0) return;
    onSubmit(items);
  };

  return (
    <div className="space-y-3">
      {!data.isClassDay && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
          Bu kun guruh jadvalida dars kuni emas. Baho faqat dars kunlari qo'yiladi.
        </div>
      )}

      {/* Action panel */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white/80 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Hammaga:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              disabled={locked || isSubmitting}
              onClick={() => setAll(n)}
              className="size-7 rounded border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {dirtyCount > 0 && (
            <Badge variant="outline" className="text-amber-600">
              {dirtyCount} ta o'zgartirish
            </Badge>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || locked || dirtyCount === 0}
          >
            {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100 rounded-md border bg-white text-sm">
        {rows.map((r, i) => {
          const sid = String(r.student._id);
          return (
            <div
              key={sid}
              className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-5 shrink-0 text-xs text-muted-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {r.student.firstName} {r.student.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPhone(r.student.phone) || "-"}
                  </p>
                </div>
              </div>
              <GradePicker
                value={state[sid] ?? null}
                onChange={(n) => setState((prev) => ({ ...prev, [sid]: n }))}
                disabled={locked || isSubmitting}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GradeGrid;
