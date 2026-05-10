import Button from "@/shared/components/ui/button/Button";
import { useRecomputeSalaryMutation } from "../../hooks/useSalaryMutations";

const RecomputeConfirmModal = ({
  salaryId,
  close,
  isLoading,
  setIsLoading,
}) => {
  const { mutate } = useRecomputeSalaryMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Oylik joriy stavkalar va davomat asosida qayta hisoblanadi.
        O'zgartirishlar (bonus, jarima, avans, ushlash) saqlanadi.
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
          {isLoading ? "Hisoblanmoqda..." : "Qayta hisoblash"}
        </Button>
      </div>
    </div>
  );
};

export default RecomputeConfirmModal;
