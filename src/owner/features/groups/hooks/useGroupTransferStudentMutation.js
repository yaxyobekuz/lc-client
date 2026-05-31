// TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiErrorToast } from "@/shared/utils/apiError";

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
      toast.success("O'quvchi boshqa guruhga ko'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useGroupTransferStudentMutation;
