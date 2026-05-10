import { useState } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import useDiscountKindCreateMutation from "../hooks/useDiscountKindCreateMutation";

const DiscountKindCreateModal = ({ close, isLoading, setIsLoading }) => {
  const [name, setName] = useState("");
  const { mutate } = useDiscountKindCreateMutation({
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
    mutate({ name: name.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        name="name"
        label="Nomi"
        placeholder="Masalan: Oilaviy"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
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

export default DiscountKindCreateModal;
