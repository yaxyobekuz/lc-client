import InputField from "@/shared/components/ui/input/InputField";
import {
  ATTENDANCE_STATUSES,
  STATUS_LABEL,
  STATUS_EMOJI,
  STATUS_BADGE_CLASS,
} from "@/shared/constants/attendance";
import { cn } from "@/shared/utils/cn";

// Bitta talaba qatori uchun: 1 click bilan status tanlash (select emas, tap)
const AttendanceMarker = ({ value = {}, onChange, disabled = false }) => {
  const { status = "", reason = "", lateMinutes = 0 } = value;

  const update = (patch) => onChange({ ...value, ...patch });

  // Bitta clickda status o'rnatadi; "late"/"excused" uchun qo'shimcha maydon ochiladi
  const pickStatus = (s) =>
    update({
      status: s,
      lateMinutes: s === "late" ? lateMinutes || 5 : 0,
      reason: s === "excused" ? reason : "",
    });

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {ATTENDANCE_STATUSES.map((s) => {
          const active = status === s;
          return (
            <button
              key={s}
              type="button"
              disabled={disabled}
              onClick={() => pickStatus(s)}
              aria-pressed={active}
              title={STATUS_LABEL[s]}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors disabled:opacity-50",
                active
                  ? cn(
                      STATUS_BADGE_CLASS[s],
                      "border-transparent font-semibold ring-1 ring-black/10 shadow-sm",
                    )
                  : "bg-white border-gray-200 text-muted-foreground hover:bg-gray-50",
              )}
            >
              <span>{STATUS_EMOJI[s]}</span>
              <span>{STATUS_LABEL[s]}</span>
            </button>
          );
        })}
      </div>

      {status === "late" && (
        <InputField
          type="number"
          min="1"
          placeholder="Necha minut kechikdi?"
          value={lateMinutes || ""}
          onChange={(e) => update({ lateMinutes: Number(e.target.value) })}
          disabled={disabled}
          className="!gap-1 max-w-[220px]"
        />
      )}
      {status === "excused" && (
        <InputField
          value={reason}
          disabled={disabled}
          placeholder="Sabab (kasallik, oilaviy, ...)"
          onChange={(e) => update({ reason: e.target.value })}
          className="max-w-[320px]"
        />
      )}
    </div>
  );
};

export default AttendanceMarker;
