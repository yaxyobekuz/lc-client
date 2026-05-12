import Button from "@/shared/components/ui/button/Button";
import useLeadSourceRemoveMutation from "../hooks/useLeadSourceRemoveMutation";

const LeadSourceDeleteModal = ({ leadSource, close, isLoading, setIsLoading }) => {
  const { mutate } = useLeadSourceRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate(leadSource._id);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{leadSource?.name}</span> manbasi
        arxivlanadi. Mavjud talabalar tarixida saqlanib qoladi.
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
          onClick={handleConfirm}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "O'chirilmoqda..." : "O'chirish"}
        </Button>
      </div>
    </div>
  );
};

export default LeadSourceDeleteModal;
