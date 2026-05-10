import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import { toDateInput } from "@/shared/utils/formatDate";
import { useSetFollowUpMutation } from "../../hooks/useLeadMutations";

const SetFollowUpModal = ({
  leadId,
  current,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({
    date: toDateInput(current?.date) || "",
    note: current?.note || "",
  });

  const { mutate } = useSetFollowUpMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.date) return;
    setIsLoading(true);
    mutate({ id: leadId, date: obj.date, note: obj.note });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <InputField
        name="date"
        label="Qayta bog'lanish sanasi"
        type="date"
        value={obj.date}
        onChange={(e) => obj.setField("date", e.target.value)}
        required
        autoFocus
        disabled={isLoading}
      />
      <InputField
        name="note"
        label="Izoh (ixtiyoriy)"
        placeholder="Masalan: ertaga 14:00 da chiroqlash"
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
          {isLoading ? "Saqlanmoqda..." : "Sozlash"}
        </Button>
      </div>
    </form>
  );
};

export default SetFollowUpModal;
