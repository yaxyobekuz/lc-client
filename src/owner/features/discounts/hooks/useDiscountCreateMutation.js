import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { discountsAPI } from "../api/discounts.api";
import { qk } from "@/shared/lib/query/keys";

const useDiscountCreateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => discountsAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.discounts.all() });
      qc.invalidateQueries({ queryKey: qk.users.one(vars.student) });
      toast.success("Chegirma yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default useDiscountCreateMutation;
