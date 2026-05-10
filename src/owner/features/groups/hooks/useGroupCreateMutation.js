// TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Sonner
import { toast } from "sonner";

// API
import { groupsAPI } from "../api/groups.api";

// Query keys
import { qk } from "@/shared/lib/query/keys";

const useGroupCreateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => groupsAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.groups.all() });
      toast.success("Guruh yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "Xatolik yuz berdi";
      toast.error(msg);
      options.onError?.(err);
    },
  });
};

export default useGroupCreateMutation;
