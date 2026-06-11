// React
import { useMemo, useRef } from "react";

// Icons
import { Plus, Trash2, ClipboardPaste, Link2, X } from "lucide-react";

// Sonner
import { toast } from "sonner";

// Components
import Button from "@/shared/components/ui/button/Button";
import { cn } from "@/shared/utils/cn";

// Utils
import {
  emptyRow,
  makeRows,
  parseClipboardTSV,
  canonicalPhone,
  validateRow,
} from "../utils/students";

// Tahrirlanadigan ustunlar (Tab/Enter navigatsiyasi shu tartibda).
const COLS = [
  { key: "firstName", label: "Ism", w: "min-w-32" },
  { key: "lastName", label: "Familiya", w: "min-w-32" },
  { key: "phone", label: "Telefon", w: "min-w-36" },
  { key: "username", label: "Username", w: "min-w-32" },
  { key: "password", label: "Parol", w: "min-w-28" },
  { key: "joinDate", label: "Qo'shilgan sana", w: "min-w-40", type: "date" },
  { key: "priceOverride", label: "Individual narx", w: "min-w-32", type: "number" },
];

const Step2Students = ({ students, group, onChange }) => {
  const gridRef = useRef(null);

  // Dublikat hisoblash (telefon + username) - inline ogohlantirish uchun.
  const { phoneCount, unameCount } = useMemo(() => {
    const p = new Map();
    const u = new Map();
    for (const r of students) {
      if (r.existingStudentId) continue;
      const cp = canonicalPhone(r.phone);
      if (cp) p.set(cp, (p.get(cp) || 0) + 1);
      const cu = r.username?.trim().toLowerCase();
      if (cu) u.set(cu, (u.get(cu) || 0) + 1);
    }
    return { phoneCount: p, unameCount: u };
  }, [students]);

  const startKey = useMemo(() => {
    if (!group.startDate) return null;
    const d = new Date(group.startDate);
    return d.getFullYear() * 12 + d.getMonth();
  }, [group.startDate]);

  const update = (rowIdx, key, value) => {
    const next = students.map((r, i) => (i === rowIdx ? { ...r, [key]: value } : r));
    onChange(next);
  };

  const addRows = (count) => {
    onChange([...students, ...makeRows(count, group.startDate || "")]);
  };

  const removeRow = (rowIdx) => {
    onChange(students.filter((_, i) => i !== rowIdx));
  };

  const unlinkRow = (rowIdx) => {
    update(rowIdx, "existingStudentId", null);
    const next = students.map((r, i) =>
      i === rowIdx ? { ...r, existingStudentId: null, existingLabel: "" } : r,
    );
    onChange(next);
  };

  // ── Klaviatura navigatsiyasi: Enter → pastga, Tab → o'ngga (default) ─────────
  const focusCell = (rowIdx, colIdx) => {
    const sel = `[data-cell="${rowIdx}-${colIdx}"]`;
    const el = gridRef.current?.querySelector(sel);
    if (el) {
      el.focus();
      el.select?.();
    }
  };

  const handleKeyDown = (e, rowIdx, colIdx) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (rowIdx === students.length - 1) {
        addRows(1);
        // Yangi qator qo'shilgach, keyingi renderdan so'ng fokus.
        setTimeout(() => focusCell(rowIdx + 1, colIdx), 0);
      } else {
        focusCell(rowIdx + 1, colIdx);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      focusCell(Math.min(students.length - 1, rowIdx + 1), colIdx);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusCell(Math.max(0, rowIdx - 1), colIdx);
    }
  };

  // Excel/Sheets'dan paste: birinchi katakka tab bo'lsa - qatorlarga aylantiramiz.
  const handlePaste = (e, rowIdx, colIdx) => {
    const text = e.clipboardData?.getData("text") || "";
    if (!text.includes("\t") && !text.includes("\n")) return; // oddiy bitta qiymat
    e.preventDefault();
    const parsed = parseClipboardTSV(text, group.startDate || "");
    if (parsed.length === 0) {
      // bitta qator, ko'p ustun (faqat \t) - shu qatordan boshlab to'ldiramiz
      const cols = text.replace(/\r/g, "").split("\t").map((c) => c.trim());
      const next = [...students];
      const target = { ...next[rowIdx] };
      COLS.slice(colIdx).forEach((c, i) => {
        if (cols[i] != null) target[c.key] = cols[i];
      });
      next[rowIdx] = target;
      onChange(next);
      return;
    }
    // Ko'p qator: joriy qatordan boshlab almashtiramiz/qo'shamiz.
    const next = [...students];
    parsed.forEach((row, i) => {
      const at = rowIdx + i;
      if (at < next.length) {
        next[at] = { ...next[at], ...row, _id: next[at]._id };
      } else {
        next.push(row);
      }
    });
    onChange(next);
    toast.success(`${parsed.length} ta qator joylandi`);
  };

  return (
    <div className="space-y-3">
      {/* Asboblar paneli */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => addRows(5)}>
          <Plus className="size-4" /> 5 qator
        </Button>
        <Button variant="outline" size="sm" onClick={() => addRows(10)}>
          <Plus className="size-4" /> 10 qator
        </Button>
        <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
          <ClipboardPaste className="size-3.5" />
          Excel/Sheets'dan nusxalab istalgan katakka qo'ying
        </span>
        <span className="ml-auto text-sm text-muted-foreground">
          Jami: {students.length} o'quvchi
        </span>
      </div>

      {/* Jadval */}
      <div className="border rounded-md overflow-x-auto bg-white" ref={gridRef}>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="w-10 px-2 py-2 text-left text-xs text-muted-foreground">#</th>
              {COLS.map((c) => (
                <th
                  key={c.key}
                  className={cn("px-2 py-2 text-left text-xs font-medium text-gray-700", c.w)}
                >
                  {c.label}
                </th>
              ))}
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {students.map((row, rowIdx) => {
              const errs = validateRow(row, {
                startKey,
                seenPhones: phoneCount,
                seenUsernames: unameCount,
              });
              const linking = !!row.existingStudentId;
              return (
                <tr
                  key={row._id}
                  className={cn("border-b last:border-b-0", linking && "bg-emerald-50")}
                >
                  <td className="px-2 py-1 text-xs text-muted-foreground align-middle">
                    {rowIdx + 1}
                  </td>
                  {linking ? (
                    <td colSpan={COLS.length} className="px-2 py-2">
                      <span className="inline-flex items-center gap-2 text-emerald-800">
                        <Link2 className="size-4" />
                        Mavjud o'quvchiga bog'landi: <b>{row.existingLabel}</b>
                        <button
                          type="button"
                          onClick={() => unlinkRow(rowIdx)}
                          className="ml-2 text-xs text-emerald-700 underline"
                        >
                          Bekor qilish
                        </button>
                      </span>
                    </td>
                  ) : (
                    COLS.map((c, colIdx) => {
                      const err = errs[c.key];
                      const dupPhone =
                        c.key === "phone" && canonicalPhone(row.phone) &&
                        phoneCount.get(canonicalPhone(row.phone)) > 1;
                      return (
                        <td key={c.key} className="px-1 py-0.5 align-top">
                          <input
                            data-cell={`${rowIdx}-${colIdx}`}
                            type={c.type || "text"}
                            value={row[c.key] ?? ""}
                            min={c.type === "number" ? "0" : undefined}
                            placeholder={c.label}
                            onChange={(e) => update(rowIdx, c.key, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                            onPaste={(e) => handlePaste(e, rowIdx, colIdx)}
                            className={cn(
                              "w-full h-9 px-2 rounded border bg-white outline-2 outline-primary text-sm",
                              err ? "border-red-400 bg-red-50" : "border-transparent hover:border-gray-200 focus:border-primary",
                            )}
                            title={err || (dupPhone ? "Telefon takrorlangan" : undefined)}
                          />
                        </td>
                      );
                    })
                  )}
                  <td className="px-1 text-center align-middle">
                    <button
                      type="button"
                      onClick={() => removeRow(rowIdx)}
                      className="text-gray-400 hover:text-red-500"
                      title="Qatorni o'chirish"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {students.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-sm">
            <X className="size-6 mx-auto mb-2" />
            O'quvchi yo'q. "5 qator" tugmasi bilan boshlang.
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        <b>Enter</b> — pastga, <b>Tab</b> — keyingi katakka. Telefon yoki username
        qizil bo'lsa — tuzating yoki dublikat bo'lsa keyingi qadamga o'tmaydi.
      </p>
    </div>
  );
};

export default Step2Students;
