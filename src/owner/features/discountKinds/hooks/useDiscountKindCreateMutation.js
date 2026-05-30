import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { discountKindsAPI } from "../api/discountKinds.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const useDiscountKindCreateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => discountKindsAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.discountKinds.all() });
      toast.success("Chegirma turi yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useDiscountKindCreateMutation;
