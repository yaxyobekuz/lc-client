import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { discountKindsAPI } from "../api/discountKinds.api";
import { qk } from "@/shared/lib/query/keys";

const useDiscountKindUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) =>
      discountKindsAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.discountKinds.all() });
      toast.success("Saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default useDiscountKindUpdateMutation;
