import Button from "@/shared/components/ui/button/Button";
import { formatMoney } from "@/shared/utils/formatMoney";
import { useExpenseRemoveMutation } from "../hooks/useExpenseMutations";

const ExpenseDeleteModal = ({ expense, close, isLoading, setIsLoading }) => {
  const { mutate } = useExpenseRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{formatMoney(expense?.amount)}</span>{" "}
        miqdoridagi xarajat arxivga o'tkaziladi. Uni keyin "Arxiv" bo'limidan
        tiklash mumkin.
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
            mutate(expense._id);
          }}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Arxivlanmoqda..." : "Arxivlash"}
        </Button>
      </div>
    </div>
  );
};

export default ExpenseDeleteModal;
