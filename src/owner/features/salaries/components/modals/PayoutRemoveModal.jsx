import Button from "@/shared/components/ui/button/Button";
import { formatMoney } from "@/shared/utils/formatMoney";
import { useRemovePayoutMutation } from "../../hooks/useSalaryMutations";

const PayoutRemoveModal = ({
  payoutId,
  amount,
  method,
  close,
  isLoading,
  setIsLoading,
}) => {
  const { mutate } = useRemovePayoutMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm">Haqiqatan ham bu to'lovni o'chirmoqchimisiz?</p>
      <div className="bg-muted rounded p-3 text-sm">
        <p>
          <span className="text-muted-foreground">Summa:</span>{" "}
          {formatMoney(amount)}
        </p>
        {method && (
          <p>
            <span className="text-muted-foreground">Usul:</span> {method}
          </p>
        )}
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
          variant="danger"
          onClick={() => {
            setIsLoading(true);
            mutate(payoutId);
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

export default PayoutRemoveModal;
