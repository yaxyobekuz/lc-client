import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import usePaymentMethodCreateMutation from "../hooks/usePaymentMethodCreateMutation";

const PaymentMethodCreateModal = ({ close, isLoading, setIsLoading }) => {
  const { name, code, setField, state } = useObjectState({ name: "", code: "" });
  const { mutate } = usePaymentMethodCreateMutation({
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
    mutate({ name: name.trim(), code: code.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        name="name"
        label="Nomi"
        placeholder="Masalan: Naqd"
        value={name}
        onChange={(e) => setField("name", e.target.value)}
        required
        autoFocus
        disabled={isLoading}
      />
      <InputField
        name="code"
        label="Kodi (statistik)"
        placeholder="Masalan: cash"
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
          {isLoading ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentMethodCreateModal;
