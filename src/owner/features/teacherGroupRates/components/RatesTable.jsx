import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import CalculationTypeBadge from "@/shared/components/salary/CalculationTypeBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const summarizeRate = (r) => {
  const parts = [];
  if (r.fixedAmount > 0) parts.push(`Belg.: ${formatMoney(r.fixedAmount)}`);
  if (r.hourlyRate > 0)
    parts.push(`${formatMoney(r.hourlyRate)}/soat × ${r.hoursPerSession}`);
  if (r.percentageRate > 0) parts.push(`${r.percentageRate}%`);
  if (r.minMonthlyAmount > 0)
    parts.push(`min ${formatMoney(r.minMonthlyAmount)}`);
  return parts.join(" • ") || "—";
};

const RatesTable = ({ items = [], onAdd, canEdit = false }) => {
  const { openModal } = useModal();

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Stavkalar</h3>
        {canEdit && (
          <Button size="sm" onClick={onAdd}>
            Yangi stavka
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">Stavkalar yo'q</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2">Guruh</th>
                <th className="px-3 py-2">Turi</th>
                <th className="px-3 py-2">Tafsilot</th>
                {canEdit && <th className="px-3 py-2"></th>}
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={String(r._id)} className="border-t">
                  <td className="px-3 py-2 font-medium">
                    {r.group?.name || "—"}
                  </td>
                  <td className="px-3 py-2">
                    <CalculationTypeBadge type={r.calculationType} />
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {summarizeRate(r)}
                  </td>
                  {canEdit && (
                    <td className="px-3 py-2 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            openModal(MODAL.TEACHER_GROUP_RATE_EDIT, {
                              rateId: r._id,
                              rate: r,
                            })
                          }
                        >
                          Tahrirlash
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            openModal(MODAL.TEACHER_GROUP_RATE_DELETE, {
                              rateId: r._id,
                              groupName: r.group?.name,
                            })
                          }
                        >
                          O'chirish
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default RatesTable;
