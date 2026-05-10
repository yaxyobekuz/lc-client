import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import AdjustmentTypeBadge from "@/shared/components/salary/AdjustmentTypeBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const AdjustmentsList = ({ salaryId, items = [], canEdit = false }) => {
  const { openModal } = useModal();

  const handleAdd = () =>
    openModal(MODAL.SALARY_ADJUSTMENT_ADD, { salaryId });

  const handleRemove = (adj) =>
    openModal(MODAL.SALARY_ADJUSTMENT_REMOVE_CONFIRM, {
      salaryId,
      adjId: adj._id,
      type: adj.type,
      amount: adj.amount,
    });

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">O'zgartirishlar</h3>
        {canEdit && (
          <Button size="sm" onClick={handleAdd}>
            Qo'shish
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          O'zgartirishlar yo'q
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((a) => (
            <li
              key={String(a._id)}
              className="flex items-center justify-between gap-3 border rounded-md p-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <AdjustmentTypeBadge type={a.type} />
                <div className="min-w-0">
                  <p className="font-medium">{formatMoney(a.amount)}</p>
                  {a.reason && (
                    <p className="text-xs text-muted-foreground truncate">
                      {a.reason}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatDateUz(a.createdAt)}
                    {a.createdBy?.firstName
                      ? ` • ${a.createdBy.firstName} ${a.createdBy.lastName}`
                      : ""}
                  </p>
                </div>
              </div>
              {canEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemove(a)}
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

export default AdjustmentsList;
