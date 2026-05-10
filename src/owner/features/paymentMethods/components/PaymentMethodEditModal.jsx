import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import usePaymentMethodUpdateMutation from "../hooks/usePaymentMethodUpdateMutation";

const PaymentMethodEditModal = ({ paymentMethod, close, isLoading, setIsLoading }) => {
  const { name, code, setField } = useObjectState({
    name: paymentMethod?.name || "",
    code: paymentMethod?.code || "",
  });
  const { mutate } = usePaymentMethodUpdateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoading(true);
    mutate({
      id: paymentMethod._id,
      body: { name: name.trim(), code: code.trim() },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        name="name"
        label="Nomi"
        value={name}
        onChange={(e) => setField("name", e.target.value)}
        required
        autoFocus
        disabled={isLoading}
      />
      <InputField
        name="code"
        label="Kodi"
        value={code}
        onChange={(e) => setField("code", e.target.value)}
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
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentMethodEditModal;
