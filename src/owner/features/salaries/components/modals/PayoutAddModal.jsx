import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import PaymentMethodPicker from "@/owner/features/payments/components/PaymentMethodPicker";
import { toDateInput } from "@/shared/utils/formatDate";
import { formatMoney } from "@/shared/utils/formatMoney";
import { useRecordPayoutMutation } from "../../hooks/useSalaryMutations";

const PayoutAddModal = ({
  salaryId,
  remaining = 0,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({
    amount: remaining || "",
    methodId: "",
    paidAt: toDateInput(new Date()),
    note: "",
    submitted: false,
  });

  const { mutate } = useRecordPayoutMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.amount || !obj.methodId) {
      obj.setField("submitted", true);
      return;
    }
    setIsLoading(true);
    mutate({
      id: salaryId,
      amount: Number(obj.amount),
      methodId: obj.methodId,
      paidAt: obj.paidAt || undefined,
      note: obj.note,
    });
  };

  const overpay = Number(obj.amount || 0) - Number(remaining || 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <InputField
        name="amount"
        label="Summa"
        type="number"
        min="0"
        value={obj.amount}
        onChange={(e) => obj.setField("amount", e.target.value)}
        required
        autoFocus
        disabled={isLoading}
        error={obj.submitted && !obj.amount}
      />
      {overpay > 0 && (
        <p className="text-xs text-amber-700">
          Qoldiqdan {formatMoney(overpay)} ortiqcha — bu summa keyingi oy
          avansiga yoziladi.
        </p>
      )}
      <PaymentMethodPicker
        value={obj.methodId}
        onChange={(v) => obj.setField("methodId", v)}
        disabled={isLoading}
        error={obj.submitted && !obj.methodId}
      />
      <InputField
        type="date"
        name="paidAt"
        label="To'lov sanasi"
        value={obj.paidAt}
        onChange={(e) => obj.setField("paidAt", e.target.value)}
        disabled={isLoading}
      />
      <InputField
        name="note"
        label="Izoh (ixtiyoriy)"
        type="textarea"
        value={obj.note}
        onChange={(e) => obj.setField("note", e.target.value)}
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
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Yozilmoqda..." : "To'lab berish"}
        </Button>
      </div>
    </form>
  );
};

export default PayoutAddModal;
