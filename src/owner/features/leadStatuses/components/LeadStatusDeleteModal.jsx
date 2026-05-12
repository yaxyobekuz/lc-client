import Button from "@/shared/components/ui/button/Button";
import { useLeadStatusRemoveMutation } from "../hooks/useLeadStatusMutations";

const LeadStatusDeleteModal = ({
  leadStatus,
  close,
  isLoading,
  setIsLoading,
}) => {
  const { mutate } = useLeadStatusRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{leadStatus?.name}</span> statusi
        arxivlanadi. Mavjud lidlar tarixida saqlanib qoladi.
      </p>
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
          type="button"
          variant="danger"
          onClick={() => {
            setIsLoading(true);
            mutate(leadStatus._id);
          }}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "O'chirilmoqda..." : "O'chirish"}
        </Button>
      </div>
    </div>
  );
};

export default LeadStatusDeleteModal;
