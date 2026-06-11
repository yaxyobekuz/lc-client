// React
import { useMemo } from "react";

// Icons
import { CheckCheck } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import { cn } from "@/shared/utils/cn";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";
import { joinMonthKey } from "../utils/months";
import { computeTotals } from "../utils/buildPayload";

const studentName = (r, idx) =>
  r.existingStudentId
    ? r.existingLabel || `O'quvchi ${idx + 1}`
    : `${r.firstName} ${r.lastName}`.trim() || `O'quvchi ${idx + 1}`;

const Step3Payments = ({ students, group, months, payments, onChange }) => {
  const defaultAmount = Number(group.monthlyPrice) || 0;

  const joinKeyByRow = useMemo(() => {
    const map = {};
    for (const r of students) map[r._id] = joinMonthKey(r.joinDate);
    return map;
  }, [students]);

  // Bitta katakni o'rnatadi/tozalaydi. amount=null → tozalash (to'lanmagan).
  const setCell = (rowId, monthKeyVal, amount) => {
    const next = { ...payments };
    const row = { ...(next[rowId] || {}) };
    if (amount == null) {
      delete row[monthKeyVal];
    } else {
      row[monthKeyVal] = { amount, method: row[monthKeyVal]?.method || "cash" };
    }
    next[rowId] = row;
    onChange(next);
  };

  const isEnabled = (rowId, m) => joinKeyByRow[rowId] <= m.key;

  const toggleCell = (rowId, m) => {
    const cur = payments?.[rowId]?.[m.key];
    setCell(rowId, m.key, cur ? null : defaultAmount);
  };

  // ── Bulk amallar ────────────────────────────────────────────────────────────
  const markAll = () => {
    const next = {};
    for (const r of students) {
      const row = {};
      for (const m of months) {
        if (joinKeyByRow[r._id] <= m.key) row[m.key] = { amount: defaultAmount, method: "cash" };
      }
      next[r._id] = row;
    }
    onChange(next);
  };

  const markColumn = (m) => {
    const next = { ...payments };
    for (const r of students) {
      if (joinKeyByRow[r._id] > m.key) continue;
      next[r._id] = { ...(next[r._id] || {}), [m.key]: { amount: defaultAmount, method: "cash" } };
    }
    onChange(next);
  };

  const markRow = (rowId) => {
    const row = {};
    for (const m of months) {
      if (joinKeyByRow[rowId] <= m.key) row[m.key] = { amount: defaultAmount, method: "cash" };
    }
    onChange({ ...payments, [rowId]: row });
  };

  const totals = useMemo(
    () => computeTotals({ group, students, payments }, months),
    [group, students, payments, months],
  );

  if (months.length === 0) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground">
        Avval 1-qadamda boshlanish sanasini tanlang.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={markAll}>
          <CheckCheck className="size-4" /> Hammasini to'langan deb belgilash
        </Button>
        <span className="text-xs text-muted-foreground">
          Katakni bosing → to'langan; summani tahrirlang (qisman to'lov uchun).
          Standart: {formatMoney(defaultAmount)}.
        </span>
      </div>

      <div className="border rounded-md overflow-x-auto bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="sticky left-0 z-10 bg-gray-50 px-3 py-2 text-left text-xs font-medium text-gray-700 min-w-44">
                O'quvchi
              </th>
              {months.map((m) => (
                <th key={m.key} className="px-2 py-2 text-center min-w-32">
                  <div className="text-xs font-medium text-gray-700">{m.label}</div>
                  <button
                    type="button"
                    onClick={() => markColumn(m)}
                    className="text-[10px] text-blue-600 hover:underline"
                  >
                    ustunni belgilash
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((r, idx) => (
              <tr key={r._id} className="border-b last:border-b-0">
                <td className="sticky left-0 z-10 bg-white px-3 py-2 align-middle">
                  <div className="font-medium text-gray-900 truncate max-w-44">
                    {studentName(r, idx)}
                  </div>
                  <button
                    type="button"
                    onClick={() => markRow(r._id)}
                    className="text-[10px] text-blue-600 hover:underline"
                  >
                    qatorni belgilash
                  </button>
                </td>
                {months.map((m) => {
                  const enabled = isEnabled(r._id, m);
                  const cell = payments?.[r._id]?.[m.key];
                  const paid = !!cell;
                  return (
                    <td key={m.key} className="px-1 py-1 text-center align-middle">
                      {!enabled ? (
                        <div className="h-9 rounded bg-gray-100 text-[10px] text-gray-400 flex items-center justify-center">
                          —
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "flex items-center gap-1 rounded border px-1.5 h-9",
                            paid ? "border-emerald-300 bg-emerald-50" : "border-gray-200",
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={paid}
                            onChange={() => toggleCell(r._id, m)}
                            className="size-4 accent-emerald-600 shrink-0"
                            title="To'langan"
                          />
                          <input
                            type="number"
                            min="0"
                            value={paid ? cell.amount : ""}
                            placeholder={String(defaultAmount)}
                            disabled={!paid}
                            onChange={(e) =>
                              setCell(r._id, m.key, Math.max(0, Number(e.target.value) || 0))
                            }
                            className="w-full bg-transparent text-right text-xs outline-none disabled:text-gray-300"
                          />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Jonli footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Total label="Yig'ilgan" value={totals.collected} tone="emerald" />
        <Total label="Kutilgan (taxminiy)" value={totals.expected} tone="gray" />
        <Total label="Qarz (taxminiy)" value={totals.debt} tone="red" />
      </div>
      <p className="text-xs text-muted-foreground">
        Kutilgan va qarz — taxminiy ko'rsatkich (qo'shilgan oy proratsiyalanadi).
        Aniq raqamlar import yakunida ko'rsatiladi.
      </p>
    </div>
  );
};

const TONE = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  red: "border-red-200 bg-red-50 text-red-800",
  gray: "border-gray-200 bg-gray-50 text-gray-800",
};

const Total = ({ label, value, tone }) => (
  <div className={cn("rounded-md border px-4 py-3", TONE[tone])}>
    <div className="text-xs opacity-80">{label}</div>
    <div className="text-lg font-semibold">{formatMoney(value)}</div>
  </div>
);

export default Step3Payments;
