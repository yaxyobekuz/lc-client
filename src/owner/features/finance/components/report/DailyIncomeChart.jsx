import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

// Kunlik kirim - oddiy CSS ustun diagrammasi (recharts'siz, mavjud uslubga mos).
const DailyIncomeChart = ({ data = [] }) => {
  const max = data.reduce((m, d) => Math.max(m, d.total), 0) || 1;

  return (
    <Card title="Kunlik kirim">
      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Ushbu oyda kirim yo'q
        </p>
      ) : (
        <div className="mt-4 flex h-48 items-end gap-1 overflow-x-auto">
          {data.map((d) => {
            const h = Math.max(4, Math.round((d.total / max) * 100));
            const day = d.date.slice(8, 10);
            return (
              <div
                key={d.date}
                className="group flex min-w-[14px] flex-1 flex-col items-center justify-end gap-1"
                title={`${d.date}: ${formatMoney(d.total)}`}
              >
                <div
                  className="w-full rounded-t bg-primary/70 transition group-hover:bg-primary"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{day}</span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default DailyIncomeChart;
