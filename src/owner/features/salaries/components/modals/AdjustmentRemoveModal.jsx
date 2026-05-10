import Button from "@/shared/components/ui/button/Button";
import { formatMoney } from "@/shared/utils/formatMoney";
import { ADJUSTMENT_TYPE_LABEL } from "@/shared/constants/salary";
import { useRemoveAdjustmentMutation } from "../../hooks/useSalaryMutations";

const AdjustmentRemoveModal = ({
  salaryId,
  adjId,
  type,
  amount,
  close,
  isLoading,
  setIsLoading,
}) => {
  const { mutate } = useRemoveAdjustmentMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Haqiqatan ham bu o'zgartirishni o'chirmoqchimisiz?
      </p>
      <div className="bg-muted rounded p-3 text-sm">
        <p>
          <span className="text-muted-foreground">Turi:</span>{" "}
          {ADJUSTMENT_TYPE_LABEL[type] || type}
        </p>
        <p>
          <span className="text-muted-foreground">Summa:</span>{" "}
          {formatMoney(amount)}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            setIsLoading(true);
            mutate({ id: salaryId, adjId });
          }}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "O'chirilmoqda..." : "O'chirish"}
        </Button>
      </div>
    </div>
  );
};

export default AdjustmentRemoveModal;
