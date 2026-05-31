import { cn } from "@/shared/utils/cn";
import { expenseTypeBadgeClass } from "@/shared/constants/expense";

// type — populate qilingan ExpenseType obyekti ({ _id, name }) yoki null
const ExpenseTypeBadge = ({ type, className = "" }) => {
  const name = type?.name;
  if (!name) {
    return <span className="text-muted-foreground">-</span>;
  }
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium",
        expenseTypeBadgeClass(name),
        className,
      )}
    >
      {name}
    </span>
  );
};

export default ExpenseTypeBadge;
