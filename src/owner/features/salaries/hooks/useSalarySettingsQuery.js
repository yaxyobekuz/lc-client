import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { salarySettingsAPI } from "../api/salarySettings.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

export const useSalarySettingsQuery = () =>
  useQuery({
    queryKey: qk.salarySettings.one(),
    queryFn: () => salarySettingsAPI.get().then((r) => r.data.data),
  });

export const useSalarySettingsUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) =>
      salarySettingsAPI.update(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salarySettings.one() });
      toast.success("Sozlamalar saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};
