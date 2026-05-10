import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import GroupPicker from "@/owner/features/attendance/components/GroupPicker";
import { toDateInput } from "@/shared/utils/formatDate";
import { useSetTrialMutation } from "../../hooks/useLeadMutations";

const SetTrialModal = ({ leadId, current, close, isLoading, setIsLoading }) => {
  const obj = useObjectState({
    date: toDateInput(current?.date) || "",
    groupId: current?.groupId || "",
  });

  const { mutate } = useSetTrialMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.date || !obj.groupId) return;
    setIsLoading(true);
    mutate({ id: leadId, date: obj.date, groupId: obj.groupId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <InputField
        name="date"
        label="Sinov darsi sanasi"
        type="date"
        value={obj.date}
        onChange={(e) => obj.setField("date", e.target.value)}
        required
        autoFocus
        disabled={isLoading}
      />
      <GroupPicker
        value={obj.groupId}
        onChange={(v) => obj.setField("groupId", v)}
        disabled={isLoading}
        label="Sinov guruhi"
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

export default SetTrialModal;
