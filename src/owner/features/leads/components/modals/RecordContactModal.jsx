import { useState } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import { useRecordContactMutation } from "../../hooks/useLeadMutations";

const RecordContactModal = ({ leadId, close, isLoading, setIsLoading }) => {
  const [message, setMessage] = useState("");
  const { mutate } = useRecordContactMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mutate({ id: leadId, message: message.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Bog'lanish soni va so'nggi sana avto yangilanadi.
      </p>
      <InputField
        name="message"
        label="Suhbat qisqacha (ixtiyoriy)"
        placeholder="Masalan: javob bermadi / qiziqdi / ertaga kelaman dedi"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoFocus
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
          {isLoading ? "Saqlanmoqda..." : "Qayd qilish"}
        </Button>
      </div>
    </form>
  );
};

export default RecordContactModal;
