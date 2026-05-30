import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { leadDirectionsAPI } from "../api/leadDirections.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const handleErr = (err) =>
  apiErrorToast(err);

export const useLeadDirectionCreateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) =>
      leadDirectionsAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.leadDirections.all() });
      toast.success("Yo'nalish yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useLeadDirectionUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) =>
      leadDirectionsAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.leadDirections.all() });
      toast.success("Saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useLeadDirectionRemoveMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => leadDirectionsAPI.remove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.leadDirections.all() });
      toast.success("O'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};
