import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentMethodsAPI } from "../api/paymentMethods.api";
import { qk } from "@/shared/lib/query/keys";

const usePaymentMethodRemoveMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => paymentMethodsAPI.remove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.paymentMethods.all() });
      toast.success("Arxivlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default usePaymentMethodRemoveMutation;
