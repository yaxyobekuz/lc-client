import Card from "@/shared/components/ui/card/Card";
import { formatMoney } from "@/shared/utils/formatMoney";

const fullName = (row) =>
  `${row.firstName || ""} ${row.lastName || ""}`.trim() || "—";

const IncomeByTeacherTable = ({ items = [] }) => (
  <Card title="O'qituvchilar bo'yicha daromad" className="space-y-3">
    {items.length === 0 ? (
      <p className="text-muted-foreground text-sm mt-3">Ma'lumot yo'q</p>
    ) : (
      <>
        <div className="overflow-hidden rounded border mt-3">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr>
                <th className="px-3 py-2 font-medium">O'qituvchi</th>
                <th className="px-3 py-2 font-medium text-right">
                  Hisob-fakturalar
                </th>
                <th className="px-3 py-2 font-medium text-right">
                  To'langan
                </th>
                <th className="px-3 py-2 font-medium text-right">Qarz</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => (
                <tr key={row.teacherId || `none-${i}`} className="border-t">
                  <td className="px-3 py-2 font-medium">{fullName(row)}</td>
                  <td className="px-3 py-2 text-right">{row.invoicesCount}</td>
                  <td className="px-3 py-2 text-right">
                    {formatMoney(row.paidAmount)}
                  </td>
                  <td className="px-3 py-2 text-right text-amber-700">
                    {formatMoney(row.outstanding)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">
          Eslatma: bir guruhda bir nechta o'qituvchi bo'lsa, har biriga to'liq
          summa hisoblanadi.
        </p>
      </>
    )}
  </Card>
);

export default IncomeByTeacherTable;
