import Button from "@/shared/components/ui/button/Button";
import { useApproveSalaryMutation } from "../../hooks/useSalaryMutations";

const ApproveConfirmModal = ({
  salaryId,
  close,
  isLoading,
  setIsLoading,
}) => {
  const { mutate } = useApproveSalaryMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Oylikni tasdiqlaganingizdan keyin to'lovlarni yozish mumkin bo'ladi.
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
          onClick={() => {
            setIsLoading(true);
            mutate(salaryId);
          }}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Tasdiqlanmoqda..." : "Tasdiqlash"}
        </Button>
      </div>
    </div>
  );
};

export default ApproveConfirmModal;
