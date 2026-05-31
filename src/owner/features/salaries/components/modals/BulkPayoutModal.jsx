import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import PaymentMethodPicker from "@/owner/features/payments/components/PaymentMethodPicker";
import { toDateInput } from "@/shared/utils/formatDate";
import { formatMoney } from "@/shared/utils/formatMoney";
import { useRecordPayoutBatchMutation } from "../../hooks/useSalaryMutations";

const BulkPayoutModal = ({
  salaryIds = [],
  count = 0,
  totalRemaining = 0,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({
    amount: "",
    methodId: "",
    paidAt: toDateInput(new Date()),
    note: "",
    submitted: false,
  });

  const { mutate } = useRecordPayoutBatchMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.methodId || !salaryIds.length) {
      obj.setField("submitted", true);
      return;
    }
    setIsLoading(true);
    mutate({
      salaryIds,
      amount: obj.amount ? Number(obj.amount) : undefined,
      methodId: obj.methodId,
      paidAt: obj.paidAt || undefined,
      note: obj.note,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="rounded-md border bg-muted/40 p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tanlangan o'qituvchilar</span>
          <span className="font-medium">{count} ta</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-muted-foreground">Jami qoldiq</span>
          <span className="font-medium">{formatMoney(totalRemaining)}</span>
        </div>
      </div>

      <InputField
        name="amount"
        label="Har biriga summa (ixtiyoriy)"
        type="number"
        min="0"
        value={obj.amount}
        onChange={(e) => obj.setField("amount", e.target.value)}
        autoFocus
        disabled={isLoading}
        description="Bo'sh qoldirsangiz — har biriga to'liq qoldiq to'lanadi. Ortiqcha summa keyingi oy avansiga yoziladi."
      />
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

export default BulkPayoutModal;
