import { useState } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import useInvoiceCancelMutation from "../../hooks/useInvoiceCancelMutation";

const InvoiceCancelModal = ({ invoice, close, isLoading, setIsLoading }) => {
  const [reason, setReason] = useState("");
  const { mutate } = useInvoiceCancelMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mutate({ id: invoice._id, reason });
  };

  return (
    <form onSubmit={handleConfirm} className="space-y-4">
      <p className="text-sm">
        Hisob bekor qilinadi. To'langan summa bo'lsa, alohida refund qiling.
      </p>
      <InputField
        name="reason"
        label="Sabab"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        disabled={isLoading}
      />
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
          type="submit"
          variant="danger"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Bajarilmoqda..." : "Bekor qilish"}
        </Button>
      </div>
    </form>
  );
};

export default InvoiceCancelModal;
