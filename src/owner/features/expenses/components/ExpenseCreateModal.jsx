import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import { toDateInput } from "@/shared/utils/formatDate";
import ExpenseFormFields from "./ExpenseFormFields";
import { useExpenseCreateMutation } from "../hooks/useExpenseMutations";

const ExpenseCreateModal = ({ close, isLoading, setIsLoading }) => {
  const obj = useObjectState({
    category: "rent",
    amount: "",
    date: toDateInput(new Date()),
    description: "",
  });

  const { mutate } = useExpenseCreateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.category || !obj.amount || !obj.date) return;
    setIsLoading(true);
    mutate({
      category: obj.category,
      amount: Number(obj.amount),
      date: obj.date,
      description: obj.description.trim(),
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
          {isLoading ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseCreateModal;
