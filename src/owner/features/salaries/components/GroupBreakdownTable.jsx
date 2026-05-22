import Card from "@/shared/components/ui/card/Card";
import CalculationTypeBadge from "@/shared/components/salary/CalculationTypeBadge";
import { formatMoney } from "@/shared/utils/formatMoney";

const GroupBreakdownTable = ({ items = [] }) => (
  <Card className="space-y-3">
    <h3 className="font-semibold">Guruhlar bo'yicha hisob</h3>
    {items.length === 0 ? (
      <p className="text-muted-foreground text-sm">
        Bu davr uchun stavka topilmadi
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr>
              <th className="px-3 py-2">Guruh</th>
              <th className="px-3 py-2">Turi</th>
              <th className="px-3 py-2 text-right">Darslar</th>
              <th className="px-3 py-2 text-right">Soatlar</th>
              <th className="px-3 py-2 text-right">Belgilangan</th>
              <th className="px-3 py-2 text-right">Soatlik</th>
              <th className="px-3 py-2 text-right">Foiz</th>
              <th className="px-3 py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((bd, i) => (
              <tr key={String(bd.group?._id || bd.group || i)} className="border-t">
                <td className="px-3 py-2 font-medium">
                  {bd.group?.name || bd.groupName || "-"}
                </td>
                <td className="px-3 py-2">
                  <CalculationTypeBadge type={bd.calculationType} />
                </td>
                <td className="px-3 py-2 text-right">{bd.sessionsCount}</td>
                <td className="px-3 py-2 text-right">{bd.totalHours}</td>
                <td className="px-3 py-2 text-right">
                  {bd.fixedAmount > 0 ? formatMoney(bd.fixedAmount) : "-"}
                </td>
                <td className="px-3 py-2 text-right">
                  {bd.hourlyAmount > 0 ? formatMoney(bd.hourlyAmount) : "-"}
                </td>
                <td className="px-3 py-2 text-right">
                  {bd.percentageAmount > 0
                    ? `${formatMoney(bd.percentageAmount)} (${bd.percentageRate}%)`
                    : "-"}
                </td>
                <td className="px-3 py-2 text-right font-semibold">
                  {formatMoney(bd.subtotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Card>
);

export default GroupBreakdownTable;
