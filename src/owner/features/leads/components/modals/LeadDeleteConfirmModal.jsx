import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/ui/button/Button";
import { useLeadDeleteMutation } from "../../hooks/useLeadMutations";

const LeadDeleteConfirmModal = ({
  lead,
  redirectAfter = false,
  close,
  isLoading,
  setIsLoading,
}) => {
  const navigate = useNavigate();
  const { mutate } = useLeadDeleteMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
      if (redirectAfter) navigate("/owner/leads");
    },
    onError: () => setIsLoading(false),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">
          {lead?.firstName} {lead?.lastName}
        </span>{" "}
        lidini o'chirmoqchimisiz? Bu amal qaytarib bo'lmaydi.
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
            mutate(lead._id);
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

export default LeadDeleteConfirmModal;
