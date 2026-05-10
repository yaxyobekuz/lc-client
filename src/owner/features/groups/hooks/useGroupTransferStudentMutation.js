// TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Sonner
import { toast } from "sonner";

// API
import { groupsAPI } from "../api/groups.api";

// Query keys
import { qk } from "@/shared/lib/query/keys";

const useGroupTransferStudentMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, studentId, targetGroupId }) =>
      groupsAPI
        .transferStudent(id, studentId, targetGroupId)
        .then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.groups.all() });
      qc.invalidateQueries({ queryKey: qk.groups.one(vars.id) });
      qc.invalidateQueries({ queryKey: qk.groups.one(vars.targetGroupId) });
      toast.success("Talaba boshqa guruhga ko'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "Xatolik yuz berdi";
      toast.error(msg);
      options.onError?.(err);
    },
  });
};

export default useGroupTransferStudentMutation;
