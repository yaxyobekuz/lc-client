import Button from "@/shared/components/ui/button/Button";
import useExpenseTypeRemoveMutation from "../hooks/useExpenseTypeRemoveMutation";

const ExpenseTypeDeleteModal = ({ expenseType, close, isLoading, setIsLoading }) => {
  const { mutate } = useExpenseTypeRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate(expenseType._id);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{expenseType?.name}</span> arxivlanadi.
        Eski xarajatlar saqlanib qoladi, lekin bu tur yangi xarajatlar uchun
        tanlanmaydi.
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
          {isLoading ? "Arxivlanmoqda..." : "Arxivlash"}
        </Button>
      </div>
    </div>
  );
};

export default ExpenseTypeDeleteModal;
