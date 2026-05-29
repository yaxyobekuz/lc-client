import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const IncomeByDirectionTable = ({ items = [] }) => {
  const total = items.reduce((s, it) => s + (it.paidAmount || 0), 0);

  return (
    <Card title="Yo'nalishlar bo'yicha daromad" className="space-y-3">
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm mt-3">Ma'lumot yo'q</p>
      ) : (
        <div className="overflow-x-auto rounded border mt-3">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr>
                <th className="px-3 py-2 font-medium">Yo'nalish</th>
                <th className="px-3 py-2 font-medium text-right">
                  To'langan
                </th>
                <th className="px-3 py-2 font-medium text-right">Qarz</th>
                <th className="px-3 py-2 font-medium text-right">%</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => {
                const pct = total
                  ? Math.round(((row.paidAmount || 0) / total) * 100)
                  : 0;
                return (
                  <tr
                    key={row.directionId || `none-${i}`}
                    className="border-t"
                  >
                    <td className="px-3 py-2 font-medium">{row.name}</td>
                    <td className="px-3 py-2 text-right">
                      {formatMoney(row.paidAmount)}
                    </td>
                    <td className="px-3 py-2 text-right text-amber-700">
                      {formatMoney(row.outstanding)}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-xs">
                      {pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default IncomeByDirectionTable;
