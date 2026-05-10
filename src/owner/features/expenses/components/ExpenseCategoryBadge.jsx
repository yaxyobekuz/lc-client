import { cn } from "@/shared/utils/cn";
import {
  EXPENSE_CATEGORY_BADGE_CLASS,
  EXPENSE_CATEGORY_LABEL,
} from "@/shared/constants/expense";

const ExpenseCategoryBadge = ({ category, className = "" }) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium",
      EXPENSE_CATEGORY_BADGE_CLASS[category] ||
        EXPENSE_CATEGORY_BADGE_CLASS.other,
      className,
    )}
  >
    {EXPENSE_CATEGORY_LABEL[category] || category}
  </span>
);

export default ExpenseCategoryBadge;
