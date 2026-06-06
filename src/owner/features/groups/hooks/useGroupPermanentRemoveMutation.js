// TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiErrorToast } from "@/shared/utils/apiError";

// Sonner
import { toast } from "sonner";

// API
import { groupsAPI } from "../api/groups.api";

// Query keys
import { qk } from "@/shared/lib/query/keys";

const useGroupPermanentRemoveMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => groupsAPI.permanentRemove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.groups.all() });
      toast.success("Guruh butunlay o'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useGroupPermanentRemoveMutation;
