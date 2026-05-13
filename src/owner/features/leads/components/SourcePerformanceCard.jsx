import Card from "@/shared/components/ui/card/Card";

const SourcePerformanceCard = ({ items = [] }) => (
  <Card className="space-y-3">
    <h3 className="font-semibold">Manba samaradorligi</h3>
    {items.length === 0 ? (
      <p className="text-muted-foreground text-sm">Ma'lumot yo'q</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr>
              <th className="px-3 py-2">Manba</th>
              <th className="px-3 py-2 text-right">Lidlar</th>
              <th className="px-3 py-2 text-right">O'quvchi</th>
              <th className="px-3 py-2 text-right">Konversiya</th>
              <th className="px-3 py-2 text-right">O'rtacha (kun)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={String(it.source._id || i)} className="border-t">
                <td className="px-3 py-2 font-medium">{it.source.name}</td>
                <td className="px-3 py-2 text-right">{it.total}</td>
                <td className="px-3 py-2 text-right text-green-700">
                  {it.converted}
                </td>
                <td className="px-3 py-2 text-right">
                  <span
                    className={
                      it.conversionRate >= 30
                        ? "text-green-600"
                        : it.conversionRate >= 10
                          ? "text-amber-600"
                          : "text-muted-foreground"
                    }
                  >
                    {it.conversionRate}%
                  </span>
                </td>
                <td className="px-3 py-2 text-right text-muted-foreground">
                  {it.avgConversionDays !== null
                    ? `${it.avgConversionDays} kun`
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Card>
);

export default SourcePerformanceCard;
