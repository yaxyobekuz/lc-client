import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { leadSourcesAPI } from "../api/leadSources.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const useLeadSourceRemoveMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => leadSourcesAPI.remove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.leadSources.all() });
      toast.success("O'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useLeadSourceRemoveMutation;
