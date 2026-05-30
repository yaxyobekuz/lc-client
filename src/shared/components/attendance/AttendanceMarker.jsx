import {
  ATTENDANCE_STATUSES,
  STATUS_LABEL,
  STATUS_BADGE_CLASS,
} from "@/shared/constants/attendance";
import { cn } from "@/shared/utils/cn";

const BTN_BASE =
  "flex-1 min-w-[84px] inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium border transition-colors disabled:opacity-50";

// Bitta talaba qatori uchun: 1 click bilan status tanlash (select emas, tap).
// Kechikdi/Sababli uchun minut va sabab shart emas - status o'zi yetarli.
const AttendanceMarker = ({ value = {}, onChange, disabled = false }) => {
  const { status = "" } = value;

  // Bitta clickda status o'rnatadi (qo'shimcha maydonlarsiz)
  const pickStatus = (s) => onChange({ ...value, status: s, reason: "", lateMinutes: 0 });

  return (
    <div className="flex flex-wrap items-stretch gap-1.5 w-full">
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
              BTN_BASE,
              active
                ? cn(
                    STATUS_BADGE_CLASS[s],
                    "border-transparent font-semibold ring-1 ring-black/10 shadow-sm",
                  )
                : "bg-white border-gray-200 text-muted-foreground hover:bg-gray-50",
            )}
          >
            {STATUS_LABEL[s]}
          </button>
        );
      })}

      {/* Statusni bekor qilish -> Belgilanmagan */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange({ ...value, status: "", reason: "", lateMinutes: 0 })}
        aria-pressed={!status}
        title="Bekor qilish (belgilanmagan)"
        className={cn(
          BTN_BASE,
          !status
            ? "bg-gray-100 text-gray-600 border-transparent font-semibold ring-1 ring-black/10 shadow-sm"
            : "bg-white border-gray-200 text-muted-foreground hover:bg-gray-50",
        )}
      >
        Bekor
      </button>
    </div>
  );
};

export default AttendanceMarker;
