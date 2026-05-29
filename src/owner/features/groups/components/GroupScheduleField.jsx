// Icons
import { Plus, Trash2 } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn/select";

// Utils
import { DAY_OPTIONS, DAY_LABELS_FULL_UZ } from "@/shared/utils/formatSchedule";
import { cn } from "@/shared/utils/cn";

const ALL_DAYS = DAY_OPTIONS.map((d) => d.value);

const findFirstFreeDay = (usedDays) =>
  ALL_DAYS.find((d) => !usedDays.includes(d)) || "mon";

const emptyRow = (usedDays = []) => ({
  day: findFirstFreeDay(usedDays),
  startTime: "14:00",
  endTime: "15:30",
});

const GRID_COLS =
  "grid-cols-[minmax(110px,1.4fr)_minmax(95px,1fr)_minmax(95px,1fr)_36px]";

const GroupScheduleField = ({ value = [], onChange, disabled = false }) => {
  const update = (idx, key, val) => {
    const next = value.map((item, i) =>
      i === idx ? { ...item, [key]: val } : item,
    );
    onChange(next);
  };

  const addRow = () => {
    const used = value.map((v) => v.day);
    if (used.length >= ALL_DAYS.length) return;
    onChange([...value, emptyRow(used)]);
  };
  const removeRow = (idx) => onChange(value.filter((_, i) => i !== idx));

  const dayCount = value.reduce((acc, r) => {
    acc[r.day] = (acc[r.day] || 0) + 1;
    return acc;
  }, {});
  const isDup = (idx) => dayCount[value[idx]?.day] > 1;
  const canAddMore = value.length < ALL_DAYS.length;

  return (
    <div className="space-y-2">
      {/* Header — teachers panel bilan bir xil balandlikda */}
      <div className="flex items-center justify-between h-6">
        <span className="text-sm font-medium">Dars jadvali</span>
        <span className="text-xs text-muted-foreground">
          {value.length > 0 ? `${value.length} ta kun` : ""}
        </span>
      </div>

      <div className="border rounded-md overflow-hidden bg-white">
        {value.length === 0 ? (
          <div className="px-3 py-6 text-center text-sm text-muted-foreground">
            Hech qanday dars kuni qo'shilmagan
          </div>
        ) : (
          <>
            {/* Sub-header */}
            <div
              className={cn(
                "grid gap-2 px-2 py-1.5 bg-gray-50 border-b text-[11px] uppercase tracking-wide text-muted-foreground font-medium",
                GRID_COLS,
              )}
            >
              <span>Kun</span>
              <span>Boshlanish</span>
              <span>Tugash</span>
              <span />
            </div>

            <div className="divide-y">
              {value.map((row, idx) => {
                const usedByOthers = value
                  .filter((_, i) => i !== idx)
                  .map((r) => r.day);
                const duplicate = isDup(idx);

                return (
                  <div key={idx}>
                    <div
                      className={cn(
                        "grid gap-2 items-center px-2 py-1.5",
                        GRID_COLS,
                        duplicate && "bg-red-50",
                      )}
                    >
                      <Select
                        value={row.day}
                        onValueChange={(v) => update(idx, "day", v)}
                        disabled={disabled}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-9 text-sm",
                            duplicate && "border-red-400",
                          )}
                        >
                          <SelectValue placeholder="Kun" />
                        </SelectTrigger>
                        <SelectContent>
                          {DAY_OPTIONS.filter(
                            (opt) =>
                              opt.value === row.day ||
                              !usedByOthers.includes(opt.value),
                          ).map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="time"
                        value={row.startTime}
                        onChange={(e) =>
                          update(idx, "startTime", e.target.value)
                        }
                        disabled={disabled}
                        className="h-9 px-2 text-sm"
                      />
                      <Input
                        type="time"
                        value={row.endTime}
                        onChange={(e) => update(idx, "endTime", e.target.value)}
                        disabled={disabled}
                        className="h-9 px-2 text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={disabled}
                        playClickSound={false}
                        onClick={() => removeRow(idx)}
                        aria-label="Qatorni o'chirish"
                        className="size-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    {duplicate && (
                      <p className="px-2 pb-1.5 text-[11px] text-red-600">
                        {DAY_LABELS_FULL_UZ[row.day]} kuni jadvalda allaqachon
                        bor
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer: + Qator qo'shish (jadval ichida) */}
        <button
          type="button"
          onClick={addRow}
          disabled={disabled || !canAddMore}
          title={!canAddMore ? "Hafta kunlari to'lib bo'ldi" : undefined}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-gray-50 border-t disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="size-4" />
          Qator qo'shish
        </button>
      </div>
    </div>
  );
};

export default GroupScheduleField;
