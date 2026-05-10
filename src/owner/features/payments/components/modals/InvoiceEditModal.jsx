import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import useInvoiceUpdateMutation from "../../hooks/useInvoiceUpdateMutation";
import { toDateInput } from "@/shared/utils/formatDate";

const InvoiceEditModal = ({ invoice, close, isLoading, setIsLoading }) => {
  const obj = useObjectState({
    notes: invoice?.notes || "",
    discountAmount: invoice?.discountAmount ?? 0,
    dueDate: toDateInput(invoice?.dueDate),
  });

  const { mutate } = useInvoiceUpdateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mutate({
      id: invoice._id,
      body: {
        notes: obj.notes,
        discountAmount: Number(obj.discountAmount) || 0,
        dueDate: obj.dueDate || undefined,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <InputField
        name="discountAmount"
        label="Chegirma summasi (override)"
        type="number"
        min="0"
        value={obj.discountAmount}
        onChange={(e) => obj.setField("discountAmount", e.target.value)}
        disabled={isLoading}
      />
      <InputField
        type="date"
        name="dueDate"
        label="To'lov muddati"
        value={obj.dueDate}
        onChange={(e) => obj.setField("dueDate", e.target.value)}
        disabled={isLoading}
      />
      <InputField
        name="notes"
        label="Izoh"
        value={obj.notes}
        onChange={(e) => obj.setField("notes", e.target.value)}
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
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default InvoiceEditModal;
