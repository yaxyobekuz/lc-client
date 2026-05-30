import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { invoicesAPI } from "../api/invoices.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const useInvoiceUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) =>
      invoicesAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.invoices.all() });
      qc.invalidateQueries({ queryKey: qk.invoices.one(vars.id) });
      toast.success("Saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useInvoiceUpdateMutation;
