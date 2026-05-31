import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { expenseTypesAPI } from "../api/expenseTypes.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const useExpenseTypeUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) =>
      expenseTypesAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.expenseTypes.all() });
      qc.invalidateQueries({ queryKey: qk.expenses.all() });
      toast.success("Saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useExpenseTypeUpdateMutation;
