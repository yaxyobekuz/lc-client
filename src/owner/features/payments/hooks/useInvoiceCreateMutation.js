import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { invoicesAPI } from "../api/invoices.api";
import { qk } from "@/shared/lib/query/keys";

const useInvoiceCreateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => invoicesAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.invoices.all() });
      toast.success("Hisob yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default useInvoiceCreateMutation;
