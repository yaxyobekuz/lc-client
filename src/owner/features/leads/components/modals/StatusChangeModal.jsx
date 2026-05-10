import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import StatusPicker from "../StatusPicker";
import { useChangeStatusMutation } from "../../hooks/useLeadMutations";

const StatusChangeModal = ({
  leadId,
  currentStatusId,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({
    statusId: "",
    message: "",
  });

  const { mutate } = useChangeStatusMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.statusId || obj.statusId === currentStatusId) return;
    setIsLoading(true);
    mutate({
      id: leadId,
      statusId: obj.statusId,
      message: obj.message,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs text-muted-foreground">
        O'quvchiga aylangan statusga o'tish uchun "O'quvchiga aylantirish"
        tugmasidan foydalaning.
      </p>
      <StatusPicker
        value={obj.statusId}
        onChange={(v) => obj.setField("statusId", v)}
        required
        hideConverted
        disabled={isLoading}
      />
      <InputField
        name="message"
        label="Izoh (ixtiyoriy)"
        value={obj.message}
        onChange={(e) => obj.setField("message", e.target.value)}
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
          {isLoading ? "O'zgartirilmoqda..." : "O'zgartirish"}
        </Button>
      </div>
    </form>
  );
};

export default StatusChangeModal;
