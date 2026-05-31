import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import { toDateInput } from "@/shared/utils/formatDate";
import ExpenseFormFields from "./ExpenseFormFields";
import { useExpenseUpdateMutation } from "../hooks/useExpenseMutations";

const ExpenseEditModal = ({ expense, close, isLoading, setIsLoading }) => {
  const obj = useObjectState({
    type: expense?.type?._id || expense?.type || "",
    amount: expense?.amount ?? "",
    date: toDateInput(expense?.date),
    description: expense?.description || "",
  });

  const { mutate } = useExpenseUpdateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.type || obj.amount === "" || !obj.date) return;
    setIsLoading(true);
    mutate({
      id: expense._id,
      body: {
        type: obj.type,
        amount: Number(obj.amount),
        date: obj.date,
        description: obj.description.trim(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <ExpenseFormFields obj={obj} disabled={isLoading} />
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

export default ExpenseEditModal;
