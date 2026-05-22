import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { profileAPI } from "../api/profile.api";
import { qk } from "@/shared/lib/query/keys";

const useProfileUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) =>
      profileAPI.updateProfile(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.auth.me() });
      toast.success("Profil yangilandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "Xatolik yuz berdi";
      toast.error(msg);
      options.onError?.(err);
    },
  });
};

export default useProfileUpdateMutation;
