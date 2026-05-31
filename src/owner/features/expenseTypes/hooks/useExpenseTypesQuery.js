import { useQuery } from "@tanstack/react-query";
import { expenseTypesAPI } from "../api/expenseTypes.api";
import { qk } from "@/shared/lib/query/keys";

const useExpenseTypesQuery = (params) =>
  useQuery({
    queryKey: qk.expenseTypes.list(params),
    queryFn: () => expenseTypesAPI.list(params).then((r) => r.data),
  });

export default useExpenseTypesQuery;
