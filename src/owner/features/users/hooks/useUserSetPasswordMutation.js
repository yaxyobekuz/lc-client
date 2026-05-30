// TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Sonner
import { toast } from "sonner";

// API
import { usersAPI } from "../api/users.api";

// Query keys
import { qk } from "@/shared/lib/query/keys";

const useUserSetPasswordMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }) =>
      usersAPI.setPassword(id, password).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.users.password(vars.id) });
      toast.success("Parol yangilandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "Xatolik yuz berdi";
      toast.error(msg);
      options.onError?.(err);
    },
  });
};

export default useUserSetPasswordMutation;
