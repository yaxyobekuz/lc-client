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

  const amountNum = Number(obj.amount);
  const overRefund = amountNum > (payment?.amount || 0);
  const invalid =
    !obj.amount ||
    amountNum <= 0 ||
    !Number.isInteger(amountNum) ||
    overRefund ||
    obj.reason.trim().length < 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalid) return;
    setIsLoading(true);
    mutate({
      id: payment._id,
      amount: amountNum,
      reason: obj.reason.trim(),
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
      <div className="space-y-1">
        <InputField
          name="amount"
          label="Qaytariladigan summa"
          type="number"
          min="1"
          step="1"
          max={payment?.amount || undefined}
          value={obj.amount}
          onChange={(e) => obj.setField("amount", e.target.value)}
          required
          autoFocus
          disabled={isLoading}
        />
        {overRefund && (
          <p className="text-xs text-rose-500">
            Qaytarish summasi asl to'lovdan ko'p bo'lmasligi kerak (
            {formatMoney(payment?.amount || 0)})
          </p>
        )}
      </div>
      <InputField
        required
        name="reason"
        label="Sabab"
        type="textarea"
        placeholder="Nima sababdan qaytarilmoqda? (kamida 3 belgi)"
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
          variant="danger"
          disabled={isLoading || invalid}
          className="flex-1"
        >
          {isLoading ? "Qaytarilmoqda..." : "Qaytarish"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentRefundModal;
