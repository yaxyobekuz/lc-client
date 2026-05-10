import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { leadSettingsAPI } from "../api/leadSettings.api";
import { qk } from "@/shared/lib/query/keys";

export const useLeadSettingsQuery = () =>
  useQuery({
    queryKey: qk.leadSettings.one(),
    queryFn: () => leadSettingsAPI.get().then((r) => r.data.data),
  });

export const useLeadSettingsUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) =>
      leadSettingsAPI.update(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.leadSettings.one() });
      toast.success("Sozlamalar saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};
