import { cn } from "@/shared/utils/cn";

// Reference: "Project Analytics" - haftalik bandlik bar chart. Eng band kun ajratib ko'rsatiladi.
const WeeklyActivityChart = ({ items = [] }) => {
  const max = Math.max(1, ...items.map((it) => it.lessonsCount || 0));
  const peakIndex = items.reduce(
    (best, it, i) => ((it.lessonsCount || 0) > (items[best]?.lessonsCount || 0) ? i : best),
    0,
  );
  const total = items.reduce((s, it) => s + (it.lessonsCount || 0), 0);

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-zinc-900">Dars bandligi</h2>
          <p className="text-xs text-zinc-500">So'nggi 30 kun, hafta kunlari bo'yicha</p>
        </div>
        <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
          {total} dars
        </span>
      </div>

      <div className="mt-6 flex h-44 items-end gap-2.5 sm:gap-3">
        {items.map((d, i) => {
          const pct = Math.round(((d.lessonsCount || 0) / max) * 100);
          const isPeak = i === peakIndex && d.lessonsCount > 0;
          return (
            <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div className="relative flex w-full flex-1 items-end">
                {isPeak && (
                  <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                    {d.lessonsCount}
                    <span className="absolute left-1/2 top-full size-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-zinc-900" />
                  </div>
                )}
                <div
                  className={cn(
                    "w-full rounded-full transition-all duration-500",
                    isPeak
                      ? "bg-primary"
                      : d.lessonsCount > 0
                        ? "bg-primary/25"
                        : "bg-zinc-100",
                  )}
                  style={{ height: `${Math.max(pct, 6)}%` }}
                />
              </div>
              <span className={cn("text-xs", isPeak ? "font-semibold text-zinc-900" : "text-zinc-500")}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
