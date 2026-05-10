import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { invoicesAPI } from "../api/invoices.api";
import { qk } from "@/shared/lib/query/keys";

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
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default useInvoiceUpdateMutation;
