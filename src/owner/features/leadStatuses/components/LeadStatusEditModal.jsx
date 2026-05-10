import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import LeadStatusFormFields from "./LeadStatusFormFields";
import { useLeadStatusUpdateMutation } from "../hooks/useLeadStatusMutations";

const LeadStatusEditModal = ({
  leadStatus,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({
    name: leadStatus?.name || "",
    color: leadStatus?.color || "#6366f1",
    order: leadStatus?.order ?? 0,
    isInitial: !!leadStatus?.isInitial,
    isFinal: !!leadStatus?.isFinal,
    isConverted: !!leadStatus?.isConverted,
  });

  const { mutate } = useLeadStatusUpdateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.name.trim()) return;
    setIsLoading(true);
    mutate({
      id: leadStatus._id,
      name: obj.name.trim(),
      color: obj.color,
      order: Number(obj.order || 0),
      isInitial: !!obj.isInitial,
      isFinal: !!obj.isFinal,
      isConverted: !!obj.isConverted,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <LeadStatusFormFields obj={obj} disabled={isLoading} />
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

export default LeadStatusEditModal;
