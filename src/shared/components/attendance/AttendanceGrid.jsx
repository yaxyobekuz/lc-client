import { useEffect, useMemo, useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import AttendanceMarker from "./AttendanceMarker";
import AttendanceLegend from "./AttendanceLegend";
import BulkStatusSlider from "./BulkStatusSlider";
import { formatPhone } from "@/shared/utils/formatPhone";
import { cn } from "@/shared/utils/cn";
import { STATUS_LABEL } from "@/shared/constants/attendance";

// Davomat o'zgartirilgan bo'lsa (history > 1) audit izohini matn ko'rinishida quradi
const editHistoryTitle = (attendance) => {
  const hist = attendance?.history || [];
  if (hist.length <= 1) return "";
  return hist
    .map((h) => {
      const d = new Date(h.at);
      const ts = Number.isNaN(d.getTime()) ? "" : d.toLocaleString("uz");
      const from = h.from ? STATUS_LABEL[h.from] || h.from : "—";
      const to = STATUS_LABEL[h.to] || h.to;
      return `${ts}: ${from} → ${to}`;
    })
    .join("\n");
};

const DEFAULT_STATUS = "absent";

// Hafta kunlari (uz) — "dars kuni emas" ogohlantirishida guruh jadvalini ko'rsatish uchun
const DAY_LABELS_UZ = {
  mon: "Dushanba",
  tue: "Seshanba",
  wed: "Chorshanba",
  thu: "Payshanba",
  fri: "Juma",
  sat: "Shanba",
  sun: "Yakshanba",
};
const WEEK_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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

// Range sudralayotganda qator yorqin bo'yaladi (fon rangi)
const STATUS_ROW_PREVIEW = {
  present: "bg-green-100",
  absent: "bg-red-100",
  excused: "bg-amber-100",
  exempt: "bg-gray-200",
  "": "bg-gray-100",
};

// ...va chap chetida rangli chiziq
const STATUS_ACCENT = {
  present: "border-l-4 border-green-500",
  absent: "border-l-4 border-red-500",
  excused: "border-l-4 border-amber-500",
  exempt: "border-l-4 border-gray-500",
  "": "border-l-4 border-gray-400",
};

const AttendanceGrid = ({ data, onSubmit, isSubmitting = false }) => {
  const initial = useMemo(() => {
    const map = {};
    for (const r of data?.rows || []) {
      map[String(r.student._id)] = buildInitialRow(r);
    }
    return map;
  }, [data]);

  // Guruhning dars kunlari (ogohlantirish matni uchun)
  const classDaysLabel = useMemo(() => {
    const days = [...new Set((data?.group?.schedule || []).map((s) => s.day))];
    days.sort((a, b) => WEEK_ORDER.indexOf(a) - WEEK_ORDER.indexOf(b));
    return days.map((d) => DAY_LABELS_UZ[d] || d).join(", ");
  }, [data]);

  const [state, setState] = useState(initial);
  // Data o'zgarsa state'ni reset qilamiz — render-time sync (effekt'siz)
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setState(initial);
  }

  // Bosib-sudrab (range) belgilash holati: { status, start, end } (indekslar)
  const [drag, setDrag] = useState(null);

  // Sudrash (mouse + touch): pointer eventlar bilan ishlaydi. Barmoq/sichqoncha
  // qaysi qator ustida ekanini elementFromPoint orqali aniqlaymiz; qo'yib
  // yuborilganda oraliqdagi barcha o'quvchiga status beriladi.
  // drag o'zgarganda qayta obuna bo'lamiz — handler eng so'nggi qiymatlarni ko'radi.
  useEffect(() => {
    if (!drag || !data) return undefined;
    const idxAt = (x, y) => {
      const el = document.elementFromPoint(x, y)?.closest?.("[data-idx]");
      const i = el ? Number(el.dataset.idx) : NaN;
      return Number.isNaN(i) ? null : i;
    };
    const onMove = (e) => {
      if (e.cancelable) e.preventDefault(); // touch'da sahifa scroll bo'lmasin
      const i = idxAt(e.clientX, e.clientY);
      if (i !== null) setDrag((d) => (d && d.end !== i ? { ...d, end: i } : d));
    };
    const onUp = () => {
      const lo = Math.min(drag.start, drag.end);
      const hi = Math.max(drag.start, drag.end);
      setState((prev) => {
        const next = { ...prev };
        for (let i = lo; i <= hi && i < data.rows.length; i++) {
          const r = data.rows[i];
          // auto-exempt va muzlatilgan qatorlarga tegmaymiz (setAll bilan bir xil)
          if (!r || r.defaultStatus === "exempt" || r.frozen) continue;
          next[String(r.student._id)] = {
            status: drag.status,
            reason: "",
            lateMinutes: 0,
          };
        }
        return next;
      });
      setDrag(null);
    };
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [drag, data]);

  if (!data) return null;
  // Dars kuni bo'lmasa ham belgilash mumkin — pastda ogohlantirish ko'rsatiladi
  if ((data.rows || []).length === 0) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground bg-white">
        Bu sanaga active o'quvchilar yo'q.
      </div>
    );
  }

  // Dars kuni bo'lmasa belgilash bloklanadi (faqat dars kunlari belgilanadi)
  const locked = !data.isClassDay;

  // Statusni bosib-sudrashni boshlaydi
  const startDrag = (index, status) => {
    if (locked || isSubmitting) return;
    setDrag({ status, start: index, end: index });
  };
  const dragLo = drag ? Math.min(drag.start, drag.end) : -1;
  const dragHi = drag ? Math.max(drag.start, drag.end) : -1;

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
        // exempt default va muzlatilgan o'quvchilarga tegmaymiz
        if (r.defaultStatus === "exempt" || r.frozen) continue;
        next[sid] = {
          status,
          reason: "",
          lateMinutes: 0,
        };
      }
      return next;
    });
  };

  // Saqlanmagan o'zgarishlarni bekor qilib, boshlang'ich holatga qaytaradi
  const resetAll = () => setState(initial);

  const handleSubmit = () => {
    const items = [];
    for (const r of data.rows) {
      const sid = String(r.student._id);
      if (r.frozen) continue; // muzlatilgan o'quvchi yuborilmaydi
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
      {data.isHoliday ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
          Bu kun bayram/dam olish kuni — davomat belgilanmaydi va davomat foiziga
          ta'sir qilmaydi.
        </div>
      ) : (
        !data.isClassDay && (
          <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
            Bu kun guruh jadvalida dars kuni emas
            {classDaysLabel ? ` (dars kunlari: ${classDaysLabel})` : ""}. Davomat
            faqat dars kunlari belgilanadi.
          </div>
        )
      )}
      {/* Sticky action panel */}
      <div className="sticky top-0 z-20 -mx-1 px-1 py-2 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex basis-full sm:basis-auto sm:flex-1 flex-wrap items-center gap-2 min-w-0">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Hammaga:
            </span>
            <BulkStatusSlider onPick={setAll} disabled={isSubmitting || locked} />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {dirtyCount > 0 && (
              <Badge variant="outline" className="text-amber-600">
                {dirtyCount} ta o'zgartirish
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={resetAll}
              disabled={isSubmitting || dirtyCount === 0}
              playClickSound={false}
            >
              Bekor qilish
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || locked || dirtyCount === 0}
            >
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>
        </div>
        {/* Legend + maslahat — mobil ekranda ortiqcha, faqat sm+ da ko'rsatamiz */}
        <div className="mt-2 hidden flex-wrap items-center gap-x-3 gap-y-1 sm:flex">
          <AttendanceLegend />
          {!locked && (
            <span className="text-xs text-muted-foreground">
              Maslahat: statusni bosib (mobilda — bosib turib) qatorlar ustidan
              suring — bir nechta o'quvchini birdaniga belgilaysiz
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "border rounded-md overflow-hidden bg-white divide-y text-sm",
          drag && "select-none touch-none",
        )}
      >
        {data.rows.map((r, i) => {
          const sid = String(r.student._id);
          const cur = state[sid] || {};
          // Sudrash oralig'idami (auto-exempt va muzlatilgan qatorlar chiqariladi)
          const inDrag =
            !!drag &&
            i >= dragLo &&
            i <= dragHi &&
            r.defaultStatus !== "exempt" &&
            !r.frozen;
          return (
            <div
              key={sid}
              data-idx={i}
              className={cn(
                "flex flex-col gap-2 p-3 transition-colors sm:flex-row sm:items-center sm:gap-4",
                inDrag
                  ? cn(STATUS_ROW_PREVIEW[drag.status], STATUS_ACCENT[drag.status])
                  : "hover:bg-gray-50",
              )}
            >
              <div className="flex items-center gap-3 sm:w-60 sm:shrink-0">
                <span className="w-5 shrink-0 text-xs text-muted-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="font-medium truncate">
                    {r.student.firstName} {r.student.lastName}
                    {editHistoryTitle(r.attendance) && (
                      <span
                        title={editHistoryTitle(r.attendance)}
                        aria-label="Tahrirlangan"
                        className="ml-1 cursor-help text-amber-500"
                      >
                        ✎
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatPhone(r.student.phone) || "-"}
                  </div>
                </div>
              </div>
              <div className="sm:flex-1">
                {r.frozen ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-700">
                    ❄ Muzlatilgan
                  </span>
                ) : (
                  <AttendanceMarker
                    value={cur}
                    onChange={(v) => setState((prev) => ({ ...prev, [sid]: v }))}
                    onRangeStart={(s) => startDrag(i, s)}
                    previewStatus={inDrag ? drag.status : null}
                    disabled={isSubmitting || locked}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceGrid;
