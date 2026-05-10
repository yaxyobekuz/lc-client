import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import usePaymentRefundMutation from "../../hooks/usePaymentRefundMutation";
import { formatMoney } from "@/shared/utils/formatMoney";

const PaymentRefundModal = ({ payment, close, isLoading, setIsLoading }) => {
  const obj = useObjectState({
    amount: payment?.amount || "",
    reason: "",
  });

  const { mutate } = usePaymentRefundMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.amount) return;
    setIsLoading(true);
    mutate({
      id: payment._id,
      amount: Number(obj.amount),
      reason: obj.reason,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {payment && (
        <div className="bg-gray-50 border rounded-lg p-3 text-sm">
          <span className="text-muted-foreground">Asl to'lov:</span>{" "}
          <span className="font-medium">{formatMoney(payment.amount)}</span>
        </div>
      )}
      <InputField
        name="amount"
        label="Qaytariladigan summa"
        type="number"
        min="0"
        value={obj.amount}
        onChange={(e) => obj.setField("amount", e.target.value)}
        required
        autoFocus
        disabled={isLoading}
      />
      <InputField
        name="reason"
        label="Sabab"
        value={obj.reason}
        onChange={(e) => obj.setField("reason", e.target.value)}
        disabled={isLoading}
      />
      <div className="flex gap-2 pt-1">
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
          type="submit"
          variant="destructive"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Qaytarilmoqda..." : "Qaytarish"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentRefundModal;
