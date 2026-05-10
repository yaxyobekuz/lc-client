import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { expensesAPI } from "../api/expenses.api";

const useExpenseStatsQuery = (params) =>
  useQuery({
    queryKey: qk.expenses.stats(params),
    queryFn: () => expensesAPI.stats(params).then((r) => r.data.data),
  });

export default useExpenseStatsQuery;
