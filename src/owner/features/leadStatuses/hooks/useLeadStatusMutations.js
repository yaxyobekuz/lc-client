import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { leadStatusesAPI } from "../api/leadStatuses.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const handleErr = (err) =>
  apiErrorToast(err);

export const useLeadStatusCreateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => leadStatusesAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.leadStatuses.all() });
      toast.success("Status yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useLeadStatusUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) =>
      leadStatusesAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.leadStatuses.all() });
      toast.success("Status yangilandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useLeadStatusRemoveMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => leadStatusesAPI.remove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.leadStatuses.all() });
      toast.success("Status o'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};
