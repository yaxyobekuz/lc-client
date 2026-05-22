import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const PayoutsList = ({ salaryId, items = [], canEdit = false }) => {
  const { openModal } = useModal();

  const handleRemove = (p) =>
    openModal(MODAL.SALARY_PAYOUT_REMOVE_CONFIRM, {
      payoutId: p._id,
      amount: p.amount,
      method: p.method?.name,
    });

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">To'lovlar</h3>
        {canEdit && (
          <Button
            size="sm"
            onClick={() => openModal(MODAL.SALARY_PAYOUT_ADD, { salaryId })}
          >
            To'lab berish
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">To'lovlar yo'q</p>
      ) : (
        <ul className="space-y-2">
          {items.map((p) => (
            <li
              key={String(p._id)}
              className="flex items-center justify-between gap-3 border rounded-md p-2"
            >
              <div className="min-w-0">
                <p className="font-medium">{formatMoney(p.amount)}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDateUz(p.paidAt)} • {p.method?.name || "-"}
                  {p.paidBy?.firstName
                    ? ` • ${p.paidBy.firstName} ${p.paidBy.lastName}`
                    : ""}
                </p>
                {p.note && (
                  <p className="text-xs text-muted-foreground italic">
                    {p.note}
                  </p>
                )}
              </div>
              {canEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemove(p)}
                >
                  O'chirish
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default PayoutsList;
