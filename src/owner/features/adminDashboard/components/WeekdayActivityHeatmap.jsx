import Card from "@/shared/components/ui/card/Card";

const WeekdayActivityHeatmap = ({ items = [] }) => {
  if (!items.length) {
    return (
      <Card title="Hafta kunlari bo'yicha bandlik">
        <p className="text-muted-foreground text-sm mt-3">Ma'lumot yo'q</p>
      </Card>
    );
  }

  const max = Math.max(1, ...items.map((it) => it.lessonsCount || 0));

  return (
    <Card title="Hafta kunlari bo'yicha bandlik (so'nggi 30 kun)">
      <div className="flex items-end gap-2 mt-4 h-36">
        {items.map((d) => {
          const heightPct = ((d.lessonsCount || 0) / max) * 100;
          return (
            <div
              key={d.day}
              className="flex flex-col items-center justify-end flex-1 h-full"
            >
              <div className="text-xs font-mono mb-1">{d.lessonsCount}</div>
              <div
                className="w-full bg-blue-400 rounded-t transition-all"
                style={{ height: `${heightPct}%`, minHeight: "2px" }}
              />
              <div className="text-xs text-zinc-600 mt-1">{d.day}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default WeekdayActivityHeatmap;
