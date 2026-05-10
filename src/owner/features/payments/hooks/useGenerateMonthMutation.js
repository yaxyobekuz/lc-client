import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { invoicesAPI } from "../api/invoices.api";
import { qk } from "@/shared/lib/query/keys";

const useGenerateMonthMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) =>
      invoicesAPI.generateMonth(body).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.invoices.all() });
      qc.invalidateQueries({ queryKey: qk.paymentReports.summary() });
      toast.success(data?.message || "Hisoblar yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default useGenerateMonthMutation;
