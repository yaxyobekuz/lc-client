import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentsAPI } from "../api/payments.api";
import { qk } from "@/shared/lib/query/keys";

const usePaymentRecordMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => paymentsAPI.record(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.payments.all() });
      qc.invalidateQueries({ queryKey: qk.invoices.all() });
      qc.invalidateQueries({ queryKey: qk.invoices.one(vars.invoiceId) });
      qc.invalidateQueries({ queryKey: qk.paymentReports.summary() });
      toast.success("To'lov qabul qilindi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default usePaymentRecordMutation;
