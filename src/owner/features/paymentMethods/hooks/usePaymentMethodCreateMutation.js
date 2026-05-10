import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentMethodsAPI } from "../api/paymentMethods.api";
import { qk } from "@/shared/lib/query/keys";

const usePaymentMethodCreateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) =>
      paymentMethodsAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.paymentMethods.all() });
      toast.success("To'lov usuli yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default usePaymentMethodCreateMutation;
