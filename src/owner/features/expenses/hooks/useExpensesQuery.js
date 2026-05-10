import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { expensesAPI } from "../api/expenses.api";

const useExpensesQuery = (params) =>
  useQuery({
    queryKey: qk.expenses.list(params),
    queryFn: () => expensesAPI.list(params).then((r) => r.data),
  });

export default useExpensesQuery;
