import { useState } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import { useAddNoteMutation } from "../../hooks/useLeadMutations";

const AddNoteModal = ({ leadId, close, isLoading, setIsLoading }) => {
  const [message, setMessage] = useState("");
  const { mutate } = useAddNoteMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsLoading(true);
    mutate({ id: leadId, message: message.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <InputField
        name="message"
        label="Eslatma"
        placeholder="Eslatma matnini yozing..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
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
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default AddNoteModal;
