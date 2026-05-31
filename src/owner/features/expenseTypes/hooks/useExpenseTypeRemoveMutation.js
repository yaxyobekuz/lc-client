import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { expenseTypesAPI } from "../api/expenseTypes.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const useExpenseTypeRemoveMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => expenseTypesAPI.remove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.expenseTypes.all() });
      qc.invalidateQueries({ queryKey: qk.expenses.all() });
      toast.success("Arxivlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useExpenseTypeRemoveMutation;
