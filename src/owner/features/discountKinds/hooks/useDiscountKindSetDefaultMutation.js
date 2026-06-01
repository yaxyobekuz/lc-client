import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { discountKindsAPI } from "../api/discountKinds.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const useDiscountKindSetDefaultMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => discountKindsAPI.setDefault(id).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.discountKinds.all() });
      toast.success("Asosiy qilib belgilandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useDiscountKindSetDefaultMutation;
