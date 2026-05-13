import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import PaymentMethodPicker from "../PaymentMethodPicker";
import usePaymentRecordMutation from "../../hooks/usePaymentRecordMutation";
import { toDateInput } from "@/shared/utils/formatDate";
import { formatMoney } from "@/shared/utils/formatMoney";

const PaymentRecordModal = ({
  invoice,
  remainingDefault,
  close,
  isLoading,
  setIsLoading,
}) => {
  const remaining = Math.max(0, (invoice?.totalDue || 0) - (invoice?.paidAmount || 0));
  const obj = useObjectState({
    amount: remainingDefault ?? remaining ?? "",
    methodId: "",
    paidAt: toDateInput(new Date()),
    note: "",
  });

  const { mutate } = usePaymentRecordMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.amount || !obj.methodId) return;
    setIsLoading(true);
    mutate({
      invoiceId: invoice._id,
      amount: Number(obj.amount),
      methodId: obj.methodId,
      paidAt: obj.paidAt || undefined,
      note: obj.note,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {invoice && (
        <div className="bg-gray-50 border rounded-lg p-3 text-sm space-y-1">
          <div>
            <span className="text-muted-foreground">Hisob:</span>{" "}
            {String(invoice.period?.month).padStart(2, "0")}.{invoice.period?.year} —{" "}
            {invoice.group?.name}
          </div>
          <div>
            <span className="text-muted-foreground">To'lov uchun qoldi:</span>{" "}
            <span className="font-medium">{formatMoney(remaining)}</span>
          </div>
        </div>
      )}
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
      />
      <PaymentMethodPicker
        value={obj.methodId}
        onChange={(v) => obj.setField("methodId", v)}
        disabled={isLoading}
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
        value={obj.note}
        onChange={(e) => obj.setField("note", e.target.value)}
        type="textarea"
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
          {isLoading ? "Yozilmoqda..." : "To'lov yozish"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentRecordModal;
