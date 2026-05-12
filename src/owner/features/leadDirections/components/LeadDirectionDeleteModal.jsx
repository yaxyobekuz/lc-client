import Button from "@/shared/components/ui/button/Button";
import { useLeadDirectionRemoveMutation } from "../hooks/useLeadDirectionMutations";

const LeadDirectionDeleteModal = ({
  leadDirection,
  close,
  isLoading,
  setIsLoading,
}) => {
  const { mutate } = useLeadDirectionRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{leadDirection?.name}</span> yo'nalishi
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
            mutate(leadDirection._id);
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

export default LeadDirectionDeleteModal;
