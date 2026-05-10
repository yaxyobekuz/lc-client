// TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Sonner
import { toast } from "sonner";

// API
import { groupsAPI } from "../api/groups.api";

// Query keys
import { qk } from "@/shared/lib/query/keys";

const useGroupAddStudentMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, studentId }) =>
      groupsAPI.addStudent(id, studentId).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.groups.all() });
      qc.invalidateQueries({ queryKey: qk.groups.one(vars.id) });
      toast.success("Talaba qo'shildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "Xatolik yuz berdi";
      toast.error(msg);
      options.onError?.(err);
    },
  });
};

export default useGroupAddStudentMutation;
